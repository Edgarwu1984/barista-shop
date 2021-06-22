/** @format */

import mongoose from 'mongoose';

const equipmentSchema = mongoose.Schema(
	{
		user: {
			/* To know which Admin/User create the product */
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User' /* References User Model*/,
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
		reviews: [
			{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Review' },
		],
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

export default Equipment;
