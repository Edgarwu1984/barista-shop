/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Coffee from '../models/coffeeModel.js';
const router = express.Router();

// @description Fetch all coffees
// @route GET /api/coffee
// @access Public
router.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		const coffees = await Coffee.find({});
		res.json(coffees);
	})
);

// @description Fetch single coffee
// @route GET /api/coffee/:id
// @access Public
router.get(
	'/:id',
	expressAsyncHandler(async (req, res) => {
		const coffee = await Coffee.findById(req.params.id);

		if (coffee) {
			res.json(coffee);
		} else {
			// res.status(404).json({ message: 'Product not found' });
			// We have setup custom error handler middleware, so we can throw a new Error
			res.status(404);
			throw new Error('Oops..Product not found.');
		}
	})
);

export default router;
