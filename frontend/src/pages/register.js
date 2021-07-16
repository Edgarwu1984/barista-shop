/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/userActions';
import { logo } from 'assets';
import Loader from 'components/Loader';
import Divider from 'components/layout/Divider';
import { toast } from 'react-toastify';

function RegisterPage({ location, history }) {
  const currentYear = new Date().getFullYear();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    } else if (error) {
      toast.error(error);
    }
  }, [history, userInfo, error, redirect]);

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password doesn't match.");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className='login__page'>
      <div className='container login__page-wrapper'>
        <div className='site__info'>
          <div className='site__info-title'>
            <img src={logo} alt='logo' />
            <h1>Barista Coffee Shop</h1>
          </div>
          <Divider />
          <p className='lead'>Shopping with variety coffee products.</p>
        </div>

        <form className='form-panel' onSubmit={handleSubmit}>
          <h2 className='form__title mb-3'>Sign Up</h2>
          {loading && <Loader />}
          <div className='form__group'>
            <label className='form__group-label'>Username</label>
            <input
              className='form__group-control'
              type='text'
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='form__group'>
            <label className='form__group-label'>Email</label>
            <input
              className='form__group-control'
              type='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='form__group'>
            <label className='form__group-label'>Password</label>
            <input
              className='form__group-control'
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='form__group'>
            <label className='form__group-label'>Confirm Password</label>
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
              className='form__group-control btn'
              type='submit'
              value='Sign Up'
            />
          </div>
          <div className='form__group'>
            <Link className='btn__outline btn-block' to='/'>
              Back
            </Link>
          </div>
          <div className='form__group'>
            <p>
              Already have account? <Link to='/login'>Sign In</Link>
            </p>
          </div>
          <div className='copyright__info mt-3'>
            Copyright &copy; {currentYear} Barista | All Rights Reserved | Built
            by Edgar Wu
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
