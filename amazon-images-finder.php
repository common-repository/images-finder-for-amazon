<?php
/*
   Plugin Name: Reviews Images for Amazon and woocommerce by wooshark
   Plugin URI: http://wordpress.org/extend/plugins/amazon-images-finder/
   Version: 0.2
   Author: zizou1988
   Description: Add images from amazon reviews, variations and description to your existing products
   Text Domain: images-finder-amazon
   License: GPLv3
  */

/*
    "WordPress Plugin Template" Copyright (C) 2020 Michael Simpson  (email : michael.d.simpson@gmail.com)

    This following part of this file is part of WordPress Plugin Template for WordPress.

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

$AmazonImagesFinder_minimalRequiredPhpVersion = '5.0';

/**
 * Check the PHP version and give a useful error message if the user's version is less than the required version
 * @return boolean true if version check passed. If false, triggers an error which WP will handle, by displaying
 * an error message on the Admin page
 */
function AmazonImagesFinder_noticePhpVersionWrong() {
    global $AmazonImagesFinder_minimalRequiredPhpVersion;
    echo '<div class="updated fade">' .
      __('Error: plugin "Amazon Images finder" requires a newer version of PHP to be running.',  'amazon-images-finder').
            '<br/>' . __('Minimal version of PHP required: ', 'amazon-images-finder') . '<strong>' . $AmazonImagesFinder_minimalRequiredPhpVersion . '</strong>' .
            '<br/>' . __('Your server\'s PHP version: ', 'amazon-images-finder') . '<strong>' . phpversion() . '</strong>' .
         '</div>';
}


function AmazonImagesFinder_PhpVersionCheck() {
    global $AmazonImagesFinder_minimalRequiredPhpVersion;
    if (version_compare(phpversion(), $AmazonImagesFinder_minimalRequiredPhpVersion) < 0) {
        add_action('admin_notices', 'AmazonImagesFinder_noticePhpVersionWrong');
        return false;
    }
    return true;
}


/**
 * Initialize internationalization (i18n) for this plugin.
 * References:
 *      http://codex.wordpress.org/I18n_for_WordPress_Developers
 *      http://www.wdmac.com/how-to-create-a-po-language-translation#more-631
 * @return void
 */
function AmazonImagesFinder_i18n_init() {
    $pluginDir = dirname(plugin_basename(__FILE__));
    load_plugin_textdomain('amazon-images-finder', false, $pluginDir . '/languages/');
}


//////////////////////////////////
// Run initialization
/////////////////////////////////

// Initialize i18n
add_action('plugins_loadedi','AmazonImagesFinder_i18n_init');

// Run the version check.
// If it is successful, continue with initialization for this plugin
if (AmazonImagesFinder_PhpVersionCheck()) {
    // Only load and run the init function if we know PHP version can parse it
    include_once('amazon-images-finder_init.php');
    AmazonImagesFinder_init(__FILE__);
}
