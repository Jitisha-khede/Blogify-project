'use client';
import { useState, useRef, useEffect, use } from 'react';
import { SearchBar } from './ui/searchBar';
import { useTheme } from './ui/useTheme';
import { fetchUserById } from '@/utils/api';
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
	IconLogin,
	IconLogout,
} from '@tabler/icons-react';
import BookmarksDropdown from './bookmarks';
import AuthModal from './ui/auth-modal';
import { fetchBoookmarks } from '@/utils/api';

export const NavBar = () => {
	const { theme, toggleTheme } = useTheme();
	const [user, setUser] = useState(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [ProfilePic,setProfilePic] = useState('https://res.cloudinary.com/ddagtg9fo/image/upload/v1736452441/hk7sfadgvpsmtdt6kgv7.png')
	const userId = localStorage.getItem('userId');

	const profileRef = useRef(null);
	const navigate = useNavigate();

	// Check if user is authenticated
	const isAuthenticated = () => {
		return document.cookie.split('; ').some(cookie => cookie.startsWith('token='));
	};

	// Handle logout
	// import { useNavigate } from "react-router-dom";

const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Remove userId (if stored)
    localStorage.removeItem("userId");

    // Remove cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Close profile dropdown (if open)
    setIsProfileOpen(false);
	setUser(null);
    // Redirect to /blogs
    // navigate("/blogs");
};


	useEffect(() => {
			const fetchUserData = async () => {
				if (!userId) return;	
				const userData = await fetchUserById(userId);
				if(userData.data.user.profileImage){
					setProfilePic(userData.data.user.profileImage);
				}
			};
			fetchUserData();
	},[userId])	

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
			to: '/blogs',
			icon: IconHome,
		},
		{
			title: 'Write',
			to: '/create',
			icon: IconPencil,
			requiresAuth: true,
		},
		{
			title: 'Bookmarks',
			icon: IconBookmarks,
			onClick: () => {
				if (isAuthenticated()) {
					setIsBookmarksOpen(prev => !prev);
				} else {
					setIsAuthModalOpen(true);
				}
			},
			requiresAuth: true,
		},
	];

	// Handle link click with auth protection
	const handleLinkClick = link => {
		if (link.requiresAuth && !isAuthenticated()) {
			setIsAuthModalOpen(true);
			return false;
		}

		if (link.onClick) {
			link.onClick();
		} else if (link.to) {
			navigate(link.to);
		}

		return true;
	};

	return (
		<div className='max-w-7xl mx-auto px-4'>
			{/* Auth Modal */}
			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={() => setIsAuthModalOpen(false)}
			/>

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
								{links.map(link => (
									<button
										key={link.title}
										onClick={() => handleLinkClick(link)}
										className='p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'>
										<link.icon className='w-5 h-5' />
									</button>
								))}

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

							{/* Profile Button/Login Button */}
							<div className='relative' ref={profileRef}>
								{isAuthenticated() ? (
									<button
										onClick={() => setIsProfileOpen(!isProfileOpen)}
										className='p-2 rounded-lg transition-colors duration-200'
										aria-label='Profile menu'>
										<img
											src={ProfilePic}
											alt='Profile'
											className='w-8 h-8 rounded-full object-cover border-2 border-blue-600 dark:border-blue-400'
											onError={e => {
												e.target.src =
													'https://via.placeholder.com/150';
											}}
										/>
									</button>
								) : (
									<button
										onClick={() => setIsAuthModalOpen(true)}
										className='p-2 rounded-lg transition-colors duration-200 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1'
										aria-label='Login'>
										<IconLogin className='w-5 h-5' />
										<span className='text-sm'>Login</span>
									</button>
								)}

								{isProfileOpen && isAuthenticated() && (
									<div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 border dark:border-gray-800 z-50'>
										<button
											onClick={() => {
												setIsProfileOpen(false);
												navigate('/profile');
											}}
											className='w-full text-left px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800'>
											<div className='flex items-center gap-2'>
												<IconUser className='w-4 h-4' />
												<span>Profile</span>
											</div>
										</button>

										<div className='border-t dark:border-gray-800 my-1'></div>
										<button
											onClick={handleLogout}
											className='w-full text-left px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-800'>
											<div className='flex items-center gap-2'>
												<IconLogout className='w-4 h-4' />
												<span>Logout</span>
											</div>
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
                    ${
											isMenuOpen
												? 'translate-x-0'
												: '-translate-x-full'
										}`}>
					{/* Mobile Menu Links */}
					<div className='flex flex-col p-4 space-y-4'>
						{links.map(link => (
							<button
								key={link.title}
								onClick={() => {
									const success = handleLinkClick(link);
									if (success) {
										setIsMenuOpen(false);
									}
								}}
								className='flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'>
								<link.icon className='w-5 h-5' />
								<span>{link.title}</span>
							</button>
						))}
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
