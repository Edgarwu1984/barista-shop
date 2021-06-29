/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Products from '../models/productModel.js';
const router = express.Router();

// @description Fetch all Products
// @route GET /api/products
// @access Public

router.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		const products = await Products.find({});
		res.json(products);
	})
);

// @description Fetch All Coffee
// @route GET /api/products/coffee
// @access Public
router.get(
	'/coffee',
	expressAsyncHandler(async (req, res) => {
		const product = await Products.find({ category: 'coffee' });

		if (product) {
			res.json(product);
		} else {
			// res.status(404).json({ message: 'Product not found' });
			// We have setup custom error handler middleware, so we can throw a new Error
			res.status(404);
			throw new Error('Oops..Product not found.');
		}
	})
);

// @description Fetch All Equipments
// @route GET /api/products/equipment
// @access Public
router.get(
	'/equipment',
	expressAsyncHandler(async (req, res) => {
		const product = await Products.find({ category: 'equipment' });

		if (product) {
			res.json(product);
		} else {
			res.status(404);
			throw new Error('Oops..Product not found.');
		}
	})
);

// @description Fetch single coffee
// @route GET /api/products/coffee/:id
// @access Public
router.get(
	'/coffee/:id',
	expressAsyncHandler(async (req, res) => {
		// const product = await Products.findById(req.params.id);
		const product = await Products.findOne({
			category: 'coffee',
			_id: req.params.id,
		}); // Only get the coffee category with its id

		if (product) {
			res.json(product);
		} else {
			res.status(404);
			throw new Error('Oops..Product not found.');
		}
	})
);

// @description Fetch single equipment
// @route GET /api/products/equipment/:id
// @access Public
router.get(
	'/equipment/:id',
	expressAsyncHandler(async (req, res) => {
		// const product = await Products.findById(req.params.id);
		const product = await Products.findOne({
			category: 'equipment',
			_id: req.params.id,
		});

		if (product) {
			res.json(product);
		} else {
			res.status(404);
			throw new Error('Oops..Product not found.');
		}
	})
);

export default router;
