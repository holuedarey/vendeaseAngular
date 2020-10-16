"use strict";
$(document).ready(function() {

    // Collapse navigation
    $('.navbar-main .collapse').on('hide.bs.collapse', function () {
        var $this = $(this);
        $this.addClass('collapsing-out');
    });

    $('.navbar-main .collapse').on('hidden.bs.collapse', function () {
        var $this = $(this);
        $this.removeClass('collapsing-out');
    });

    $('.navbar-main .dropdown').on('hide.bs.dropdown', function () {
        var $this = $(this).find('.dropdown-menu');

        $this.addClass('close');

        setTimeout(function(){
            $this.removeClass('close');
        }, 200);

    });

    // Headroom - show/hide navbar on scroll
    if($('.headroom')[0]) {
        var headroom  = new Headroom(document.querySelector("#navbar-main"), {
            offset: 300,
            tolerance : {
                up : 30,
                down : 30
            },
        });
        headroom.init();
    }

    // Datepicker
    $('.datepicker')[0] && $('.datepicker').each(function() {
        $('.datepicker').datepicker({
            disableTouchKeyboard: true,
            autoclose: false
        });
    });

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Popover
    $('[data-toggle="popover"]').each(function() {
        var popoverClass = '';
        if($(this).data('color')) {
            popoverClass = 'popover-'+$(this).data('color');
        }
        $(this).popover({
            trigger: 'focus',
            template: '<div class="popover '+ popoverClass +'" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
    });

    // Additional .focus class on form-groups
    $('.form-control').on('focus blur', function(e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // NoUI Slider
    if ($(".input-slider-container")[0]) {
        $('.input-slider-container').each(function() {

            var slider = $(this).find('.input-slider');
            var sliderId = slider.attr('id');
            var minValue = slider.data('range-value-min');
            var maxValue = slider.data('range-value-max');

            var sliderValue = $(this).find('.range-slider-value');
            var sliderValueId = sliderValue.attr('id');
            var startValue = sliderValue.data('range-value-low');

            var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });

            c.noUiSlider.on('update', function(a, b) {
                d.textContent = a[b];
            });
        })
    }

    if ($("#input-slider-range")[0]) {
        var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function(a, b) {
            f[b].textContent = a[b]
        })
    }


    // When in viewport
    $('[data-toggle="on-screen"]')[0] && $('[data-toggle="on-screen"]').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function() {
            //alert();
        },
        doOut: function() {
            // Do something to the matched elements as they get off scren
        },
        tolerance: 200,
        throttle: 50,
        toggleClass: 'on-screen',
        debug: false
    });

    // Scroll to anchor with scroll animation
    $('[data-toggle="scroll"]').on('click', function(event) {
        var hash = $(this).attr('href');
        var offset = $(this).data('offset') ? $(this).data('offset') : 0;

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate({
            scrollTop: $(hash).offset().top - offset
        }, 600);

        event.preventDefault();
    });

    //Testimonial slider 
    var $slickElement = $('.content-teaser__slider');
    $('.ui-pagination__prev').on('click', function(ev) { ev.preventDefault(); $slickElement.slick('slickPrev'); });
    $('.ui-pagination__next').on('click', function(ev) { ev.preventDefault(); $slickElement.slick('slickNext'); });
    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.ui-pagination__curr').text(i);
        $('.ui-pagination__total').text(slick.slideCount);
    });

    $($slickElement).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: false,
        prevArrow: false,
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    //Slick slider 
    $('.slick-carousel').slick({
        slidesToShow: 7, 
        slidesToScroll: 1,
        nextArrow:false,
        prevArrow:false,
        dots:true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                  slidesToShow: 6,
                }
            },
            {
              breakpoint: 1170,
              settings: {
                slidesToShow: 5,
              }
            },
            {
                breakpoint: 992,
                settings: {
                  slidesToShow: 4,
                }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 3,
               
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
 });
