$('#grid2 img').each(function() {
	var $this = $(this);
	$this.wrap('<div class="item"><a></a></div>');
	$('a').removeAttr('href');
});
$('#grid2').addClass('effect-2');

var elem = document.querySelector('.grid');
var msnry = new Masonry(elem, {
	// options
	itemSelector: '.item',
	// horizontalOrder: true
});
