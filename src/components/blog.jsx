'use client';
import React from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { TracingBeam } from './ui/tracing-beam';
import {
	IconMessage,
	IconThumbUp,
	IconThumbDown,
	IconBookmark,
	IconLink,
} from '@tabler/icons-react';

export default function Blog() {
	return (
		<div className='w-fit max-w-full mx-10 pt-4 relative'>
			{dummyContent.map((item, index) => (
				<div key={`content-${index}`} className='mb-10'>
					<p
						className={twMerge(
							'text-5xl mb-4 w-full text-center font-bold'
						)}>
						{item.title}
					</p>

					<div className='text-2xl prose prose-sm dark:prose-invert w-full max-w-none'>
						{item?.image && (
							<Image
								src={item.image}
								alt='blog thumbnail'
								height='1000'
								width='1000'
								className='w-full h-[700px] rounded-lg mb-2 object-cover'
							/>
						)}
						<div className='flex flex-wrap gap-2 mb-5'>
							{item.tags.map((tag, index) => (
								<h2
									key={index}
									className='bg-red-400 text-white rounded-full text-sm w-fit px-4 py-1'>
									{tag}
								</h2>
							))}
						</div>
						{/* Likes, share comment... */}
						<div className='h-auto w-fit mt-4 mb-10 rounded-full dark:bg-black bg-white flex items-center justify-start gap-1 text-xl'>
							<button className='flex flex-1 items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
								<IconThumbUp className='h-6 w-auto dark:text-white text-black' />
								<span className='dark:text-white text-black'>
									456
								</span>
							</button>

							<button className='flex flex-1 items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
								<IconThumbDown className='h-6 w-auto text-black dark:text-white' />
								<span className='dark:text-white text-black'>12</span>
							</button>
							<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
								<IconMessage className='h-6 w-auto text-black dark:text-white' />
								<span className='dark:text-white text-black'>23</span>
							</button>

							<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
								<IconBookmark className='h-6 w-auto text-black dark:text-white' />
							</button>
							<button className='flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 rounded-full transition-all px-2'>
								<IconLink className='h-6 w-auto text-black dark:text-white' />
							</button>
						</div>
						{item.description}
					</div>
				</div>
			))}
		</div>
	);
}

const dummyContent = [
	{
		title: 'Lorem Ipsum Dolor Sit Amet',
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
		tags: ['happy', 'sad', 'on periods', 'horny', 'hot404'],
	},
];
