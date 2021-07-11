/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../redux/actions/productActions';
import ScrollToTop from 'utils/ScrollToTop';
import Hero from 'components/layout/Hero';
import Layout from 'components/layout/Layout';
import Divider from 'components/layout/Divider';
import Product from 'components/Product';
import { icon2, icon3, icon4, bg1 } from 'assets';

function HomePage({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  ScrollToTop();

  return (
    <Layout title='Barista - Coffee Shop'>
      <Hero bgImage={bg1} height='100vh'>
        <div className='title-right'>
          <h1 className='uppercase'>COFFEE SHOP</h1>
          <Divider />
          <p className='lead'>
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
        <div className='container'>
          <div className='wrapper center'>
            <h2 className='uppercase'>Our delicious offer</h2>
            <Divider />
            <p className='lead'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta,
              ab sint fuga error temporibus distinctio accusantium quia.
              Veritatis id perspiciatis iste repellendus debitis. Dicta expedita
              veniam autem natus facere! Nostrum?
            </p>
          </div>
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
          <Link to='/shop/coffee' className='btn__outline-light btn-lg'>
            shop now
          </Link>
        </div>
        <div className='shop__link-machine'>
          <h2>shop with coffee machine</h2>
          <Link to='/shop/equipment' className='btn__outline-light btn-lg'>
            shop now
          </Link>
        </div>
      </section>
      <section className='products'>
        <div className='container'>
          <div className='wrapper center'>
            <h2>Our Popular Products</h2>
            <Divider />
            {loading ? (
              <div className='center'>
                <img src='/images/loader.svg' alt='loading' />
                <p>Loading....</p>
              </div>
            ) : error ? (
              <h3>{error}</h3>
            ) : (
              <div className='grid-4'>
                {!products ? (
                  <h3>No products.</h3>
                ) : (
                  products.map(
                    product =>
                      product.rating > 4.5 && (
                        <Product
                          key={product._id}
                          product={product}
                          history={history}
                        />
                      )
                  )
                )}
              </div>
            )}
          </div>
          <div className='wrapper center'>
            <Link to='/shop' className='btn__outline btn-lg'>
              See More
            </Link>
          </div>
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
