import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
		setTheme(savedTheme);
		document.documentElement.classList.toggle(
			'dark',
			savedTheme === 'dark'
		);
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
