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
import { signupUser } from '@/utils/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupForm({ onToggle }) {
	const navigate = useNavigate(); 
	const [showOTP, setShowOTP] = useState(false);
	const [isOTPSent, setIsOTPSent] = useState(false);
	const [formData, setFormData] = useState({
		userName: '',
		fullName: '',
		email: '',
		password: '',
		profileImage: null,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const API_BASE_URL =process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(null);
		console.log(formData);
		const formDataToSend = new FormData();
		formDataToSend.append('userName', formData.userName);
		formDataToSend.append('fullName', formData.fullName);
		formDataToSend.append('email', formData.email);
		formDataToSend.append('password', formData.password);

		try {
			console.log('Sending form data:', formDataToSend);
			const response = await axios.post(`${API_BASE_URL}/api/user/signup`, formDataToSend, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(response.data.message);
			setSuccess(response.data.message);
			setTimeout(() => {
				navigate('/login'); 
			}, 1000);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
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
				Signup to join our community of blogifiers
			</p>
			<form
				className='flex-1 overflow-y-auto overflow-x-hidden max-h-96 my-8'
				onSubmit={handleSubmit}>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='username'>Username</Label>
					<Input
						id='username'
						name="userName"
						placeholder='your username'
						type='text'
						onChange={handleChange}
					/>
				</LabelInputContainer>

				<LabelInputContainer className='mb-4'>
					<Label htmlFor='name'>Full name</Label>
					<Input id='name' 
					placeholder='Tyler Burden' 
					type='text'
					name = 'fullName'
					onChange={handleChange}/>
				</LabelInputContainer>

				<LabelInputContainer className='mb-4'>
					<Label htmlFor='email'>Email Address</Label>
					<Input
						id='email'
						placeholder='projectmayhem@fc.com'
						type='email'
						name = 'email'
						onChange={handleChange}
						autoComplete='email'
					/>
				</LabelInputContainer>
				{/* <div className='flex flex-col space-y-2'>
					<div className=''>
						<Input
							id='otp'
							placeholder='Enter 6-digit OTP'
							type='text'
							maxLength={6}
							onChange={handleChange}
							pattern='[0-9]*'
							inputMode='numeric'
						/>
						<button
							onClick={handleSendOTP}
							type='button'
							className={cn(
								'px-4 py-2 mt-2 mb-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap',
								isOTPSent
									? 'bg-blue-500 text-white hover:bg-blue-600'
									: 'bg-red-400 text-white hover:bg-red-500'
							)}>
							{isOTPSent ? 'Resend OTP' : 'Send OTP'}
						</button>
					</div>
					{isOTPSent && (
						<p className='text-xs text-neutral-500 dark:text-neutral-400'>
							A 6-digit code has been sent to your email
						</p>
					)}
				</div> */}
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='password'>Password</Label>
					<Input
						id='password'
						name='password'
						onChange={handleChange}
						placeholder='••••••••'
						type='password'
						autoComplete='new-password'
					/>
				</LabelInputContainer>
				<LabelInputContainer className='mb-8'>
					<Label htmlFor='confirm-password'>
						Confirm Your Password
					</Label>
					<Input
						id='confirm-password'
						placeholder='••••••••'
						type='password'
						autoComplete='new-password'
					/>
				</LabelInputContainer>

				<button
					className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
					type='submit'>
					Sign up
					<BottomGradient />
				</button>
				<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
					Already a blogifier?{' '}
					<span
						className='cursor-pointer hover:underline text-blue-600 dark:text-blue-400'
						onClick={onToggle}
						role='button'
						tabIndex={0}>
						Login
					</span>
				</p>

				<div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

				<div className='flex flex-col space-y-4'>
					<button
						className=' relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
						type='submit'>
						<IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
						<span className='text-neutral-700 dark:text-neutral-300 text-sm'>
							Signup Using Google
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
