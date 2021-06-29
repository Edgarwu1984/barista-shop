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

const reducer = combineReducers({
	productList: productListReducer, // 'productList' will show as your state.
	productDetails: productDetailsReducer,
	childProductList: childProductListReducer,
	cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk]; //  lets you write async logic that interacts with the store.

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)) // '...middleware' apply all the middleware that we created in middleware array, for now we only have 'thunk' at the moment.
);

export default store;
