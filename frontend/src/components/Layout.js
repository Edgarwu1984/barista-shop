/** @format */

import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import BackToTop from './BackToTop';

export default function Layout({ title, children }) {
	document.title = title;
	return (
		<>
			<Header />
			{children}
			<BackToTop />
			<Footer />
		</>
	);
}

Layout.defaultProps = {
	title: 'Barista - Coffee Shop',
};
