/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listCoffee } from '../../actions/productActions';
import Hero from 'components/layout/Hero';
import Layout from 'components/layout/Layout';
import Divider from 'components/layout/Divider';
import Products from 'components/Products';
import ContactForm from 'components/ContactForm';
import { bg3 } from 'assets';

function CoffeePage({ match, history }) {
	const dispatch = useDispatch();
	const coffeeList = useSelector((state) => state.coffeeList);
	const { loading, error, coffees } = coffeeList;

	console.log(match);

	useEffect(() => {
		dispatch(listCoffee());
	}, [dispatch]);

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
						<Link to='/shop'>{match.url.slice(1, 5)}</Link> /{' '}
						<span className='current__page'>{match.url.slice(6, 12)}</span>
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
								<Products
									products={coffees}
									productCategory='coffee'
									matchId={match}
									historyUrl={history}
								/>
							)}
						</main>
					</div>
				</div>
			</div>
			<ContactForm />
		</Layout>
	);
}

export default CoffeePage;
