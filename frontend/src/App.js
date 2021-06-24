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
import CoffeePage from 'pages/coffee/coffee';
import EquipmentPage from 'pages/equipment/equipment';
import LoginPage from 'pages/login';
import SingleCoffeePage from 'pages/coffee/singleCoffee';
import SingleEquipmentPage from 'pages/equipment/singleEquipment';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route exact path='/shop' component={ShopPage} />
				<Route exact path='/shop/coffee' component={CoffeePage} />
				<Route path='/shop/coffee/:id' component={SingleCoffeePage} />
				<Route exact path='/shop/equipment' component={EquipmentPage} />
				<Route path='/shop/equipment/:id' component={SingleEquipmentPage} />
				<Route path='/cart/:id?' component={CartPage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/404' component={NotFoundPage} />
				<Redirect to='/404' />
			</Switch>
		</Router>
	);
}

export default App;
