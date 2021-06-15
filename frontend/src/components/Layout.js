/** @format */

import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default function Layout({ title, children }) {
	document.title = title;
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}

Layout.defaultProps = {
	title: 'Barista - Coffee Shop',
};
