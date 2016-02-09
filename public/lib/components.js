
(function($) {
  alert('loading');
  $('canvas.auto-price-label').each(function() {
    var c = $(this);
    var backgroundImgUrl = c.attr('data-img');
    var price = c.attr('data-price');
    var ctx = this.getContext('2d');
    var width = c.width(), height = c.height();
    
    ctx.font = "160px bold 'Arial Black', 'Arial Bold', Gadget, sans-serif";
    // ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('1.50', 0, height/2);//width/2, height/2);
  })
})(jQuery);