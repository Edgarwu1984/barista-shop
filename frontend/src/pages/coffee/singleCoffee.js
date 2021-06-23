/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCoffeeDetails } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Rating from 'components/Rating';
import { bg5 } from 'assets';

function SingleCoffeePage({ match }) {
	const dispatch = useDispatch();

	const coffeeDetails = useSelector((state) => state.coffeeDetails);
	const { loading, error, coffee } = coffeeDetails;

	useEffect(() => {
		dispatch(listCoffeeDetails(match.params.id));
	}, [dispatch, match]);

	return (
		<Layout>
			<Hero bgImage={bg5} height='320px'>
				<h2>{coffee.name}</h2>
			</Hero>
			<div className='container'>
				<h4 className='page__url'>
					<Link to='/shop'>{match.url.slice(1, 5)}</Link> /{' '}
					<Link to='/shop/coffee'>{match.url.slice(6, 12)}</Link> /{' '}
					<span className='current__page'>{coffee.name}</span>
				</h4>
				{loading ? (
					<div className='center'>
						<img src='/images/loader.svg' alt='loading' />
						<p>Loading....</p>
					</div>
				) : error ? (
					<h3>{error}</h3>
				) : (
					<div className='wrapper grid-2'>
						<div className='product__image'>
							<img src={coffee.image} alt={coffee.name} />
						</div>
						<div className='product__info'>
							<div>
								<h3 className='name'>{coffee.name}</h3>
								<div className='category'>
									<p>
										Roast: <span>{coffee.roast}</span>
									</p>
									<p>
										Region: <span>{coffee.region}</span>
									</p>
									<p>
										Type: <span>{coffee.type}</span>
									</p>
								</div>
								<p className='description'>{coffee.description}</p>
								<Rating
									value={coffee.rating}
									text={`${coffee.numReviews} reviews`}
								/>
								<div className='stock'>
									{coffee.countInStock === 0 ? (
										<p>
											Stock: <span>Out of stock</span>
										</p>
									) : coffee.countInStock <= 3 ? (
										<p>
											Stock:
											<span>Low in stock ({coffee.countInStock} left)</span>
										</p>
									) : (
										<p>
											Stock: <span>{coffee.countInStock}</span>
										</p>
									)}
								</div>
								<h3 className='price'>
									$ {!coffee.price ? '0.00' : coffee.price.toFixed(2)}
								</h3>
							</div>
							<div className='cart'>
								<input type='number' min='1' defaultValue='1' />
								<button
									className={
										coffee.countInStock === 0 ? 'btn btn__disabled' : 'btn'
									}>
									add to cart
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}

export default SingleCoffeePage;
