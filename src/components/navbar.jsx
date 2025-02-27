'use client';
import { useState, useRef, useEffect } from 'react';
import { SearchBar } from './ui/searchbar';
import { useTheme } from './ui/useTheme';
import { Link, useNavigate } from 'react-router-dom';
import {
	IconBookmarks,
	IconHome,
	IconPencil,
	IconArticle,
	IconSun,
	IconMoon,
	IconFilter,
	IconUser,
} from '@tabler/icons-react';
import BookmarksDropdown from './bookmarks';

export const NavBar = () => {
	const { theme, toggleTheme } = useTheme();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const profileRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				profileRef.current &&
				!profileRef.current.contains(event.target)
			) {
				setIsProfileOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const links = [
		{
			title: 'Home',
			to: '/',
			icon: IconHome,
		},
		{
			title: 'Write',
			to: '/create',
			icon: IconPencil,
		},
		{
			title: 'Blog',
			to: '/blogs',
			icon: IconArticle,
		},
		{
			title: 'Bookmarks',
			icon: IconBookmarks,
			onClick: () => setIsBookmarksOpen(prev => !prev),
		},
		{
			title: 'Filter',
			to: '/login',
			icon: IconFilter,
		},
	];

	return (
		<div className='max-w-7xl mx-auto px-4'>
			{/* Make the header fixed and add z-index */}
			<div className='fixed top-0 left-0 right-0 bg-slate-100 dark:bg-gray-900 z-50'>
				<div className='max-w-7xl mx-auto px-4'>
					<div className='flex items-center justify-between h-16'>
						{/* Brand Logo */}
						<div className=''>
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className='md:pointer-events-none font-semibold text-xl bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text'
								aria-label='Toggle menu'>
								Blogify
							</button>
						</div>

						{/* Center SearchBar */}
						<div className='flex justify-center'>
							<SearchBar />
						</div>

						{/* Desktop Navigation */}
						<div className='flex items-center justify-end'>
							<div className='hidden md:flex items-center gap-0'>
								{links.map(link =>
									link.to ? (
										<Link
											key={link.title}
											to={link.to}
											className='p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'>
											<link.icon className='w-5 h-5' />
										</Link>
									) : (
										<button
											key={link.title}
											onClick={link.onClick}
											className='p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'>
											<link.icon className='w-5 h-5' />
										</button>
									)
								)}

								<button
									onClick={toggleTheme}
									className='p-2 rounded-lg transition-colors duration-200'
									aria-label='Toggle theme'>
									{theme === 'dark' ? (
										<IconSun className='w-5 h-5 text-blue-600 dark:text-blue-400' />
									) : (
										<IconMoon className='w-5 h-5 text-blue-600 dark:text-blue-400' />
									)}
								</button>
							</div>
							<div className='relative' ref={profileRef}>
								<button
									onClick={() => setIsProfileOpen(!isProfileOpen)}
									className='p-2 rounded-lg transition-colors duration-200'
									aria-label='Profile menu'>
									<img
										src='public/images/profile.jpg'
										alt='Profile'
										className='w-8 h-8 rounded-full object-cover border-2 border-blue-600 dark:border-blue-400'
									/>

									{/* <IconUser className='w-5 h-5 text-blue-600 dark:text-blue-400' /> */}
								</button>

								{isProfileOpen && (
									<div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 border dark:border-gray-800 z-50'>
										<button
											onClick={() => {
												setIsProfileOpen(false);
												navigate('/profile');
											}}
											className='w-full text-left px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800'>
											Show Profile
										</button>
										<button
											onClick={() => {
												setIsProfileOpen(false);
												navigate('/edit-profile');
											}}
											className='w-full text-left px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800'>
											Edit Profile
										</button>
										<div className='border-t dark:border-gray-800 my-1'></div>
										<button
											onClick={() => {
												setIsProfileOpen(false);
												// Add login/logout logic here
											}}
											className='w-full text-left px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800'>
											Logout
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<BookmarksDropdown
					isOpen={isBookmarksOpen}
					onClose={() => setIsBookmarksOpen(false)}
					className='md:absolute md:right-0 md:top-16 fixed inset-x-0 top-16 md:w-80 w-full'
				/>
			</div>

			{/* Add padding to account for fixed header */}
			<div className='h-16'></div>

			{/* Mobile Menu - Adjust top position */}
			{isMenuOpen && (
				<div
					className={`md:hidden fixed inset-x-0 top-16 bg-white dark:bg-gray-900 border-t 
					dark:border-gray-800 shadow-lg z-50 h-[calc(100vh-4rem)] transition-transform duration-300 
					${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
					{/* Mobile Search Bar */}

					{/* Mobile Menu Links */}
					<div className='flex flex-col p-4 space-y-4'>
						{links.map(link =>
							link.to ? (
								<Link
									key={link.title}
									to={link.to}
									className='flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
									onClick={() => setIsMenuOpen(false)}>
									<link.icon className='w-5 h-5' />
									<span>{link.title}</span>
								</Link>
							) : (
								<button
									key={link.title}
									onClick={e => {
										link.onClick(e);
										setIsMenuOpen(false);
									}}
									className='flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'>
									<link.icon className='w-5 h-5' />
									<span>{link.title}</span>
								</button>
							)
						)}
					</div>

					<div className='flex items-center justify-between pt-4 border-t dark:border-gray-800'>
						<button
							onClick={toggleTheme}
							className='flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'>
							{theme === 'dark' ? (
								<>
									<IconSun className='w-5 h-5' />
									<span>Light Mode</span>
								</>
							) : (
								<>
									<IconMoon className='w-5 h-5' />
									<span>Dark Mode</span>
								</>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
