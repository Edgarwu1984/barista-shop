import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/actions/orderActions';
import { toast } from 'react-toastify';
import Loader from 'components/Loader';
import { FiCheckCircle } from '../lib/icons';
import LocalTimeFormatter from 'utils/LocalTimeFormatter';

function ConfirmationPage({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId]);

  if (error) {
    toast.error(error);
  }

  return (
    <div className='container'>
      <div className='confirmation__container'>
        {loading ? (
          <Loader />
        ) : !order ? (
          <h3>No Order</h3>
        ) : (
          <div className='confirmation__card'>
            <h3>
              <span className='check_mark'>
                <FiCheckCircle />
              </span>{' '}
              Thanks for your purchase.
            </h3>
            <p>
              <strong>Your Order Number: </strong> <span>{order._id}</span>
            </p>
            <p>
              <strong>Purchase At: </strong>{' '}
              <span>{LocalTimeFormatter(order.createdAt)}</span>
            </p>
            <p>
              <strong>Track your order here:</strong>
              <Link to={`/profile`}> My Order</Link>
            </p>
          </div>
        )}
      </div>
      {/* <Hero>
        <div className='title-center'>
          <h1 className='mb-4'>Shopping Cart</h1>
        </div>
      </Hero> */}
    </div>
  );
}

export default ConfirmationPage;
