/** @format */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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
	const [showDropdown, setShowDropdown] = useState(false);

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

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

	return (
		<>
			<header className={showEvent ? 'bg-dark' : null}>
				<div className='container header__wrapper'>
					<div className='logo'>
						<Link to='/'>
							<img src={logo} alt='logo' />
						</Link>
					</div>
					<nav className='nav'>
						<li className='nav__item'>
							<NavLink exact to='/' className='nav__item-link'>
								Home
							</NavLink>
						</li>
						<li
							className='nav__item dropdown'
							onMouseEnter={() => setShowDropdown(true)}
							onMouseLeave={() => setShowDropdown(false)}>
							<NavLink to='/shop' className='nav__item-link'>
								Shop
								<IoMdArrowDropdown className='arrow' />
							</NavLink>
							<div
								className={
									!showDropdown ? 'dropdown__menu hidden' : 'dropdown__menu'
								}>
								<NavLink to='/shop/coffee' className='dropdown__menu-link'>
									Coffee
								</NavLink>
								<NavLink to='/shop/equipment' className='dropdown__menu-link'>
									Equipment
								</NavLink>
							</div>
						</li>
						<div className='shopify'>
							<li className='shopify__item'>
								<a href='/'>
									<FiSearch size='1.5rem' />
								</a>
							</li>
							<li className='shopify__item'>
								<a href='/login'>
									<BiUser size='1.5rem' />
								</a>
							</li>
							<li className='shopify__item'>
								{cartItems.length > 0 && (
									<span className='item__count'>{cartItems.length}</span>
								)}
								<a href='/cart'>
									<FiShoppingCart size='1.5rem' />
								</a>
							</li>
						</div>
					</nav>

					<nav className={showMenu ? 'nav__mobile' : 'nav__mobile hidden'}>
						<li className='nav__item'>
							<NavLink exact to='/' className='nav__item-link'>
								Home
							</NavLink>
						</li>
						<li className='nav__item'>
							<NavLink to='/shop' className='nav__item-link'>
								Shop
							</NavLink>
						</li>
						<div className='shopify'>
							<li className='shopify__item'>
								<a href='/'>
									<FiSearch size='1.5rem' />
								</a>
							</li>
							<li className='shopify__item'>
								<a href='/login'>
									<BiUser size='1.5rem' />
								</a>
							</li>
							<li className='shopify__item'>
								<a href='/cart'>
									<FiShoppingCart size='1.5rem' />
								</a>
							</li>
						</div>
					</nav>
					<button className='btn-hamburger' onClick={handleMenu}>
						{!showMenu ? <AiOutlineMenu /> : <AiOutlineClose />}
					</button>
				</div>
			</header>
		</>
	);
}
