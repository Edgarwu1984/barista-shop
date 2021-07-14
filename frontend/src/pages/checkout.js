/** @format */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../redux/actions/orderActions';
import { toast } from 'react-toastify';
import { PayPalButton } from 'react-paypal-button-v2';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import { bg10 } from 'assets';
import Loader from 'components/Loader';
import LocalTimeFormatter from 'utils/LocalTimeFormatter';
import CheckoutSteps from 'components/CheckoutSteps';

function CheckoutPage({ match, history }) {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || orderId !== order._id) {
      dispatch(getOrderDetails(orderId));
    } else if (successPay) {
      history.push(`/confirm/${orderId}`);
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, history]);

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(orderId, paymentResult));
  };

  if (error) {
    toast.error(error);
  }

  return (
    <Layout>
      <Hero bgImage={bg10} height='360px'>
        <div className='title-center'>
          <h1 className='mt-4'>Your Order</h1>
          <Divider />
        </div>
      </Hero>
      <div className='container wrapper'>
        <CheckoutSteps step1 step2 step3 />
        {loading ? (
          <Loader />
        ) : (
          <div className='order'>
            <div className='order-details'>
              <section className='details__section'>
                <h3 className='mb-1 section-title'>Shipping Details</h3>
                <p>
                  <strong>Order Number: </strong>
                  {order._id}
                </p>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>
                  {Object.values(order.shippingAddress).join(' ')}
                </p>
              </section>
              <section className='details__section'>
                <h3 className='mb-1 section-title'>Payment Method</h3>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                <p>
                  <strong>Status: </strong>
                  {order.isPaid ? (
                    <span>
                      <strong>Paid At:</strong>{' '}
                      {LocalTimeFormatter(order.paidAt)}
                    </span>
                  ) : (
                    <span>Not Paid</span>
                  )}
                </p>
              </section>
              <section className='details__section'>
                <h3 className='mb-1 section-title'>Order Items</h3>
                <ul className='order__list'>
                  {order.orderItems.map(item => (
                    <li className='order__list-item' key={item._id}>
                      <div className='item__info'>
                        <img
                          className='item__info-image'
                          src={item.image}
                          alt={item.name}
                        />
                        <p className='item__info-name'>{item.name}</p>
                      </div>
                      <p>
                        {item.qty} x ${item.price.toFixed(2)} = $
                        {(item.qty * item.price).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            <div className='order-summary'>
              <h3 className='mb-1 section-title'>Order Summary</h3>
              <div className='summary__list'>
                <p>
                  <strong>Gross Price: </strong>${' '}
                  {order.orderItems
                    .reduce((acc, item) => acc + item.price * item.qty, 0)
                    .toFixed(2)}
                </p>
                <p>
                  <strong>Shipping Price: </strong>${' '}
                  {order.shippingPrice.toFixed(2)}
                </p>
                <p>
                  <strong>GST: </strong>$ {order.taxPrice.toFixed(2)}
                </p>
                <p>
                  <strong>Total Price: </strong>$ {order.totalPrice.toFixed(2)}
                </p>
              </div>
              {!order.isPaid && (
                <div className='mt-3'>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CheckoutPage;
