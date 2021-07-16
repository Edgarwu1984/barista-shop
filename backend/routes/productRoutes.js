/** @format */

import express from 'express';
const router = express.Router();
import {
  getProducts,
  getCoffees,
  getEquipments,
  getSingleCoffee,
  getSingleEquipment,
  deleteProductById,
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts);

router.route('/:id').delete(protect, isAdmin, deleteProductById);

router.route('/coffee').get(getCoffees);

router.route('/equipment').get(getEquipments);

router.route('/coffee/:id').get(getSingleCoffee);

router.route('/equipment/:id').get(getSingleEquipment);

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
