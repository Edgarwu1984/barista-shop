/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listEquipmentDetails } from '../../actions/productActions';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Rating from 'components/Rating';
import { bg5 } from 'assets';
import AddToCart from 'components/AddToCart';

function SingleEquipmentPage({ match, history }) {
	const dispatch = useDispatch();
	const equipmentDetails = useSelector((state) => state.equipmentDetails);
	useEffect(() => {
		dispatch(listEquipmentDetails(match.params.id));
	}, [match, dispatch]);
	const { loading, error, equipment } = equipmentDetails;

	return (
		<Layout>
			<Hero bgImage={bg5} height='320px'>
				<h2>{equipment.name}</h2>
			</Hero>
			<div className='container'>
				<h4 className='page__url'>
					<Link to='/shop'>{match.url.slice(1, 5)}</Link> /{' '}
					<Link to='/shop/equipment'>{match.url.slice(6, 15)}</Link> /{' '}
					<span className='current__page'>{equipment.name}</span>
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
							<img src={equipment.image} alt={equipment.name} />
						</div>
						<div className='product__info'>
							<div>
								<h3 className='name'>{equipment.name}</h3>
								<div className='category'>
									<p>
										Category: <span>{equipment.category}</span>
									</p>
								</div>
								<p className='description'>{equipment.description}</p>

								<Rating
									value={equipment.rating}
									text={`${equipment.numReviews} reviews`}
								/>
								<div className='stock'>
									{equipment.countInStock === 0 ? (
										<p>
											Stock: <span>Out of stock</span>
										</p>
									) : equipment.countInStock <= 3 ? (
										<p>
											Stock:
											<span>Low in stock ({equipment.countInStock} left)</span>
										</p>
									) : (
										<p>
											Stock: <span>{equipment.countInStock}</span>
										</p>
									)}
								</div>
								<h3 className='price'>
									$ {!equipment.price ? '0.00' : equipment.price.toFixed(2)}
								</h3>
							</div>
							<AddToCart match={match} history={history} product={equipment} />
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}

export default SingleEquipmentPage;
