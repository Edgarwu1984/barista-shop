/** @format */

import React from 'react';
import Hero from 'components/Hero';
import Layout from 'components/Layout';
import Divider from 'components/Divider';
import { bg2, cup, pot, icon5, icon6 } from 'assets';
import Coffee from 'components/products/Coffee';
import Equipment from 'components/products/Equipment';
import { Link } from 'react-router-dom';
import ContactForm from 'components/ContactForm';

function ShopPage() {
	return (
		<Layout title='Barista - Coffee Shop'>
			<Hero bgImage={bg2}>
				<div className='center'>
					<h1 className='uppercase'>COFFEE SHOP</h1>
					<Divider />
					<p className='lead'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Exercitationem, quam. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Exercitationem, quam.
					</p>
				</div>
			</Hero>
			<div className='featured__bg'>
				<div className='container'>
					<div className='product__nav'>
						<Link to='/shop/coffee' className='product__link'>
							<img
								className='product__link-icon'
								src={icon6}
								alt='coffee-cup'
							/>
							<h3>coffee</h3>
							<img className='product__link-image' src={cup} alt='coffee-cup' />
						</Link>

						<Link to='/shop/equipment' className='product__link'>
							<img
								className='product__link-icon'
								src={icon5}
								alt='coffee-pot'
							/>
							<h3>equipment</h3>
							<img className='product__link-image' src={pot} alt='coffee-pot' />
						</Link>
					</div>
					<div className='wrapper center'>
						<div className='product__title'>
							<h3 className='section-title'>Coffee</h3>
							<Link to='/shop/coffee'>view all</Link>
						</div>
						<Coffee />
					</div>
					<div className='wrapper center mb-3'>
						<div className='product__title'>
							<h3 className='section-title'>equipment</h3>
							<Link to='/shop/equipment'>view all</Link>
						</div>
						<Equipment />
					</div>
				</div>
			</div>
			<ContactForm />
		</Layout>
	);
}

export default ShopPage;
