/** @format */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	coffeeListReducer,
	coffeeDetailsReducer,
	equipmentListReducer,
	equipmentDetailsReducer,
} from './reducers/productReducers';

const reducer = combineReducers({
	coffeeList: coffeeListReducer,
	coffeeDetails: coffeeDetailsReducer,
	equipmentList: equipmentListReducer,
	equipmentDetails: equipmentDetailsReducer,
});

const initialState = {};

const middleware = [thunk]; // In order to using Redux devtool plugin in Chrome

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
