/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { logo } from 'assets';
import Loader from 'components/Loader';
import Divider from 'components/layout/Divider';
import { toast } from 'react-toastify';

function LoginPage({ location, history }) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    } else if (error) {
      toast.error(error);
    }
  }, [history, userInfo, error, redirect]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
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
          <h2 className='form__title mb-3'>Sign In</h2>
          {loading && <Loader />}
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
            <input
              className='form__group-control btn'
              type='submit'
              value='Login'
            />
          </div>
          <div className='form__group'>
            <Link className='btn__outline btn-block' to='/'>
              Back
            </Link>
          </div>
          <div className='form__group'>
            <p>
              Don't have account? <Link to='/register'>Sign Up</Link>
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

export default LoginPage;
