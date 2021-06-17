/** @format */

import React, { useState } from 'react';
import Divider from './Divider';

function ContactForm() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({
			username: username,
			email: email,
			subject: subject,
			message: message,
		});

		setUsername('');
		setEmail('');
		setSubject('');
		setMessage('');
	};

	return (
		<form onSubmit={handleSubmit} className='contact__form'>
			<div className='container'>
				<h2>Any Questions? Contact Us</h2>
				<Divider />
				<div className='row'>
					<input
						type='text'
						id='username'
						value={username}
						placeholder='Username'
						required
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						type='email'
						id='email'
						value={email}
						placeholder='Email'
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='row'>
					<input
						type='text'
						id='subject'
						value={subject}
						placeholder='Subject'
						required
						onChange={(e) => setSubject(e.target.value)}
					/>
				</div>
				<div className='row'>
					<textarea
						name='message'
						id='message'
						cols='30'
						rows='10'
						value={message}
						placeholder='Message...'
						required
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>
				<div className='row'>
					<input
						type='submit'
						className='btn btn-lg btn-block'
						value='Submit'
					/>
				</div>
			</div>
		</form>
	);
}

export default ContactForm;
