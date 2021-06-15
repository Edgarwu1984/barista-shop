/** @format */

import React, { useEffect, useState } from 'react';

import { FiSearch, FiShoppingCart, BiUser } from 'lib/icons';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
	const [showEvent, setShowEvent] = useState(false);

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

	return (
		<>
			<header className={showEvent ? 'bg-dark' : null}>
				<div className='container header__wrapper'>
					<div className='logo'>
						<Link to='/'>
							<img src='/images/logo.png' alt='logo' />
						</Link>
					</div>
					<nav className='nav'>
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
					</nav>
					<div className='shopify'>
						<li className='shopify__item'>
							<a href='/'>
								<FiSearch size='1.5rem' />
							</a>
						</li>
						<li className='shopify__item'>
							<a href='/'>
								<BiUser size='1.5rem' />
							</a>
						</li>
						<li className='shopify__item'>
							<a href='/'>
								<FiShoppingCart size='1.5rem' />
							</a>
						</li>
					</div>
				</div>
			</header>
		</>
	);
}
