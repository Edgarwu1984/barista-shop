/** @format */

import mongoose from 'mongoose';

const coffeeSchema = mongoose.Schema(
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
		roast: {
			type: String,
			required: true,
		},
		region: {
			type: String,
			required: true,
		},
		type: {
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

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
