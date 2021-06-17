/** @format */

import React from 'react';
import Layout from 'components/Layout';
import Hero from 'components/Hero';
import Divider from 'components/Divider';
import { bg4 } from 'assets';
import Equipment from 'components/products/Equipment';

function EquipmentPage() {
	return (
		<Layout>
			<Hero bgImage={bg4}>
				<div className='title-center'>
					<h1>Coffee Equipment</h1>
					<Divider />
				</div>
			</Hero>
			<div className='container'>
				<div className='gird'>
					<Equipment />
				</div>
			</div>
		</Layout>
	);
}

export default EquipmentPage;
