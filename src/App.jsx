import React from 'react';
import { HashRouter } from 'react-router-dom';

import { WelcomePage } from './Components/welcomePage/welcomePage';

const App = () => {
	return (
		<HashRouter>
			<WelcomePage />
		</HashRouter>
	);
};

export default App;
