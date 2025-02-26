'use client';
import React, { useState } from 'react';
import { Label } from './label';
import { Input } from './input';
import { cn } from '@/lib/utils';
import {
	IconBrandGithub,
	IconBrandGoogle,
	IconBrandOnlyfans,
} from '@tabler/icons-react';

export default function LoginForm({ onToggle }) {
	const [loginType, setLoginType] = useState('email'); // 'email' or 'username'
	const [authType, setAuthType] = useState('password'); // 'password' or 'otp'
	const [showOTP, setShowOTP] = useState(false);
	const [isOTPSent, setIsOTPSent] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		console.log('Form submitted');
	};

	const handleSendOTP = e => {
		e.preventDefault();
		setIsOTPSent(true);
		setShowOTP(true);
		// Add OTP sending logic here
	};

	return (
		<div className='max-w-md w-full mt-8 md:mt-16 mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-gray-800'>
			<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
				Welcome to Blogify
			</h2>
			<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
				Login to Continue
			</p>
			<form className='my-8' onSubmit={handleSubmit}>
				<LabelInputContainer className='mb-4'>
					<div className='flex flex-row justify-start items-center gap-2'>
						<Label
							htmlFor='username'
							className={cn('cursor-pointer transition-colors')}
							onClick={() => setLoginType('username')}>
							Username
						</Label>
						<span>/</span>
						<Label
							htmlFor='email'
							className={cn('cursor-pointer transition-colors')}
							onClick={() => setLoginType('email')}>
							Email
						</Label>
					</div>

					<Input
						id={loginType === 'email' ? 'email' : 'username'}
						placeholder={
							loginType === 'email'
								? 'Enter your email'
								: 'Enter your username'
						}
						type={loginType === 'email' ? 'email' : 'text'}
						autoComplete={
							loginType === 'email' ? 'email' : 'username'
						}
					/>
				</LabelInputContainer>

				<LabelInputContainer className='mb-8'>
					<div className='flex flex-row justify-start items-center gap-2'>
						<Label
							htmlFor='password'
							className={cn('cursor-pointer transition-colors')}
							onClick={() => setAuthType('password')}>
							Password
						</Label>
					</div>

					<Input
						id='password'
						placeholder='••••••••'
						type='password'
						autoComplete='current-password'
					/>
				</LabelInputContainer>

				<button
					className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					type='submit'>
					Login
					<BottomGradient />
				</button>
				<div className='w-full flex justify-between'>
					<p className='justify-start text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
						Not a blogifier?{' '}
						<span
							className='cursor-pointer hover:underline text-blue-600 dark:text-blue-400'
							onClick={onToggle}
							role='button'
							tabIndex={0}>
							Sign up
						</span>
					</p>
					<p className='justify-end text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
						<span
							className='cursor-pointer hover:underline text-red-500 '
							onClick={onToggle}
							role='button'
							tabIndex={0}>
							Forgot password?
						</span>
					</p>
				</div>

				<div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

				<div className='flex flex-col space-y-4'>
					<button
						className=' relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
						type='submit'>
						<IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
						<span className='text-neutral-700 dark:text-neutral-300 text-sm'>
							Login Using Google
						</span>
						<BottomGradient />
					</button>
				</div>
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
