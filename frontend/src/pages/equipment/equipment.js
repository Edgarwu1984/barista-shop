/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import Sidebar from 'components/layout/Sidebar';
import ContactForm from 'components/ContactForm';
import Products from 'components/Products';
import { bg4 } from 'assets';
import db from 'products';

function EquipmentPage({ match }) {
	const { equipmentCategories, equipment } = db;

	return (
		<Layout title='Barista - Equipment'>
			<Hero bgImage={bg4}>
				<div className='center'>
					<h1 className='uppercase'>Coffee Equipment</h1>
					<Divider />
				</div>
			</Hero>
			<div className='featured__bg-equipment'>
				<div className='container'>
					<h4 className='page__url'>
						<Link to='/shop'>{match.url.slice(1, 5)}</Link> /{' '}
						<span className='current__page'>{match.url.slice(6, 15)} </span>
					</h4>
					<div className='wrapper grid-2'>
						<main>
							<Products products={equipment} productCategory='equipment' />
						</main>
						<aside>
							<Sidebar category={equipmentCategories} />
						</aside>
					</div>
				</div>
			</div>
			<ContactForm />
		</Layout>
	);
}

export default EquipmentPage;
