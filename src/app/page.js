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
import SignupForm from '@/components/ui/signup';
import LoginForm from '@/components/ui/login';
import Form from '@/components/form';
import EditProfile from '@/components/edit-profile';
import PersonalInfo from '@/components/ui/personal-info-update';
import Profile from '@/components/ui/profile';

function Layout() {
	const location = useLocation();
	const hideNavbar = location.pathname === '/';
	const [searchResults, setSearchResults] = useState(null);

	return (
		<>
			{!hideNavbar && <NavBar setSearchResults={setSearchResults} />}
			<Routes>
				<Route path='/' element={<GettingStarted />} />
				{/* <Route path='/blogs' element={<Blog />} /> */}
				<Route path='/create' element={<Create />} />
				<Route path='/blogs' element={<Catelog />} />
				<Route path='/blog/:id' element={<Blog />} />
				<Route path='/signup' element={<SignupForm />} />
				<Route path='/login' element={<LoginForm />} />

				{/* <Route path='/login' element={<Form />} /> */}
				<Route path='/edit-profile' element={<PersonalInfo />} />
				<Route path='/profile' element={<Profile />} />
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
