/** @format */

import expressAsyncHandler from 'express-async-handler';
import Products from '../models/productModel.js';

// @description Fetch all Products
// @route GET /api/products
// @access Public

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.json(products);
});

// @description Delete Product by ID
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProductById = expressAsyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product has been removed.' });
  } else {
    res.status(404);
    throw new Error('Product not Found.');
  }
});

// @description Fetch All Coffee
// @route GET /api/products/coffee
// @access Public
const getCoffees = expressAsyncHandler(async (req, res) => {
  const coffees = await Products.find({ category: 'coffee' });

  if (coffees) {
    res.json(coffees);
  } else {
    // res.status(404).json({ message: 'Product not found' });
    // We have setup custom error handler middleware, so we can throw a new Error
    res.status(404);
    throw new Error('Oops..Products not found.');
  }
});

// @description Fetch All Equipments
// @route GET /api/products/equipment
// @access Public
const getEquipments = expressAsyncHandler(async (req, res) => {
  const equipments = await Products.find({ category: 'equipment' });

  if (equipments) {
    res.json(equipments);
  } else {
    res.status(404);
    throw new Error('Oops..Products not found.');
  }
});

// @description Fetch single coffee
// @route GET /api/products/coffee/:id
// @access Public
const getSingleCoffee = expressAsyncHandler(async (req, res) => {
  const coffee = await Products.findOne({
    category: 'coffee',
    _id: req.params.id,
  });

  if (coffee) {
    res.json(coffee);
  } else {
    res.status(404);
    throw new Error('Oops..Coffee not found.');
  }
});

// @description Fetch single equipment
// @route GET /api/products/equipment/:id
// @access Public
const getSingleEquipment = expressAsyncHandler(async (req, res) => {
  const equipment = await Products.findOne({
    category: 'equipment',
    _id: req.params.id,
  });

  if (equipment) {
    res.json(equipment);
  } else {
    res.status(404);
    throw new Error('Oops..Equipment not found.');
  }
});

export {
  getProducts,
  deleteProductById,
  getCoffees,
  getEquipments,
  getSingleCoffee,
  getSingleEquipment,
};
