/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userLoginActions';
import { logo } from 'assets';
import Message from 'components/Message';

function RegisterPage({ location, history }) {
	const currentYear = new Date().getFullYear();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);
	const redirect = location.search ? location.search.split('=')[1] : '/';

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Password doesn't match.");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<div className='login__page'>
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
				{message && <Message message={message} type='danger' duration={5000} />}
				{error && <Message message={error} type='danger' duration={5000} />}
				<form className='form' onSubmit={handleSubmit}>
					<h2 className='form__title'>Sign Up</h2>
					<div className='form__group'>
						<label className='form__group-label'>Username</label>
						<input
							className='form__group-control'
							type='text'
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
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
						<label className='form__group-label'>Confirm Password</label>
						<input
							className='form__group-control'
							type='password'
							id='confirmPassword'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className='form__group'>
						<input
							className='form__group-control btn'
							type='submit'
							value='Register'
						/>
					</div>
					<div className='form__group'>
						<Link className='btn__outline btn-block' to='/'>
							Back
						</Link>
					</div>
					<div className='form__group'>
						<p>
							Already have an account?{' '}
							<Link to='/login' style={{ marginLeft: '0.5rem' }}>
								Log in
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

export default RegisterPage;
