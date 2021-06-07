import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveProducts, findProductsBydesc} from "../actions/products";
import { Link } from "react-router-dom";

class ProductsItems extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchdesc = this.onChangeSearchdesc.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.findBydesc = this.findBydesc.bind(this);

    this.state = {
      currentProduct: null,
      currentIndex: -1,
      searchdesc: "",
    };
  }

  componentDidMount() {
    this.props.retrieveProducts();
  }

  onChangeSearchdesc(e) {
    const searchdesc = e.target.value;

    this.setState({
      searchdesc: searchdesc,
    });
  }

  refreshData() {
    this.setState({
      currentProduct: null,
      currentIndex: -1,
    });
  }

  setActiveProduct(product, index) {
    this.setState({
      currentProduct: product,
      currentIndex: index,
    });
  }

 

  findBydesc() {
    this.refreshData();

    this.props.findProductsBydesc(this.state.searchdesc);
  }

  render() {
    const { searchdesc, currentProduct, currentIndex } = this.state;
    const { products } = this.props;

    return (

        <div className="container">
          <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by category"
              value={searchdesc}
              onChange={this.onChangeSearchdesc}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findBydesc}
              >
                Search
              </button>
            </div>
          </div>
        </div>
    
     
      </div>




                <h2>Product List</h2>
                <br/>
                <div className="row">

                    {products &&
                        this.props.products.map(product =>  (<div className="col-md-3" key={product.id}>
                        <figure className="card card-product">
                            <div className="img-wrap">
                                <img className="img-responsive" src={product.image} width="193" height="130" />
                            </div>
                            <figcaption className="info-wrap">
                                <h4 className="title">{product.title}</h4>
                                <p className="desc">{product.category}</p>
                            </figcaption>
                            <div className="bottom-wrap">
        
                            <Link
                to={"/cart/" + product.id}
                className="badge badge-warning"
              >
                View
              </Link>
        
                                <div className="price-wrap h5">
                                    <span className="price-new">${product.price}</span>
                                </div>
                            </div>
                        </figure>
                    </div>))
                    }

                </div>
            </div>
     
    );
  }
}


const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps, { retrieveProducts, findProductsBydesc})(ProductsItems);
