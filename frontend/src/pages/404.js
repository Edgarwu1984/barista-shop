/** @format */

import React from 'react';
import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Divider from 'components/Divider';
import { bg4 } from 'assets';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<Layout>
			<Hero bgImage={bg4}>
				<div className='title-center'>
					<h1>404 Not Found.</h1>
					<Divider />
				</div>
			</Hero>
			<div className='container'>
				<div className='wrapper flex__col__center'>
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
