/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'components/Rating';

export default function Product({ history, product }) {
	const addToCartHandler = () => {
		history.push(`/cart/${product._id}?category=${product.category}&qty=1`);
	};

	return (
		<div className='card'>
			<img className='card__img' src={product.image} alt={product.name} />
			<div className='card__body center'>
				<Link to={`/shop/${product.category}/${product._id}`}>
					<h4>{product.name}</h4>
				</Link>
			</div>
			<div className='card__text center'>
				<div className='reviews'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</div>
				<h4 className='price'>$ {product.price.toFixed(2)}</h4>
			</div>
			{product.countInStock === 0 ? (
				<button className='card__btn btn__outline__disabled'>
					out of stock
				</button>
			) : (
				<button className='card__btn btn__outline' onClick={addToCartHandler}>
					add to cart
				</button>
			)}
		</div>
	);
}
