import { useTheme } from 'next-themes';
import React, { useState, useEffect, useRef } from 'react';
import { Save, Image, X, Plus, Trash2 } from 'lucide-react';
import { Particles } from './ui/particles';
import { FileUpload } from './ui/file-upload';

const Create = () => {
	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [tagInput, setTagInput] = useState('');
	const [tags, setTags] = useState([]);
	const [featuredImage, setFeaturedImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [showTagSuggestions, setShowTagSuggestions] = useState(false);
	const [errors, setErrors] = useState({});
	const tagInputRef = useRef(null);

	// Multiple paragraphs for content
	const [paragraphs, setParagraphs] = useState(['']);
	const { resolvedTheme } = useTheme();
	const [color, setColor] = useState('#ffffff');

	useEffect(() => {
		setColor(resolvedTheme === 'dark' ? '#ffffff' : '#000000');
	}, [resolvedTheme]);

	const categories = [
		'Technology',
		'Travel',
		'Food',
		'Health',
		'Lifestyle',
		'Business',
		'Art',
		'Science',
		'Education',
		'Personal',
		'Other',
	];

	const popularTags = [
		'webdev',
		'programming',
		'design',
		'tutorial',
		'howto',
		'review',
		'tips',
		'productivity',
		'photography',
		'inspiration',
		'news',
		'trends',
		'guide',
		'story',
		'interview',
	];

	const handleImageChange = e => {
		const file = e.target.files[0];
		if (file) {
			setFeaturedImage(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	};

	const removeImage = () => {
		setFeaturedImage(null);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			setPreviewUrl(null);
		}
	};

	const addTag = tag => {
		tag = tag.trim();
		if (tag && !tags.includes(tag)) {
			setTags([...tags, tag]);
		}
		setTagInput('');
		tagInputRef.current.focus();
	};

	const removeTag = tagToRemove => {
		setTags(tags.filter(tag => tag !== tagToRemove));
	};

	const handleTagInputKeyDown = e => {
		if (e.key === 'Enter' && tagInput.trim()) {
			e.preventDefault();
			addTag(tagInput);
		} else if (
			e.key === 'Backspace' &&
			!tagInput &&
			tags.length > 0
		) {
			removeTag(tags[tags.length - 1]);
		}
	};

	const validateForm = () => {
		const newErrors = {};

		// Validate title (at least one word)
		if (!title.trim()) {
			newErrors.title = 'Title must contain at least one word';
		}

		// Validate tags (at least one tag)
		if (tags.length === 0) {
			newErrors.tags = 'At least one tag is required';
		}

		// Validate content (at least one non-empty paragraph)
		const hasContent = paragraphs.some(p => p.trim().length > 0);
		if (!hasContent) {
			newErrors.content = 'At least one paragraph must have content';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (validateForm()) {
			// Process the form data - filter out empty paragraphs
			const filteredParagraphs = paragraphs.filter(
				p => p.trim().length > 0
			);
			console.log({
				title,
				content: filteredParagraphs,
				category,
				tags,
				featuredImage,
			});
			alert('Blog post submitted successfully!');
		}
	};

	// Handle paragraph changes
	const updateParagraph = (index, text) => {
		const newParagraphs = [...paragraphs];
		newParagraphs[index] = text;
		setParagraphs(newParagraphs);

		if (errors.content) {
			setErrors({ ...errors, content: null });
		}
	};

	// Add a new paragraph
	const addParagraph = () => {
		setParagraphs([...paragraphs, '']);
	};

	// Remove a paragraph
	const removeParagraph = index => {
		const newParagraphs = paragraphs.filter((_, i) => i !== index);
		if (newParagraphs.length === 0) {
			newParagraphs.push('');
		}
		setParagraphs(newParagraphs);
	};

	// Filter tag suggestions based on input
	const filteredSuggestions = popularTags.filter(
		tag =>
			tag.toLowerCase().includes(tagInput.toLowerCase()) &&
			!tags.includes(tag)
	);

	const [files, setFiles] = useState([]);
	const handleFileUpload = files => {
		setFiles(files);
	};

	// Close suggestions when clicking outside
	useEffect(() => {
		const handleClickOutside = e => {
			if (
				tagInputRef.current &&
				!tagInputRef.current.contains(e.target)
			) {
				setShowTagSuggestions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className='w-full z-10 max-w-5xl mx-auto mt-16 p-4 sm:p-6 bg-slate-100 dark:bg-gray-900 rounded-lg shadow-md transition-colors duration-200'>
			<Particles
				className='absolute inset-0 -z-10'
				quantity={100}
				ease={80}
				color={color}
				refresh
			/>
			<h1 className='text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white'>
				Create New Blog Post
			</h1>

			<form onSubmit={handleSubmit} className='space-y-6'>
				{/* Title */}
				<div>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Title
					</label>
					<input
						id='title'
						type='text'
						value={title}
						onChange={e => {
							setTitle(e.target.value);
							if (errors.title) {
								setErrors({ ...errors, title: null });
							}
						}}
						required
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
							errors.title
								? 'border-red-400 dark:border-red-400'
								: 'border-gray-300 dark:border-gray-600'
						}`}
						placeholder='Enter post title'
					/>
					{errors.title && (
						<p className='mt-1 text-sm text-red-400'>
							{errors.title}
						</p>
					)}
				</div>

				{/* Category */}
				<div>
					<label
						htmlFor='category'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Category
					</label>
					<select
						id='category'
						value={category}
						onChange={e => setCategory(e.target.value)}
						required
						className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'>
						<option value=''>Select a category</option>
						{categories.map(cat => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>

				{/* Tags */}
				<div>
					<label
						htmlFor='tags'
						className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Tags
					</label>

					<div
						className={`flex flex-wrap gap-2 p-2 border rounded-md bg-white dark:bg-gray-700 ${
							errors.tags
								? 'border-red-400 dark:border-red-400'
								: 'border-gray-300 dark:border-gray-600'
						}`}>
						{tags.map((tag, index) => (
							<span
								key={index}
								className='flex items-center gap-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 px-2 py-1 rounded text-sm'>
								{tag}
								<button
									type='button'
									onClick={() => removeTag(tag)}
									className='text-red-400 dark:text-red-300 hover:text-red-700 dark:hover:text-red-100'>
									<X className='w-3 h-3' />
								</button>
							</span>
						))}

						<div
							className='relative flex-1 min-w-[120px]'
							ref={tagInputRef}>
							<input
								type='text'
								value={tagInput}
								onChange={e => {
									setTagInput(e.target.value);
									setShowTagSuggestions(true);
									if (errors.tags) {
										setErrors({ ...errors, tags: null });
									}
								}}
								onFocus={() => setShowTagSuggestions(true)}
								onKeyDown={handleTagInputKeyDown}
								className='w-full border-0 p-1 outline-none bg-transparent text-gray-700 dark:text-gray-200'
								placeholder={
									tags.length === 0
										? 'Add at least one tag...'
										: 'Add more tags...'
								}
							/>

							{showTagSuggestions &&
								filteredSuggestions.length > 0 && (
									<div className='absolute z-10 w-full max-h-44 overflow-y-auto mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg'>
										{filteredSuggestions.map((suggestion, index) => (
											<div
												key={index}
												onClick={() => {
													addTag(suggestion);
													setShowTagSuggestions(false);
												}}
												className='px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'>
												{suggestion}
											</div>
										))}
									</div>
								)}
						</div>
					</div>

					{errors.tags && (
						<p className='mt-1 text-sm text-red-400'>{errors.tags}</p>
					)}
				</div>

				{/* Content with Multiple Paragraphs */}
				<div>
					<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
						Content
					</label>

					<div
						className={`space-y-4 ${
							errors.content ? 'has-error' : ''
						}`}>
						{paragraphs.map((paragraph, index) => (
							<div key={index} className='flex gap-2'>
								<textarea
									value={paragraph}
									onChange={e =>
										updateParagraph(index, e.target.value)
									}
									rows={4}
									className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
										errors.content
											? 'border-red-400 dark:border-red-400'
											: 'border-gray-300 dark:border-gray-600'
									}`}
									placeholder={`Write paragraph ${index + 1} here...`}
								/>
								{paragraphs.length > 1 && (
									<button
										type='button'
										onClick={() => removeParagraph(index)}
										className='self-start p-2 text-red-400 hover:text-red-700 transition-colors duration-200'
										title='Remove paragraph'>
										<Trash2 className='w-5 h-5' />
									</button>
								)}
							</div>
						))}
					</div>

					{errors.content && (
						<p className='mt-1 text-sm text-red-400'>
							{errors.content}
						</p>
					)}

					<button
						type='button'
						onClick={addParagraph}
						className='mt-3 flex items-center gap-1 text-red-400 hover:text-red-700 transition-colors duration-200'>
						<Plus className='w-4 h-4' />
						<span>Add new paragraph</span>
					</button>
				</div>
				{/* Featured Image */}
				<div className='border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center'>
					<FileUpload onChange={handleFileUpload} />
				</div>

				{/* Submit Button */}
				<div className='flex justify-end'>
					<button
						type='submit'
						className='flex items-center gap-2 bg-red-400 hover:bg-red-600 text-white py-2 px-6 rounded-md transition-colors duration-200'>
						<Save className='w-4 h-4' />
						<span>Publish Post</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default Create;
