/** @format */

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import HomePage from 'pages/home';
import ShopPage from 'pages/shop/shop';
import NotFoundPage from 'pages/404';
import CartPage from 'pages/cart';
import CoffeePage from 'pages/shop/coffee';
import EquipmentPage from 'pages/shop/equipment';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/shop' component={ShopPage} />
				<Route exact path='/shop/coffee' component={CoffeePage} />
				<Route exact path='/shop/equipment' component={EquipmentPage} />
				<Route path='/cart' component={CartPage} />
				<Route path='/404' component={NotFoundPage} />
				<Redirect to='/404' />
			</Switch>
		</Router>
	);
}

export default App;
