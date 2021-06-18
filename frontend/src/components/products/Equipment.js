/** @format */

import React from 'react';
import Card from 'components/Card';
import products from 'products';

function Equipment() {
	const { coffee } = products;
	return (
		<div className='grid-4'>
			{coffee.length === 0 ? (
				<h3>No products</h3>
			) : (
				coffee.map((product) => (
					<Card
						key={product._id}
						productCategory='coffee-equipment'
						name={product.name}
						id={product._id}
						image={product.image}
						price={product.price}
					/>
				))
			)}
		</div>
	);
}

export default Equipment;
