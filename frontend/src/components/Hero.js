/** @format */

import React from 'react';

export default function Hero({ bgImage, height, children }) {
	const backGroundImage = {
		backgroundImage: `url('${bgImage}')`,
		height: `${height}`,
	};

	return (
		<div className='hero' style={backGroundImage}>
			<div className='container hero__wrapper'>{children}</div>
		</div>
	);
}

Hero.defaultProps = {
	bgImage: '/images/bg2.png',
	height: '600px',
};
