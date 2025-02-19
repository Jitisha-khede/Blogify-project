'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from './3d-card';
// import { OrbitingCircles } from './orbiting-circles';
import {
	IconMessage,
	IconThumbUp,
	IconThumbDown,
	IconBookmark,
	IconLink,
} from '@tabler/icons-react';

export const HoverEffect = ({ items, className }) => {
	let [hoveredIndex, setHoveredIndex] = useState(null);

	return (
		<div
			className={cn(
				'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ',
				className
			)}>
			{items.map((item, idx) => (
				<Link
					href={item?.link}
					key={item?.link}
					className='relative group  block h-full w-full mx-4'
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}>
					<CardContainer
						className={cn(
							'rounded-2xl h-[25rem] w-full bg-tranparent relative z-40 mt-10 mx-2',
							className
						)}>
						<CardBody className='bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-[25rem] rounded-xl p-4 border mx-2 '>
							<CardItem
								translateZ='20'
								className='text-xl font-bold text-neutral-600 dark:text-white'>
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
									<Link
										href='#'
										onClick={e => {
											e.preventDefault();
											window.open(item.github, '_blank');
										}}
										className='block'>
										<div className='h-auto w-full mt-4 rounded-full dark:bg-black bg-white flex items-center justify-start gap-1'>
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
													23
												</span>
											</button>

											<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
												<IconBookmark className='h-6 w-auto text-black dark:text-white' />
											</button>
											<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
												<IconLink className='h-6 w-auto text-black dark:text-white' />
											</button>
										</div>
									</Link>
								</CardItem>
							</div>
							<div className='flex justify-between items-center mt-2'>
								<CardItem
									translateZ={20}
									as='div'
									className='rounded-2xl font-normal dark:text-white'>
									<Link
										href='#'
										onClick={e => {
											e.preventDefault();
											window.open(item.github, '_blank');
										}}
										className='flex items-center gap-2'></Link>
								</CardItem>
							</div>
						</CardBody>
					</CardContainer>
				</Link>
			))}
		</div>
	);
};
