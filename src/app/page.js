'use client';

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import React from 'react';
import { GettingStarted } from '../components/getting-started-page';
import { NavBar } from '../components/navbar';
import { ThemeProvider } from '@/components/ui/ThemeContext';

function Home() {
	return (
		<>
			<ThemeProvider>
				<NavBar />
				<Router>
					<Routes>
						<Route path='/' element={<GettingStarted />} />
						{/* <Route path='/' element={<Home />} /> */}
					</Routes>
				</Router>
			</ThemeProvider>
		</>
	);
}

export default Home;
