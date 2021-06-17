/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

function Card({ image, name, id, price, productCategory }) {
	return (
		<div className='card'>
			<div className='card__info'>
				<img src={image} alt={name} />
				<Link to={`/${productCategory}/${id}`}>
					<h4>{name}</h4>
				</Link>
				<p>$ {price.toFixed(2)}</p>
			</div>
			<button className='card__btn btn__outline'>add to cart</button>
		</div>
	);
}

Card.defaultProps = {
	productCategory: 'coffee',
	image: '/images/ground-coffee-cold-brew.jpg',
	name: 'coffee name',
	id: 1,
	price: 10,
};

export default Card;
