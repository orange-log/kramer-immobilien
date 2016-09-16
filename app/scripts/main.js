/************* GOOGLE MAPS *************/

/* jshint ignore:start */
$(function() {

    var map;

    function initialize() {

        var mapOptions = {
            scrollwheel: false,
            zoom: 14,
            center: new google.maps.LatLng(51.958827, 8.589504, 17)
        };

        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var coordInfoWindow = new google.maps.InfoWindow();

        coordInfoWindow.setContent('<a href="https://www.google.de/maps/dir//Kramer+Immobilien+GmbH,+Senner+Hellweg+233,+33689+Bielefeld/@51.958827,8.589504,17z/data=!4m13!1m4!3m3!1s0x47ba3955a391b935:0xb1845bfc3ae68cdc!2sKramer+Immobilien+GmbH!3b1!4m7!1m0!1m5!1m1!1s0x47ba3955a391b935:0xb1845bfc3ae68cdc!2m2!1d8.589504!2d51.958827" target="_blank">Routenplanung</a>');
        coordInfoWindow.setPosition(mapOptions.center);

        google.maps.event.addListener(map, 'zoom_changed', function() {
            coordInfoWindow.setContent(createInfoWindowContent());
            coordInfoWindow.open(map);
        });

        var marker = new google.maps.Marker({
            position: mapOptions.center,
            map: map,
            title: 'Kramer Immobilien GmbH',
            icon: $('#map').data('icon')
        });


        google.maps.event.addListener(marker, 'click', function() {
            coordInfoWindow.open(map, marker);
        });
        google.maps.event.addListener(map, 'tilesloaded', function() {
            if (!$('#Anfahrt').hasClass('dir-open')) {
                $('#map').hide();
            }
        });

    }
    google.maps.event.addDomListener(window, 'load', initialize);

});
/* jshint ignore:end */

$(function() {

    'use strict';

    /************* DETECT ALL IE *************/

    var msie = false;
    var ua = window.navigator.userAgent;
    var oldie = ua.indexOf('MSIE ');
    var newie = ua.indexOf('Trident/');

    if ((oldie > -1) || (newie > -1)) {
        msie = true;
    }

    if (msie) {
        $('html').addClass('iesux');
    }

    /************* BREAK POINT CHANGE *************/

    var layout;

    function bpchange() {

        $('#flying-focus').removeAttr('style');
        $('body').removeClass('mm-open');
        detectBP();
        checkScroll();
    }

    function detectBP() {
        if (window.matchMedia('(min-width: 118em)').matches) {
            layout = 'XL';
        } else if (window.matchMedia('(min-width: 63em)').matches) {
            layout = 'L';
        } else if (window.matchMedia('(min-width: 48em)').matches) {
            layout = 'M';
        } else if (window.matchMedia('(min-width: 30em)').matches) {
            layout = 'S';
        } else {
            layout = 'XS';
        }
        console.log('==' + layout + '==');
    }
    detectBP();

    /************* RESIZE END *************/

    function resizedw() {
        console.log('WINDOW: resize end');
        bpchange();
    }

    var doit;
    window.onresize = function() {
        clearTimeout(doit);
        doit = setTimeout(resizedw, 100);
    };

    /************* FIXED NAVIGATION *************/

    var nav = $('.stripe.navi'),
        navFixed = false,
        fixedwrap = nav.find('.fixedwrap'),
        fixedwrapMeta = $('.header .fixedwrap');

    var checkScroll = function() {

        nav.removeAttr('style');
        fixedwrap.removeClass('fixed');
        fixedwrapMeta.removeClass('fixed');

        if (nav.offset().top < $(window).scrollTop()) {
            if (!navFixed) {
                navFixed = true;
                console.log('NAVIGATION: fixed');
            }
            if (layout === 'M' || layout === 'L' || layout === 'XL') {
                nav.height(fixedwrap.height());
                fixedwrap.addClass('fixed');
            }
            if (layout === 'L' || layout === 'XL') {
                fixedwrapMeta.addClass('fixed');
            }
        } else {
            if (navFixed) {
                navFixed = false;
                console.log('NAVIGATION: static');
            }
        }

    };

    $(window).scroll(checkScroll);
    checkScroll();

    /************* META NAVIGATION *************/

    var items = $('.stripe.header nav a');

    items.click(function(e) {

        e.preventDefault();

        window.scrollTo(0, 0);

        var t = $(this),
            header = $('.header.stripe'),
            id = t.attr('href'),
            dir = $('#Anfahrt'),
            con = $('#Kontakt'),
            map = $('#map');

        if (navFixed && (dir.hasClass('dir-open') || con.hasClass('con-open'))) {
            return;
        }

        header.addClass('addr-open');
        dir.removeClass('dir-open');
        con.removeClass('con-open');
        $('.meta').attr('aria-expanded', 'false');

        if (id === '#Anfahrt') {
            dir.addClass('dir-open').attr('aria-expanded', 'true');
            map.show();
        }
        if (id === '#Kontakt') {
            con.addClass('con-open').attr('aria-expanded', 'true');
            map.hide();
        }

        if (t.hasClass('active')) {
            $(id).removeClass('dir-open').removeClass('con-open').attr('aria-expanded', 'false');
            items.removeClass('active');
            $.address.value('');
            header.removeClass('addr-open');
            map.hide();
        } else {
            t.addClass('active');
            $.address.value(id.replace('#', ''));
            items.not(t).removeClass('active');
        }

    });

    $('.meta h1').click(function() {
        items.parent().find('.active').click();
    });

    /************* MOBILE MENU *************/

    $('.mm-trigger').click(function(e) {
        e.preventDefault();
        var body = $('body'),
            menu = $('#menu');
        body.toggleClass('mm-open');
        if (body.hasClass('mm-open')) {
            menu.attr('aria-expanded', 'true');
        } else {
            menu.attr('aria-expanded', 'false');
        }
    });

    /************* MATCH HEIGHT *************/

    $('.teaser h2, .txtimg h2').matchHeight();

    /************* NORMALIZE FOCUS *************/

    $('a').mouseup(function() {
        this.blur();
    });


    /************* PASS OBJECT ID TO IFRAME *************/

    $(function() {
        var hash = window.location.hash.replace('#', '');
        if (!(hash.length === 7 && /^\d+$/.test(hash))) {
            return;
        }
        $('.immopool').attr('src', 'http://www.immopool.de/ASP/Immo/Obj/ImmoExpose.asp?LASID=59858569&InetLfdNr=' + hash);
    });

    /************* ISOTOPE *************/

    // debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        var timeout;
        return function debounced() {
            if (timeout) {
                clearTimeout(timeout);
            }

            function delayed() {
                fn();
                timeout = null;
            }
            timeout = setTimeout(delayed, threshold || 100);
        };
    }

    // quick search regex
    var qsRegex;
    var isotope = $('#isotope').isotope({
        itemSelector: '.item',
        sortAscending: false,
        masonry : {
          columnWidth : $('.item .inner').outerWidth(true)
        },
        filter: function() {
            return qsRegex ? $(this).text().match(qsRegex) : true;
        },
        getSortData: {
            original: function(itemElem) {
                var val = parseInt($(itemElem).data('original-order'), 10);
                if (isNaN(val)) {
                    val = 0;
                }
                return (val + 1) * -1;
            },
            creation: function(itemElem) {
                var myDate = $(itemElem).data('creation').split('T')[0].split('-');
                return new Date(myDate).getTime() / 1000;
            },
            buyPrice: function(itemElem) {
                var val = parseInt($(itemElem).find('.buyPrice').text(), 10);
                if (isNaN(val)) {
                    val = 0;
                }
                return val;
            },
            rentPrice: function(itemElem) {
                var val = parseInt($(itemElem).find('.rentPrice').text(), 10);
                if (isNaN(val)) {
                    val = 0;
                }
                return val;
            },
            rooms: function(itemElem) {
                var val = parseInt($(itemElem).find('.rooms').text(), 10);
                if (isNaN(val)) {
                    val = 0;
                }
                return val;
            },
            livingSpace: function(itemElem) {
                var val = parseInt($(itemElem).find('.livingSpace').text(), 10);
                if (isNaN(val)) {
                    val = 0;
                }
                return val;
            },
            plotArea: function(itemElem) {
                var val = parseInt($(itemElem).find('.plotArea').text(), 10);
                if (isNaN(val)) {
                    val = 0;
                }
                return val;
            },
            totalFloorSpace: function(itemElem) {
                var val = parseInt($(itemElem).find('.totalFloorSpace').text(), 10);
                if (isNaN(val)) {
                    val = 0;
                }
                return val;
            }
        }
    });

    // search
    var $quicksearch = $('#quicksearch').keyup(debounce(function() {
        //$('[data-filter="*"]').click();
        $('button.active').removeClass('active');
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        isotope.isotope({
            filter: function() {
                return qsRegex ? $(this).text().match(qsRegex) : true;
            }
        });
    }, 200));

    // filter
    $('#filters').on('click', 'button', function() {
        $('#filters button').removeClass('active');
        $(this).addClass('active');
        $('#quicksearch').val('');
        var filterValue = $(this).attr('data-filter');
        isotope.isotope({
            filter: filterValue
        });
    });

    // sort
    $('#sort').change(function(){
        var sortValue = $(this).val();
        isotope.isotope({
            sortBy: sortValue
        });
    });

    /************* DETAILS *************/

    $('.showDetails').click(function(e){
        e.preventDefault();
    });

    var inProgress = false;

    $('.inner').click(function(){
        if($(this).closest('.item').hasClass('INACTIVE')){
            return;
        }
        if($('.item__detailsClose:first-child').length){
            inProgress = true;
        } else {
            inProgress = false;
        }
        $('.item__detailsClose:first-child').click();
        var $t = $(this).find('.showDetails'),
            $inner = $t.closest('.inner');
        $inner.after('<div class="item__details" />');
        $inner.hide().next('.item__details').load($t.attr('href') + ' #content > .stripe > .row', function(response, status){
            var columns,
                rows = 4,
                w = $inner.width(),
                h = $inner.height();
            if (window.matchMedia('(min-width: 76em)').matches) {
                columns = 3;
            } else {
                columns = 1;
                rows = 0;
                w = $('.isotope').width;
            }
            $inner.next('.item__details').width(w * columns);
            if (rows !== 0) {
                $inner.next('.item__details').height(h * rows + 68);
            }
            $inner.next('.item__details')
                .append('<a href="immobilien.html" class="item__detailsClose item__detailsClose--bottom" title="Schließen">Schließen</a>')
                .prepend('<a href="immobilien.html" class="item__detailsClose" title="Schließen">Schließen</a>');
            $('.item__detailsClose').click(function(e){
                e.preventDefault();
                var $item = $t.closest('.item');
                $('.item__details').remove();
                $inner.show();
                isotope.isotope('layout');
                // scroll to item
                if(!inProgress) {
                    setTimeout(function(){
                        $.scrollTo($item, 800, {offset: -75, onAfter: function(){
                            $.address.value('/Angebote');
                        }});     
                    }, 500);
                }
            });
            isotope.isotope('layout');

            /************* IMGAL *************/

            // Add it after jquery.magnific-popup.js and before first initialization code
            $.extend(true, $.magnificPopup.defaults, {
                tClose: 'Schließen', // Alt text on close button
                tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
                gallery: {
                    tPrev: 'Zurück (Pfeiltaste links)', // Alt text on left arrow
                    tNext: 'Weiter (Pfeiltaste rechts)', // Alt text on right arrow
                    tCounter: '%curr% von %total%' // Markup for "1 of 7" counter
                },
                image: {
                    tError: '<a href="%url%">Das Bild</a> konnte nicht geladen werden.' // Error message when image could not be loaded
                },
                ajax: {
                    tError: '<a href="%url%">Der Inhalt</a> konnte nicht geladen werden.' // Error message when ajax request failed
                }
            });


            var gal = [],
                thumb = $('.imgal__img--thumb');

            thumb.click(function(e) {
                e.preventDefault();
                $('#imgal-img').attr('src', $(this).data('imgal-medium'));
                $('#imgal__openlink').attr('href', $(this).data('imgal-zoom'));
            });

            thumb.each(function() {
                gal.push({
                    src: $(this).data('imgal-zoom')
                });
            });

            /************* LIGHTBOX *************/

            $('#imgal__openlink').magnificPopup({
                gallery: {
                    enabled: true
                },
                items: gal,
                type: 'image',
                callbacks: {
                    open: function() {
                        $.magnificPopup.instance.goTo($('.imgal__img--thumb[data-imgal-medium="' + $('#imgal-img').attr('src') + '"]').closest('.imgal__figure').index());
                    }
                }
            });

            /************* GOOGLE MAPS *************/

            // init map
            /* jshint ignore:start */
            var map,
                das = $(this);
            function initialize() {
                var mapOptions = {
                    scrollwheel: false,
                    zoom: 14,
                    center: new google.maps.LatLng(das.find('.details__map').data('lat'), das.find('.details__map').data('lng'), 17)
                };

                map = new google.maps.Map(document.getElementById(das.closest('.item').data('id') + '-map'), mapOptions);

            }
            if(das.find('.details__map').length) {
                initialize();
            }
            /* jshint ignore:end */


            // scroll to item
            setTimeout(function(){
                $.scrollTo($t.closest('.item'), 800, {offset: -75});     
            }, 500);

            // show error message
            if(status === 'error'){
                $inner.hide().next('.item__details').append('<div class="row"><div class="col x9"><p>Die Immobilie konnte nicht gefunden werden.</p></div></div>');
            }

            $.address.value($t.attr('href').replace('.html',''));

        });
        
    });

    /************* CTA *************/

    $('#isotope').on('click', '.cta--details', function(e) {
        e.preventDefault();
        var $t = $(this);
        $.scrollTo(0, 800, { 
            onAfter:function() {
                $('[href=#Kontakt]').not('.active').click();
                $('#contact_name').focus();
                $('#contact_subject').val('Anfrage zum Objekt Nr. ' + $t.closest('.item').data('id'));
            }
        });
    });

    /************* CONTACT SUBMIT AJAX *************/

    // source: http://blog.teamtreehouse.com/create-ajax-contact-form

    // Get the form.
    var form = $('#ajax-contact');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        $(form).fadeOut();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            console.log('response', response);
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            $('#form-messages-wrapper').fadeIn().find('h2').text('Vielen Dank!');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#contact_name').val('');
            $('#contact_email').val('');
            $('#contact_subject').val('');
            $('#contact_text').val('');

            $(form)[0].reset();

        })
        .fail(function(data) {

            console.log('data.responseText', data.responseText);
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            $('#form-messages-wrapper').fadeIn().find('h2').text('Fehlermeldung');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                // $(formMessages).text('Oops! An error occured and your message could not be sent.');
                $(formMessages).text('Oops! Es ist ein Fehler aufgetreten. Ihre Nachricht konnte nicht versendet werden.');
            }
        });

        setTimeout(function(){
            $(formMessages).removeClass('error').removeClass('success');
            $('#form-messages-wrapper').fadeOut().find('h2').text('');
            $(form).fadeIn();
            $(formMessages).text('');
            $(form)[0].reset();
        }, 5000);

    });

    /************* DEEPLINKING *************/

    $.address.change(function(event) {
        var val = event.value.replace('/','');
        if(val === 'Anfahrt' || val === 'Kontakt') {
            $('[href="#' + val + '"]:not(.active)').click();
        } else {
            $('.stripe.header nav a.active').click();
            if(val !== '' && val !== '/' && val !== 'Angebote') {
                var $link = $('[href="' + val + '.html"]');
                if(!$link.closest('.item').find('.item__details').length){
                    $link.click();
                }
            } else {
                $('.item__detailsClose:first-child').click();
            }
        }
    });

    /************* A-Z *************/

    $('.a-z .schwarz').click(function(e){
        e.preventDefault();
        var $t = $(this);
        $.scrollTo($t.attr('href'), 800, {offset: -75});     
    });

});
