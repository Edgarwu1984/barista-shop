/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'components/Rating';

function Card({ image, name, id, price, rating, reviews, productCategory }) {
	return (
		<div className='card'>
			<img className='card__img' src={image} alt={name} />
			<div className='card__body center'>
				<Link to={`/shop/${productCategory}/${id}`}>
					<h4>{name}</h4>
				</Link>
			</div>
			<div className='card__text center'>
				<div className='reviews'>
					<Rating value={rating} text={`${reviews} reviews`} />
				</div>
				<h4 className='price'>$ {price.toFixed(2)}</h4>
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
