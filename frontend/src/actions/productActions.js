/** @format */
import axios from 'axios';
import {
	COFFEE_LIST_REQUEST,
	COFFEE_LIST_SUCCESS,
	COFFEE_LIST_FAIL,
	COFFEE_DETAILS_REQUEST,
	COFFEE_DETAILS_SUCCESS,
	COFFEE_DETAILS_FAIL,
	EQUIPMENT_LIST_REQUEST,
	EQUIPMENT_LIST_SUCCESS,
	EQUIPMENT_LIST_FAIL,
	EQUIPMENT_DETAILS_REQUEST,
	EQUIPMENT_DETAILS_SUCCESS,
	EQUIPMENT_DETAILS_FAIL,
} from '../constants/productConstants';

export const listCoffee = () => async (dispatch) => {
	try {
		dispatch({ type: COFFEE_LIST_REQUEST });

		const { data } = await axios.get('/api/coffee');

		dispatch({ type: COFFEE_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COFFEE_LIST_FAIL,
			// Get backend error handle middleware error message
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listCoffeeDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: COFFEE_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/coffee/${id}`);

		dispatch({ type: COFFEE_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: COFFEE_DETAILS_FAIL,
			// Get backend error handle middleware error message
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listEquipment = () => async (dispatch) => {
	try {
		dispatch({ type: EQUIPMENT_LIST_REQUEST });

		const { data } = await axios.get('/api/equipment');

		dispatch({ type: EQUIPMENT_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: EQUIPMENT_LIST_FAIL,
			// Get backend error handle middleware error message
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listEquipmentDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: EQUIPMENT_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/equipment/${id}`);

		dispatch({ type: EQUIPMENT_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: EQUIPMENT_DETAILS_FAIL,
			// Get backend error handle middleware error message
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
