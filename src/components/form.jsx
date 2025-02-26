import { useState, useRef, useEffect } from 'react';
import LoginForm from './ui/login';
import SignupForm from './ui/signup';
import ForgotPasswordForm from './ui/fogot-password';
import { IconX } from '@tabler/icons-react';

const Form = ({ onClose }) => {
	const [currentForm, setCurrentForm] = useState('signup');
	const formRef = useRef(null);

	useEffect(() => {
		// Handle clicks outside the form
		const handleClickOutside = event => {
			if (
				formRef.current &&
				!formRef.current.contains(event.target)
			) {
				onClose();
			}
		};

		// Handle ESC key press
		const handleEscKey = event => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		// Add event listeners
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscKey);

		// Clean up event listeners
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [onClose]);

	const handleToggle = formType => {
		setCurrentForm(formType);
	};

	const renderForm = () => {
		switch (currentForm) {
			case 'login':
				return <LoginForm onToggle={type => handleToggle(type)} />;
			case 'forgot':
				return (
					<ForgotPasswordForm onToggle={type => handleToggle(type)} />
				);
			default:
				return <SignupForm onToggle={() => handleToggle('login')} />;
		}
	};

	return (
		<div className='fixed mt-16 inset-0 backdrop-blur-sm flex justify-center items-center z-40'>
			<div ref={formRef} className='relative w-full max-w-md'>
				<button
					className='absolute top-10 md:top-20 right-2 md:right-4 text-black dark:text-gray-50 z-10 hover:text-gray-300 text-4xl'
					onClick={onClose}>
					<IconX />
				</button>
				{renderForm()}
			</div>
		</div>
	);
};

export default Form;
