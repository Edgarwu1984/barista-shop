/** @format */

import React from 'react';
import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Divider from 'components/Divider';
import { bg4 } from 'assets';

function CartPage() {
	return (
		<Layout>
			<Hero bgImage={bg4}>
				<div className='title-center'>
					<h1>Shopping Cart</h1>
					<Divider />
				</div>
			</Hero>
			<div className='container'></div>
		</Layout>
	);
}

export default CartPage;
