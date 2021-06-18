/** @format */

import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Divider from 'components/Divider';
import { bg4 } from 'assets';
import Equipment from 'components/products/Equipment';
import Sidebar from 'components/Sidebar';
import products from 'products';

function EquipmentPage() {
	const { equipmentCategories } = products;
	const path = useRouteMatch();
	return (
		<Layout title='Barista - Equipment'>
			<Hero bgImage={bg4}>
				<div className='center'>
					<h1 className='uppercase'>Coffee Equipment</h1>
					<Divider />
				</div>
			</Hero>
			<div className='container'>
				<h4 className='page__url'>
					/ <Link to='/shop'>{path.url.slice(1, 5)}</Link> /{' '}
					<Link to='/shop/equipment'>{path.url.slice(6, 15)}</Link>
				</h4>
				<div className='wrapper grid-2'>
					<main>
						<Equipment />
					</main>
					<aside>
						<Sidebar category={equipmentCategories} />
					</aside>
				</div>
			</div>
		</Layout>
	);
}

export default EquipmentPage;
