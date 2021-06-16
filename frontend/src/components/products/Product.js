/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

function Product({ product }) {
	return (
		<div className='card'>
			<div className='card__info'>
				<img src={product.image} alt={product.name} />
				<Link to={`/api/products/${product.slug}`}>
					<h4>{product.name}</h4>
				</Link>
				<p>$ {product.price.toFixed(2)}</p>
			</div>
			<button className='card__btn btn__outline'>add to cart</button>
		</div>
	);
}

export default Product;
