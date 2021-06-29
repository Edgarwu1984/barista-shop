/** @format */

import React from 'react';
import { bg2 } from 'assets';

export default function Hero({ bgImage, height, children }) {
	const backGroundImage = {
		backgroundImage: `url('${bgImage}')`,
		height: `${height}`,
	};

	return (
		<div className='hero' style={backGroundImage}>
			<div className='container hero__wrapper pt-3'>{children}</div>
		</div>
	);
}

Hero.defaultProps = {
	bgImage: { bg2 },
	height: '600px',
};
