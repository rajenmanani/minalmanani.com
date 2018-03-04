if ($(window).width() < 480) {
	$(function() {
		
		var initItems = 6

		var $container = $('.grid');
		// hide initial items
		var $initialItems = $container.find('.item').hide();

		var $items = getInitialItems($initialItems, initItems)

		var $container = $container.masonry({
				// layout no items initially
				itemSelector: 'no-items',
				columnWidth: '.grid-sizer'
			})
			// set proper itemSelector
			.masonry('option', {
				itemSelector: '.item'
			})
			.masonryImagesReveal($items);

		$('.show-more').click(function() {
			var $items = getMoreItems($initialItems, initItems);
			$container.masonryImagesReveal($items);
			$('.show-more').hide()
		});

	});

	// reveals all items after all item images
	// have been loaded
	$.fn.masonryImagesReveal = function($items) {
		var msnry = this.data('masonry');
		var itemSelector = msnry.options.itemSelector;
		// hide by default
		$items.hide();
		// append to container
		this.append($items);
		$items.imagesLoaded(function() {
			// un-hide items
			$items.show();
			// reveal all of them
			msnry.appended($items);
		});

		return this;
	};

	function getInitialItems(i, n) {

		var a = [];
		$.each(i, function(index, value) {
			a.push($(value).prop('outerHTML'));
		})

		var list = ''
		for (i = 0; i < n; i++) {
			list += a[i]
		}

		var $items = $(list)
		return $items
	}
	
	function getMoreItems(i, e) {
		var a = [];
		$.each(i, function(index, value) {
			a.push($(value).prop('outerHTML'));
		})
		var list = ''
		for (i = e; i < a.length; i++) {
			list += a[i]
		}
		
		var $items = $(list)
		return $items
	}

} else {

	// init Masonry
	var $grid = $('.grid').masonry({
		itemSelector: '.item',
		percentPosition: true,
	});

	// layout Masonry after each image loads
	$grid.imagesLoaded().progress(function() {
		$grid.masonry();

	});
	$grid.masonry('reloadItems')


}
