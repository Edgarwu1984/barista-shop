import React from 'react';

function ProductList({ products }) {
  return (
    <div className='table__wrapper'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CATEGORY</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>STOCK</th>
            <th>RATING</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.category}</td>
              <td>{product.name}</td>
              <td>$ {product.price.toFixed(2)}</td>
              <td>
                {product.countInStock === 0
                  ? 'Out of Stock'
                  : product.countInStock}
              </td>
              <td>{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
