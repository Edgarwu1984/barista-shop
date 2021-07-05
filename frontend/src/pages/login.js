/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/userActions';
import { logo } from 'assets';
import Loader from 'components/Loader';
import Divider from 'components/layout/Divider';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage({ location, history }) {
	const currentYear = new Date().getFullYear();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	useEffect(() => {
		if (userInfo) {
			history.push('/');
		} else if (error) {
			toast.error(error);
		}
	}, [history, userInfo, error]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<div className='login__page'>
			<ToastContainer
				position='top-center'
				autoClose={5000}
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
				<Divider />
				<div className='site__intro-body'>
					<p className='lead'>Shopping with variety coffee products.</p>
				</div>
			</div>
			<div className='login center'>
				<form className='form' onSubmit={handleSubmit}>
					<h2 className='form__title'>Sign In</h2>
					{loading && <Loader />}
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
							<Link to='/register' style={{ marginLeft: '0.5rem' }}>
								Sign Up
							</Link>
						</p>
					</div>
					<div className='copyright__info'>
						<p>
							Copyright &copy; {currentYear} Barista | All Rights Reserved |
							Built by Edgar Wu
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
