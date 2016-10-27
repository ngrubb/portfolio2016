/* ---------------------------------------------------------------------
Global Js
Target Browsers: All
------------------------------------------------------------------------ */

var BF = (function(BF, $) {


	/**
     * ScrollReveal 
     * @type {Object}
     */
    BF.ScrollReveal = {
        init: function() {
			var config = {
				mobile: false,
				delay: 'once'
			}
            window.sr = new scrollReveal(config);
        }
    };


	/**
     * Preloader
     * @type {Object}
     */
    BF.Preloader = {
        init: function() {
			$(window).load(function(){
				$('.page-preloader').fadeOut('slow',function(){$(this).remove();});
			});
        }
    };


    /* ---------------------------------------------------------------------
    Testimonial Slider
    ------------------------------------------------------------------------ */

    BF.Testimonial = {

        init: function()
        {
            if($('.testimonial-slider').length) {
                this.bind();
            }
        },

        bind: function()
        {

            $('.testimonial-slider').slick({

                autoplay: true,
                arrows: true,
                dots: true,
                infinite: true,
                autoplaySpeed: 5000,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                adaptiveHeight: true
                
            });

        },

    };  // BF.Testimonial End


    /**
     * Mobile Navigation
     * @type {Object}
     */
     BF.MobileNavigation = {
        init: function() {
            $( ".js-mobile-trigger-button--menu" ).click(function() {
                $( ".js-mobile-trigger-button--menu" ).toggleClass( "js-active" );
                $( ".nav--primary" ).toggleClass( "js-visible" );
            });

            $('.nav--primary li.menu-item-has-children > a').after('<span class="sub-menu-toggle icon-chevron-down hidden-md hidden-lg"></span>');

            $('.js-mobile-navigation-trigger').on('click', this.toggleMenu);
            $('.sub-menu-toggle').on('click', this.toggleSubMenu);
        },

        toggleMenu: function() {
            $('.nav--primary__wrapper').toggleClass('active');
            $('.js-mobile-navigation-trigger').toggleClass('toggled');
        },

        toggleSubMenu: function() {
            var $this = $(this),
                $parent = $this.parent("li"),
                $wrap = $parent.children(".sub-menu");

            $wrap.toggleClass("toggled");
            $parent.toggleClass("toggled");
            $this.toggleClass("toggled");
        }
    };


    /**
     * Mobile Search
     * @type {Object}
     */
     BF.MobileSearch = {
        init: function() {
            $( ".js-mobile-trigger-button--search" ).click(function() {
                $( ".js-mobile-trigger-button--search" ).toggleClass( "js-active" );
                $( ".mobile-search-form" ).toggleClass( "js-visible" );
                $( ".page-header" ).toggleClass( "js-move-down" );
            });
        }
    };


    /**
     * Force External Links to open in new window.
     * @type {Object}
     */
    BF.ExternalLinks = {
        init: function() {
            $('a:not([href^="'+BF.siteurl+'"]):not([href^="#"]):not([href^="/"])')
                .addClass('external')
                .attr('target', '_blank');
        }
    }


    /**
     * Custom Social Share icons open windows
     * @type {Object}
     */
    BF.Social = {
        init: function() {
            $(".js-social-share").on("click", this.open);
        },

        open: function(event) {
          event.preventDefault();

          BF.Social.windowPopup($(this).attr("href"), 500, 300);
        },

        windowPopup: function (url, width, height) {
            // Calculate the position of the popup so
            // it’s centered on the screen.
            var left = (screen.width / 2) - (width / 2),
                top = (screen.height / 2) - (height / 2);

            window.open(
                url,
                "",
                "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
            );
        }
    }

    /**
     * ImAHuman
     * Hidden Captchas for forms
     * @type {Object}
     */
    BF.ImAHuman = {
        num: "0xFF9481",
        forms: void 0,

        init: function() {
            this.setup()
        },

        setup: function() {
            this.forms = document.getElementsByTagName("form");
            this.bind();
        },

        bind: function() {
            for (var i = 0; this.forms.length > i; i++) {
                $(this.forms[i]).on("focus click", this.markAsHuman);
            }
        },

        markAsHuman: function() {
            $(this).find('.imahuman, [name="imahuman"]').attr("value", parseInt(BF.ImAHuman.num, 16))
        }
    }


    /**
     * Affix
     * Fixes sticky items on scroll
     * @type {Object}
     */
    BF.Affix = {
        windowHeight: 0,

        init: function() {
            this.windowHeight = $(window).height();
            this.bind();
        },

        bind: function(e) {
            $(window).on('scroll', this.scroll);
            $(window).on('resize', this.updateWindowHeight);
        },

        scroll: function(e) {
            var scrolltop = $(this).scrollTop(),
                fixPoint = BF.Affix.windowHeight - $('#masthead').height();


            if(scrolltop >= fixPoint) {
                $('body').addClass('affix-head');
            } else {
                $('body').removeClass('affix-head');
            }
        },

        updateWindowHeight: function(e) {
            BF.Affix.windowHeight = $(window).height();
        }
    };



    /**
     * BF.Parallax
     * Parallax effect for images
     * @type {Object}
     */
    BF.Parallax = {
        init: function() {
            this.bind();
        },

        bind: function() {
            $(window).scroll(this.scroll);
        },

        scroll: function(e) {
            $('[parallax]').each(function(){

                var $this = $(this),
                    $speed = $this.data('speed') || 6,
                    $window = $(window);

                // Scroll the background at var speed
                // the yPos is a negative value because we're scrolling it UP!
                var yPos = -($window.scrollTop() / $speed);

                // Put together our final background position
                var coords = 'center '+ yPos + 'px';

                // Move the background
                $this.css({ backgroundPosition: coords });

            });
        }
    };



    /**
     * BF.SmoothAnchors
     * Smoothly Scroll to Anchor ID
     * @type {Object}
     */
    BF.SmoothAnchors = {
        init: function() {
            this.bind();
        },

        bind: function() {
            $('a[href^=#]').on('click', this.scrollToSmooth);
        },

        scrollToSmooth: function(event) {
            if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
                && location.hostname == this.hostname
            ){
                var $target = $(this.hash);

                $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

                if ($target.length)
                {
                    var targetOffset = $target.offset().top;
                    $('html,body').animate({scrollTop: targetOffset}, 600);

                    return false;
                }
            }
        }
    }



    /**
     * Tab Content
     * @type {Object}
     */
    BF.Tabs = {
        init: function() {
            $('.js-tabs').on('click touchstart', 'a', this.switchTab)
        },

        switchTab: function(event) {
            event.preventDefault();

            var $this = $(this),
                tab   = $($this.attr('href'));

            $this.parent()
                 .addClass('active')
                 .siblings()
                 .removeClass('active');

            tab.addClass('active')
               .siblings()
               .removeClass('active');
        }
    }


    /**
     * Doc Ready
     */
    $(function() {

		BF.ScrollReveal.init();
		BF.Preloader.init();
        BF.Testimonial.init();
        BF.MobileSearch.init();
        BF.MobileNavigation.init();
        BF.Social.init();
        BF.ImAHuman.init();
        BF.Tabs.init()

    });

    return BF;
}(BF || {}, jQuery));