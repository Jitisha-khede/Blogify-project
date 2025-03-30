'use client';

import { PlaceholdersAndVanishInput } from './placeholders-and-vanish-input';

export function SearchBar() {
	const placeholders = [
		'Find topics that interest you...',
		'Explore blogs by keyword...',
		'What are you curious about today',
		'Search for blogs...',
		'Type to discover amazing stories...',
	];

	const handleChange = e => {
		console.log(e.target.value);
	};
	const onSubmit = e => {
		e.preventDefault();
		console.log('submitted');
	};
	return (
		<div className='w-full md:w-[25rem] flex justify-items-center px-1'>
			<PlaceholdersAndVanishInput
				placeholders={placeholders}
				onChange={handleChange}
				onSubmit={onSubmit}
			/>
		</div>
	);
}
