/** @format */
import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  CHILD_PRODUCT_LIST_REQUEST,
  CHILD_PRODUCT_LIST_SUCCESS,
  CHILD_PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
  PRODUCT_IMAGE_UPLOAD_REQUEST,
  PRODUCT_IMAGE_UPLOAD_SUCCESS,
  PRODUCT_IMAGE_UPLOAD_FAIL,
} from '../constants/productConstants';
import { logout } from './userActions';

export const listProduct = () => async dispatch => {
  // 'async (dispatch) =>' redux thunk middleware, so we can make asynchronous request to fetch data.

  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/products');

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      // Get backend error handle middleware error message
      // To check if we have the custom error message, if true then return the custom error message
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const listChildProduct = category => async dispatch => {
  // 'async (dispatch) =>' redux thunk middleware, so we can make asynchronous request to fetch data.

  try {
    dispatch({ type: CHILD_PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`/api/products`);
    const categorizedProduct = data.filter(
      product => product.category === category
    );

    dispatch({ type: CHILD_PRODUCT_LIST_SUCCESS, payload: categorizedProduct });
  } catch (error) {
    dispatch({
      type: CHILD_PRODUCT_LIST_FAIL,
      // Get backend error handle middleware error message
      // To check if we have the custom error message, if true then return the custom error message
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const listProductDetails = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      // Get backend error handle middleware error message
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    // window.localStorage.setItem(
    //   'createdProductId',
    //   JSON.stringify(getState().productCreate.product._id)
    // );
    dispatch({ type: PRODUCT_CREATE_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_UPDATE_RESET });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      // Get backend error handle middleware error message
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      // Get backend error handle middleware error message
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const uploadProductImage = file => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_IMAGE_UPLOAD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const formData = new FormData();
    formData.append('image', file);

    const { data } = await axios.post(`/api/upload`, formData, config);

    dispatch({ type: PRODUCT_IMAGE_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_IMAGE_UPLOAD_FAIL,
      // Get backend error handle middleware error message
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};
