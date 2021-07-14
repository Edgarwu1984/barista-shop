/** @format */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveShippingAddress,
  savePaymentMethods,
} from '../redux/actions/cartActions';
import { createOrder } from '../redux/actions/orderActions';
import { toast } from 'react-toastify';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import CheckoutSteps from 'components/CheckoutSteps';
import { bg10 } from 'assets';
import { ORDER_CREATE_RESET } from 'redux/constants/orderConstants';
import { USER_DETAILS_RESET } from 'redux/constants/userConstants';

function ShippingPage({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress, cartItems } = cart;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [address, setAddress] = useState(shippingAddress.address);
  const [suburb, setSuburb] = useState(shippingAddress.suburb);
  const [state, setState] = useState(shippingAddress.state);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  // Calculate Prices
  const totalItemPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  const shippingPrice = (totalItemPrice > 50 ? 0 : 20).toFixed(2);

  const taxPrice = Number(0.1 * totalItemPrice).toFixed(2);

  const totalPrice = (+totalItemPrice + +shippingPrice + +taxPrice).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/checkout/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, success, order, dispatch]);

  useEffect(() => {
    if (address || suburb || state || postCode || paymentMethod) {
      dispatch(saveShippingAddress({ address, suburb, state, postCode }));
      dispatch(savePaymentMethods(paymentMethod));
    }
  }, [dispatch, address, suburb, state, postCode, paymentMethod]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cartItems,
        itemsPrice: totalItemPrice,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      })
    );

    if (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <Hero bgImage={bg10} height='300px'>
        <div className='title-center'>
          <h1 className='mb-4'>Check Out</h1>
          <Divider />
        </div>
      </Hero>

      <div className='container py-3'>
        <CheckoutSteps step1 step2 />
        <div className='flex shipping'>
          <form className='shipping__form'>
            <h3 className='mb-1'>Billing Details</h3>
            <div className='flex space-between'>
              <div className='form__group mr-2'>
                <p className='form__group-title'>Name</p>
                <input
                  className='form__group-control'
                  id='name'
                  type='text'
                  defaultValue={userInfo.name}
                  disabled
                />
              </div>
              <div className='form__group'>
                <p className='form__group-title'>Email</p>
                <input
                  className='form__group-control'
                  id='name'
                  type='email'
                  defaultValue={userInfo.email}
                  disabled
                />
              </div>
            </div>

            <div className='form__group'>
              <p className='form__group-title'>Address</p>
              <input
                className='form__group-control'
                id='address'
                type='text'
                defaultValue={address}
                required
                onChange={e => setAddress(e.target.value)}
              />
            </div>
            <div className='flex space-between'>
              <div className='form__group mr-2'>
                <p className='form__group-title'>Suburb</p>
                <select
                  className='form__group-control'
                  id='cities'
                  defaultValue={suburb}
                  required
                  onChange={e => setSuburb(e.target.value)}
                >
                  <option value='' hidden>
                    - Select Suburb -
                  </option>
                  <option value='Berwick'>Berwick</option>
                  <option value='Boxhill'>Boxhill</option>
                  <option value='Blackburn'>Blackburn</option>
                  <option value='Doncaster'>Doncaster</option>
                  <option value='Doncaster East'>Doncaster East</option>
                  <option value='Melbourne'>Melbourne</option>
                </select>
              </div>
              <div className='form__group mr-2'>
                <p className='form__group-title'>State</p>
                <select
                  className='form__group-control'
                  id='states'
                  defaultValue={state}
                  required
                  onChange={e => setState(e.target.value)}
                >
                  <option value='' hidden>
                    - Select State -
                  </option>
                  <option value='VIC'>VIC</option>
                  <option value='NSW'>NSW</option>
                  <option value='ACT'>ACT</option>
                  <option value='NT'>NT</option>
                  <option value='SA'>SA</option>
                  <option value='WA'>WA</option>
                  <option value='TAS'>TAS</option>
                </select>
              </div>
              <div className='form__group'>
                <p className='form__group-title'>Postcode</p>
                <input
                  className='form__group-control'
                  type='number'
                  id='postcode'
                  defaultValue={postCode}
                  required
                  onChange={e => setPostCode(e.target.value)}
                />
              </div>
            </div>

            <h3 className='mb-1 mt-3'>Payment Methods</h3>
            <div className='form__group'>
              <div className='radio'>
                <input
                  type='radio'
                  id='PayPal'
                  name='paymentMethod'
                  value='PayPal'
                  checked
                  onChange={e => setPaymentMethod(e.target.value)}
                />
                <label className='radio-label'>PayPal</label>
                <img
                  className='radio-img'
                  src='/images/paypal.png'
                  alt='paypal'
                />
              </div>
            </div>
          </form>

          <div className='summary'>
            <h3 className='mb-1'>Order Summary</h3>
            {cartItems.length === 0 ? (
              <h3>Empty cart.</h3>
            ) : (
              cartItems.map(item => (
                <div
                  className='flex space-between summary__item'
                  key={item.product}
                >
                  <span className='summary__item-name'>
                    {item.qty} x {item.name}
                  </span>
                  <span className='summary__item-price'>
                    $ {(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              ))
            )}
            <hr />
            <div className='flex space-between summary__item'>
              <span className='summary__item-name'>Total Item Price:</span>
              <span className='summary__item-price'>$ {totalItemPrice}</span>
            </div>
            <div className='flex space-between summary__item'>
              <span className='summary__item-name'>Delivery Fee:</span>
              <span className='summary__item-price'>$ {shippingPrice}</span>
            </div>
            <div className='flex space-between summary__item'>
              <span className='summary__item-name'>GST:</span>
              <span className='summary__item-price'>$ {taxPrice}</span>
            </div>
            <h4 className='total'>Total: $ {totalPrice}</h4>

            <div className='form__group mt-3'>
              {!address || !state || !suburb || !postCode || !paymentMethod ? (
                <button
                  className='btn btn-block'
                  disabled
                  onClick={submitHandler}
                >
                  Place Order
                </button>
              ) : (
                <button className='btn btn-block' onClick={submitHandler}>
                  Go To Checkout
                </button>
              )}
              <div className='summary__item promotion-info'>
                Get Free Delivery when you shopping over $50.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ShippingPage;
