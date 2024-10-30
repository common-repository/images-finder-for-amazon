var hostname = "https://wooshark.website";

function startLoadingSpinner() {
    jQuery(".loader2").css({
            display: "block",
            position: "fixed",
            "z-index": 9999,
            top: "50px",
            right: "50px",
            "border-radius": "35px",
            "background-color": "black"
        }),
        jQuery(".loader4").css({
            display: "block",
            position: "fixed",
            "z-index": 9999,
            top: "50px",
            right: "50px",
            "border-radius": "35px",
            "background-color": "black"
        });
}

function stopLoadingSpinner() {
    jQuery(".loader2").css({ display: "none" }),
        jQuery(".loader4").css({ display: "none" });
}

function titiTotoActiv(e, t) {
    if (e) {
        var r = new XMLHttpRequest();
        (r.onreadystatechange = function() {
            if (4 == r.readyState)
                if (200 === r.status)
                    try {
                        displayToast(JSON.parse(r.response).data, "black"),
                            localStorage.setItem("licenseValueReviewsPlugin", e),
                            jQuery("#licenseValueReviewsPlugin").val(e);
                    } catch (e) {
                        displayToast("Error parsing response json parse", "black");
                    }
                else {
                    try {
                        let e = JSON.parse(r.response).data;
                        console.log(e), displayToast(e, "red");
                    } catch (e) {}
                    localStorage.setItem("licenseValueReviewsPlugin", e),
                        jQuery("#licenseValueReviewsPlugin").val(e);
                }
        }),
        r.open("POST", hostname + ":8002/getActiveHostForReviewsPlugin", !0),
            r.setRequestHeader("Content-Type", "application/json"),
            r.send(
                JSON.stringify({
                    clientWebsite: t,
                    activationCode: e,
                    clientKey: "clientKey",
                    clientSecretKey: "clientSecretKey"
                })
            );
    } else displayToast("please introduce a license value");
}

function prepareModalFRomListOfProducts() {
    jQuery("#table-reviews tbody").empty();
    jQuery(


        // '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">'+
        // 'Launch demo modal'+
        // '</button>'+

        // '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
        // '<div class="modal-dialog">' +
        // '<div class="modal-content">' +
        // '<div class="modal-header">' +
        // '<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>' +
        // '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        // '</div>' +
        // '<div class="modal-body">' +
        // '...' +
        // '</div>' +
        // '<div class="modal-footer">' +
        // '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
        // '<button type="button" class="btn btn-primary">Save changes</button>' +
        // '</div>' +
        // '</div>' +
        // '</div>' +
        // '</div>'


        '<div class="modal bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"' +
        '    aria-hidden="true">' +
        '    <div class="modal-dialog modal-lg">' +
        '        <div class="modal-content" style="width:60vw; position: absolute">' +

        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>' +
        '<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +

        '            <div class="modal-body">' +

        '                <div style="margin-top:10px; margin-bottom:10px; margin-right:20px">' +
        '  <div style="flex: 1 1 99%; background-color:#eee8e8; margin-right:1%; padding:2% ">' +
        '                <div style="display:flex; "><input style="margin-top:10px;flex: 1 1 40%;" placeholder="Amazon Asin"' +
        '                        id="amazonSku" class="form-control " style="widh:60%" />' +
        '<button type="button"' +
        '                        style="width:25%; flex: 1 1 33%; margin-top:10px; display:block" class="btn btn-primary"' +
        '                        id="importImagesFromReviews" style="width:100%;margin-top:10px"> Import Images from reviews</button>' +
        '<button type="button"' +
        '                        style="width:25%; flex: 1 1 33%; margin-top:10px; display:block" class="btn btn-primary"' +
        '                        id="importImagesFromDescription" style="width:100%;margin-top:10px"> Import variations Images </button>' +

        "  </div>" +
        "  </div>" +
        "  </div>" +
        '<button type="button" ' +
        '                    class="btn btn-default" id="loadMoreReviews" style="width:100%;margin-top:10px; display:none"> Load next 10 Aliexpress' +
        "                    reviews</button> " +

        '                <div id="customReviews" style="overflow-y:scroll;height:500px">' +
        '                    <table id="ss" class="table table-striped">' +
        "                        <thead>" +
        "                            <tr>" +
        "                                <th>Image</th>" +
        "                                <th>Action</th>" +
        "                            </tr>" +
        "                        </thead>" +
        "                        <tbody> </tbody>" +
        "                    </table>" +
        "                </div>" +
        "            </div>" +
        '            <div class="modal-footer"><button type="button" id="confirmImageInsertion" class="btn btn-primary"' +
        '                    data-dismiss="modal">Insert Images</button><button type="button" class="btn btn-primary"' +
        '                    data-dismiss="modal">Close</button></div>' +
        "        </div>" +
        "    </div>" +
        "</div>" +
        '<div class="loader2" style="display:none; z-index:9999">' +
        "    <div></div>" +
        "    <div></div>" +
        "    <div></div>" +
        "    <div></div>" +
        "</div>"
    ).appendTo(jQuery("#modal-container"));
}




function handleServerResponse(e) {
    200 === e ?
        (displayToast("Reviews imported successfully", "black"),
            jQuery(".loader2").css({ display: "none" })) :
        (displayToast("Error while inserting the product", "red"),
            jQuery(".loader2").css({ display: "none" }));
}

function displayToast(e, t) {
    jQuery.toast({
        text: e,
        icon: "info",
        loaderBg: "#9EC600",
        textColor: "black",
        hideAfter: 6000,
        stack: 5,
        textAlign: "left",
        position: "bottom-right"
    });
}
jQuery(document).on("click", "#titiToto", function(e) {
    jQuery("#licenseValueReviewsPlugin").val();
});
let maxTitiToto = 1e4;


jQuery(document).on("click", "#openModalReviews", function(e) {}),
    // jQuery(document).on("click", "#LoadReviewsLibrary", function(e) {
    //     // LoadReviewsLibrary();
    // }),
    jQuery(document).on("click", "#addReview", function(e) {
        console.log("hndle ui-sortable-handle", jQuery(".wp-heading-inline")),
            e.preventDefault(),
            jQuery("#table-reviews tbody").append(
                '<tr><td style="width:50%" contenteditable>  review content  </td><td contenteditable style="width:10%">' +
                getUsername() +
                '</td><td contenteditable style="width:10%">' +
                new Date().toISOString().slice(0, 10) +
                '</td></td><td style="width:10%"><input style="width:100%" type="number" min="1" max="5" value="5"></td><td contenteditable>test@test.com</td><td style="width:15%"><input  placeholder="add tag" id="tagContent" class="form-control"><input type="color" value="#8000ff" id="colorTag" ><button class="btn btn-primary" id="addTag" style="margin-left:5px"> Add tag </button></td><td><button class="btn btn-danger" id="removeReview" style="font-size: 2rem;">X</button></td><td><button class="btn btn-primary" style="font-size: 0.8rem;" id="addToReviewsLibrary">Add to review library</button></td></tr>'
            ),
            jQuery("#table-reviews tr td[contenteditable]").css({
                border: "1px solid #51a7e8",
                "box-shadow": "inset 0 1px 2px rgba(0,0,0,0.075), 0 0 5px rgba(81,167,232,0.5)"
            });
    }),


    jQuery(document).on("click", ".premuimVersion", function(e) {
        displayToast('this is a premuim feature, please upgrade to use it');
        setTimeout(function() {
            window.open(
                "https://www.wooshark.com/wooshark-reviews-aliexpress-amazon",
                "_blank"
            );
        }, 5000);
    }),
    jQuery(document).on("click", "#FillTenReviews", function(e) {
        e.preventDefault();
        for (var t = 0; t < 10; t++)
            jQuery("#table-reviews tbody").append(
                '<tr><td style="width:60%" contenteditable>  review content  </td><td contenteditable style="width:15%">' +
                getUsername() +
                '</td><td contenteditable style="width:15%">' +
                new Date().toISOString().slice(0, 10) +
                '</td></td><td style="width:10%"><input style="width:100%" type="number" min="1" max="5" value="5"></td><td><button class="btn btn-danger" id="removeReview">X</button></td></tr>'
            ),
            jQuery("#table-reviews tr td[contenteditable]").css({
                border: "1px solid #51a7e8",
                "box-shadow": "inset 0 1px 2px rgba(0,0,0,0.075), 0 0 5px rgba(81,167,232,0.5)"
            });
    }),
    jQuery(document).ready(function() {
        getAllProducts(0),
            prepareModalFRomListOfProducts(),
            restoreConfiguration(),
            // getAllReviewsLibrary(),
            // checkMaximumReached(),
            jQuery("#selectedLanguage").text("Import preference AliExpress: "),
            jQuery(document).on(
                "click",
                ".woocommerce-product-gallery__image",
                function(e) {
                    jQuery(".carousel-item").each(function(e) {
                            jQuery(e).remove();
                        }),
                        jQuery("li[data-target]").each(function(e) {
                            jQuery(e).remove();
                        }),
                        jQuery(
                            '<div class="modal fade" id="myModal" role="dialog"><div class="modal-dialog" style="min-width: 1023px;">   <div class="modal-content">      <div class="modal-body"  id="contentImage"> <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel"> <ol class="carousel-indicators"> </ol> <div class="carousel-inner">  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button"  data-slide="prev">  <span class="carousel-control-prev-icon" aria-hidden="true"></span>   <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#carouselExampleIndicators" role="button"data-slide="next">   <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span>  </a> </div>     </div> </div></div></div>'
                        ).appendTo("html");
                    for (
                        var t = jQuery(".woocommerce-product-gallery__wrapper img"), r = 0; r < t.length + 1; r++
                    )
                        if (t[r]) {
                            var i = t[r].src;
                            0 == r ?
                                jQuery(
                                    '<li data-target="#carouselExampleIndicators" data-slide-to="' +
                                    r +
                                    '" class="active"></li>'
                                ).appendTo(".carousel-indicators") :
                                jQuery(
                                    '<li data-target="#carouselExampleIndicators" data-slide-to="' +
                                    r +
                                    '" class=""></li>'
                                ).appendTo(".carousel-indicators"),
                                0 == r ?
                                jQuery(
                                    '<div class="carousel-item active">    <img class="d-block w-100" src="' +
                                    i +
                                    '" alt="First slide">   </div>'
                                ).appendTo(".carousel-inner") :
                                jQuery(
                                    '<div class="carousel-item">    <img class="d-block w-100" src="' +
                                    i +
                                    '" alt="First slide">   </div>'
                                ).appendTo(".carousel-inner");
                        }
                    jQuery("#myModal").modal();
                }
            );
    }),
    jQuery(document).on("click", "#testdom", function(e) {
        console.log("----", jQuery(".product_title"));
    }),
    jQuery(document).on("click", "#removeReview", function(e) {
        jQuery(this)
            .parents("tr")
            .remove();
    }),
    jQuery(document).on("click", "#addTag", function(e) {
        let t = jQuery(this)
            .parents("td")
            .find("#colorTag")
            .val();
        jQuery(this).parents("tr")[0].cells[0].innerHTML =
            jQuery(this).parents("tr")[0].cells[0].innerHTML +
            '<span style="background-color:' +
            t +
            '; padding:5px; margin:5px; border-radius:5px"> #' +
            jQuery(this)
            .parents("td")
            .find("#tagContent")
            .val() +
            "</span>";
    });
let currentPageReviews = 1,
    currentPageReviewsAmazon = 1;

function restoreConfiguration() {
    try {
        _savedConfiguration = JSON.parse(
            localStorage.getItem("_savedConfigurationReviewPlugin")
        );
    } catch (e) {
        _savedConfiguration = {};
    }
    _savedConfiguration || (_savedConfiguration = {});
    let e = _savedConfiguration.singleImportonfigurationAliExpress,
        t = _savedConfiguration.singleImportonfigurationAmazon;
    e
        ?
        (jQuery("#importOnlyWithImagesAliexpress").prop(
                "checked",
                e.importOnlyWithImagesAliexpress
            ),
            jQuery("#generateRandomNamesAliExpress").prop(
                "checked",
                e.generateRandomNamesAliExpress
            ),
            jQuery("#imortOnlyFiveStarsAliExpress").prop(
                "checked",
                e.imortOnlyFiveStarsAliExpress
            ),
            jQuery("#importReviewsFlag").prop("checked", e.importReviewsFlag),
            jQuery("#importProductDetails").prop("checked", e.importProductDetails),
            jQuery("#importLogisticDetails").prop("checked", e.importLogisticDetails),
            jQuery("#isChangeReviewsStars").prop("checked", e.isChangeReviewsStars),
            jQuery("#isHideReviewsDisplay").prop("checked", e.isHideReviewsDisplay),
            jQuery("#customizeReviewsBeforeimportAliExpress").prop(
                "checked",
                e.customizeReviewsBeforeimportAliExpress
            ),
            jQuery("[name=language][value=" + e.languageReviewsAliexpress + "]").attr(
                "checked", !0
            )) :
        (jQuery("#importOnlyWithImagesAliexpress").prop("checked", !1),
            jQuery("#generateRandomNamesAliExpress").prop("checked", !1),
            jQuery("#imortOnlyFiveStarsAliExpress").prop("checked", !1),
            jQuery("#customizeReviewsBeforeimportAliExpress").prop("checked", !1),
            jQuery("[name=language][value=en_US]").attr("checked", !0),
            jQuery("#importLogisticDetails").prop("checked", !1),
            jQuery("#importReviewsFlag").prop("checked", !0),
            jQuery("#importProductDetails").prop("checked", !0),
            jQuery("#isChangeReviewsStars").prop("checked", !1),
            jQuery("#isHideReviewsDisplay").prop("checked", !1)),
        t ?
        (jQuery("#importOnlyWithImagesAmazon").prop(
                "checked",
                t.importOnlyWithImagesAmazon
            ),
            jQuery("#onlyVerifiedPurchase").prop("checked", t.onlyVerifiedPurchase),
            jQuery("#isHighQualityImage").prop("checked", t.isHighQualityImage),
            jQuery("#imortOnlyFiveStarsAmazon").prop(
                "checked",
                t.imortOnlyFiveStarsAmazon
            ),
            jQuery("#customizeReviewsBeforeimportAmazon").prop(
                "checked",
                t.customizeReviewsBeforeimportAmazon
            ),
            jQuery("#importProductTitleAmazon").prop(
                "checked",
                t.importProductTitleAmazon
            ),
            jQuery("#importHelpfullStatement").prop(
                "checked",
                t.importHelpfullStatement
            ),
            jQuery("#searchKeywordAmazon").val(t.searchKeywordAmazon),
            jQuery(
                "[name=languageAmazon][value=" + t.languageReviewsAmazon + "]"
            ).attr("checked", !0)) :
        (jQuery("#importOnlyWithImagesAmazon").prop("checked", !1),
            jQuery("#onlyVerifiedPurchase").prop("checked", !1),
            jQuery("#isHighQualityImage").prop("checked", !1),
            jQuery("#importProductTitleAmazon").prop("checked", !1),
            jQuery("#importHelpfullStatement").prop("checked", !1),
            jQuery("#imortOnlyFiveStarsAmazon").prop("checked", !1),
            jQuery("#customizeReviewsBeforeimportAmazon").prop("checked", !1),
            jQuery("[name=languageAmazon][value=en_US]").attr("checked", !1));
}


function getAllProducts(e) {
    jQuery.ajax({
        url: wooshark_params_finder.ajaxurl,
        type: "POST",
        dataType: "JSON",
        data: { action: "get_products_reviews", paged: e },
        success: function(e) {
            if ((console.log("----response", e), e)) {
                var t = jQuery("#products-wooshark-reviews");
                t.find("tbody tr").remove(),
                    e.forEach(function(e, r) {
                        0;
                        t.append(
                            "<tr><td ><img style='border:1px solid grey' width='80px' height='80px' src=" +
                            e.image +
                            "></img></td><td>" +
                            e.sku +
                            "</td><td>" +
                            e.id +
                            "</td> <td>" +
                            e.title.substring(0, 50) +
                            "</td><td><button class='btn btn-primary' id='insert-product-reviews-plugin' style='width:100%' data-toggle='modal' data-target='#exampleModal'> Add images </button></td></tr>"
                        );
                    });
            }
        },
        error: function(e) {
            console.log("****err", e), displayToast(e.responseText, "red");
        },
        complete: function() {
            console.log("SSMEerr");
        }
    });
}


jQuery(document).on("click", "#saveGlobalConfigurationReviewPlugin", function(
        e
    ) {
        let t = {};
        var r = {
                importOnlyWithImagesAliexpress: jQuery(
                    "#importOnlyWithImagesAliexpress"
                ).prop("checked"),
                generateRandomNamesAliExpress: jQuery(
                    "#generateRandomNamesAliExpress"
                ).prop("checked"),
                imortOnlyFiveStarsAliExpress: jQuery(
                    "#imortOnlyFiveStarsAliExpress"
                ).prop("checked"),
                importReviewsFlag: jQuery("#importReviewsFlag").prop("checked"),
                importProductDetails: jQuery("#importProductDetails").prop("checked"),
                customizeReviewsBeforeimportAliExpress: jQuery(
                    "#customizeReviewsBeforeimportAliExpress"
                ).prop("checked"),
                languageReviewsAliexpress: jQuery('input[name="language"]:checked')[0]
                    .value,
                importLogisticDetails: jQuery("#importLogisticDetails").prop("checked"),
                isChangeReviewsStars: jQuery("#isChangeReviewsStars").prop("checked"),
                isHideReviewsDisplay: jQuery("#isHideReviewsDisplay").prop("checked")
            },
            i = {
                importOnlyWithImagesAmazon: jQuery("#importOnlyWithImagesAmazon").prop(
                    "checked"
                ),
                onlyVerifiedPurchase: jQuery("#onlyVerifiedPurchase").prop("checked"),
                isHighQualityImage: jQuery("#isHighQualityImage").prop("checked"),
                imortOnlyFiveStarsAmazon: jQuery("#imortOnlyFiveStarsAmazon").prop(
                    "checked"
                ),
                importProductTitleAmazon: jQuery("#importProductTitleAmazon").prop(
                    "checked"
                ),
                importHelpfullStatement: jQuery("#importHelpfullStatement").prop(
                    "checked"
                ),
                customizeReviewsBeforeimportAmazon: jQuery(
                    "#customizeReviewsBeforeimportAmazon"
                ).prop("checked"),
                searchKeywordAmazon: jQuery("#searchKeywordAmazon").val(),
                languageReviewsAmazon: jQuery('input[name="languageAmazon"]:checked')[0]
                    .value
            };
        (t.singleImportonfigurationAliExpress = r),
        (t.singleImportonfigurationAmazon = i),
        localStorage.setItem("_savedConfigurationReviewPlugin", JSON.stringify(t)),
            displayToast("Configuration saved successfully"),
            jQuery("#savedCorrectlySection").show(),
            jQuery.ajax({
                url: wooshark_params_finder.ajaxurl,
                type: "POST",
                dataType: "JSON",
                data: {
                    action: "save-options-reviews-plugin",
                    isHideReviewsDisplay: jQuery("#isHideReviewsDisplay").prop("checked") ?
                        "Y" : "N"
                },
                success: function(e) {},
                error: function(e) {
                    console.log("****err", e);
                },
                complete: function() {
                    console.log("SSMEerr");
                }
            }),
            document.location.reload(!0);
    }),
    jQuery(document).on("click", "#insert-product-reviews-plugin", function(e) {
        jQuery("#table-images tr").empty();
        currentProductId = jQuery(this).parents("tr")[0].cells[2].innerText;
    });


function stopLoading(e) {
    e || (e = "loader2"), jQuery("." + e).css({ display: "none" });
}


jQuery(document).on("click", "#searchBySku", function(e) {
    jQuery("#product-pagination").empty(),
        jQuery(".loader2").css({
            display: "block",
            position: "fixed",
            "z-index": 9999,
            top: "50px",
            right: "50px",
            "border-radius": "35px",
            "background-color": "red"
        });
    let t = jQuery("#skusearchValue").val();
    t
        ?
        jQuery.ajax({
            url: wooshark_params_finder.ajaxurl,
            type: "POST",
            dataType: "JSON",
            data: { action: "search-product-by-sku-reviews", searchSkuValue: t },
            success: function(e) {
                if ((stopLoading(), e)) {
                    var t = jQuery("#products-wooshark-reviews");
                    jQuery("#products-wooshark-reviews tr").empty();
                    e.forEach(function(e, r) {
                        t.append(
                            "<tr><td ><img style='border:1px solid grey' width='80px' height='80px' src=" +
                            e.image +
                            "></img></td><td>" +
                            e.sku +
                            "</td><td>" +
                            e.id +
                            "</td> <td>" +
                            e.title.substring(0, 50) +
                            "</td><td><button class='btn btn-primary' id='insert-product-reviews-plugin' style='width:100%'  data-toggle='modal' data-target='#exampleModal'> Add images </button></td></tr>"
                        );
                    });
                }
            },
            error: function(e) {
                e && e.responseText && displayToast(e.responseText, "red"),
                    stopLoadingSpinner();
            },
            complete: function() {
                console.log("SSMEerr"), stopLoadingSpinner();
            }
        }) :
        getAllProducts(1);
});
let isMaximumReached = !1;

function checkMaximumReached() {
    jQuery.ajax({
        url: wooshark_params_finder.ajaxurl,
        type: "POST",
        dataType: "JSON",
        data: { action: "check-maximum-reached" },
        success: function(e) {
            console.log("----response", e),
                (isMaximumReached = !(!e || "isReached" != e.result));
        },
        error: function(e) {
            console.log("****err", e),
                displayToast("error while getting reviews library", "red");
        },
        complete: function() {
            console.log("SSMEerr");
        }
    });
}




// 
// 
// 
// 
// 
// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 

// 
// 
// 
// 
// 
// 
// 

// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 


jQuery(document).on("click", "#importImagesFromDescription", function(e) {


    let t = jQuery("#amazonSku").val();
    t
        ?
        (startLoadingSpinner(),
            (xmlhttp = new XMLHttpRequest()),
            (xmlhttp.onreadystatechange = function() {
                if (4 == xmlhttp.readyState)

                    if (200 === xmlhttp.status) {
                    try {
                        if (((data = JSON.parse(xmlhttp.response).data), data)) {
                            var e = "";
                            data.forEach(function(t) {
                                if (t) {
                                    jQuery("#ss tbody").append('<div><img src=' + t + '><button class="btn btn-danger" id="removeCurrentImage" >Remove Image</button></div>');
                                }
                            });
                            stopLoadingSpinner();
                        } else displayToast("No images found for this product");
                    } catch (e) {
                        stopLoadingSpinner();
                    }
                } else if (645 == xmlhttp.status) {
                    console.log('----'),
                        displayToast("Cannot find images"),
                        stopLoadingSpinner(),
                        enableLoadButtons();
                } else {
                    displayToast("Error while loading images, please try again"),
                        stopLoadingSpinner(),
                        enableLoadButtons();
                }
            }),
            xmlhttp.open("POST", hostname + ":8002/getImagesFromAmazonDescription", !0),
            xmlhttp.setRequestHeader("Content-Type", "application/json"),
            xmlhttp.send(
                JSON.stringify({
                    // isHighQualityImage: isHighQualityImage,
                    productId: t,
                    productUrl: 'https://www.amazon.com/dp/' + t
                        // startIndex: pageNo,
                        // multiplierIndex: pageCount,
                        // imortOnlyFiveStarsAmazon: imortOnlyFiveStarsAmazon,
                        // importOnlyWithImagesAmazon: importOnlyWithImagesAmazon,
                        // searchKeywordAmazon: searchKeywordAmazon,
                        // onlyVerifiedPurchase: onlyVerifiedPurchase,
                        // languageAmazon: languageAmazon
                })
            )) :
        displayToast("Product sku should not be empty");
});


jQuery(document).on("click", "#importImagesFromReviews", function(e) {


    let t = jQuery("#amazonSku").val();
    t
        ?
        (startLoadingSpinner(),
            (xmlhttp = new XMLHttpRequest()),
            (xmlhttp.onreadystatechange = function() {
                if (4 == xmlhttp.readyState)
                    if (200 === xmlhttp.status) {
                        try {
                            if (((data = JSON.parse(xmlhttp.response).data), data)) {
                                var e = "";
                                data.forEach(function(t) {
                                    if (t) {
                                        jQuery("#ss tbody").append('<div><img src=' + t + '><button class="btn btn-danger" id="removeCurrentImage" >Remove Image</button></div>');
                                    }
                                });
                                stopLoadingSpinner();
                            } else displayToast("No images found for this product");
                        } catch (e) {
                            stopLoadingSpinner();
                        }
                    } else if (645 == xmlhttp.status) {
                    console.log('----'),
                        displayToast("Cannot find images"),
                        stopLoadingSpinner(),
                        enableLoadButtons();
                } else {

                    displayToast("Error while loading images, please try again"),
                        stopLoadingSpinner(),
                        enableLoadButtons();
                }
            }),
            xmlhttp.open("POST", hostname + ":8002/getImagesFromAmazonReviews", !0),
            xmlhttp.setRequestHeader("Content-Type", "application/json"),
            xmlhttp.send(
                JSON.stringify({
                    // isHighQualityImage: isHighQualityImage,
                    productId: t,
                    startIndex: 1,
                    multiplierIndex: 3
                })
            )) :
        displayToast("Product sku should not be empty");
});

jQuery(document).on("click", "#removeCurrentImage", function(e) {
    jQuery(this)
        .parent("div")
        .remove();
});


jQuery(document).on("click", "#confirmImageInsertion", function(e) {

    let images = jQuery('#ss tbody img');
    let AllImages = [];
    images.each(function(index, item) {
        let image = jQuery(item).attr('src');
        AllImages.push(image);
    });

    startLoadingSpinner(),
        jQuery.ajax({
            url: wooshark_params_finder.ajaxurl,
            type: "POST",
            dataType: "JSON",
            data: { action: "import-images", post_id: currentProductId, images: AllImages },
            success: function(e) {
                if (e && !e.error && e.result && e.result == "OK") {

                    displayToast(
                        "images imported successfully",
                        "black"
                    )
                } else {
                    displayToast(
                        " error while inserting images", 'red'
                    )
                }

                // displayToast("Unknown errr, pelase contact wooshrak", "red");
                stopLoadingSpinner();
                jQuery("#table-images tbody").empty();
            },
            error: function(e) {
                console.log("****err", e),
                    stopLoadingSpinner(),
                    e && e.responseText && displayToast(e.responseText, "red");
            }
        });

});