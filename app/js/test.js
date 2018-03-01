// init Masonry
var $grid = $('.grid').masonry({
  itemSelector: '.item',
  percentPosition: true
  // columnWidth: 2
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});  
