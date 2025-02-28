'use client';
import React, { useState } from 'react';
import LoginForm from './ui/login';
import SignupForm from './ui/signup';
import ForgotPasswordForm from './ui/fogot-password';

export default function Form({
	initialView = 'login',
	onAuthSuccess,
	inModal = false,
}) {
	const [view, setView] = useState(initialView);

	const handleToggle = newView => {
		setView(newView);
	};

	// Handle successful auth and prevent navigation when in modal
	const handleSuccess = () => {
		if (onAuthSuccess) {
			onAuthSuccess();
		}
	};

	return (
		<div className={inModal ? '' : 'container mx-auto py-8'}>
			{view === 'login' && (
				<LoginForm
					onToggle={handleToggle}
					onLoginSuccess={handleSuccess}
					preventRedirect={inModal}
				/>
			)}
			{view === 'signup' && (
				<SignupForm
					onToggle={handleToggle}
					onSignupSuccess={handleSuccess}
					preventRedirect={inModal}
				/>
			)}
			{view === 'forgot' && (
				<ForgotPasswordForm onToggle={handleToggle} />
			)}
		</div>
	);
}
