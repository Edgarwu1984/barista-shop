/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes } from '../lib/icons';

export default function Message({ message, type, duration }) {
	const [showMessage, setShowMessage] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowMessage(false);
		}, duration);

		return () => {
			clearTimeout(timeout);
		};
	});

	return (
		<div className={showMessage ? 'message' : 'disabled'}>
			<button className='quit__btn' onClick={() => setShowMessage(false)}>
				<FaTimes />
			</button>
			<p className={type}>{message}</p>
		</div>
	);
}

Message.propTypes = {
	message: PropTypes.string,
	type: PropTypes.string.isRequired,
	duration: PropTypes.number,
};

Message.defaultProps = {
	message: 'Notification message.....',
	type: 'success',
	duration: 3000,
};
