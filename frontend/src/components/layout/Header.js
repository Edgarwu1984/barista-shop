/** @format */

import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	FiSearch,
	FiShoppingCart,
	BiUser,
	AiOutlineMenu,
	AiOutlineClose,
	IoMdArrowDropdown,
} from 'lib/icons';
import { logo } from 'assets';

export default function Header() {
	const [showEvent, setShowEvent] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		window.addEventListener('scroll', handleEvent);
		return () => {
			window.removeEventListener('scroll', handleEvent);
		};
	});

	const handleEvent = () => {
		if (window.pageYOffset > 100) {
			setShowEvent(true);
		} else {
			setShowEvent(false);
		}
	};

	const handleMenu = () => setShowMenu(!showMenu);

	const handleLogout = () => {
		dispatch(logout());
		toast.success('Logged out');
	};

	return (
		<>
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
			<header className={showEvent ? 'bg-dark' : null}>
				<div className='container header__wrapper'>
					<div className='logo'>
						<Link to='/'>
							<img src={logo} alt='logo' />
						</Link>
					</div>
					<nav className={showMenu ? 'nav' : 'nav mobile'}>
						<ul className='nav__menu'>
							<li className='nav__menu-item'>
								<NavLink exact to='/'>
									Home
								</NavLink>
							</li>
							<li className='nav__menu-item'>
								<NavLink to='/shop'>
									Shop
									<IoMdArrowDropdown className='arrow' />
								</NavLink>
								<ul className='nav__dropdown'>
									<li className='nav__dropdown-item'>
										<NavLink to='/shop/coffee'>Coffee</NavLink>
									</li>
									<li className='nav__dropdown-item'>
										<NavLink
											to='/shop/equipment'
											className='dropdown__menu-link'>
											Equipment
										</NavLink>
									</li>
								</ul>
							</li>
						</ul>
						<ul className='nav__menu shopify'>
							<li className='nav__menu-item'>
								<a href='/'>
									<FiSearch size='1.5rem' />
								</a>
							</li>
							{userInfo ? (
								<li className='nav__menu-item'>
									<p>
										<BiUser size='1.5rem' />
									</p>
									<ul className='nav__dropdown'>
										<li className='nav__dropdown-item'>
											<NavLink to='/profile'>{userInfo.name}</NavLink>
										</li>
										<li className='nav__dropdown-item'>
											<Link to='#' onClick={handleLogout}>
												Log out
											</Link>
										</li>
									</ul>
								</li>
							) : (
								<li className='nav__menu-item'>
									<Link to='/login'>
										<BiUser size='1.5rem' />
									</Link>
								</li>
							)}
							<li className='nav__menu-item'>
								{cartItems.length > 0 && (
									<span className='item__count'>{cartItems.length}</span>
								)}
								<Link to='/cart'>
									<FiShoppingCart size='1.5rem' />
								</Link>
							</li>
						</ul>
					</nav>
					<button className='btn-hamburger' onClick={handleMenu}>
						{!showMenu ? <AiOutlineMenu /> : <AiOutlineClose />}
					</button>
				</div>
			</header>
		</>
	);
}
