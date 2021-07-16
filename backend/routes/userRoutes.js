/** @format */
import express from 'express';
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

router.route('/login').post(authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser);

export default router;
