
var ProductList = React.createClass({
  
  render: function() {
    var prods = this.props.products.map(function(product) {
      return (<Product product={product} />);
    });
    
    return (
      <div>
        {prods}
      </div>
    );
  }
});

var Product = React.createClass({
  render: function() {
    return (
      <div className='product-card'>
        <img src={this.props.product.picture}  />
        <a className='add-to-cart'  href="#">加入购物车</a>
      </div>
      );
  }
});

var products = [
  {
    name: '苹果',
    picture: 'http://dreamatico.com/data_images/apple/apple-1.jpg'
  }, 
  {
    name: '香蕉',
    picture: 'http://s4.gigacircle.com/media/s4_53e4ddad8635e.jpg'
  }];

React.render(<ProductList products={products} />, content);
