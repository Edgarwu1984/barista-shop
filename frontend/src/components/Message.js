/** @format */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

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
			<p className={type}>{message}</p>
		</div>
	);
}

Message.propTypes = {
	message: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
};

Message.defaultProps = {
	message: 'Notification message.....',
	type: 'success',
	duration: 3000,
};
