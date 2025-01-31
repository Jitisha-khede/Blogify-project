'use client';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from '@/components/ui/ThemeContext';
import { NavBar } from '../components/navbar';
import { GettingStarted } from '../components/getting-started-page';
import Write from '../components/Write';

function Layout() {
	const location = useLocation();

	// Hide Navbar on the Getting Started page ("/")
	const hideNavbar = location.pathname === '/';

	return (
		<>
			{!hideNavbar && <NavBar />}
			<Routes>
				<Route path='/' element={<GettingStarted />} />
				<Route path='/write' element={<Write />} />
			</Routes>
		</>
	);
}


function Home() {
	return (
		<>
			<ThemeProvider>
			<Router>
				<Layout />
			</Router>
		</ThemeProvider>
		</>
	);
}

export default Home;
