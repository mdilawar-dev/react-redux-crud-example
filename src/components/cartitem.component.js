import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProduct, deleteProduct } from "../actions/products";
import ProductDataService from "../services/product.service";

class Cart extends Component {
  constructor(props) {
    super(props);
    
    this.getProduct = this.getProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
        
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }





  getProduct(id) {
    ProductDataService.get(id)
      .then((response) => {
        this.setState({
          currentProduct: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

 

  render() {
    const { currentProduct } = this.state;

    return (
      <div>
        { currentProduct ? (
             <div>
             <h4>Product</h4>

             <div>
               <label>
                 <strong></strong>
               </label>{" "}
               <img src={currentProduct.image} className="img-rounded" alt="Cinque Terre" width="193" height="130" />
               
             </div>
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
             <span className="btn btn-success">Added to cart</span>
           </div>
        ): (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          ) 
        
    }
    </div>
    );

  }
}



export default connect(null, { updateProduct, deleteProduct })(Cart);
