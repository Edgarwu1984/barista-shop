/** @format */

import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			// Search in the state.cartItems array
			// For the existence of the specific product
			// That is defined by item (by the action.payload)
			// If we find a match assign the result to the existItem variable
			const existItem = state.cartItems.find((i) => i.product === item.product);

			// If there is already a product matching the item in the state.cartItems array
			if (existItem) {
				// Return the existing state with adjusted cardItems
				return {
					...state,
					// Map through the cardItems array
					// Replace the matching product with the new item
					// Leave the rest products as they were
					cartItems: state.cartItems.map((i) =>
						i.product === existItem.product ? item : i
					),
				};
				// Otherwise if the item is NOT already a product matching the item in the state.cartItems array
			} else {
				// Return the existing state with adjusted cardItems
				return {
					...state,
					// Return a new cardItems array with the previous products spread and add the new item
					cartItems: [...state.cartItems, item],
				};
			}

		default:
			return state;
	}
};
