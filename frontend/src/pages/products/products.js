/** @format */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listChildProduct } from '../../redux/actions/productActions';
import Hero from 'components/layout/Hero';
import Layout from 'components/layout/Layout';
import Divider from 'components/layout/Divider';
import Product from 'components/Product';
import ContactForm from 'components/ContactForm';
import { bg2, bg3, bg4 } from 'assets';
import Loader from 'components/Loader';

function ProductsPage({ match, history }) {
  const category = match.path.split('/')[2];
  const dispatch = useDispatch();
  const childProductList = useSelector(state => state.childProductList);
  const { loading, error, products } = childProductList;

  useEffect(() => {
    const category = match.path.split('/')[2];

    if (match.path === `/shop/${category}`) {
      dispatch(listChildProduct(category));
    }
  }, [dispatch, match]);

  return (
    <Layout
      title={`Barista - ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }`}
    >
      <Hero
        bgImage={
          match.path === '/shop/coffee'
            ? bg3
            : match.path === '/shop/equipment'
            ? bg4
            : bg2
        }
      >
        <div className='center'>
          <h1 className='uppercase'>{category}</h1>
          <Divider />
          <p className='lead'>Find your favorite products from our shop</p>
        </div>
      </Hero>
      <div
        className={
          category === 'coffee'
            ? 'featured__bg-coffee'
            : 'featured__bg-equipment'
        }
      >
        <div className='container'>
          <h4 className='page__url'>
            <Link to='/shop'>{match.path.split('/')[1]}</Link> /{' '}
            <span className='current__page'>{category}</span>
          </h4>
          <div className='wrapper'>
            <main>
              {loading ? (
                <Loader />
              ) : error ? (
                <h3>{error}</h3>
              ) : (
                <div className='grid-4'>
                  {products &&
                    products.map(product => (
                      <Product
                        key={product._id}
                        product={product}
                        history={history}
                      />
                    ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      <ContactForm />
    </Layout>
  );
}

export default ProductsPage;
