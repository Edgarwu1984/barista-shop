/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listEquipment } from '../../actions/productActions';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import ContactForm from 'components/ContactForm';
import Products from 'components/Products';
import { bg4 } from 'assets';

function EquipmentPage({ match }) {
	const dispatch = useDispatch();
	const equipmentList = useSelector((state) => state.equipmentList);
	const { loading, error, equipments } = equipmentList;

	useEffect(() => {
		dispatch(listEquipment());
	}, [dispatch]);

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
							{loading ? (
								<div className='center'>
									<img src='/images/loader.svg' alt='loading' />
									<p>Loading....</p>
								</div>
							) : error ? (
								<h3>{error}</h3>
							) : (
								<Products products={equipments} productCategory='equipment' />
							)}
						</main>
						{/* <aside><Sidebar  /></aside> */}
					</div>
				</div>
			</div>
			<ContactForm />
		</Layout>
	);
}

export default EquipmentPage;
