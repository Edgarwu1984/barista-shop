/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserDetails,
  updateUserProfile,
  resetProfile,
} from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions';
import { toast } from 'react-toastify';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import Loader from 'components/Loader';
import { bg11 } from 'assets';

function ProfilePage({ history }) {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, userInfo } = userLogin;
  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails;

  const [name, setName] = useState(userInfo && userInfo.name);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProfileEditMode, setIsProfileEditMode] = useState(false);
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success, updateError } = userUpdateProfile;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorMyOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      if (!user || !user.name || !orders) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else if (success) {
        dispatch(resetProfile());
        toast.success('Profile has been updated.');
        setIsProfileEditMode(false);
      } else if (updateError) {
        toast.error(updateError);
      }
    }
  }, [dispatch, history, userInfo, user, success, updateError, orders]);

  if (errorMyOrders) {
    toast.error(errorMyOrders);
  }

  const submitHandler = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password does not match.');
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };

  const cancelHandler = () => {
    setIsProfileEditMode(false);
    setIsPasswordEditMode(false);
  };

  return (
    <Layout>
      <Hero bgImage={bg11} height='400px'>
        <div className='title-center'>
          <h1 className='mb-4'>Profile</h1>
          <Divider />
        </div>
      </Hero>
      <div className='container offset-top'>
        <div className='welcome__info'>
          <h2>
            Hello, {user.name}{' '}
            {user.isAdmin && <span className='badge'>Admin</span>}{' '}
          </h2>{' '}
        </div>
        <div className='profile__container'>
          {loading ? (
            <Loader />
          ) : (
            <div className='profile__section profile'>
              <h4 className='profile__section-title section-title mb-2'>
                Personal Details
              </h4>
              {isProfileEditMode ? (
                <form className='form' onSubmit={submitHandler}>
                  <div className='form__group current__info'>
                    <p>
                      <strong className='mr-2'>Username:</strong>
                      {userInfo.name}
                    </p>
                    <p>
                      <strong className='mr-2'>Email:</strong>
                      {userInfo.email}
                    </p>
                  </div>
                  <div className='form__group'>
                    <label className='form__group-label'>New Username</label>
                    <input
                      className='form__group-control'
                      type='text'
                      id='name'
                      value={name}
                      required
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className='form__group'>
                    <label className='form__group-label'>New Email</label>
                    <input
                      className='form__group-control'
                      type='email'
                      id='email'
                      value={email}
                      required
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='form__group'>
                    <input
                      className='form__group-control btn mb-2'
                      type='submit'
                      value='Update'
                    />
                    <button
                      className='btn__outline btn-block'
                      onClick={cancelHandler}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : isPasswordEditMode ? (
                <form className='form' onSubmit={submitHandler}>
                  <div className='form__group'>
                    <label className='form__group-label'>New Password</label>
                    <input
                      className='form__group-control'
                      type='password'
                      id='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='form__group'>
                    <label className='form__group-label'>
                      Confirm Password
                    </label>
                    <input
                      className='form__group-control'
                      type='password'
                      id='confirmPassword'
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className='form__group'>
                    <input
                      className='form__group-control btn mb-2'
                      type='submit'
                      value='Update'
                    />
                    <button
                      className='btn__outline btn-block'
                      onClick={cancelHandler}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p>
                    <strong className='mr-2'>Username:</strong>
                    {userInfo && userInfo.name}
                  </p>
                  <p>
                    <strong className='mr-2'>Email:</strong>
                    {userInfo && userInfo.email}
                  </p>
                  <div>
                    <button
                      className='btn btn-sm mt-2'
                      onClick={() => setIsProfileEditMode(true)}
                    >
                      Edit Profile
                    </button>
                  </div>
                  <div>
                    <button
                      className='btn btn-sm mt-1'
                      onClick={() => setIsPasswordEditMode(true)}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <section className='profile__section orders'>
            <h4 className='profile__section-title section-title mb-2'>
              My Orders
            </h4>
            {loadingOrders ? (
              <Loader />
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>$ {order.totalPrice.toFixed(2)}</td>
                      {order.isPaid ? (
                        <td>{order.paidAt.substring(0, 10)}</td>
                      ) : (
                        <td>
                          {' '}
                          <span className='text-danger'>Not Paid</span>{' '}
                        </td>
                      )}
                      {order.isDelivered ? (
                        <td>{order.deliveredAt.substring(0, 10)}</td>
                      ) : (
                        <td>
                          {' '}
                          <span className='text-danger'>
                            Not Delivered
                          </span>{' '}
                        </td>
                      )}
                      <td>
                        <Link
                          className='btn btn__outline btn-sm'
                          to={`/orders/${order._id}`}
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
