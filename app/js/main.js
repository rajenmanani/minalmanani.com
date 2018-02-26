// $('#grid2 img').each(function() {
// 	var $this = $(this);
// 	$this.wrap('<div class="item"><a></a></div>');
// 	$('a').removeAttr('href');
// });
// $('#grid2').addClass('effect-2');
// 
// var elem = document.querySelector('.grid');
// var msnry = new Masonry(elem, {
// 	// options
// 	itemSelector: '.item',
// 	// horizontalOrder: true
// });



///extra
jQuery(document).ready(function($) {
	//
	//open/close primary navigation
	$('.cd-primary-nav-trigger').on('click', function() {
		if ($('.cd-primary-nav').css('opacity') == 0) $('.cd-primary-nav').css('opacity', 1);
		else $('.cd-primary-nav').css('opacity', 0);
    
		$('.cd-menu-icon').toggleClass('is-clicked');
		$('.cd-header').toggleClass('menu-is-open');

		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if ($('.cd-primary-nav').hasClass('is-visible')) {
			$('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				$('body').removeClass('overflow-hidden');
        // $('html').removeClass('overflow-hidden');
        // $('.cd-primary-nav-trigger').removeClass('overflow-hidden');
			});
		} else {
			$('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				$('body').addClass('overflow-hidden');
        // $('html').addClass('overflow-hidden');
        // $('.cd-primary-nav-trigger').addClass('overflow-hidden');
			});
		}
	});
});
