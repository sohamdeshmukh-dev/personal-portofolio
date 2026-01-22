import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Default to dark mode
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });

    useEffect(() => {
        // Apply theme class to document root
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
        }

        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    // Helper function to get theme-specific colors for Three.js
    const getThemeColors = () => {
        const isDark = theme === 'dark';
        return {
            canvasBackground: isDark ? '#020617' : '#f8fafc',
            fogColor: isDark ? '#020617' : '#f8fafc',
            particleOpacity: isDark ? 0.85 : 0.8,
            shapeOpacity: isDark ? 0.25 : 0.25,
            shapeEmissive: isDark ? 0.3 : 0.1,
            ambientLight: isDark ? 0.5 : 0.7,
        };
    };

    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark',
        getThemeColors
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
