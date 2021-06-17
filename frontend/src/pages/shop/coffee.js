/** @format */

import React from 'react';
import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Divider from 'components/Divider';
import { bg3 } from 'assets';
import Coffee from 'components/products/Coffee';

function CoffeePage() {
	return (
		<Layout>
			<Hero bgImage={bg3}>
				<div className='title-center'>
					<h1>Coffee</h1>
					<Divider />
					<p>Find Your Favorite Coffee from our shop</p>
				</div>
			</Hero>
			<div className='container'>
				<div className='gird'>
					<Coffee />
				</div>
			</div>
		</Layout>
	);
}

export default CoffeePage;
