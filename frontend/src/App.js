/** @format */

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import HomePage from 'pages/home';
import ShopPage from 'pages/shop';
import NotFoundPage from 'pages/404';
import CartPage from 'pages/cart';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/shop' component={ShopPage} />
				<Route path='/cart' component={CartPage} />
				<Route path='/404' component={NotFoundPage} />
				<Redirect to='/404' />
			</Switch>
		</Router>
	);
}

export default App;
