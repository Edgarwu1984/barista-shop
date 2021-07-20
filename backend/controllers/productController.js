/** @format */

import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Products from '../models/productModel.js';

// @description Fetch all Products
// @route GET /api/products
// @access Public

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.json(products);
});

// @description Get Product by ID
// @route GET /api/products/:id
// @access Public

const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not Found.');
  }
});

// @description Create Product
// @route POST /api/products
// @access Private/Admin

const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Product name',
    category: 'Uncategorized',
    image: '/images/products/sample.jpg',
    description: 'Product description',
    price: 0,
    countInStock: 0,
    numReviews: 0,
    user: req.user._id,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @description Update Product
// @route PUT /api/products/:id
// @access Private/Admin

const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, category, image, description, price, countInStock } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = name;
    product.category = category;
    product.image = image;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found.');
  }
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

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};
