/** @format */

import expressAsyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @description Auth user & get token
// @route POST /api/users/login
// @access Public

const authUser = expressAsyncHandler(async (req, res) => {
	const { email, password } = req.body;
	// res.send({ email, password }); // For testing purpose send user request to the body

	const user = await User.findOne({ email: email });

	// Check if user password match with request; Method from userModel that we created;

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password.');
	}
});

// @description Register a new user
// @route POST /api/users
// @access Public

const registerUser = expressAsyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	// res.send({ email, password }); // For testing purpose send user request to the body

	const userExists = await User.findOne({ email: email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists.');
	}

	const user = await User.create({
		name: name,
		email: email,
		password: password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data.');
	}
});

// @description Get user profile
// @route POST /api/users/profile
// @access Private

const getUserProfile = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found.');
	}
});

// @description Update user profile
// @route PUT /api/users/profile
// @access Private

const updateUserProfile = expressAsyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		// Get request body name, if it not exist, keep the username.
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

export { authUser, getUserProfile, registerUser, updateUserProfile };