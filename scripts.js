try{Typekit.load();}catch(e){}

jQuery(function($) {
	var resizeTimer,
		keyPressHandle = null,
		previousScroll = 0;

	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(throttledResize, 200);
		winter();
		equalize_feature_rows();
	});

	winter();
	equalize_feature_rows();

	$('.page.request-a-quote a[href*=#]').click(function() {
		if (! $(this).hasClass('dropdown-toggle')) {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		}
	});

	if ($('body').hasClass('single-service-area')) {
		setTimeout(function() {
			$('.showroom-modal').modal('toggle');
		}, 3000);
	}

	function winter() {
		if($('.page-template-page-contest').width() < 770) {
			$('.form-column-winter').insertBefore('.main-content');
		} else {
			$('.form-column-winter').insertAfter('.main-content');
		}
	}	
	
	function equalize_feature_rows() { 
		if($(".alternating-feature-rows-container").width() > 1030){
			$(".alternating-feature-row-content:even").css("float","left");
			$(".alternating-feature-row-content-column:even").removeClass("pull-left").addClass("pull-right");

			$(".alternating-feature-row-image-column:even").removeClass("pull-right").addClass("pull-left");	
		}
	}
	
	function reviews() {
		$('body').toggleClass("reviews-open");
	}

	function closeReviewBox() {
		var top = $(window).scrollTop();

		if (top >= 250) {
			$('body').removeClass("reviews-open");
		}
	}

	function equalizeArchiveItems() {
		if ( Modernizr.mq( '(min-width: 768px)' ) ) {
			$( '.archive .main ul.list-product-types' ).equalize( {equalize: 'outerHeight', children: '.product-type a', reset: true} );
		}
		else {
			$( '.archive .main ul.list-product-types .product-type a' ).css( {'height': ''} );
		}
	}

	function equalizeLocationColumns() {
		if ( Modernizr.mq( '(min-width: 992px)' ) ) {
			$( '.service-areas' ).equalize( {equalize: 'outerHeight', children: '.service-areas-heading,.list-service-areas', reset: true} );
		}
		else {
			$( '.service-areas .service-areas-heading,.service-areas .list-service-areas' ).css( {'height': ''} );
		}
	}

	function equalizeNavTabs() {
		var $tab_bar = $('.product-nav-tabs');
		var tab_bar_height = $tab_bar.outerHeight();
		var tab_bar_top_margin = -(tab_bar_height);
		$tab_bar.equalize( {equalize: 'outerHeight', children: 'a', reset: true} );
		setTimeout(function() {
			$tab_bar.css({'margin-top': tab_bar_top_margin});
		}, 100);
	}

	function equalizeCarouselItems() {
		$('#carousel-testimonials').equalize({equalize: 'outerHeight', children: '.item', reset: true});
	}

	function offsetMobileMenu() {
		var top = $(window).scrollTop();
		var menu_height = $(window).height() - 90;
		$('.mobile-menu-inner').css({'margin-top': top, 'height': menu_height});
		$('.mobile-menu').css({'height': menu_height});
	}

	function setScrollableMenu() {
		var window_height = $(window).height();
		var window_width = $(window).width();
		var header_height = $('.navbar-default').outerHeight();
		var mobile_menu_height = $('.mobile-menu').outerHeight();

		if (window_height < 1200 && window_width < 1200) {
			$('body').addClass('mobile-menu-scrollable');
			$('html').addClass('mobile-menu-scrollable');
			$('.navbar-default').css({'max-height': window_height});
		} else {
			$('body').removeClass('mobile-menu-scrollable');
			$('html').removeClass('mobile-menu-scrollable');
			$('.navbar-default').css({'max-height': ''});
		}
	}

	function equalizeLearningItems() {
		if ( Modernizr.mq( '(min-width: 768px)' ) ) {
			if (typeof imagesLoaded != 'undefined') {
				imagesLoaded('.learning-items', function () {
					$('.learning-items').equalize({equalize: 'outerHeight', children: '.learning-item', reset: true});
				});
			}
		}
		else {
			$( '.learning-items .learning-item' ).css( {'height': ''} );
		}
	}

	function equalizeDropdownLearningItems() {
		var $parent = $('#menu-main-navigation .learning');
		if ( Modernizr.mq( '(min-width: 768px)' ) ) {
			if (typeof imagesLoaded != 'undefined') {
				imagesLoaded($parent, function () {
					$parent.equalize({equalize: 'outerHeight', children: '.learning-item a', reset: true});
				});
			} else {
			}
		}
		else {
			$( '.menu-windows-menu .learning .learning-item' ).css( {'height': ''} );
		}
	}

	function equalizeEguideColumns() {
		if ( Modernizr.mq( '(min-width: 1200px)' ) ) {
			$('.single-eguide').equalize({equalize: 'outerHeight', children: '.eguide-column', reset:true});
		} else {
			$('.single-eguide .eguide-column').css({'height': ''});
		}
	}

	function get_latest_faqs(url, data) {
		$.post(url, data, function(){}).done(function(results) {
			if ( Modernizr.mq( '(min-width: 1200px)' ) ) {
				$('#tab-faqs').html(results);
			} else {
				$('#tab-faqs-collapse .panel-body').html(results);
			}
		});
	}

	$('.navbar-default').headroom({
		offset: 200,
		tolerance: 100,
		classes: {
			pinned : "show-fixed-nav",
			unpinned : "hide-fixed-nav",
		},
	});

	$('.single-eguide .gform_wrapper').affix({
		offset: {
			top: function() {
				return $('.page-banner').outerHeight() + $('.breadcrumb').outerHeight(true);
			},
			bottom: function() {
				return $('.page-footer').outerHeight(true);
			}
		}
	});

	equalizeLearningItems();
	equalizeDropdownLearningItems();
	//offsetMobileMenu();
	equalizeLocationColumns();
	equalizeCarouselItems();
	setScrollableMenu();
	equalizeArchiveItems();
	equalizeNavTabs();
	equalizeEguideColumns();

	$(window).scroll(function() {
		setScrollableMenu();
		closeReviewBox();
	});

	function throttledResize() {
		equalizeLocationColumns();
		equalizeCarouselItems();
		setScrollableMenu();
		equalizeLearningItems();
		equalizeDropdownLearningItems();
		equalizeArchiveItems();
		equalizeNavTabs();
		equalizeEguideColumns();
		equalize_feature_rows();
	}

	//$('.product-features .list-product-features').columnize({ columns: 2 });

	$('.reviews-button').click(function() {
		reviews();
	});

	$('.dropdown-toggle').click(function() {
		equalizeDropdownLearningItems();
	});

	$('.content-column-mobile-activate').click(function() {
		var $this = $(this);
		$this.toggleClass('in');
		$('.content-column').slideToggle();
	});

	$('.carousel-control.pause').click(function(e) {
		var $this = $(this);
		var href = $this.attr('href');
		$(href).carousel('pause');
		e.preventDefault();
	});

	$('.btn-activate-product-features-pop-up').click(function() {
		var id = $(this).attr('id');
		$('#'+id+'-popup').addClass('in');
	});

	$('.btn-close-product-features-pop-up').click(function() {
		$('.product-features-pop-up').removeClass('in');
	});

	$('.navbar-toggle').click(function() {
		$t = $(this);
		$t.toggleClass('collapsed');
		// $('.site-container').toggleClass('mobile-menu-in');
		$('html').toggleClass('mobile-menu-in');
		$('body').toggleClass('mobile-menu-in');
		$t.blur();
	});

	$('.btn-close-menu').click(function() {
		$('.navbar-toggle').click();
	});

	$('.service-area-title').click(function() {
		var $this = $(this);
		$('.service-area-title').removeClass('active');
		$this.parent().siblings().each(function() {
			$(this).find('.in').removeClass('in');
		});
		$this.addClass('active');
		var id = $this.data('list-id');
		//hide the service details
		service_area.get_location_data(id);
	});

	$('.btn-toggle-testimonials').click(function() {
		if ( Modernizr.mq( '(max-width: 1199px)' ) ) {
			var $t = $(this);
			var $c = $('.testimonials-content');

			if ($t.hasClass('active')) {
				$t.removeClass('active');
				$c.slideUp();
			} else {
				$t.addClass('active');
				$c.slideDown();
				equalizeCarouselItems();
			}
		}
	});

	$('.btn-mobile-collapse').click(function() {
		$('.mobile-collapse').slideToggle();
	});

	$('.service-areas .list-service-areas .hamilton-stoney-creek .service-area-title .button-text').text('Hamilton');

	$('#product-tabs').tabCollapse({
		tabsClass: 'hidden-md hidden-sm hidden-xs',
		accordionClass: 'visible-md visible-sm visible-xs'
	});

	$('.service-areas .nav-tabs a[area-controls="map"]').on('shown.bs.tab', function(e) {
		google.maps.event.trigger(map, 'resize');
		fitMapToBounds_map();
	});

	$(".carousel-inner").swipe( {
		//Generic swipe handler for all directions
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			$(this).parent().carousel('next');
		},
		swipeRight: function() {
			$(this).parent().carousel('prev');
		},
		threshold: 30
	});

	$('.btn-tour').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$($(this).attr('href')).toggleClass('embed-responsive-4by3');
		var google_iframe = $('.googlemap iframe');
		google_iframe.attr('src',google_iframe.attr('src')+'');
	});

	$(document).bind('gform_post_render', function(){
		//check to see if there is a validation error element
		if($('.validation_error').length) {
			$('html,body').animate({
				scrollTop: $('.validation_error').offset().top
			}, 500);
		}
	});

	if ($('body').hasClass('single-product')) {
		get_latest_faqs(ajaxurl + '?action=get_latest_faqs', {});
	}

	var quoteFormOpen = false;
	var pos;
	
	$(".quote-form-toggle-btn").on("click",function(){
		if(!quoteFormOpen) {
			pos = $(this).parent().parent().position().top;
			$(".quote-form-container-mobile-wrapper").animate({ bottom:'-50' },300,function(){
				$(".quote-form-toggle-btn .btn-blue").text("Close");
				quoteFormOpen = true;
			});
		}else{			
			$(".quote-form-container-mobile-wrapper").animate({ bottom:-pos - 50 }, 300, function(){
					$(".quote-form-toggle-btn .btn-blue").text("Request a Quote");	
				});		
			quoteFormOpen = false;
		}
	});
});
