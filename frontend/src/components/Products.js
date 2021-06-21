/** @format */

import React from 'react';
import Card from 'components/Card';

function Products({ products, productCategory }) {
	return (
		<div className='grid-4'>
			{products.length === 0 ? (
				<h3>No products</h3>
			) : (
				products.map((product) => (
					<Card
						key={product._id}
						productCategory={productCategory}
						name={product.name}
						id={product._id}
						image={product.image}
						price={product.price}
						rating={product.rating}
						reviews={product.numReviews}
						stock={product.countInStock}
					/>
				))
			)}
		</div>
	);
}

export default Products;
