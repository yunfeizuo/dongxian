
var DealList = React.createClass({
  
  render: function() {
    var prods = this.props.products.map(function(product) {
      return <Tile product={product} />;
    });
    
    return (
      <div>
        {prods}
      </div>
    );
  }
});

var Tile = React.createClass({
  render: function() {
    return (
      <div className='product-card'>
        <img src={this.props.product.picture}  />
        <div className='product-info'>
          <div>{this.props.product.name}</div>
          <div className='price-label'  href="#">
            <span className='striked-price'>{this.props.product.strikedPrice}</span>
            <span> {this.props.product.price}</span>
          </div>
        </div>
        
      </div>
      );
  }
});

var products = [
  {
    name: '苹果',
    picture: 'http://dreamatico.com/data_images/apple/apple-1.jpg',
    price: 5.00,
    strikedPrice: 8.00
  }, 
  {
    name: '香蕉',
    picture: 'http://s4.gigacircle.com/media/s4_53e4ddad8635e.jpg',
    price: 3.00,
    strikedPrice: 5.00
  },
  {
    name: '超级福满多香辣牛肉面（100克）',
    picture: 'http://stock.591hx.com/images/hnimg/201208/16/56/3123794519626742704.jpg',
    price: 3.5,
    strikedPrice: 4.5
  },
    {
    name: '苹果',
    picture: 'http://dreamatico.com/data_images/apple/apple-1.jpg',
    price: 5.00,
    strikedPrice: 8.00
  }, 
  {
    name: '香蕉',
    picture: 'http://s4.gigacircle.com/media/s4_53e4ddad8635e.jpg',
    price: 3.00,
    strikedPrice: 5.00
  },
  {
    name: '超级福满多香辣牛肉面（100克）超级福满多香辣牛肉面（100克）超级福满多香辣牛肉面（100克）超级福满多香辣牛肉面（100克）超级福满多香辣牛肉面（100克）',
    picture: 'http://stock.591hx.com/images/hnimg/201208/16/56/3123794519626742704.jpg',
    price: 3.5,
    strikedPrice: 4.5
  },
  {
    name: '苹果',
    picture: 'http://dreamatico.com/data_images/apple/apple-1.jpg',
    price: 5.00,
    strikedPrice: 8.00
  }, 
  {
    name: '香蕉',
    picture: 'http://s4.gigacircle.com/media/s4_53e4ddad8635e.jpg',
    price: 3.00,
    strikedPrice: 5.00
  },
  {
    name: '超级福满多香辣牛肉面（100克）',
    picture: 'http://stock.591hx.com/images/hnimg/201208/16/56/3123794519626742704.jpg',
    price: 3.5,
    strikedPrice: 4.5
  }];


React.render(<DealList products={products} />, content); 