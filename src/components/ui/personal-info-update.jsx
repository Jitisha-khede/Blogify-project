'use client';
import React, { useState } from 'react';
import { Label } from './label';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { FileUpload } from './file-upload';

export default function PersonalInfo({ onToggle }) {
	const [files, setFiles] = useState([]);
	const [preview, setPreview] = useState(null);

	const handleFileUpload = files => {
		setFiles(files);
		if (files.length > 0) {
			const file = files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log('Form submitted');
	};

	return (
		<div className='h-full w-full max-w-2xl sm:mt-8 md:mt-16 mx-auto md:px-20 rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-gray-800'>
			{/* Profile Header Section */}
			<div className='flex flex-col items-center mb-8'>
				<div className='relative w-20 md:w-32 h-20 md:h-32 mb-4'>
					{preview ? (
						<img
							src={preview}
							alt='Profile Preview'
							className='w-full h-full rounded-full object-cover border-4 border-blue-500'
						/>
					) : (
						<div className='w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
							<span className='text-4xl text-gray-400'>👤</span>
						</div>
					)}
					<div className='absolute bottom-0 right-0'>
						<div className='relative'>
							<input
								type='file'
								className='hidden'
								id='profile-upload'
								onChange={e => handleFileUpload(e.target.files)}
								accept='image/*'
							/>
							<label
								htmlFor='profile-upload'
								className='bg-blue-100 hover:bg-blue-200 text-white rounded-full p-2 cursor-pointer shadow-lg'>
								📷
							</label>
						</div>
					</div>
				</div>
			</div>

			<form className='flex-1' onSubmit={handleSubmit}>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='username'>Username</Label>
					<Input
						id='username'
						placeholder='your username'
						type='text'
					/>
				</LabelInputContainer>

				<LabelInputContainer className='mb-4'>
					<Label htmlFor='name'>Full name</Label>
					<Input id='name' placeholder='Tyler Burden' type='text' />
				</LabelInputContainer>

				<LabelInputContainer className='mb-4'>
					<Label htmlFor='email'>Email Address</Label>
					<Input
						id='email'
						placeholder='projectmayhem@fc.com'
						type='email'
						autoComplete='email'
					/>
				</LabelInputContainer>

				<LabelInputContainer className='mb-6'>
					<Label htmlFor='bio'>Bio</Label>
					<textarea
						id='bio'
						placeholder='Tell us about yourself...'
						rows={2}
						className='w-full p-3 rounded-md border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600'
					/>
				</LabelInputContainer>

				<button
					className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					type='submit'>
					Save Changes
					<BottomGradient />
				</button>
			</form>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-400 to-transparent' />
			<span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
		</>
	);
};

const LabelInputContainer = ({ children, className }) => {
	return (
		<div className={cn('flex flex-col space-y-2 w-full', className)}>
			{children}
		</div>
	);
};
