/** @format */

import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Rating from 'components/Rating';
import { bg5 } from 'assets';
import db from 'products';

function SingleCoffeePage({ match }) {
	const { coffee } = db;
	const product = coffee.find((p) => p._id === match.params.id);

	return (
		<Layout>
			<Hero bgImage={bg5} height='320px'>
				<h2>{product.name}</h2>
			</Hero>
			<div className='container'>
				<h4 className='page__url'>
					<Link to='/shop'>{match.url.slice(1, 5)}</Link> /{' '}
					<Link to='/shop/coffee'>{match.url.slice(6, 12)}</Link> /{' '}
					<span className='current__page'>{product.name}</span>
				</h4>
				<div className='wrapper grid-2'>
					<div className='image'>
						<img src={product.image} alt={product.name} />
					</div>
					<div>
						<div className='product__info'>
							<h3 className='name'>{product.name}</h3>
							<div className='category'>
								<p>
									Roast: <span>{product.roast}</span>
								</p>
								<p>
									Region: <span>{product.region}</span>
								</p>
								<p>
									Type: <span>{product.type}</span>
								</p>
							</div>
							<p className='description'>{product.description}</p>
							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>
							<div className='stock'>
								{product.countInStock === 0 ? (
									<p>
										Stock: <span>Out of stock</span>
									</p>
								) : product.countInStock <= 3 ? (
									<p>
										Stock:
										<span>Low in stock ({product.countInStock} left)</span>
									</p>
								) : (
									<p>
										Stock: <span>{product.countInStock}</span>
									</p>
								)}
							</div>
							<h3 className='price'>$ {product.price.toFixed(2)}</h3>
						</div>
						<div className='cart'>
							<input type='number' min='1' defaultValue='1' />
							<button
								className={
									product.countInStock === 0 ? 'btn btn__disabled' : 'btn'
								}>
								add to cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default SingleCoffeePage;
