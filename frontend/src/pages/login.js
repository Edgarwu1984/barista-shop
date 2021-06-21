/** @format */

import React from 'react';
import Hero from 'components/layout/Hero';
import { bg1 } from 'assets';

function LoginPage() {
	return (
		<Hero height='100vh' bgImage={bg1}>
			{/* <div className='container center'>
				<form>
					<div>
						<label>Username</label>
						<input type='text' id='username' />
					</div>
					<div>
						<input type='password' id='password' />
					</div>
					<div>
						<input className='btn btn-block' type='submit' id='login' />
					</div>
				</form>
			</div> */}
		</Hero>
	);
}

export default LoginPage;
