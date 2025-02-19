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
import Catelog from '../components/home';
import Blog from '@/components/blog';
import Create from '@/components/createBlog';

function Layout() {
	const location = useLocation();
	const hideNavbar = location.pathname === '/';

	return (
		<>
			{!hideNavbar && <NavBar />}
			<Routes>
				<Route path='/' element={<GettingStarted />} />
				<Route path='/create' element={<Create />} />
				<Route path='/blogs' element={<Catelog />} />
				<Route path='/blog' element={<Blog />} />
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
