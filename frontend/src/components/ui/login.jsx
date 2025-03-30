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
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/utils/api';

export default function LoginForm({
	onToggle,
	onLoginSuccess,
	preventRedirect = false,
}) {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		login: '',
		password: '',
	});

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		// console.log('form submitted!');
		e.preventDefault();
		setLoading(true);
		setError(null);

		const formDataToSend = {
			login: formData.login,
			password: formData.password,
		};
		// console.log(formDataToSend);

		try {
			const response = await loginUser(formDataToSend);
			// console.log(response);
			// Store the token in localStorage for auth checks
			localStorage.setItem('token', response.token);
			if (onLoginSuccess) onLoginSuccess();
			if (!preventRedirect) {
				navigate('/blogs');
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md w-full mt-8 md:mt-16 mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-gray-800'>
			<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
				Welcome Back Blogifier !!
			</h2>
			<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
				Login to Continue
			</p>
			<form className='my-8' onSubmit={handleSubmit}>
				<LabelInputContainer className='mb-4'>
					<div className='flex flex-col space-y-2'>
						<Label htmlFor='login'>Email or Username</Label>
						<Input
							id='login'
							name='login'
							type='text'
							placeholder='Enter your email or username'
							value={formData.login}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Password Input */}
					<div className='flex flex-col space-y-2'>
						<Label htmlFor='password'>Password</Label>
						<Input
							id='password'
							name='password'
							type='password'
							placeholder='••••••••'
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
				</LabelInputContainer>

				{/* <LabelInputContainer className='mb-8'>
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
				</LabelInputContainer> */}

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
							onClick={() => onToggle('signup')}
							role='button'
							tabIndex={0}>
							Sign up
						</span>
					</p>
					<p className='justify-end text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
						<span
							className='cursor-pointer hover:underline text-red-500'
							onClick={() => onToggle('forgot')}
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
