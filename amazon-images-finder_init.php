<?php
/*
    "WordPress Plugin Template" Copyright (C) 2020 Michael Simpson  (email : michael.d.simpson@gmail.com)

    This file is part of WordPress Plugin Template for WordPress.

    WordPress Plugin Template is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WordPress Plugin Template is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Contact Form to Database Extension.
    If not, see http://www.gnu.org/licenses/gpl-3.0.html
*/

function AmazonImagesFinder_init($file)
{

  require_once('AmazonImagesFinder_Plugin.php');
  $aPlugin = new AmazonImagesFinder_Plugin();

  // Install the plugin
  // NOTE: this file gets run each time you *activate* the plugin.
  // So in WP when you "install" the plugin, all that does it dump its files in the plugin-templates directory
  // but it does not call any of its code.
  // So here, the plugin tracks whether or not it has run its install operation, and we ensure it is run only once
  // on the first activation
  if (!$aPlugin->isInstalled()) {
    $aPlugin->install();
  } else {
    // Perform any version-upgrade activities prior to activation (e.g. database changes)
    $aPlugin->upgrade();
  }

  // Add callbacks to hooks
  $aPlugin->addActionsAndFilters();

  if (!$file) {
    $file = __FILE__;
  }
  // Register the Plugin Activation Hook
  register_activation_hook($file, array(&$aPlugin, 'activate'));


  // Register the Plugin Deactivation Hook
  register_deactivation_hook($file, array(&$aPlugin, 'deactivate'));
}


function iffa_getProduct_FROMWP_Image_finder()
{
  $paged = isset($_POST['paged']) ? sanitize_text_field($_POST['paged']) : '';
  if (!isset($$paged)) {
    $paged = 1;
  }
  $args = array('post_type' => 'product', 'posts_per_page' => 200, 'paged' => $paged, 'post_status' => array('publish', 'draft'));
  $products = new WP_Query($args);
  $finalList = array();
  if ($products->have_posts()) {
    while ($products->have_posts()) : $products->the_post();
      $theid = get_the_ID();
      $product = new WC_Product($theid);
      if (has_post_thumbnail()) {
        $thumbnail = get_post_thumbnail_id();
        $image = $thumbnail ? wp_get_attachment_url($thumbnail) : '';
      }
      $finalList[] = array('sku' => $product->get_sku(), 'id' => $theid, 'image' => $image, 'title' => $product->get_title(), 'productUrl' => get_post_meta($theid, 'productUrl', true));
    endwhile;
  } else {
    wp_send_json($finalList);
    // echo __('No products found');
  }
  wp_reset_postdata();
  wp_send_json($finalList);
}
add_action('wp_ajax_get_products_reviews', 'iffa_getProduct_FROMWP_Image_finder');
add_action('wp_ajax_nopriv_get_products_reviews', 'iffa_getProduct_FROMWP_Image_finder');



function iffa_searchProductBySkuReviewsImageFinder()
{
  $searchSkuValue = isset($_POST['searchSkuValue']) ? sanitize_text_field($_POST['searchSkuValue']) : null;
  if (isset($searchSkuValue)) {
    $args = array('post_type' => 'product', 'posts_per_page' => 1, 'p' => $searchSkuValue);
    $products = new WP_Query($args);
    $finalList = array();
    if ($products->have_posts()) {
      while ($products->have_posts()) : $products->the_post();
        $theid = get_the_ID();
        $product = new WC_Product($theid);
        if (has_post_thumbnail()) {
          $thumbnail = get_post_thumbnail_id();
          $image = $thumbnail ? wp_get_attachment_url($thumbnail) : '';
        }
        $finalList[] = array('sku' => $product->get_sku(), 'id' => $theid, 'image' => $image, 'title' => $product->get_title(), 'productUrl' => get_post_meta($theid, 'productUrl', true));
      endwhile;
    } else {
      echo __('No products found');
    }
    wp_reset_postdata();
    wp_send_json($finalList);
  } else {
    $results = array('error' => true, 'error_msg' => 'cannot find result for the introduced sku value, please make sure the product is imported using wooshark', 'data' => '');
    wp_send_json($results);
  }
}
add_action('wp_ajax_search-product-by-sku-reviews', 'iffa_searchProductBySkuReviewsImageFinder');
add_action('wp_ajax_nopriv_search-product-by-sku-reviews', 'iffa_searchProductBySkuReviewsImageFinder');



function iffa_saveOptionsReviewsPlugin_image_finder()
{
  $isHideReviewsDisplay = isset($_POST['isHideReviewsDisplay']) ? sanitize_text_field($_POST['isHideReviewsDisplay']) : '';
  if (isset($isHideReviewsDisplay)) {
    update_option('isHideReviewsDisplay', $isHideReviewsDisplay);
  } else {
    wp_send_json(array('error' => 'cannot sanitize the value'));
  }
  wp_send_json(array('b' => get_option('isHideReviewsDisplay')));
}
add_action('wp_ajax_save-options-reviews-plugin', 'iffa_saveOptionsReviewsPlugin_image_finder');
add_action('wp_ajax_nopriv_save-options-reviews-plugin', 'iffa_saveOptionsReviewsPlugin_image_finder');



add_action('wp_ajax_getProductsCountPLuginReviews', 'iffa_getCountOFProducts');
add_action('wp_ajax_nopriv_getProductsCountPLuginReviews', 'iffa_getCountOFProducts');
function iffa_getCountOFProducts()
{
  $args = array('post_type' => 'product', 'post_status' => array('publish', 'draft'));
  $query = new WP_Query($args);
  $total = $query->found_posts;
  wp_reset_postdata();
  wp_send_json($total);
}


function iffa_importImages()
{

  $post_id = isset($_POST['post_id']) ? sanitize_text_field($_POST['post_id']) : null;

  $images = $_POST['images'];
  if (isset($images)) {
    $imagesPost = filter_var_array($images, FILTER_SANITIZE_URL);
    if (isset($post_id) && isset($imagesPost) && count($imagesPost) > 0) {
      $product = wc_get_product($post_id);
      iffa_save_product_imagesForAmazonFinder($product, $imagesPost);
      try {
        $post_id_beta = $product->save();
        wp_send_json(array('result' => 'OK'));
      } catch (Exception $e) {
        $results = array('error' => true, 'error_msg' => 'Error received when trying to insert the product' . $e->getMessage(), 'data' => '');
        wp_send_json($results);
      }
    } else {
      wp_send_json(array('result' => 'issue while trying to insert the images'));
    }
  } else {
    wp_send_json(array('result' => 'issue while trying to insert the images'));
  }
}
add_action('wp_ajax_import-images', 'iffa_importImages');
add_action('wp_ajax_nopriv_import-images', 'iffa_importImages');


function iffa_save_product_imagesForAmazonFinder($product, $images)
{
  if (is_array($images)) {
    $gallery = $product->get_gallery_image_ids();

    foreach ($images as $key => $image) {
      if (isset($image)) {
        $upload = wc_rest_upload_image_from_url(esc_url_raw($image));
        if (is_wp_error($upload)) {
          if (!apply_filters('woocommerce_rest_suppress_image_upload_error', false, $upload, $product->get_id(), $images)) {
            throw new WC_REST_Exception('woocommerce_product_image_upload_error', $upload->get_error_message(), 400);
          } else {
            continue;
          }
        }
        $attachment_id = wc_rest_set_uploaded_image_as_attachment($upload, $product->get_id());
      }
      // if ($key == 0) {
      // $product->set_image_id($attachment_id);
      // } else {
      array_push($gallery, $attachment_id);
      // }
    }
    if (!empty($gallery)) {
      $product->set_gallery_image_ids($gallery);
    }
  } else {
    // $product->set_image_id('');
    // $product->set_gallery_image_ids(array());
  }
  return $product;
}
