'use client';

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from '@/components/ui/ThemeContext';
import { NavBar } from '../components/navbar';
import { GettingStarted } from '../components/getting-started-page';
import Write from '../components/Write';

function Home() {
	return (
		<>
			<ThemeProvider>
				<Router>
					<NavBar />
					<Routes>
						<Route path='/' element={<GettingStarted />} />
						<Route path='/write' element={<Write />} />
					</Routes>
				</Router>
				{/* <Write /> */}
			</ThemeProvider>
		</>
	);
}

export default Home;
