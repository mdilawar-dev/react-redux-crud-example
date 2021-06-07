import React, { Component } from "react";
import { connect } from "react-redux";
import { createProduct } from "../actions/products";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);

    this.saveProduct= this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      title: "",
      price:"",
      description: "",
      image:"",
      category:"",
      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  
  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  
  onChangeImage(e) {
    this.setState({
      image: e.target.value,
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  saveProduct() {
    const { title, price, description, image, category } = this.state;

    this.props
      .createProduct(title,price, description, image, category)
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
          published: data.published,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newProduct() {
    this.setState({
      id: null,
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
        <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>




            <div className="form-group">
              <label htmlFor="price">price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div> 

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>



            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                id="image"
                required
                value={this.state.image}
                onChange={this.onChangeImage}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                required
                value={this.state.category}
                onChange={this.onChangeCategory}
                name="category"
              />
            </div>

            <button onClick={this.saveProduct} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>


    );
  }
}

export default connect(null, { createProduct })(AddProduct);
