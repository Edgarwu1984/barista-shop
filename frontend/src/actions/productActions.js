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
} from '../constants/productConstants';

export const listProduct = () => async (dispatch) => {
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
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listChildProduct = (category) => async (dispatch) => {
	// 'async (dispatch) =>' redux thunk middleware, so we can make asynchronous request to fetch data.

	try {
		dispatch({ type: CHILD_PRODUCT_LIST_REQUEST });

		const { data } = await axios.get(`/api/products/${category}`);

		dispatch({ type: CHILD_PRODUCT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CHILD_PRODUCT_LIST_FAIL,
			// Get backend error handle middleware error message
			// To check if we have the custom error message, if true then return the custom error message
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listProductDetails = (category, id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/products/${category}/${id}`);

		dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			// Get backend error handle middleware error message
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
