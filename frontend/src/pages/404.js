/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import { bg4 } from 'assets';

function NotFoundPage() {
	return (
		<Layout title='404 Page Not Found'>
			<Hero bgImage={bg4}>
				<div className='title-center'>
					<h1>404 Not Found.</h1>
					<Divider />
				</div>
			</Hero>
			<div className='container'>
				<div className='wrapper center'>
					<h3 style={{ marginBottom: '2rem' }}>This page is not exist. </h3>
					<Link to='/' className='btn__outline'>
						Go Back
					</Link>
				</div>
			</div>
		</Layout>
	);
}

export default NotFoundPage;
