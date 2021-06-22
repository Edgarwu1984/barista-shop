/** @format */
import bcrypt from 'bcryptjs';
const users = [
	{
		name: 'admin',
		email: 'admin@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'wuzhengjie',
		email: 'wuzhengjie@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
	{
		name: 'edgarwu',
		email: 'edgarwu@gmail.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: false,
	},
];

export default users;
