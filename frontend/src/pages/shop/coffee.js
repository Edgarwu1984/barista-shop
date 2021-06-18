/** @format */

import React from 'react';
import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Divider from 'components/Divider';
import { bg3 } from 'assets';
import Coffee from 'components/products/Coffee';
import Sidebar from 'components/Sidebar';
import products from 'products';
import { Link, useRouteMatch } from 'react-router-dom';

function CoffeePage() {
	const { coffeeCategories } = products;
	const path = useRouteMatch();

	return (
		<Layout title='Barista - Coffee'>
			<Hero bgImage={bg3}>
				<div className='center'>
					<h1 className='uppercase'>Coffee</h1>
					<Divider />
					<p className='lead'>Find Your Favorite Coffee from our shop</p>
				</div>
			</Hero>
			<div className='container'>
				<h4 className='page__url'>
					/ <Link to='/shop'>{path.url.slice(1, 5)}</Link> /{' '}
					<Link to='/shop/coffee'>{path.url.slice(6, 12)}</Link>
				</h4>
				<div className='wrapper grid-2'>
					<main>
						<Coffee />
					</main>
					<aside>
						<Sidebar category={coffeeCategories} />
					</aside>
				</div>
			</div>
		</Layout>
	);
}

export default CoffeePage;
