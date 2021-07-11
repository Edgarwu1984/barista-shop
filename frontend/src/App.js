/** @format */

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from 'pages/home';
import ShopPage from 'pages/shop';
import NotFoundPage from 'pages/404';
import CartPage from 'pages/cart';
import ProductsPage from 'pages/products/products';
import SingleProductPage from 'pages/products/singleProduct';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import ProfilePage from 'pages/profile';
import CheckOutPage from 'pages/checkout';

function App() {
  return (
    <Router>
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
      <Switch>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/checkout' component={CheckOutPage} />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
        <Route exact path='/shop/coffee' component={ProductsPage} />
        <Route exact path='/shop/equipment' component={ProductsPage} />
        <Route path='/shop/coffee/:id' component={SingleProductPage} />
        <Route path='/shop/equipment/:id' component={SingleProductPage} />
        <Route path='/cart/:id?' component={CartPage} />
        <Route path='/404' component={NotFoundPage} />
        <Redirect to='/404' />
      </Switch>
    </Router>
  );
}

export default App;
