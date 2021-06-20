/** @format */

import React from 'react';
function Sidebar({ category }) {
	return (
		<div>
			{!category ? (
				<h4>Empty Categories</h4>
			) : (
				category.map((category, index) => (
					<div className='filter' key={index}>
						<h4 className='section-title mb-1'>{category.typeName}</h4>
						<div className='filter__list mb-2'>
							{category.categories.map((c, index) => (
								<li className='filter__list-item mb-1' key={index}>
									<a href='/'>{c}</a>
								</li>
							))}
						</div>
					</div>
				))
			)}
		</div>
	);
}

export default Sidebar;
