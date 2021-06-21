/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Hero from 'components/layout/Hero';
import Layout from 'components/layout/Layout';
import Divider from 'components/layout/Divider';
import Sidebar from 'components/layout/Sidebar';
import Products from 'components/Products';
import ContactForm from 'components/ContactForm';
import { bg3 } from 'assets';
import products from 'products';

function CoffeePage({ match }) {
	const { coffeeCategories, coffee } = products;

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
						<Link to='/shop/coffee'>{match.url.slice(6, 12)}</Link>
					</h4>
					<div className='wrapper grid-2'>
						<main>
							<Products products={coffee} productCategory='coffee' />
						</main>
						<aside>
							<Sidebar category={coffeeCategories} />
						</aside>
					</div>
				</div>
			</div>
			<ContactForm />
		</Layout>
	);
}

export default CoffeePage;
