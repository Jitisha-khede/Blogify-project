'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);

		// Set initial value
		setMatches(mediaQuery.matches);

		// Define callback function
		const handleChange = event => {
			setMatches(event.matches);
		};

		// Add event listener
		mediaQuery.addEventListener('change', handleChange);

		// Clean up
		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, [query]);

	return matches;
}
