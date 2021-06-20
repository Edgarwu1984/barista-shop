/** @format */

import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'lib/icons';
import {logo}from 'assets'

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer>
			<div className='container'>
				<div className='footer__info'>
					<section className='footer__info-content'>
						<img className='logo' src={logo} alt='barista-logo' />
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Accusantium voluptatibus quisquam quod!
						</p>
						<button className='btn__outline'>about us</button>
					</section>
					<section className='footer__info-content'>
						<h4>Help</h4>
						<ul>
							<li>
								<a href='*'>FAQs</a>
							</li>
							<li>
								<a href='*'>Return policy</a>
							</li>
							<li>
								<a href='*'>Privacy policy</a>
							</li>
							<li>
								<a href='*'>Terms & conditions</a>
							</li>
						</ul>
					</section>
					<section className='footer__info-content'>
						<h4>Contact</h4>
						<ul>
							<li>
								<FaMapMarkerAlt size='1rem' />{' '}
								<a href='*'>123 Street VIC 3081</a>
							</li>
							<li>
								<FaPhoneAlt size='1rem' />{' '}
								<a href='tel:0400 000 000'>0400 000 000</a>
							</li>
							<li>
								<FaEnvelope size='1rem' />
								<a href='mailto:'>barista@baristacoffee.com.au</a>
							</li>
						</ul>
					</section>
				</div>
			</div>
			<div className='copyright__info'>
				<p>
					Copyright &copy; {currentYear} Barista | All Rights Reserved | Built
					by Edgar Wu
				</p>
			</div>
		</footer>
	);
}
