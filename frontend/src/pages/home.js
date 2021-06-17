/** @format */

import React from 'react';
import Hero from 'components/Hero';
import Layout from 'components/Layout';
import Divider from 'components/Divider';
import { Link } from 'react-router-dom';
import { icon2, icon3, icon4, bg1 } from 'assets';
import Coffee from 'components/products/Coffee';

function HomePage() {
	return (
		<Layout title='Barista - Coffee Shop'>
			<Hero bgImage={bg1} height='100vh'>
				<div className='title-right'>
					<h1>COFFEE SHOP</h1>
					<Divider />
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Exercitationem, quam. Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Exercitationem, quam.
					</p>
					<Link to='/shop' className='btn__outline btn-lg'>
						Go Shopping
					</Link>
				</div>
			</Hero>
			<section className='intro'>
				<div className='container wrapper__center'>
					<h2>Our delicious offer</h2>
					<Divider />
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, ab
						sint fuga error temporibus distinctio accusantium quia. Veritatis id
						perspiciatis iste repellendus debitis. Dicta expedita veniam autem
						natus facere! Nostrum?
					</p>
				</div>
			</section>
			<section className='feature'>
				<div className='container feature__wrapper'>
					<div className='feature__item'>
						<div className='feature__item-title'>
							<img src={icon3} alt='coffee bean icon' />
							<h4>Lorem, ipsum dolor.</h4>
						</div>
						<div className='feature__item-body'>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
								adipisci dolorum inventore maxime et nesciunt sunt architecto
								suscipit molestias modi.
							</p>
						</div>
					</div>
					<div className='feature__item'>
						<div className='feature__item-title'>
							<img src={icon2} alt='coffee cup icon' />
							<h4>Lorem, ipsum dolor.</h4>
						</div>
						<div className='feature__item-body'>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
								adipisci dolorum inventore maxime et nesciunt sunt architecto
								suscipit molestias modi.
							</p>
						</div>
					</div>
					<div className='feature__item'>
						<div className='feature__item-title'>
							<img src={icon4} alt='coffee cup icon' />
							<h4>Lorem, ipsum dolor.</h4>
						</div>
						<div className='feature__item-body'>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint
								adipisci dolorum inventore maxime et nesciunt sunt architecto
								suscipit molestias modi.
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className='shop__link'>
				<div className='shop__link-bean'>
					<h2>shop with coffee bean</h2>
					<Link to='/shop/bean' className='btn__outline-light btn-lg'>
						shop now
					</Link>
				</div>
				<div className='shop__link-machine'>
					<h2>shop with coffee machine</h2>
					<Link to='/shop/machine' className='btn__outline-light btn-lg'>
						shop now
					</Link>
				</div>
			</section>
			<section className='products'>
				<div className='container products__wrapper'>
					<h2>Our Popular Products</h2>
					<Divider />
					<Coffee />
					<Link to='/shop' className='btn__outline btn-lg'>
						See More
					</Link>
				</div>
			</section>
			<section className='learning'>
				<div className='container learning__wrapper'>
					<h2>Learn How To Brew Your Coffee</h2>
					<h2>Check Our Coffee Wiki</h2>
					<Link to='/' className='btn__outline-light btn-lg'>
						let's make a coffee
					</Link>
				</div>
			</section>
		</Layout>
	);
}

export default HomePage;
