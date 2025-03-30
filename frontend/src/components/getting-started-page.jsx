'use client';
import { useState } from 'react';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from './form';

export const GettingStarted = () => {
	const navigate = useNavigate();
	const words = [
		{
			text: 'Express, Engage and Elevate with\u00A0',
		},
		{
			text: 'Blogify.',
			className: 'text-blue-500 dark:text-blue-500',
		},
	];

	const handleGetStartedClick = () => {
		navigate('/blogs');
	};

	return (
		<>
			<div className='h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center'>
				{/* Radial gradient for the container to give a faded look */}
				<div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
				<div className='flex flex-col items-center justify-center h-[40rem]  '>
					<p className='text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  '>
						Turn Your Ideas Into Stories That Matter.
					</p>
					<TypewriterEffectSmooth words={words} />
					<div className='flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4'>
						<button
							onClick={handleGetStartedClick}
							className='w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm'>
							Get started
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
