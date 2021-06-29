/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Rating from 'components/Rating';
import { bg5 } from 'assets';
import AddToCart from 'components/AddToCart';

function SingleProductPage({ match, history }) {
	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const category = match.path.split('/')[2];

	useEffect(() => {
		dispatch(listProductDetails(category, match.params.id));
	}, [dispatch, match, category]);

	return (
		<Layout>
			<Hero bgImage={bg5} height='320px'>
				{loading ? (
					<h2>loading..</h2>
				) : error ? (
					<h2>{error}</h2>
				) : (
					<h2>{product.name}</h2>
				)}
			</Hero>
			<div className='container'>
				<h4 className='page__url'>
					<Link to='/shop'>{match.path.split('/')[1]}</Link> /{' '}
					<Link to={`/shop/${product.category}`}>
						{match.path.split('/')[2]}
					</Link>{' '}
					/ <span className='current__page'>{product.name}</span>
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
							<img src={product.image} alt={product.name} />
						</div>
						<div className='product__info'>
							<div>
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
								<h3 className='price'>
									$ {!product.price ? '0.00' : product.price.toFixed(2)}
								</h3>
							</div>
							<AddToCart match={match} history={history} product={product} />
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}

export default SingleProductPage;
