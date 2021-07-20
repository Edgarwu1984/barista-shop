/** @format */

import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    user: {
      /* To know which Admin/User create the product */
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' /* References User Model*/,
    },
    category: { type: String, default: 'Uncategorized' },
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

const Product = mongoose.model('Product', productSchema);

export default Product;
