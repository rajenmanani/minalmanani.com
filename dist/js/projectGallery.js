function setButton() {
	var imgHeight = $('a img').first().height();
  var txtHeight = $('.about-body').height();
  var top=0;
  
  if ((txtHeight + 50) > imgHeight) {
    top=txtHeight+149
  } else {
    top=imgHeight
  }
  
	$('.portfolio-btn').css('top', top - 49)
	$('.portfolio-btn').css('position', 'absolute')
}

$(window).resize(function() {

	if ($(window).width() > 480) {
		setButton()
	} else {
		$('.portfolio-btn').css({'position': 'inherit', 'top': 'initial'})
	}

})

jQuery(document).ready(function($) {

	if ($(window).width() > 480) {
		setButton()
	} else {
		$('.portfolio-btn').css({'position': 'inherit', 'top': 'initial'})
	}

	var options = {
		'showCounter': false,
		'closeText': '<div class="gallery-icon"></div>'
		// 'animationSlide': false
	}
	var lightbox = $('.gallery a').simpleLightbox(options);
})
