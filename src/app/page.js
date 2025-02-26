'use client';

import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom';
// import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ui/ThemeContext';
import { NavBar } from '../components/navbar';
import { GettingStarted } from '../components/getting-started-page';
import Catelog from '../components/home';
import Blog from '@/components/blog';
import Create from '@/components/createBlog';

function Layout() {
	const location = useLocation();
	const hideNavbar = location.pathname === '/';
	const [searchResults, setSearchResults] = useState(null);

	return (
		<>
			{!hideNavbar && <NavBar setSearchResults={setSearchResults}/>}
			<Routes>
				<Route path='/' element={<GettingStarted />} />
				{/* <Route path='/blogs' element={<Home />} /> */}
				<Route path='/create' element={<Create />} />
				<Route
					path='/blogs'
					element={<Catelog blogs={searchResults || undefined} setSearchResults={setSearchResults} />}
				/>
				<Route path='/blog/:id' element={<Blog />} />
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
