/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../../redux/actions/productActions';
import { addToCart } from 'redux/actions/cartActions';
import { toast } from 'react-toastify';

import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Rating from 'components/Rating';
import { bg5 } from 'assets';

function SingleProductPage({ match }) {
  const [qty, setQty] = useState(1);
  const [hasAdded, setHasAdded] = useState(false);
  const category = match.path.split('/')[2];
  const productId = match.params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);

  const { cartItems } = useSelector(state => state.cart);

  const { loading, error, product } = productDetails;

  const checkCart = () => {
    const cartItemId = cartItems.map(item => item.product);
    const id = match.url.split('/')[3];
    const existItem = cartItemId.find(itemId => itemId === id);
    if (existItem) {
      setHasAdded(true);
    }
  };

  useEffect(() => {
    dispatch(listProductDetails(category, productId));
  }, [dispatch, productId, category]);

  useEffect(() => {
    checkCart();
  });

  const addToCartHandler = () => {
    if (productId) {
      dispatch(addToCart(productId, +qty, category));
      toast.success('New Product added.');
    }
  };

  return (
    <Layout>
      <Hero bgImage={bg5} height='400px'>
        {loading ? (
          <h2>loading..</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <h2>{product.name}</h2>
        )}
      </Hero>
      {loading ? (
        <div className='center'>
          <img src='/images/loader.svg' alt='loading' />
          <p>Loading....</p>
        </div>
      ) : error ? (
        <div className='container'>
          <div className='wrapper center' style={{ height: '35vh' }}>
            <h3>{error}</h3>
          </div>
        </div>
      ) : (
        <div className='container'>
          <h4 className='page__url'>
            <Link to='/shop'>{match.path.split('/')[1]}</Link> /{' '}
            <Link to={`/shop/${product.category}`}>{category}</Link> /{' '}
            <span className='current__page'>{product.name}</span>
          </h4>
          <div className='wrapper grid-2'>
            <div className='product__image'>
              <img src={product.image} alt={product.name} />
            </div>
            <div className='product__info'>
              <div>
                <h3 className='name'>{product.name}</h3>
                <p className='description'>{product.description}</p>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <div className='stock'>
                  {product.countInStock === 0 ? (
                    <p>
                      Stock: <span>Out of stock</span>
                    </p>
                  ) : product.countInStock <= 3 ? (
                    <p>
                      Stock:
                      <span>Low in stock ({product.countInStock} left)</span>
                    </p>
                  ) : (
                    <p>
                      Stock: <span>{product.countInStock}</span>
                    </p>
                  )}
                </div>
                <h3 className='price'>
                  $ {!product.price ? '0.00' : product.price.toFixed(2)}
                </h3>
              </div>
              <div className='cart'>
                {product.countInStock > 0 && (
                  <input
                    type='number'
                    min={1}
                    max={product.countInStock}
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                  />
                )}
                {hasAdded === true ? (
                  <Link className='btn__outline' to='/cart'>
                    Go to Cart
                  </Link>
                ) : (
                  <button
                    className={
                      product.countInStock > 0 && qty !== 0
                        ? 'btn'
                        : 'btn btn__disabled'
                    }
                    onClick={addToCartHandler}
                  >
                    add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default SingleProductPage;
