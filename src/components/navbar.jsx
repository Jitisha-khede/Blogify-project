'use client';
import { SearchBar } from './ui/searchbar';
import { useTheme } from './ui/useTheme';

export const NavBar = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div className='max-w-5xl mx-auto px-4'>
			<div className='flex items-center justify-between h-16'>
				{/* Brand Logo */}
				<div className='font-semibold text-xl bg-gradient-to-r from-sky-400 to-blue-600 text-transparent bg-clip-text'>
					Blogify
				</div>
				<SearchBar />
				{/* Navigation Links */}
				<div className='flex items-center gap-4'>
					<div className='flex items-center gap-4'>
						{/* Home Link */}
						<a
							className='p-2 rounded-lg transition-colors duration-200 text-blue-600 dark:text-blue-400'
							href='/'
							data-discover='true'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='tabler-icon tabler-icon-home w-5 h-5'>
								<path d='M5 12l-2 0l9 -9l9 9l-2 0'></path>
								<path d='M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7'></path>
								<path d='M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6'></path>
							</svg>
						</a>

						<a
							className='p-2 rounded-lg transition-colors duration-200 text-gray-600 hover:text-blue-600 '
							href='/write'
							data-discover='true'>
							<svg
								height='18px'
								width='18px'
								viewBox='0 0 340.731 340.731'
								xmlns='http://www.w3.org/2000/svg'
								xmlnsXlink='http://www.w3.org/1999/xlink'
								xmlSpace='preserve'
								className='fill-none stroke-current text-blue-600 dark:text-blue-400'
								strokeWidth='18'
								strokeLinecap='round'>
								<g>
									<g>
										<path
											className='fill-current'
											d='M332.41,9.683c-10.738-10.754-29.482-10.746-40.236,0L129.326,172.531c-1.674,1.666-6.113,6.105-9.063,40.488l-0.829,9.649l9.64-0.845c34.457-3.032,38.822-7.397,40.472-9.039L332.402,49.92C343.505,38.816,343.505,20.771,332.41,9.683z M320.916,38.418L158.621,200.721c-2.845,1.211-11.762,2.723-21.134,3.877c1.122-9.356,2.634-18.273,3.869-21.102L303.692,21.169c4.601-4.601,12.624-4.601,17.241,0C325.663,25.924,325.663,33.662,320.916,38.418z'
										/>
										<path
											className='fill-current'
											d='M315.795,322.853H16.257V23.307h239.297l16.257-16.257H8.129C3.642,7.049,0,10.691,0,15.178v315.803c0,4.495,3.642,8.129,8.129,8.129h315.795c4.495,0,8.129-3.633,8.129-8.129V73.257l-16.257,16.257C315.795,89.514,315.795,322.853,315.795,322.853z'
										/>
									</g>
								</g>
							</svg>
						</a>
					</div>

					{/* Theme Toggle Button */}
					<button
						onClick={toggleTheme}
						className='p-2 rounded-lg transition-colors duration-200'
						aria-label='Toggle theme'>
						{theme === 'dark' ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='w-5 h-5 text-blue-600 dark:text-blue-400'>
								<circle cx='12' cy='12' r='5' />
								<line x1='12' y1='1' x2='12' y2='3' />
								<line x1='12' y1='21' x2='12' y2='23' />
								<line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
								<line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
								<line x1='1' y1='12' x2='3' y2='12' />
								<line x1='21' y1='12' x2='23' y2='12' />
								<line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
								<line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='w-5 h-5 text-blue-600 dark:text-blue-400'>
								<path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
							</svg>
						)}
					</button>
					<div>
						<img
							src='/images/default-user.png'
							alt='user'
							className='w-5 border border-blue-500 rounded-full'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
