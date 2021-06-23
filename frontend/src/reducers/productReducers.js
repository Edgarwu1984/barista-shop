/** @format */
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

// Coffee
export const coffeeListReducer = (state = { coffees: [] }, action) => {
	switch (action.type) {
		case COFFEE_LIST_REQUEST:
			return { loading: true, coffees: [] };
		case COFFEE_LIST_SUCCESS:
			return { loading: false, coffees: action.payload };
		case COFFEE_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const coffeeDetailsReducer = (
	state = { coffee: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case COFFEE_DETAILS_REQUEST:
			return { loading: true, ...state };
		case COFFEE_DETAILS_SUCCESS:
			return { loading: false, coffee: action.payload };
		case COFFEE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

// Equipment
export const equipmentListReducer = (state = { equipments: [] }, action) => {
	switch (action.type) {
		case EQUIPMENT_LIST_REQUEST:
			return { loading: true, equipments: [] };
		case EQUIPMENT_LIST_SUCCESS:
			return { loading: false, equipments: action.payload };
		case EQUIPMENT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const equipmentDetailsReducer = (
	state = { equipment: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case EQUIPMENT_DETAILS_REQUEST:
			return { loading: true, ...state };
		case EQUIPMENT_DETAILS_SUCCESS:
			return { loading: false, equipment: action.payload };
		case EQUIPMENT_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
