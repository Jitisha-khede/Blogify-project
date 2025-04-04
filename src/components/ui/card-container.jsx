'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Update this import
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from './3d-card';
// import { OrbitingCircles } from './orbiting-circles';
import {
	IconMessage,
	IconThumbUp,
	IconThumbDown,
	IconBookmark,
	IconBookmarksFilled,
	IconLink,
} from '@tabler/icons-react';

export const HoverEffect = ({ items, className, filterOpen }) => {
	let [hoveredIndex, setHoveredIndex] = useState(null);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [showCopyMessage, setShowCopyMessage] = useState(false);
	const copyToClipboard = (e, blogLink) => {
		e.preventDefault(); // Prevent the link navigation
		e.stopPropagation(); // Prevent event bubbling to parent elements

		const fullUrl = window.location.origin + blogLink;
		navigator.clipboard
			.writeText(fullUrl)
			.then(() => {
				setShowCopyMessage(true);
				setTimeout(() => {
					setShowCopyMessage(false);
				}, 1000);
			})
			.catch(err => console.error('Failed to copy:', err));
	};

	return (
		<div
			className={cn(
				'grid grid-cols-1',
				// Adjust columns based on filter state and screen size
				filterOpen
					? 'md:grid-cols-1 lg:grid-cols-2'
					: 'md:grid-cols-2 lg:grid-cols-3',
				className
			)}>
			{showCopyMessage && (
				<div
					className='fixed top-20 right-4 bg-gray-200 text-gray-800 py-2.5 px-5 rounded-lg shadow-lg z-50
                    flex items-center gap-2 border border-gray-400
                    animate-[fadeInOut_1s_ease-in-out]'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5 text-green-400'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M5 13l4 4L19 7'
						/>
					</svg>
					<span className='font-medium'>
						Link copied to clipboard!
					</span>
				</div>
			)}
			{items.map((item, idx) => (
				<Link
					to={item?.link} // Change 'href' to 'to' for React Router
					key={item?.link}
					className='relative group block h-full w-full'
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}>
					<CardContainer
						className={cn(
							'rounded-2xl h-[25rem] w-full bg-tranparent relative z-40 mt-10 mx-2',
							className
						)}>
						<CardBody className='bg-gray-100 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-gray-900 dark:border-white/[0.2] border-gray-white/[0.1] w-full sm:w-[30rem] h-[25rem] rounded-xl p-4 border mx-2 '>
							<CardItem
								translateZ='20'
								className='text-xl font-bold text-neutral-800 dark:text-gray-100'>
								{item.title}
							</CardItem>
							<CardItem
								as='p'
								translateZ='20'
								className='text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300'>
								{item.description}
							</CardItem>
							<CardItem translateZ='20' className='w-full mt-2'>
								<Image
									src={item.image}
									height='1000'
									width='1000'
									className='h-52 w-full object-cover rounded-xl group-hover/card:shadow-xl'
									alt={item.title}
								/>
							</CardItem>
							<div className='flex justify-center items-center mt-2'>
								<CardItem
									translateZ={20}
									as='div'
									className='rounded-xl text-s font-normal dark:text-white w-auto'>
									<div className='h-auto w-full mt-4 rounded-full  flex items-center justify-start gap-1'>
										<button className='flex flex-1 items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
											<IconThumbUp className='h-6 w-auto dark:text-white text-black' />
											<span className='dark:text-white text-black text-lg'>
												{item.likes}
											</span>
										</button>

										<button className='flex flex-1 items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
											<IconThumbDown className='h-6 w-auto text-black dark:text-white' />
											<span className='dark:text-white text-black text-lg'>
												{item.dislikes}
											</span>
										</button>
										<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
											<IconMessage className='h-6 w-auto text-black dark:text-white' />
											<span className='dark:text-white text-black text-lg'>
												{item.commentCount}
											</span>
										</button>

										<button
											className={`flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all p-1 sm:px-2
                                              ${
																								isBookmarked
																									? 'text-red-400'
																									: ''
																							}`}
											onClick={() => setIsBookmarked(!isBookmarked)}>
											{isBookmarked ? (
												<IconBookmarksFilled className='h-5 w-auto' />
											) : (
												<IconBookmark className='h-5 w-auto' />
											)}
										</button>
										<button
											onClick={e => copyToClipboard(e, item.link)}
											className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
											<IconLink className='h-6 w-auto text-black dark:text-white' />
										</button>
									</div>
								</CardItem>
							</div>
							<div className='flex justify-between items-center mt-2'>
								<CardItem
									translateZ={20}
									as='div'
									className='rounded-2xl font-normal dark:text-white'></CardItem>
							</div>
						</CardBody>
					</CardContainer>
				</Link>
			))}
		</div>
	);
};
