/** @format */

import React from 'react';
import { coffee } from 'assets';
import Card from 'components/Card';

function Coffee() {
	return (
		<div className='grid'>
			{coffee.length === 0 ? (
				<h3>No products</h3>
			) : (
				coffee.map((product) => (
					<Card
						key={product._id}
						productCategory='coffee'
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

export default Coffee;
