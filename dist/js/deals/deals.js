'use strict';

var DealList = React.createClass({
  displayName: 'DealList',

  render: function render() {
    var prods = this.props.products.map(function (product) {
      return React.createElement(Tile, { product: product });
    });

    return React.createElement(
      'div',
      null,
      prods
    );
  }
});

var Tile = React.createClass({
  displayName: 'Tile',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'product-card' },
      React.createElement('img', { src: this.props.product.picture }),
      React.createElement(
        'div',
        { className: 'product-info' },
        React.createElement(
          'div',
          null,
          this.props.product.name
        ),
        React.createElement(
          'div',
          { className: 'price-label', href: '#' },
          React.createElement(
            'span',
            { className: 'striked-price' },
            this.props.product.strikedPrice
          ),
          React.createElement(
            'span',
            null,
            ' ',
            this.props.product.price
          )
        )
      )
    );
  }
});

var products = [{
  name: '苹果',
  picture: 'http://dreamatico.com/data_images/apple/apple-1.jpg',
  price: 5.00,
  strikedPrice: 8.00
}, {
  name: '香蕉',
  picture: 'http://s4.gigacircle.com/media/s4_53e4ddad8635e.jpg',
  price: 3.00,
  strikedPrice: 5.00
}, {
  name: '超级福满多香辣牛肉面（100克）',
  picture: 'http://stock.591hx.com/images/hnimg/201208/16/56/3123794519626742704.jpg',
  price: 3.5,
  strikedPrice: 4.5
}, {
  name: '苹果',
  picture: 'http://dreamatico.com/data_images/apple/apple-1.jpg',
  price: 5.00,
  strikedPrice: 8.00
}, {
  name: '香蕉',
  picture: 'http://s4.gigacircle.com/media/s4_53e4ddad8635e.jpg',
  price: 3.00,
  strikedPrice: 5.00
}, {
  name: '超级福满多香辣牛肉面（100克）超级福满多香辣牛肉面（100克）超级福满多香辣牛肉面（100克）超级福满多香辣牛肉面（100克）超级福满多香辣牛肉面（100克）',
  picture: 'http://stock.591hx.com/images/hnimg/201208/16/56/3123794519626742704.jpg',
  price: 3.5,
  strikedPrice: 4.5
}, {
  name: '苹果',
  picture: 'http://dreamatico.com/data_images/apple/apple-1.jpg',
  price: 5.00,
  strikedPrice: 8.00
}, {
  name: '香蕉',
  picture: 'http://s4.gigacircle.com/media/s4_53e4ddad8635e.jpg',
  price: 3.00,
  strikedPrice: 5.00
}, {
  name: '超级福满多香辣牛肉面（100克）',
  picture: 'http://stock.591hx.com/images/hnimg/201208/16/56/3123794519626742704.jpg',
  price: 3.5,
  strikedPrice: 4.5
}];

React.render(React.createElement(DealList, { products: products }), content);