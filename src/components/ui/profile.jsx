import { useState } from 'react';
import { Camera, PenSquare, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from './label';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { IconPencil } from '@tabler/icons-react';

const Profile = ({ user }) => {
	const [imageHover, setImageHover] = useState(false);
	const [files, setFiles] = useState([]);
	const [preview, setPreview] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const navigate = useNavigate();

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
		<div className='container mx-auto px-4 py-8 mt-16'>
			<div className='max-w-5xl mx-auto bg-card dark:bg-gray-800 rounded-lg shadow-lg p-6'>
				{/* Profile Photo Section */}
				<div className='relative w-32 h-32 mx-auto'>
					{preview ? (
						<img
							src={preview}
							alt='Profile Preview'
							className='w-full h-full rounded-full object-cover border-4 border-blue-100'
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
								className='bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 cursor-pointer shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center'>
								<IconPencil className='w-4 h-4' />
							</label>
						</div>
					</div>
				</div>

				{/* Edit Profile Button */}
				<button
					onClick={() => setIsEditing(!isEditing)}
					className='flex items-center gap-2 mx-auto mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors'>
					<PenSquare className='w-4 h-4' />
					Edit Profile
				</button>

				<div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

				{/* User Details Section */}
				<div className='mt-8 flex justify-center'>
					<div className='w-full max-w-2xl'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							{/* Left Column */}
							<div className='mx-0 lg:mx-32 space-y-4'>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-muted-foreground'>
										Full Name
									</label>
									<p className='text-foreground'>
										{user?.name || 'John Doe'}
									</p>
								</div>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-muted-foreground'>
										Email
									</label>
									<p className='text-foreground'>
										{user?.email || 'john@example.com'}
									</p>
								</div>
							</div>

							{/* Right Column */}
							<div className='mx-0 lg:mx-32 space-y-4'>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-muted-foreground'>
										Username
									</label>
									<p className='text-foreground'>
										{user?.username || '@johndoe'}
									</p>
								</div>
								<div className='space-y-2'>
									<label className='text-sm font-medium text-muted-foreground'>
										Joined
									</label>
									<p className='text-foreground'>
										{user?.joinedDate || 'January 2024'}
									</p>
								</div>
							</div>
						</div>

						{/* Bio Section - Full Width */}
						<div className='mt-6 space-y-2 ml-0 lg:ml-32'>
							<label className='text-sm font-medium text-muted-foreground'>
								Bio
							</label>
							<p className='text-foreground'>
								{user?.bio ||
									'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
							</p>
						</div>
					</div>
				</div>

				{/* Edit Profile Overlay */}
				{isEditing && (
					<div
						className='fixed mt-16 inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm'
						aria-labelledby='modal-title'
						role='dialog'
						aria-modal='true'
						onClick={() => setIsEditing(false)}>
						<div className='min-h-screen px-4 text-center'>
							{/* This element centers the modal */}
							<span
								className='inline-block h-screen align-middle'
								aria-hidden='true'>
								&#8203;
							</span>

							{/* Modal panel */}
							<div
								className='inline-block w-full max-w-2xl p-6 my-8 text-left align-middle bg-card dark:bg-gray-800 rounded-lg shadow-xl transform transition-all'
								onClick={e => e.stopPropagation()}>
								<div className='absolute top-4 right-4'>
									<button
										onClick={() => setIsEditing(false)}
										className='text-gray-400 hover:text-gray-500 focus:outline-none'>
										<X className='h-6 w-6' />
									</button>
								</div>

								<div className='mt-4'>
									<form className='space-y-4' onSubmit={handleSubmit}>
										<LabelInputContainer>
											<Label htmlFor='username'>Username</Label>
											<Input
												id='username'
												placeholder='your username'
												type='text'
												defaultValue={user?.username}
											/>
										</LabelInputContainer>

										<LabelInputContainer>
											<Label htmlFor='name'>Full name</Label>
											<Input
												id='name'
												placeholder='Tyler Burden'
												type='text'
												defaultValue={user?.name}
											/>
										</LabelInputContainer>

										<LabelInputContainer>
											<Label htmlFor='email'>Email Address</Label>
											<Input
												id='email'
												placeholder='projectmayhem@fc.com'
												type='email'
												autoComplete='email'
												defaultValue={user?.email}
											/>
										</LabelInputContainer>

										<LabelInputContainer>
											<Label htmlFor='bio'>Bio</Label>
											<textarea
												id='bio'
												placeholder='Tell us about yourself...'
												rows={3}
												defaultValue={user?.bio}
												className='w-full p-3 rounded-md border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600'
											/>
										</LabelInputContainer>

										<div className='flex justify-end gap-2 mt-6'>
											<button
												type='button'
												onClick={() => setIsEditing(false)}
												className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
												Cancel
											</button>
											<button
												type='submit'
												className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
												Save Changes
												<BottomGradient />
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

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

export default Profile;
