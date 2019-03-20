/*global jQuery */
(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        /*---------------------------
             Background Image JS
        ------------------------------*/
        var bgSelector = $(".bg-img");
        bgSelector.each(function (index, elem) {
            var element = $(elem),
                bgSource = element.data('bg');
            element.css('background-image', 'url(' + bgSource + ')');
        });


        /*---------------------------
            Tippy Tooltip JS
        ------------------------------*/
        tippy('.trio-tooltip', {
            inertia: true,
            animation: 'shift-away',
            arrow: true
        });


        /*---------------------------
            Offside Canvas JS
        ------------------------------*/
        $(".off-canvas-btn").on('click', function () {
            $(".off-canvas-area-wrapper").addClass('show');
        });

        $(".btn-close, .off-canvas-overlay").on('click', function () {
            $(".off-canvas-area-wrapper,.off-canvas-responsive-menu,.off-canvas-search-box").removeClass('show');
        });


        /*------------------------------
            Offside Responsive Menu JS
        ---------------------------------*/
        $(".mobile-menu").on('click', function () {
            $(".off-canvas-responsive-menu").addClass('show');
        });

        /*------------------------------
            Offside Search Box JS
        ---------------------------------*/
        $(".search-box-open").on('click', function () {
            $(".off-canvas-search-box").addClass('show');
        });

        // Sticky Header Height Fix
        var searchBoxHeight = $("header").outerHeight();
        $("header.header-area-wrapper:not('.transparent-header') + div").css('margin-top', searchBoxHeight);


        /*---------------------------
           Slicknav JS
        ------------------------------*/
        $(".main-menu").slicknav({
            removeClasses: true,
            closedSymbol: '<i class="fa fa-angle-down"></i>',
            openedSymbol: "-",
            prependTo: '.off-canvas-responsive-menu .off-canvas-content',
            nestedParentLinks: false
        });


        /*---------------------------
          Counter To Up JS
        ------------------------------*/
        $('.odometer').each(function () {
            $(this).appear(function () {
                var $this = $(this),
                    $dataValue = $this.data('count');

                setTimeout(function () {
                    $this.html($dataValue);
                }, 1000);
            })
        });

        /*---------------------------
          Slick Slider Active JS
        ------------------------------*/
        $(".ht-slick-slider").slick({
            arrows: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });

        /*=============================
            Product Quantity
        ==============================*/
        var proQty = $(".pro-qty");
        proQty.append('<a href="#" class="inc qty-btn">+</a>');
        proQty.append('<a href="#" class= "dec qty-btn">-</a>');
        $('.qty-btn').on('click', function (e) {
            e.preventDefault();
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            if ($button.hasClass('inc')) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                // Don't allow decrementing below zero
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }
            $button.parent().find('input').val(newVal);
        });


        /*=============================
	        Price Range Slider JS
        ==============================*/

        var rangeSlider = $(".price-range"),
            amount = $("#amount"),
            minPrice = rangeSlider.data('min'),
            maxPrice = rangeSlider.data('max');
        rangeSlider.slider({
            range: true,
            min: minPrice,
            max: maxPrice,
            values: [minPrice, maxPrice],
            slide: function (event, ui) {
                amount.val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        amount.val(" $" + rangeSlider.slider("values", 0) +
            " - $" + rangeSlider.slider("values", 1));


        /*================================
            Newsletter Form JS
        ==================================*/
        var subscribeUrl = $(".mc-form").attr('action');
        $('#mc-form').ajaxChimp({
            language: 'en',
            url: subscribeUrl,
            callback: mailChimpResponse
        });

        function mailChimpResponse(resp) {
            if (resp.result === 'success') {
                $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
                $('.mailchimp-error').fadeOut(400);
                $("#mc-form").trigger('reset');
            } else if (resp.result === 'error') {
                $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
            }
        }


        /*================================
           Discover Circle Pei Chart JS
        ==================================*/
        var chartSelector = $(".discover-chart");
        chartSelector.each(function () {
            $(this).appear(function () {
                var $this = $(this),
                    amount = '<span class="discover-amount">' + $this.data('percent') + '%</span>';
                $this.html(amount);
                $this.easyPieChart({
                    barColor: "#aaaaaa",
                    trackColor: "#f9f9f9",
                    scaleColor: false,
                    scaleLength: 10,
                    lineWidth: 5
                });
            })
        });


        /*=====================================
        Instagram Feed JS
        ======================================*/
        // User Changeable Access
        var activeId = $("#instafeed"),
            myTemplate = '<div class="instagram-item"><a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a></div>';

        if (activeId.length) {
            var userID = activeId.attr('data-userid'),
                accessTokenID = activeId.attr('data-accesstoken'),

                userFeed = new Instafeed({
                    get: 'user',
                    userId: userID,
                    accessToken: accessTokenID,
                    resolution: 'standard_resolution',
                    template: myTemplate,
                    sortBy: 'least-recent',
                    limit: 9,
                    links: false
                });
            userFeed.run();
        }


        /*=====================================
            Skills Bar JS
        ======================================*/
        var skillsBar = $(".skill-progress-bar");
        skillsBar.appear(function () {
            skillsBar.each(function (index, elem) {
                var elementItem = $(elem),
                    skillBarAmount = elementItem.data('skill-amount');
                elementItem.animate({
                    width: skillBarAmount
                }, 100);
                elementItem.closest('.single-skill-bar').find('.skill-percent').text(skillBarAmount);
            });
        });

        /*=====================================
            Element Sticky JS
        ======================================*/
        var windowWidth = $(document).width();
        if (windowWidth > 1200) {
            $('.element-sticky').stickySidebar({
                topSpacing: 160
            });
        }


        /*=====================================
            Portfolio Filter JS
        ======================================*/
        var activeId = $(".port-filter-menu li");

        activeId.on('click', function () {
            var $this = $(this),
                filterValue = $this.data('filter');

            $(".portfolio-content .masonry-grid").isotope({
                filter: filterValue
            });

            activeId.removeClass('active');
            $this.addClass('active');
        });


        /*================================
           Magnific Popup JS
        ==================================*/
        // Video PopUp
        var videopopup = $(".btn-video-popup");
        videopopup.magnificPopup({
            type: 'iframe',
            mainClass: 'video-popup-wrap'
        });

        // Image Gallery
        var imgGallery = $(".btn-img-gallery");
        imgGallery.magnificPopup({
            type: 'image',
            closeBtnInside: false,
            mainClass: 'imagesGallery',
            gallery: {
                enabled: true
            }
        });


        /*=====================================
           Video Background JS
        ======================================*/
        var videoBg = $(".video-bg");

        videoBg.each(function (index, elem) {
            var element = $(elem),
                videoUrl = element.data('url');

            videoBg.YTPlayer({
                videoURL: videoUrl,
                startAt: 7,
                showControls: false,
                showYTLogo: false,
                mute: true,
                quality: 'highres',
                containment: '.video-bg-content-wrap'
            });
        });


        /*=====================================
          Nice Select JS
        ======================================*/
        $("select").niceSelect();


        /*=====================================
          Smooth Scroll JS
        ======================================*/
        $(".smooth-scroll").smoothScroll({
            speed: 1000
        });


        /*=====================================
          Lading Page Smooth Scroll
        ======================================*/
        $(".landing-nav li a, .slicknav_nav li a").smoothScroll({
            speed: 1000,
            offset: 0
        });


        /*=====================================
          Match Height Js
        ======================================*/
        $('.matchHeight').matchHeight();


        /*=====================================
          Nice Scroll Js
        ======================================*/
        // Quick View Scrollbar
        $(".product-details-info-content-wrap").niceScroll('.prod-details-info-content', {
            cursorborderradius: '0px',
            cursorborder: '0px',
            cursorcolor: '#fdc657',
            autohidemode: false,
            zindex: '9px'
        });


        /*=============================
        Checkout Page Checkbox
        ==============================*/
        $("#create_pwd").on("change", function () {
            $(".account-create").slideToggle("100");
        });

        $("#ship_to_different").on("change", function () {
            $(".ship-to-different").slideToggle("100");
        });


        /*================================
            Contact Map JS
        ==================================*/
        var map_id = $('#map_content');
        if (map_id.length > 0) {
            var $lat = map_id.data('lat'),
                $lng = map_id.data('lng'),
                $zoom = map_id.data('zoom'),
                $maptitle = map_id.data('maptitle'),
                $mapaddress = map_id.data('mapaddress'),
                mymap = L.map('map_content').setView([$lat, $lng], $zoom);

            L.tileLayer.grayscale('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map',
                maxZoom: 18,
                id: 'mapbox.streets',
                scrollWheelZoom: false,
                accessToken: 'pk.eyJ1Ijoic2hha2lsYWhtbWVlZCIsImEiOiJjamk4anF6NDgwMGd5M3BwM2c4eHU5dmIzIn0.yBLGUAB8kV1I1yGGonxzzg'
            }).addTo(mymap);

            var marker = L.marker([$lat, $lng]).addTo(mymap);
            mymap.scrollWheelZoom.disable();
        }


        /*======================
        Ajax Contact Form JS
        ============================*/
        // Get the form.
        var form = $('#contact-form');

        // Get the messages div.
        var formMessages = $('.form-message');

        // Set up an event listener for the contact form.
        $(form).submit(function (e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = form.serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: formData
            })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass('alert alert-danger');
                    $(formMessages).addClass('alert alert-success fade show');

                    // Set the message text.
                    formMessages.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>");
                    formMessages.append(response);

                    // Clear the form.
                    $('#contact-form input,#contact-form textarea').val('');
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('alert alert-success');
                    $(formMessages).addClass('alert alert-danger fade show');

                    // Set the message text.
                    if (data.responseText !== '') {
                        formMessages.html("<button type='button' class='close' data-dismiss='alert'>&times;</button>");
                        formMessages.append(data.responseText);
                    } else {
                        $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                    }
                });
        });

    }); //End Ready Function

    jQuery(window).on('scroll', function () {
        /*---------------------------
            Sticky Header JS
         ------------------------------*/
        var docpos = $(document).scrollTop();

        if (5 < docpos) {
            $(".sticky-header").addClass('sticky');
        } else {
            $(".sticky-header").removeClass('sticky');
        }
    });

    jQuery(window).on('load', function () {
        /*=============================
              Preloader JS
        ==============================*/
        $("body").removeClass('preloader-active');

        /*---------------------------
            Masonry View Style JS
         ------------------------------*/
        $(".masonry-grid").isotope();

        /*---------------------------
            Parallax Bg JS
        ---------------------------*/
        var parallaxActive = $(".parallaxBg");
        if (parallaxActive.length) {
            parallaxActive.jarallax({
                speed: 0.2
            });
        }
    });
}(jQuery));