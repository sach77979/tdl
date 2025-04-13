import React from 'react';
import '../styles/ThemeToggle.css';
import { Moon, Sun } from 'lucide-react'; // Optional: using icons

const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <button
    className={`theme-toggle ${darkMode ? 'dark' : ''}`}
    onClick={() => setDarkMode(!darkMode)}
    title={darkMode ? '☀️' : '🌙'}
  >
    {darkMode ? <Sun size={22} /> : <Moon size={22} />}
  </button>
);

export default ThemeToggle;


