/** @format */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddToCart({ history, match, product }) {
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?&qty=${qty}`);
  };

  return (
    <div className='cart'>
      {product.countInStock > 0 && (
        <input
          type='number'
          min='0'
          max={product.countInStock}
          value={qty}
          onChange={e => setQty(e.target.value)}
        />
      )}

      <button
        className={
          product.countInStock > 0 && qty !== 0 ? 'btn' : 'btn btn__disabled'
        }
        onClick={addToCartHandler}
      >
        add to cart
      </button>
    </div>
  );
}

AddToCart.propTypes = {
  product: PropTypes.object.isRequired,
};
