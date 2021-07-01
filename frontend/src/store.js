/** @format */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productListReducer,
	childProductListReducer,
	productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';

const reducer = combineReducers({
	productList: productListReducer, // 'productList' will show as your state.
	productDetails: productDetailsReducer,
	childProductList: childProductListReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk]; //  lets you write async logic that interacts with the store.

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)) // '...middleware' apply all the middleware that we created in middleware array, for now we only have 'thunk' at the moment.
);

export default store;
