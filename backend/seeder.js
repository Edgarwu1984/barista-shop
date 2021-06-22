/** @format */

import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import coffee from './data/coffee.js';
import equipment from './data/equipment.js';
import User from './models/userModel.js';
import Coffee from './models/coffeeModel.js';
import Equipment from './models/equipmentModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Order.deleteMany();
		await Coffee.deleteMany();
		await Equipment.deleteMany();
		await User.deleteMany();

		const createUsers = await User.insertMany(users);

		const adminUser = createUsers[0]._id;

		const sampleCoffee = coffee.map((c) => {
			return { ...c, user: adminUser };
		});

		await Coffee.insertMany(sampleCoffee);

		console.log('Coffee Data Imported.'.green.inverse);

		const sampleEquipment = equipment.map((e) => {
			return { ...e, user: adminUser };
		});

		await Equipment.insertMany(sampleEquipment);

		console.log('Equipment Data Imported.'.green.inverse);
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Coffee.deleteMany();
		await Equipment.deleteMany();
		await User.deleteMany();

		console.log('Coffee Data Destroyed.'.red.inverse);
		console.log('Equipment Data Destroyed.'.red.inverse);
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
