/** @format */

import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import coffee from './data/coffee.js';
import equipment from './data/equipment.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
});

// COFFEE
app.get('/api/coffee', (req, res) => {
	res.json(coffee);
});

app.get('/api/coffee/:id', (req, res) => {
	const product = find((c) => c._id === req.params.id);
	res.json(product);
});

// EQUIPMENT
app.get('/api/equipment', (req, res) => {
	res.json(equipment);
});

app.get('/api/equipment/:id', (req, res) => {
	const product = _find((e) => e._id === req.params.id);
	res.json(product);
});

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
