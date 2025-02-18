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
<<<<<<< HEAD
import Blogs from '../components/home';
=======
import Catelog from '../components/home';
>>>>>>> 2beaa133022ef0f2c7f0944e9e03c028f1d1e957
import Blog from '@/components/blog';
import Create from '@/components/create';

function Layout() {
	const location = useLocation();
	const hideNavbar = location.pathname === '/';

	return (
		<>
			{!hideNavbar && <NavBar />}
			<Routes>
				<Route path='/' element={<GettingStarted />} />
<<<<<<< HEAD
				<Route path='/blogs' element={<Blogs />} />
				<Route path='/blog' element={<Blog />} />
=======
				<Route path='/create' element={<Create />} />
				<Route path='/blogs' element={<Catelog />} />
>>>>>>> 2beaa133022ef0f2c7f0944e9e03c028f1d1e957
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
