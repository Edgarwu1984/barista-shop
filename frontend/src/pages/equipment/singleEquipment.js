/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Rating from 'components/Rating';
import { bg5 } from 'assets';
import db from 'products';

function SingleEquipmentPage({ match }) {
	// const { equipment } = db;
	// const product = equipment.find((p) => p._id === match.params.id);
	const [product, setProduct] = useState({});
	useEffect(() => {
		const fetchProduct = async () => {
			const res = await axios.get(`/api/equipment/${match.params.id}`);
			setProduct(res.data);
		};
		fetchProduct();
	}, []);

	return (
		<Layout>
			<Hero bgImage={bg5} height='320px'>
				<h2>{product.name}</h2>
			</Hero>
			<div className='container'>
				<h4 className='page__url'>
					<Link to='/shop'>{match.url.slice(1, 5)}</Link> /{' '}
					<Link to='/shop/equipment'>{match.url.slice(6, 15)}</Link> /{' '}
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
									Category: <span>{product.category}</span>
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

export default SingleEquipmentPage;
