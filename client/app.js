import React from 'react';
import { NavBar } from './components';
import Routes from './routes';

const App = () => {
	return (
		<div>
			<NavBar />
			<main>
				<Routes />
			</main>
		</div>
	);
};

export default App;
