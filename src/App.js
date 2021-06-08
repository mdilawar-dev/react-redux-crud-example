import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { connect } from "react-redux";
import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import ProductsList from "./components/products-list.component";
import ProductItems from "./components/product-item.component";
import Cart from "./components/cartitem.component";
import Login from "./components/login.component";
import Profile from "./components/profile.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }








  render() {

    const { currentUser } = this.state;

    return (
      <Router history={history}>


        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            shop
          </Link>
         
           
           
           
            {currentUser && (


<div className="navbar-nav mr-auto">


<li className="nav-item">
<Link to={"/products"} className="nav-link">
  Products
</Link>
</li>




 <li className="nav-item">
 <Link to={"/add"} className="nav-link">
   Add
 </Link>
</li>

</div>
              )}
            

          

           
          {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                   user
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

               
              </div>
            )}
          

  

        </nav>

        <div className="container mt-3">
          <Switch>
          <Route exact path="/" component={ProductItems}/> 
          <Route exact path={["/products"]} component={ProductsList} /> 
            <Route  path="/add" component={AddProduct} />
            <Route exact path="/products/:id" component={Product} />
            <Route path="/cart/:id" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route  path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    );
  }
}


function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);

