'use client';
import React from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { NumberTicker } from './ui/number-ticker';
import {
	IconMessage,
	IconThumbUp,
	IconThumbDown,
	IconBookmark,
	IconLink,
} from '@tabler/icons-react';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DirectionAwareHover } from './ui/direction-aware-hover';
import { comment } from 'postcss';
import CommentsSection from './comment-section';

export default function Blog() {
	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(window.location.href)
			.then(() => alert('Link copied to clipboard!'))
			.catch(err => console.error('Failed to copy:', err));
	};

	const [isBookmarked, setIsBookmarked] = useState(false);
	const imageUrl =
		'https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	return (
		<div className='relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-4 items-center justify-center bg-slate-100 dark:bg-gray-900 font-thin tracking-wide [word-spacing:0.1em]'>
			{Content.map((item, index) => (
				<div
					key={`content-${index}`}
					className='mb-10 max-w-5xl mx-auto'>
					<div className='text-base sm:text-sm lg:text-lg prose prose-sm dark:prose-invert w-full max-w-[85vw] mb-10 justify-items-center mx-auto '>
						{/* Image Section*/}
						<div className='relative mb-4'>
							<p
								className={twMerge(
									'text-2xl sm:text-3xl lg:text-4xl w-full font-bold flex justify-self-center gap-4 mt-2 mb-10'
								)}>
								{item.title}
							</p>
							{item?.image && (
								<>
									<Image
										src={item.image}
										alt='blog thumbnail'
										height='1000'
										width='1000'
										className='w-full max-w-[80vw] h-[200px] sm:h-[500px] lg:h-[700px] rounded-lg object-cover mx-auto'
									/>

									{/* Below image content */}
									<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-2 mb-4'>
										{/* Interaction buttons */}
										<div className='flex flex-wrap items-center gap-2 w-full min-w-80 md:w-auto mt-1'>
											<button className='flex items-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all p-1.5 sm:px-3'>
												<IconThumbUp className='h-5 w-auto ' />
												<span className=' ml-1'>
													<NumberTicker
														value={item.stats.likes}
														className='whitespace-pre-wrap font-medium tracking-tighter '
													/>
												</span>
											</button>
											<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all p-1 sm:px-2'>
												<IconThumbDown className='h-5 w-auto ' />
												<NumberTicker
													value={item.stats.dislikes}
													className='whitespace-pre-wrap font-medium tracking-tighter '
												/>
											</button>

											<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all p-1 sm:px-2'>
												<IconMessage className='h-5 w-auto ' />
												<NumberTicker
													value={item.stats.comment}
													className='whitespace-pre-wrap font-medium tracking-tighter '
												/>
											</button>

											<button
												className={`flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all p-1 sm:px-2`}
												onClick={() =>
													setIsBookmarked(!isBookmarked)
												}>
												<IconBookmark
													className={`h-5 w-auto ${
														isBookmarked
															? 'text-red-400 fill-current'
															: ''
													}`}
												/>
											</button>

											<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all p-1 sm:px-2'>
												<IconLink className='h-6 w-auto ' />
											<button onClick={copyToClipboard} className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all p-1 sm:px-2'>
												<IconLink className='h-6 w-auto text-black dark:text-white' />
											</button>
										</div>

										{/* Tags */}
										<div className='flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end'>
											{item.tags.map((tag, index) => (
												<h2
													key={index}
													className='bg-red-600 dark:bg-red text-gray-900 dark:text-white rounded-full text-xs sm:text-sm w-fit px-3 py-1 backdrop-blur-3xl bg-opacity-70'>
													{tag}
												</h2>
											))}
										</div>
									</div>
								</>
							)}
						</div>

						{/* Content */}
						{item.description}

						{/*About Author Section */}
						<div className='max-w-5xl justify-center items-center flex gap-8 mx-auto mt-20'>
							<Image
								src={imageUrl}
								alt={item.author}
								width={32}
								height={32}
								className='h-32 w-32 rounded-full'
							/>
							<div className='flex flex-col'>
								<p className='font-medium text-base'>{item.author}</p>
								{item.experience && (
									<p className='font-light text-sm text-gray-600 dark:text-gray-400 truncate'>
										{item.experience}
									</p>
								)}
							</div>
						</div>
					</div>
					<CommentsSection />
				</div>
			))}
		</div>
	);
}

const Content = [
	{
		title: 'Lorem Ipsum Dolor Sit Amet',
		author: 'Harry Potter',
		experience: 'Highly Experienced',
		about: `Sit duis est minim proident non nisi velit non consectetur.
					Esse adipisicing laboris consectetur enim ipsum
					reprehenderit eu deserunt Lorem ut aliqua anim do. Duis
					cupidatat qui irure cupidatat incididunt incididunt enim
					magna id est qui sunt fugiat. Laboris do duis pariatur
					fugiat Lorem aute sit ullamco. Qui deserunt non
					reprehenderit dolore nisi velit exercitation Lorem qui do
					enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum
					nostrud fugiat voluptate do Lorem culpa officia sint labore.
					Tempor consectetur excepteur ut fugiat veniam commodo et
					labore dolore commodo pariatur.`,
		stats: {
			likes: 456,
			comment: 456,
			dislikes: 456,
		},
		description: (
			<>
				<p>
					Sit duis est minim proident non nisi velit non consectetur.
					Esse adipisicing laboris consectetur enim ipsum
					reprehenderit eu deserunt Lorem ut aliqua anim do. Duis
					cupidatat qui irure cupidatat incididunt incididunt enim
					magna id est qui sunt fugiat. Laboris do duis pariatur
					fugiat Lorem aute sit ullamco. Qui deserunt non
					reprehenderit dolore nisi velit exercitation Lorem qui do
					enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum
					nostrud fugiat voluptate do Lorem culpa officia sint labore.
					Tempor consectetur excepteur ut fugiat veniam commodo et
					labore dolore commodo pariatur.
				</p>
				<p>
					Dolor minim irure ut Lorem proident. Ipsum do pariatur est
					ad ad veniam in commodo id reprehenderit adipisicing.
					Proident duis exercitation ad quis ex cupidatat cupidatat
					occaecat adipisicing.
				</p>
				<p>
					Tempor quis dolor veniam quis dolor. Sit reprehenderit
					eiusmod reprehenderit deserunt amet laborum consequat
					adipisicing officia qui irure id sint adipisicing.
					Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia
					aliquip deserunt veniam deserunt officia adipisicing aliquip
					proident officia sunt.
				</p>
				<p>
					Sit duis est minim proident non nisi velit non consectetur.
					Esse adipisicing laboris consectetur enim ipsum
					reprehenderit eu deserunt Lorem ut aliqua anim do. Duis
					cupidatat qui irure cupidatat incididunt incididunt enim
					magna id est qui sunt fugiat. Laboris do duis pariatur
					fugiat Lorem aute sit ullamco. Qui deserunt non
					reprehenderit dolore nisi velit exercitation Lorem qui do
					enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum
					nostrud fugiat voluptate do Lorem culpa officia sint labore.
					Tempor consectetur excepteur ut fugiat veniam commodo et
					labore dolore commodo pariatur.
				</p>
				<p>
					Dolor minim irure ut Lorem proident. Ipsum do pariatur est
					ad ad veniam in commodo id reprehenderit adipisicing.
					Proident duis exercitation ad quis ex cupidatat cupidatat
					occaecat adipisicing.
				</p>
				<p>
					Tempor quis dolor veniam quis dolor. Sit reprehenderit
					eiusmod reprehenderit deserunt amet laborum consequat
					adipisicing officia qui irure id sint adipisicing.
					Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia
					aliquip deserunt veniam deserunt officia adipisicing aliquip
					proident officia sunt.
				</p>
				<p>
					Sit duis est minim proident non nisi velit non consectetur.
					Esse adipisicing laboris consectetur enim ipsum
					reprehenderit eu deserunt Lorem ut aliqua anim do. Duis
					cupidatat qui irure cupidatat incididunt incididunt enim
					magna id est qui sunt fugiat. Laboris do duis pariatur
					fugiat Lorem aute sit ullamco. Qui deserunt non
					reprehenderit dolore nisi velit exercitation Lorem qui do
					enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum
					nostrud fugiat voluptate do Lorem culpa officia sint labore.
					Tempor consectetur excepteur ut fugiat veniam commodo et
					labore dolore commodo pariatur.
				</p>
				<p>
					Dolor minim irure ut Lorem proident. Ipsum do pariatur est
					ad ad veniam in commodo id reprehenderit adipisicing.
					Proident duis exercitation ad quis ex cupidatat cupidatat
					occaecat adipisicing.
				</p>
				<p>
					Tempor quis dolor veniam quis dolor. Sit reprehenderit
					eiusmod reprehenderit deserunt amet laborum consequat
					adipisicing officia qui irure id sint adipisicing.
					Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia
					aliquip deserunt veniam deserunt officia adipisicing aliquip
					proident officia sunt.
				</p>
				<p>
					Sit duis est minim proident non nisi velit non consectetur.
					Esse adipisicing laboris consectetur enim ipsum
					reprehenderit eu deserunt Lorem ut aliqua anim do. Duis
					cupidatat qui irure cupidatat incididunt incididunt enim
					magna id est qui sunt fugiat. Laboris do duis pariatur
					fugiat Lorem aute sit ullamco. Qui deserunt non
					reprehenderit dolore nisi velit exercitation Lorem qui do
					enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum
					nostrud fugiat voluptate do Lorem culpa officia sint labore.
					Tempor consectetur excepteur ut fugiat veniam commodo et
					labore dolore commodo pariatur.
				</p>
				<p>
					Dolor minim irure ut Lorem proident. Ipsum do pariatur est
					ad ad veniam in commodo id reprehenderit adipisicing.
					Proident duis exercitation ad quis ex cupidatat cupidatat
					occaecat adipisicing.
				</p>
				<p>
					Tempor quis dolor veniam quis dolor. Sit reprehenderit
					eiusmod reprehenderit deserunt amet laborum consequat
					adipisicing officia qui irure id sint adipisicing.
					Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia
					aliquip deserunt veniam deserunt officia adipisicing aliquip
					proident officia sunt.
				</p>
				<p>
					Sit duis est minim proident non nisi velit non consectetur.
					Esse adipisicing laboris consectetur enim ipsum
					reprehenderit eu deserunt Lorem ut aliqua anim do. Duis
					cupidatat qui irure cupidatat incididunt incididunt enim
					magna id est qui sunt fugiat. Laboris do duis pariatur
					fugiat Lorem aute sit ullamco. Qui deserunt non
					reprehenderit dolore nisi velit exercitation Lorem qui do
					enim culpa. Aliqua eiusmod in occaecat reprehenderit laborum
					nostrud fugiat voluptate do Lorem culpa officia sint labore.
					Tempor consectetur excepteur ut fugiat veniam commodo et
					labore dolore commodo pariatur.
				</p>
				<p>
					Dolor minim irure ut Lorem proident. Ipsum do pariatur est
					ad ad veniam in commodo id reprehenderit adipisicing.
					Proident duis exercitation ad quis ex cupidatat cupidatat
					occaecat adipisicing.
				</p>
				<p>
					Tempor quis dolor veniam quis dolor. Sit reprehenderit
					eiusmod reprehenderit deserunt amet laborum consequat
					adipisicing officia qui irure id sint adipisicing.
					Adipisicing fugiat aliqua nulla nostrud. Amet culpa officia
					aliquip deserunt veniam deserunt officia adipisicing aliquip
					proident officia sunt.
				</p>
			</>
		),
		badge: 'React',
		image:
			'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		tags: [
			'happy',
			'sad',
			'on periods',
			'horny',
			'hot404',
			'sad',
			'on periods',
			'horny',
			'hot404',
			'sad',
			'on periods',
			'horny',
			'hot404',
			'sad',
			'on periods',
			'horny',
			'hot404',
		],
	},
];
