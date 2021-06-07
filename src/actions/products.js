import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    DELETE_ALL_PRODUCTS
  } from "./types";
  
  import ProductDataService from "../services/product.service";
  
  export const createProduct = (title, price, description, image, category) => async (dispatch) => {
    try {
      const res = await ProductDataService.create({ title, price, description, image, category });
  
      dispatch({
        type: CREATE_PRODUCT,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveProducts = () => async (dispatch) => {
    try {
      const res = await ProductDataService.getAll();
  
      dispatch({
        type: RETRIEVE_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateProduct = (id, data) => async (dispatch) => {
    try {
      const res = await ProductDataService.update(id, data);
  
      dispatch({
        type: UPDATE_PRODUCT,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteProduct = (id) => async (dispatch) => {
    try {
    const res =  await ProductDataService.delete(id);
  
      dispatch({
        type: DELETE_PRODUCT,
        payload: { id },
      });
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllProduct = () => async (dispatch) => {
    try {
      const res = await ProductDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_PRODUCTS,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findProductsBydesc = (desc) => async (dispatch) => {
    try {
      const res = await ProductDataService.findBydesc(desc);
  
      dispatch({
        type: RETRIEVE_PRODUCTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  