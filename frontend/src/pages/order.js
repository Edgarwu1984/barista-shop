import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, getOrderDetails } from 'redux/actions/orderActions';
import Divider from 'components/layout/Divider';
import Hero from 'components/layout/Hero';
import Layout from 'components/layout/Layout';
import Loader from 'components/Loader';
import LocalTimeFormatter from 'utils/LocalTimeFormatter';
import { bg10 } from '../assets';
import { toast } from 'react-toastify';

function OrderPage({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const { success: deliverSuccess } = orderDeliver;

  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    if (!order || orderId !== order._id || deliverSuccess) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, deliverSuccess]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <Layout title='Order Details'>
      <Hero bgImage={bg10} height='400px'>
        <div className='title-center'>
          <h1 className='mb-4'>Order Details</h1>
          <Divider />
        </div>
      </Hero>
      <div className='container'>
        <h4 className='page__url mb-3'>
          <Link to='/profile'>{'< Back'}</Link>
        </h4>
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
                <p>
                  <strong>Deliver Status: </strong>
                  {order.isDelivered
                    ? `Delivered at ${LocalTimeFormatter(order.deliveredAt)}`
                    : 'Not Delivered'}
                </p>
              </section>
              <section className='details__section'>
                <h3 className='mb-1 section-title'>Payment Method</h3>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                <p>
                  {order.isPaid ? (
                    <span>
                      <strong>Paid At:</strong>{' '}
                      {LocalTimeFormatter(order.paidAt)}
                    </span>
                  ) : (
                    <span>
                      <strong>Status: </strong>Not Paid
                    </span>
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
            <div className='order-summary mb-3'>
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
              {userInfo.isAdmin && !order.isDelivered ? (
                <div className='mt-3'>
                  <button className='btn btn-block' onClick={deliverHandler}>
                    Deliver Order
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default OrderPage;
