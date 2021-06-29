/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from 'components/layout/Layout';
import Hero from 'components/layout/Hero';
import Divider from 'components/layout/Divider';
import { FaTrashAlt } from 'lib/icons';
import { bg8 } from 'assets';

function CartPage({ match, location, history }) {
	const productId = match.params.id;

	const qty = location.search
		? Number(location.search.split('&')[1].split('=')[1])
		: 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const { cartItems } = cart;

	const category = location.search.split('&')[0].split('=')[1]; // Get added item's category

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty, category));
		}
	}, [dispatch, productId, qty, category]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
		toast.success('Product removed.');
	};

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping');
	};

	return (
		<Layout>
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
			<Hero bgImage={bg8} height='400px'>
				<div className='title-center'>
					<h1 className='mb-4'>Shopping Cart</h1>
					<Divider />
				</div>
			</Hero>
			<div className='container'>
				<div className='wrapper'>
					<h3 className='mb-3'>Cart List</h3>
					<div className='shopping__cart'>
						<div className='cart__container'>
							{cartItems.length === 0 ? (
								<div className='cart__list center empty'>
									<h3>Empty List</h3>
									<Link to='/shop'>Back to Shop</Link>
								</div>
							) : (
								cartItems.map((item) => (
									<div className='cart__list' key={item.id}>
										<div className='cart__list-item'>
											<img src={item.image} alt={item.name} />
											<div className='item__info'>
												<Link to={`/shop/${item.category}/${item.id}`}>
													<h4 className='mb-1'>{item.name}</h4>
												</Link>
												<p className='mb-1'>Price: $ {item.price.toFixed(2)}</p>
												<p>
													Qty:{' '}
													<input
														type='number'
														min='0'
														max={item.countInStock}
														value={item.qty}
														onChange={(e) =>
															dispatch(
																addToCart(
																	item.id,
																	Number(e.target.value),
																	item.category
																)
															)
														}
													/>
												</p>
											</div>
											<button
												className='remove__btn'
												onClick={() => removeFromCartHandler(item.id)}>
												<FaTrashAlt fontSize='1.2rem' />
											</button>
										</div>
									</div>
								))
							)}
						</div>

						<div className='checkout'>
							<h4>
								Subtotal:{' '}
								<span>
									{cartItems.reduce((acc, item) => acc + item.qty, 0)} items
								</span>
							</h4>
							<h4>
								Total:{' '}
								<span>
									${' '}
									{cartItems
										.reduce((acc, item) => acc + item.qty * item.price, 0)
										.toFixed(2)}
								</span>
							</h4>
							<hr />
							<button
								className={
									cartItems.length === 0
										? 'btn btn-block btn__disabled'
										: 'btn btn-block'
								}
								onClick={checkoutHandler}>
								proceed check out
							</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default CartPage;
