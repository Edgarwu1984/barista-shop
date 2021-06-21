/** @format */

const express = require('express');
const coffee = require('./data/coffee');
const equipment = require('./data/equipment');

const app = express();

// COFFEE
app.get('/api/coffee', (req, res) => {
	res.json(coffee);
});

app.get('/api/coffee/:id', (req, res) => {
	const product = coffee.find((c) => c._id === req.params.id);
	res.json(product);
});

// EQUIPMENT
app.get('/api/equipment', (req, res) => {
	res.json(equipment);
});

app.get('/api/equipment/:id', (req, res) => {
	const product = equipment.find((e) => e._id === req.params.id);
	res.json(product);
});

// START SERVER
app.listen(5000, console.log('Server running on port 5000'));
