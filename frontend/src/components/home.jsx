'use client';

import React, { useEffect, useState } from 'react';
import { HoverEffect } from './ui/card-container';
import { fetchBlogs } from '@/utils/api';
import Link from 'next/link';
import { Filter, Menu } from 'lucide-react'; // Import Menu icon
import { FilterSidebar } from './filters';
import { useMediaQuery } from '@/hooks/use-media-query'; // We'll create this hook

const Catelog = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filterOpen, setFilterOpen] = useState(false);

	// Check if screen is mobile or tablet
	const isMobile = useMediaQuery('(max-width: 640px)');

	// Add effect to handle body scroll locking
	useEffect(() => {
		if (filterOpen && isMobile) {
			// Disable scrolling on the body when filter is open on mobile
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scrolling when filter is closed or on desktop
			document.body.style.overflow = 'auto';
		}

		// Cleanup function to ensure scroll is re-enabled when component unmounts
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [filterOpen, isMobile]);

	useEffect(() => {
		const loadBlogs = async () => {
			try {
				const data = await fetchBlogs();
				setBlogs(data);
				setLoading(false);
			} catch (err) {
				console.error('Error loading blogs:', err);
				setError('Error loading blogs');
				setLoading(false);
			}
		};
		loadBlogs();
	}, []);

	// If loading, show loading message
	if (loading) {
		return <div>Loading blogs...</div>;
	}

	// If there's an error, show error message
	if (error) {
		return <div>{error}</div>;
	}

	// Toggle filter function that handles opening and closing the sidebar
	const toggleFilter = () => {
		setFilterOpen(!filterOpen);
	};

	return (
		<div className='flex h-full'>
			{/* Mobile hamburger menu */}
			{isMobile && (
				<div className='fixed top-4 right-4 z-40'>
					<button
						onClick={toggleFilter}
						className='p-2 bg-primary text-primary-foreground rounded-md shadow-md'
						aria-label='Toggle filters'>
						<Menu className='h-5 w-5' />
					</button>
				</div>
			)}

			{/* Main content area with transition */}
			<div
				className={`flex-grow relative transition-all duration-300 ease-in-out ${
					filterOpen && !isMobile ? 'pr-[30%]' : ''
				}`}>
				<div className='absolute top-4 right-8 z-10'>
					<button
						onClick={toggleFilter}
						className='flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-sm hover:bg-primary/90 transition-colors'>
						<Filter className='h-4 w-4' />
						Filter
					</button>
				</div>

				<div id='Projects' className='w-full mx-auto md:px-8 pt-16'>
					{blogs.length > 0 ? (
						<HoverEffect
							items={blogs.map(blog => ({
								title: blog._doc.title,
								description: blog._doc.body?.substring(0, 100),
								link: `/blog/${blog._doc._id}`,
								image:
									blog._doc.coverImageUrl ||
									'/images/default-blog.png',
								likes: blog._doc.upvotes.length,
								dislikes: blog._doc.downvotes.length,
								commentCount: blog.commentCount,
							}))}
							filterOpen={filterOpen}
						/>
					) : (
						<p>No blogs available.</p>
					)}
				</div>
			</div>

			{/* Responsive Sidebar */}
			<div
				className={`fixed top-0 right-0 mt-16 h-full bg-card dark:bg-gray-800 shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
					filterOpen ? 'translate-x-0' : 'translate-x-full'
				} ${isMobile ? 'w-full' : 'w-[30%]'}`}>
				<FilterSidebar
					isMobile={isMobile}
					onClose={() => setFilterOpen(false)}
					onApplyFilters={filters => {
						console.log('Applied filters:', filters);
						// Logic to filter blogs based on selected filters
						setFilterOpen(false);
					}}
				/>
			</div>
		</div>
	);
};

export default Catelog;
