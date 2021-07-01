/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userLoginActions';
import { logo } from 'assets';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage({ location, history }) {
	const currentYear = new Date().getFullYear();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
		error && toast.error(error);
	};

	return (
		<div className='login__page'>
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				transition={Slide}
			/>
			<div className='site__intro center'>
				<div className='site__intro-title'>
					<img src={logo} alt='logo' />
					<h1>Barista Coffee Shop</h1>
				</div>
				<div className='site__intro-body'>
					<p className='lead'>Shopping with variety coffee products.</p>
				</div>
			</div>
			<div className='login center'>
				<form className='form' onSubmit={handleSubmit}>
					<h2 className='form__title'>Login</h2>
					<div className='form__group'>
						<label className='form__group-label'>Email</label>
						<input
							className='form__group-control'
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='form__group'>
						<label className='form__group-label'>Password</label>
						<input
							className='form__group-control'
							type='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
							Don't have account?{' '}
							<Link
								to={redirect ? `/register?redirect=${redirect}` : '/register'}
								style={{ marginLeft: '0.5rem' }}>
								Sign Up
							</Link>
						</p>
					</div>
				</form>
				<div className='copyright__info'>
					<p>
						Copyright &copy; {currentYear} Barista | All Rights Reserved | Built
						by Edgar Wu
					</p>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
