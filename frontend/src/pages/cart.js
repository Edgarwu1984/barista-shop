/** @format */

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { toast } from 'react-toastify';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import { FaTrashAlt } from 'lib/icons';
import { bg10 } from 'assets';
import CheckoutSteps from 'components/CheckoutSteps';

function CartPage() {
  let history = useHistory();

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const { cartItems, error } = cart;

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
    toast.success('Product removed.');
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  if (error) {
    toast.error(error);
  }

  return (
    <Layout>
      <Hero bgImage={bg10} height='300px'>
        <div className='title-center'>
          <h1 className='mb-4'>Shopping Cart</h1>
          <Divider />
        </div>
      </Hero>
      <div className='container py-3'>
        <CheckoutSteps step1 />
        <h3 className='mb-3'>Cart List</h3>
        <div className='shopping__cart'>
          <div className='cart__container'>
            {cartItems.length === 0 ? (
              <div className='cart__list center empty'>
                <h3>Empty List</h3>
                <Link to='/shop'>Back to Shop</Link>
              </div>
            ) : (
              cartItems.map(item => (
                <div className='cart__list' key={item.product}>
                  <div className='cart__list-item'>
                    <img src={item.image} alt={item.name} />
                    <div className='item__info'>
                      <Link to={`/shop/${item.category}/${item.product}`}>
                        <h4 className='mb-1'>{item.name}</h4>
                      </Link>
                      <p className='mb-1'>Price: $ {item.price.toFixed(2)}</p>
                      <p>
                        Qty:{' '}
                        <input
                          type='number'
                          min='0'
                          max={item.countInStock}
                          value={item.qty}
                          onChange={e =>
                            dispatch(
                              addToCart(
                                item.product,
                                Number(e.target.value),
                                item.category
                              )
                            )
                          }
                        />
                      </p>
                    </div>
                    <button
                      className='remove__btn'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <FaTrashAlt fontSize='1.2rem' />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className='checkout'>
            <h4>
              Subtotal:{' '}
              <span>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
              </span>
            </h4>
            <h4>
              Total:{' '}
              <span>
                ${' '}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </span>
            </h4>
            <hr />
            <button
              className={
                cartItems.length === 0
                  ? 'btn btn-block btn__disabled'
                  : 'btn btn-block'
              }
              onClick={checkoutHandler}
            >
              proceed check out
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
