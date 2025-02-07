'use client';
import { SearchBar } from './ui/searchbar';
import { useTheme } from './ui/useTheme';
import { Link } from 'react-router-dom';
import {
	IconBookmark,
	IconHome,
	IconPencil,
	IconArticle,
	IconSun,
	IconMoon,
	IconFilter, // Add this import
} from '@tabler/icons-react';

const links = [
	{
		title: 'Home',
		to: '/',
		icon: IconHome,
	},
	{
		title: 'Write',
		to: '/write',
		icon: IconPencil,
	},
	{
		title: 'Blog',
		to: '/blog',
		icon: IconArticle,
	},
	{
		title: 'Bookmarks',
		to: '/bookmarks',
		icon: IconBookmark,
	},
	{
		title: 'Filter',
		to: '/',
		icon: IconFilter,
	},
];

export const NavBar = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className='max-w-7xl mx-auto px-4'>
			<div className='flex items-center justify-between h-16'>
				{/* Brand Logo */}
				<div className='font-semibold text-xl bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text'>
					Blogify
				</div>
				<SearchBar />
				{/* Navigation Links */}
				<div className='flex items-center gap-4'>
					{links.map(link => (
						<Link
							key={link.title}
							to={link.to}
							className='p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600'>
							<link.icon className='w-5 h-5' />
						</Link>
					))}

					{/* Theme Toggle Button */}
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
					<div>
						<img
							src='/images/default-user.png'
							alt='user'
							className='w-5 h-5 border border-blue-500 rounded-full'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
