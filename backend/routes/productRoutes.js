/** @format */

import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  updateProduct,
  createProduct,
  deleteProductById,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts).post(protect, isAdmin, createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, isAdmin, updateProduct)
  .delete(protect, isAdmin, deleteProductById);

export default router;

//If you have several methods on the same route, the advantage of using .route is to specify the route once.

// router
// .route('/')
// .get(getSomething)
// .post(addSomething)
// .delete(removeSomething)
// is equivalent to

// router
// .get('/', getSomething)
// .post('/', addSomething)
// .delete('/', removeSomething)
// or

// router.get('/', getSomething)
// router.post('/', addSomething)
// router.delete('/', removeSomething)
