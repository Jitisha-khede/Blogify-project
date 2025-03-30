import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const isDark = localStorage.getItem('darkMode') === 'true';
		setDarkMode(isDark);
		document.documentElement.classList.toggle('dark', isDark);
	}, []);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.documentElement.classList.toggle('dark');
		localStorage.setItem('darkMode', !darkMode);
	};

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => useContext(ThemeContext);
