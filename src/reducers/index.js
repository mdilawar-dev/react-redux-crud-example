import { combineReducers } from "redux";
import products from "./products";
import auth from "./auth";
import message from "./message"

export default combineReducers({
  products,
  auth,
  message,
});
