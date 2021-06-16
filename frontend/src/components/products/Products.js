/** @format */

import React from 'react';
import { products } from 'assets';
import Product from './Product';

function Products() {
	return (
		<div className='grid'>
			{products.length === 0 ? (
				<h3>No products</h3>
			) : (
				products.map((product) => (
					<Product key={product._id} product={product} />
				))
			)}
		</div>
	);
}

export default Products;
