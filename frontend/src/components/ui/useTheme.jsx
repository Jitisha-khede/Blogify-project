import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context)
		throw new Error('useTheme must be used within ThemeProvider');

	const toggleTheme = () => {
		const newTheme = context.theme === 'light' ? 'dark' : 'light';
		context.setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.classList.toggle('dark');
	};

	return { theme: context.theme, toggleTheme };
};
