'use client';
import React from 'react';
import Form from '@/components/form';

export default function AuthModal({
	isOpen,
	onClose,
	initialView = 'login',
}) {
	if (!isOpen) return null;

	// Handle successful auth by keeping user on current page
	const handleAuthSuccess = () => {
		onClose();
		// No navigation needed - user stays on current page
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
			<div className='relative bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto'>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>

				<Form
					initialView={initialView}
					onAuthSuccess={handleAuthSuccess}
					inModal={true}
				/>
			</div>
		</div>
	);
}
