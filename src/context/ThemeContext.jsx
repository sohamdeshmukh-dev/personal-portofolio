import React, { createContext, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Permanent dark mode — no toggle, no persistence.
export const ThemeProvider = ({ children }) => {
    useEffect(() => {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }, []);

    const value = {
        theme: 'dark',
        isDark: true,
        getThemeColors: () => ({
            canvasBackground: '#121212',
            fogColor: '#121212',
            particleOpacity: 0.9,
            shapeOpacity: 0.3,
            shapeEmissive: 0.4,
            ambientLight: 0.6,
        })
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
