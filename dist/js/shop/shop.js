'use strict';

var ProductList = React.createClass({
  displayName: 'ProductList',

  render: function render() {
    var prods = this.props.products.map(function (product) {
      return React.createElement(Product, { product: product });
    });

    return React.createElement(
      'div',
      null,
      prods
    );
  }
});

var Product = React.createClass({
  displayName: 'Product',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'product-card' },
      React.createElement('img', { src: this.props.product.picture }),
      React.createElement(
        'a',
        { className: 'add-to-cart', href: '#' },
        '加入购物车'
      )
    );
  }
});

var products = [{
  name: '苹果',
  picture: 'http://dreamatico.com/data_images/apple/apple-1.jpg'
}, {
  name: '香蕉',
  picture: 'http://s4.gigacircle.com/media/s4_53e4ddad8635e.jpg'
}];

React.render(React.createElement(ProductList, { products: products }), content);