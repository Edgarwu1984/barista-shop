import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from 'redux/actions/userActions';
import Hero from 'components/layout/Hero';
import Layout from 'components/layout/Layout';
import Divider from 'components/layout/Divider';
import { bg11 } from 'assets';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';
import Tabs from 'components/Tabs';
import UserList from 'components/UserList';
import { listProduct } from 'redux/actions/productActions';
import ProductList from 'components/ProductList';
import OrderList from 'components/OrderList';
import { listOrders } from 'redux/actions/orderActions';

function DashboardPage({ history }) {
  const dispatch = useDispatch();

  // Get User List && Handle User
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector(state => state.userList);
  const { loading: usersLoading, error: usersError, users } = userList;

  const userUpdate = useSelector(state => state.userUpdate);
  const { success: updateUserSuccess } = userUpdate;

  const userDelete = useSelector(state => state.userDelete);
  const { success: deleteUserSuccess } = userDelete;

  // Get Product List && Handle Product
  const productList = useSelector(state => state.productList);
  const {
    loading: productsLoading,
    error: productsError,
    products,
  } = productList;

  const productCreate = useSelector(state => state.productCreate);
  const { success: createSuccess } = productCreate;

  const productUpdate = useSelector(state => state.productUpdate);
  const { success: updateProductSuccess } = productUpdate;

  const productDelete = useSelector(state => state.productDelete);
  const { success: deleteProductSuccess } = productDelete;

  // Get Order List && Handle Order
  const orderList = useSelector(state => state.orderList);
  const { loading: ordersLoading, error: ordersError, orders } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      dispatch(listProduct());
      dispatch(listOrders());
    } else {
      history.push('/');
    }
  }, [
    dispatch,
    userInfo,
    history,
    updateUserSuccess,
    deleteUserSuccess,
    createSuccess,
    updateProductSuccess,
    deleteProductSuccess,
  ]);

  if (usersError || productsError || ordersError) {
    toast.error(usersError);
    toast.error(productsError);
    toast.error(ordersError);
  }

  return (
    <Layout>
      <Hero bgImage={bg11} height='400px'>
        <div className='title-center'>
          <h1 className='mb-4'>Admin Dashboard</h1>
          <Divider />
        </div>
      </Hero>
      <div className='container offset-top'>
        <Tabs>
          <div label='Users'>
            {usersLoading ? <Loader /> : <UserList users={users} />}
          </div>
          <div label='Products'>
            {productsLoading ? (
              <Loader />
            ) : (
              <ProductList products={products} history={history} />
            )}
          </div>
          <div label='Orders'>
            {ordersLoading ? <Loader /> : <OrderList orders={orders} />}
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export default DashboardPage;
