// footer nav highlighter

jQuery(document).ready(function($) {
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	var target = $('.footer-menu_a a[href="/' + path + '"]');
	// Add active class to target link
	target.addClass('selected');
  
  var target = $('.primary-nav a[href="/' + path + '"]');
  
  target.addClass('mobile-nav-selected');

	$('.menu-icon').on('click', function() {
    // if ($('.primary-nav').css('opacity') == 0) $('.primary-nav').css('opacity', 1);
    // else $('.primary-nav').css('opacity', 0);
    
		$('.menu-icon').toggleClass('is-clicked');
    
    if ($('.primary-nav').hasClass('is-visible')) {
      $('.primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				$('body').removeClass('overflow-hidden');
			})
			
    } else {
      $('.primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				$('body').addClass('overflow-hidden');
			})
			
    }
	})
  
  

});
