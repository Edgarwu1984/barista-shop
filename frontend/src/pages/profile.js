/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUserDetails,
	updateUserProfile,
	resetProfile,
} from '../redux/actions/userActions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import Loader from 'components/Loader';
import { bg8 } from 'assets';

function ProfilePage({ history }) {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo } = userLogin;
	const userDetails = useSelector((state) => state.userDetails);
	const { user } = userDetails;

	const [name, setName] = useState(userInfo && userInfo.name);
	const [email, setEmail] = useState(userInfo && userInfo.email);
	const [password, setPassword] = useState('');

	const [confirmPassword, setConfirmPassword] = useState('');
	const [isProfileEditMode, setIsProfileEditMode] = useState(false);
	const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success, updateError } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push('/');
		} else {
			if (!user || !user.name) {
				dispatch(getUserDetails('profile'));
			} else if (success) {
				dispatch(resetProfile());
				toast.success('Profile has been updated.');
				setIsProfileEditMode(false);
			} else if (updateError) {
				toast.error(updateError);
			}
		}
	}, [dispatch, history, userInfo, user, success, updateError]);

	const submitHandler = (e) => {
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
			<Hero bgImage={bg8} height='400px'>
				<div className='title-center'>
					<h1 className='mb-4'>Profile</h1>
					<Divider />
				</div>
			</Hero>
			<div className='profile__wrapper container'>
				<div className='grid-3'>
					{loading ? (
						<Loader />
					) : (
						<div className='grid__child'>
							<div className='grid__child-title'>
								<h3>Hi, {user.name}</h3>{' '}
								{user.isAdmin && <span className='badge'>Admin</span>}{' '}
							</div>
							{isProfileEditMode ? (
								<form className='form' onSubmit={submitHandler}>
									<div className='form__group current__info'>
										<li>
											<strong className='mr-2'>Username:</strong>
											{userInfo.name}
										</li>
										<li>
											<strong className='mr-2'>Email:</strong>
											{userInfo.email}
										</li>
									</div>
									<div className='form__group'>
										<label className='form__group-label'>New Username</label>
										<input
											className='form__group-control'
											type='text'
											id='name'
											value={name}
											required
											onChange={(e) => setName(e.target.value)}
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
											onChange={(e) => setEmail(e.target.value)}
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
											onClick={cancelHandler}>
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
											onChange={(e) => setPassword(e.target.value)}
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
											onChange={(e) => setConfirmPassword(e.target.value)}
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
											onClick={cancelHandler}>
											Cancel
										</button>
									</div>
								</form>
							) : (
								<ul>
									<li>
										<strong className='mr-2'>Username:</strong>
										{userInfo && userInfo.name}
									</li>
									<li>
										<strong className='mr-2'>Email:</strong>
										{userInfo && userInfo.email}
									</li>
									<li>
										<button
											className='btn mt-2'
											onClick={() => setIsProfileEditMode(true)}>
											Edit Profile
										</button>
									</li>
									<li>
										<button
											className='btn mt-1'
											onClick={() => setIsPasswordEditMode(true)}>
											Reset Password
										</button>
									</li>
								</ul>
							)}
						</div>
					)}

					<div className='grid__child span'>
						<div className='grid__child-title'>
							<h3>My Order</h3>
						</div>
						<ul>
							<li></li>
						</ul>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default ProfilePage;
