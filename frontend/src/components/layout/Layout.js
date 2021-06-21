/** @format */

import React from 'react';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import BackToTop from 'components/BackToTop';

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
