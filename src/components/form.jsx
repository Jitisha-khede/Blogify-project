import { useState } from 'react';
import LoginForm from './ui/login';
import SignupForm from './ui/signup';

const Form = ({ onClose }) => {
	const [isLogin, setIsLogin] = useState(true);

	const toggleForm = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='relative w-full max-w-md'>
				<button
					className='absolute top-4 right-4 text-white z-10 hover:text-gray-300 text-2xl'
					onClick={onClose}>
					×
				</button>

				{isLogin ? (
					<>
						<LoginForm />
						<p className='text-center mt-4 text-white'>
							Not a blogifier?{' '}
							<button
								onClick={toggleForm}
								className='text-blue-400 hover:text-blue-300'>
								Sign up
							</button>
						</p>
					</>
				) : (
					<>
						<SignupForm />
						<p className='text-center mt-4 text-white'>
							Already a blogifier?{' '}
							<button
								onClick={toggleForm}
								className='text-blue-400 hover:text-blue-300'>
								Login
							</button>
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default Form;
