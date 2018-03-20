$(function() {

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

	function isResized() {
		var elems = $container.masonry('getItemElements')
		console.log("items : " + elems.length);
	}

	var $window = $(window);
	
	var masonryOptions = {
		itemSelector: 'no-items',
		columnWidth: '.grid-sizer',
		stagger: 40,
		transitionDuration: '0.8s'
	}

	var $container = $('.grid');
	var $initialItems = $container.find('.item').hide();
	var moreShown = false;
	var initialWindowWidth = ''

	if ($window.width() < 480) {
	 	initialWindowWidth = $window.width();
		var initItems = 6
		var $items = getInitialItems($initialItems, initItems)
		var $container = $container.masonry(masonryOptions)
			// set proper itemSelector
			.masonry('option', {
				itemSelector: '.item'
			})
			.masonryImagesReveal($items);

		$('.show-more').click(function() {
			var $items = getMoreItems($initialItems, initItems);
			$container.masonryImagesReveal($items);
			$('.show-more').hide()
			moreShown = true;
		});

	} else {
		initialWindowWidth = $window.width();
		
		var $container = $container.masonry(masonryOptions)
			// set proper itemSelector
			.masonry('option', {
				itemSelector: '.item'
			})
			.masonryImagesReveal($initialItems);
		$('.show-more').hide()
	}

	$window.resize(function() {

		var currentWindowWidth = $window.width();

		if (currentWindowWidth != initialWindowWidth) {

			// console.log(initialWindowWidth);

			if (currentWindowWidth > 480) {
				//
				// if ($window.width() != windowWidth) {
				initialWindowWidth = $window.width();
				
				if (!moreShown) {

					$container.masonry('destroy');
					$container.find('.item').hide();
					$container.masonry(masonryOptions)
						// set proper itemSelector
						.masonry('option', {
							itemSelector: '.item'
						})
						.masonryImagesReveal($initialItems);
					$('.show-more').hide()
				}
			}
			//
		}
	})

});
