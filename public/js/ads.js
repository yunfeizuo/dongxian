var renderProducts = function(products) {
    var newContent = '';
    var selectedCategory = CategoryTab.activeTab.attr('data-category');
    products.map(function(product, index) {
        var prodTemplate = $('#product-template');
        newContent += prodTemplate.html()
            .replace(/{{index}}/ig, index)
            .replace(/{{name}}/ig, product.name)
            .replace(/{{imgUrl}}/ig, product.imgUrl)
            .replace(/{{price}}/ig, product.price);
    });
    $('#products').html(newContent);
};

renderProducts(products);
$('.square').each(function() {
    $(this).height($(this).width());
});

var lazyload = {
    init : function(opt){
        var that = this,
            op = {
                anim: true,
                extend_height:0,
                selectorName:"img",
                realSrcAtr:"data-src"
            };
        // 合并对象，已有的{anim:true}+用户自定义对象。也就是op = op + opt
        $.extend(op,opt);
        // 调用lazyload.img.init(op)函数
        that.img.init(op);

    },

    img : {
        init : function(n){

            var that = this,
                selectorName = n.selectorName,
                realSrcAtr = n.realSrcAtr,
                anim = n.anim;
//              console.log(n);

            // 要加载的图片是不是在指定窗口内
            function inViewport( el ) {
                // 当前窗口的顶部
                var top = window.pageYOffset,
                // 当前窗口的底部
                    btm = window.pageYOffset + window.innerHeight,
                // 元素所在整体页面内的y轴位置
                    elTop = $(el).offset().top;
                // 判断元素，是否在当前窗口，或者当前窗口延伸400像素内
                return elTop >= top && elTop - n.extend_height <= btm;
            }

            // 滚动事件里判断，加载图片
            $(window).on('scroll', function() {
                $(selectorName).each(function(index,node) {
                    var $this = $(this);

                    if(!$this.attr(realSrcAtr) || !inViewport(this)){
                        return;
                    }

                    act($this);

                })
            }).trigger('scroll');

            // 展示图片
            function act(_self){
                // 已经加载过了，则中断后续代码
                if (_self.attr('lazyImgLoaded')) return;
                var img = new Image(),
                    original = _self.attr('data-src');
                // 图片请求完成后的事件，把dataimg指定的图片，放到src里面，浏览器显示
                img.onload = function() {
                    _self.attr('src', original);
                    anim && _self.css({ opacity: .2 }).animate({ opacity: 1 }, 280);
                };
                // 当你设置img.src的时候，浏览器就在发送图片请求了
                original && (img.src = original);
                _self.attr('lazyImgLoaded', true);
            }
        }
    }
};

lazyload.init({
    selectorName:".samLazyImg"
});

var filter = function() {
    var productDivs = $('#products > div');
    productDivs.each(function() {
        productDiv = $(this);
        var selectedCategory = CategoryTab.activeTab.attr('data-category');
        var product = products[productDiv.attr('data-product-id')];
        var v = selectedCategory === 'all' || ($.isArray(product.categories) && $.inArray(selectedCategory, product.categories) !== -1);
        if (v) productDiv.show();
        else productDiv.hide();
    });
    $(window).scroll();
};

CategoryTab.onTabSwitch = filter;
filter();
