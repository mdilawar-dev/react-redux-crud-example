import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveProducts, findProductsBydesc} from "../actions/products";
import { Link } from "react-router-dom";
class ProductsList extends Component {
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
        <div className="col-md-6">
          <h4>Products List</h4>

          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.title}
                </li>
              ))}
          </ul>

         
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <div>
              <h4>Product</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentProduct.title}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentProduct.price}
              </div>


              <div>
                <label>
                  <strong>Image:</strong>
                </label>{" "}
                <img src={currentProduct.image} className="img-rounded" alt="Cinque Terre" width="193" height="130" />
                
              </div>
             
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentProduct.description}
              </div>
              <div>
                <label>
                  <strong>Category:</strong>
                </label>{" "}
                {currentProduct.category}
              </div>

              

              <Link
                to={"/products/" + currentProduct.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
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

export default connect(mapStateToProps, { retrieveProducts, findProductsBydesc})(ProductsList);
