import React from 'react';
import Home from './components/Home';
import store from './reduxManager';
import { Provider } from 'react-redux';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Home />
			</Provider>
		</div>
	);
}

export default App;
