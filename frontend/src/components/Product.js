/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'components/Rating';

export default function Product({ product }) {
	return (
		<Link className='card' to={`/shop/${product.category}/${product._id}`}>
			{product.countInStock === 0 ? (
				<div className='card__status unavailable'>
					<span>Out Of Stock</span>
				</div>
			) : null}

			<img className='card__img' src={product.image} alt={product.name} />
			<div className='card__body center'>
				<h4>{product.name}</h4>
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
		</Link>
	);
}
