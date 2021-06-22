/** @format */

import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Equipment from '../models/equipmentModel.js';

const router = express.Router();

// @description Fetch all equipment
// @route GET /api/equipment
// @access Public
router.get(
	'/',
	expressAsyncHandler(async (req, res) => {
		const equipments = await Equipment.find({});
		res.json(equipments);
	})
);

// @description Fetch all equipment
// @route GET /api/equipment/:id
// @access Public
router.get(
	'/:id',
	expressAsyncHandler(async (req, res) => {
		const equipment = await Equipment.findById(req.params.id);

		if (equipment) {
			res.json(equipment);
		} else {
			res.status(404);
			throw new Error('Oops..Product not found.');
		}
	})
);

export default router;
