/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listChildProduct } from '../../actions/productActions';
import Hero from 'components/layout/Hero';
import Layout from 'components/layout/Layout';
import Divider from 'components/layout/Divider';
import Product from 'components/Product';
import ContactForm from 'components/ContactForm';
import { bg3 } from 'assets';

function ProductsPage({ match, history }) {
	const dispatch = useDispatch();
	const childProductList = useSelector((state) => state.childProductList);
	const { loading, error, products } = childProductList;

	useEffect(() => {
		if (match.path === '/shop/coffee') {
			dispatch(listChildProduct('coffee'));
		} else if (match.path === '/shop/equipment') {
			dispatch(listChildProduct('equipment'));
		}
	}, [dispatch, match]);

	return (
		<Layout title='Barista - Coffee'>
			<Hero bgImage={bg3}>
				<div className='center'>
					<h1 className='uppercase'>Coffee</h1>
					<Divider />
					<p className='lead'>Find Your Favorite Coffee from our shop</p>
				</div>
			</Hero>
			<div className='featured__bg-coffee'>
				<div className='container'>
					<h4 className='page__url'>
						<Link to='/shop'>{match.path.split('/')[1]}</Link> /{' '}
						<span className='current__page'>{match.path.split('/')[2]}</span>
					</h4>
					<div className='wrapper'>
						<main>
							{loading ? (
								<div className='center'>
									<img src='/images/loader.svg' alt='loading' />
									<p>Loading....</p>
								</div>
							) : error ? (
								<h3>{error}</h3>
							) : (
								<div className='grid-4'>
									{!products ? (
										<h3>No products.</h3>
									) : (
										products.map((product) => (
											<Product
												key={product._id}
												product={product}
												history={history}
											/>
										))
									)}
								</div>
							)}
						</main>
					</div>
				</div>
			</div>
			<ContactForm />
		</Layout>
	);
}

export default ProductsPage;
