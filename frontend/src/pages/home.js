/** @format */

import React from 'react';
import Hero from 'components/Hero';
import Layout from 'components/Layout';
import Divider from 'components/Divider';
import { Link } from 'react-router-dom';

function HomePage() {
	return (
		<Layout title='Barista - Coffee Shop'>
			<Hero bgImage='/images/bg1.jpg' height='100vh'>
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
			<div className='container'>
				<h1>home</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nam.
					Officiis labore illum ipsum nisi maiores fugit natus fuga? Esse nulla
					soluta consequuntur culpa qui alias doloremque enim itaque, saepe
					numquam assumenda sit totam. Culpa, minus nisi debitis tempora fuga,
					libero corrupti, quaerat dolorem ea necessitatibus molestiae!
					Adipisci, soluta sint!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nam.
					Officiis labore illum ipsum nisi maiores fugit natus fuga? Esse nulla
					soluta consequuntur culpa qui alias doloremque enim itaque, saepe
					numquam assumenda sit totam. Culpa, minus nisi debitis tempora fuga,
					libero corrupti, quaerat dolorem ea necessitatibus molestiae!
					Adipisci, soluta sint!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nam.
					Officiis labore illum ipsum nisi maiores fugit natus fuga? Esse nulla
					soluta consequuntur culpa qui alias doloremque enim itaque, saepe
					numquam assumenda sit totam. Culpa, minus nisi debitis tempora fuga,
					libero corrupti, quaerat dolorem ea necessitatibus molestiae!
					Adipisci, soluta sint!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nam.
					Officiis labore illum ipsum nisi maiores fugit natus fuga? Esse nulla
					soluta consequuntur culpa qui alias doloremque enim itaque, saepe
					numquam assumenda sit totam. Culpa, minus nisi debitis tempora fuga,
					libero corrupti, quaerat dolorem ea necessitatibus molestiae!
					Adipisci, soluta sint!
				</p>
			</div>
		</Layout>
	);
}

export default HomePage;
