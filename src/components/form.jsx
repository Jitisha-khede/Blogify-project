import { useState } from 'react';
import LoginForm from './ui/login';
import SignupForm from './ui/signup';
import { IconX } from '@tabler/icons-react';

const Form = ({ onClose }) => {
	const [isLogin, setIsLogin] = useState(false);

	const handleToggle = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div className='absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50'>
			<div className='relative w-full max-w-md '>
				<button
					className='absolute top-16 right-1 text-black dark:text-gray-50 z-10 hover:text-gray-400 text-4xl'
					onClick={onClose}>
					<IconX></IconX>
				</button>
				{isLogin ? (
					<LoginForm onToggle={handleToggle} />
				) : (
					<SignupForm onToggle={handleToggle} />
				)}
			</div>
		</div>
	);
};

export default Form;
