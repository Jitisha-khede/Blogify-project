import React, { useState } from 'react';
import { X } from 'lucide-react';

export const FilterSidebar = ({
	onClose,
	onApplyFilters,
	isMobile,
}) => {
	const [categories, setCategories] = useState({
		technology: false,
		travel: false,
		food: false,
		lifestyle: false,
	});
	const [moods, setMoods] = useState({
		happy: false,
		sad: false,
		motivational: false,
		inspiring: false,
	});

	const [dateRange, setDateRange] = useState({ from: '', to: '' });
	const [sortBy, setSortBy] = useState('newest');

	const handleCategoryChange = category => {
		setCategories(prev => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	const handleMoodChange = mood => {
		setMoods(prev => ({
			...prev,
			[mood]: !prev[mood],
		}));
	};

	const handleApply = () => {
		const selectedCategories = Object.entries(categories)
			.filter(([_, selected]) => selected)
			.map(([category]) => category);

		const selectedMoods = Object.entries(moods)
			.filter(([_, selected]) => selected)
			.map(([mood]) => mood);

		const filters = {
			categories: selectedCategories,
			moods: selectedMoods,
			dateRange,
			sortBy,
		};

		onApplyFilters(filters);
	};

	return (
		<div
			className={`h-full overflow-y-auto ${
				isMobile ? 'p-8 pt-16' : 'p-6'
			}`}>
			<div className='flex justify-between items-center mb-6'>
				<h2
					className={`font-semibold ${
						isMobile ? 'text-2xl' : 'text-xl'
					}`}>
					Filter Blogs
				</h2>
				<button
					onClick={onClose}
					className='text-gray-400 hover:text-gray-500 focus:outline-none'>
					<X className={`${isMobile ? 'h-8 w-8' : 'h-6 w-6'}`} />
				</button>
			</div>

			{/* Filter content */}
			<div className='space-y-6'>
				{/* Mood filter */}
				<div>
					<h3
						className={`font-medium mb-2 ${
							isMobile ? 'text-lg' : ''
						}`}>
						Mood
					</h3>
					<div className='space-y-2'>
						{Object.keys(moods).map(mood => (
							<label
								key={mood}
								className={`flex items-center gap-2 ${
									isMobile ? 'text-lg py-2' : ''
								}`}>
								<input
									type='checkbox'
									className='rounded'
									checked={moods[mood]}
									onChange={() => handleMoodChange(mood)}
								/>
								{mood.charAt(0).toUpperCase() + mood.slice(1)}
							</label>
						))}
					</div>
				</div>

				{/* Category filter */}
				<div>
					<h3
						className={`font-medium mb-2 ${
							isMobile ? 'text-lg' : ''
						}`}>
						Categories
					</h3>
					<div className='space-y-2'>
						{Object.keys(categories).map(category => (
							<label
								key={category}
								className={`flex items-center gap-2 ${
									isMobile ? 'text-lg py-2' : ''
								}`}>
								<input
									type='checkbox'
									className='rounded'
									checked={categories[category]}
									onChange={() => handleCategoryChange(category)}
								/>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</label>
						))}
					</div>
				</div>

				{/* Sort by */}
				<div>
					<h3
						className={`font-medium mb-2 ${
							isMobile ? 'text-lg' : ''
						}`}>
						Sort By
					</h3>
					<select
						className={`w-full px-3 border rounded-md bg-background ${
							isMobile ? 'py-3 text-lg' : 'py-2'
						}`}
						value={sortBy}
						onChange={e => setSortBy(e.target.value)}>
						<option value='newest'>Newest</option>
						<option value='oldest'>Oldest</option>
						<option value='most-liked'>Most Liked</option>
						<option value='most-comments'>Most Comments</option>
					</select>
				</div>

				{/* Apply button */}
				<button
					className={`w-full bg-primary text-primary-foreground rounded-md hover:bg-primary/90 ${
						isMobile ? 'py-3 text-lg mt-8' : 'py-2'
					}`}
					onClick={handleApply}>
					Apply Filters
				</button>
			</div>
		</div>
	);
};
