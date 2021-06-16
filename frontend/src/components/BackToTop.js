/** @format */

import React, { useState, useEffect } from 'react';
import { RiArrowUpLine } from 'lib/icons';

export default function BackToTop() {
	const [showBtn, setShowBtn] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', handleEvent);
		return () => {
			window.removeEventListener('scroll', handleEvent);
		};
	}, []);

	const handleEvent = () => {
		if (window.scrollY > 600) {
			setShowBtn(true);
		} else {
			setShowBtn(false);
		}
	};

	const scrollTop = () => {
		window.scrollTo('top', 0);
	};
	return (
		<button
			className={showBtn ? 'btn-back__top' : 'btn-back__top hidden'}
			onClick={scrollTop}>
			<RiArrowUpLine />
		</button>
	);
}
