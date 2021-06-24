/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from 'components/Rating';

function Products({ products, productCategory, match, history }) {
	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=1`);
	};

	console.log(match);

	return (
		<div className='grid-4'>
			{!products ? (
				<h3>No products</h3>
			) : (
				products.map((product) => (
					<div className='card' key={product._id}>
						<img className='card__img' src={product.image} alt={product.name} />
						<div className='card__body center'>
							<Link to={`/shop/${productCategory}/${product._id}`}>
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
							<button
								className='card__btn btn__outline'
								onClick={addToCartHandler}>
								add to cart
							</button>
						)}
					</div>
				))
			)}
		</div>
	);
}

Products.defaultProps = {
	productCategory: 'coffee',
};

Products.propTypes = {
	productCategory: PropTypes.string.isRequired,
};

export default Products;
