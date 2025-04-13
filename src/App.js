// src/App.js
import React, { useState } from 'react';
import Auth from './components/Auth';
import TaskManager from './components/TaskManager';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      {isAuthenticated
        ? <TaskManager onLogout={() => setIsAuthenticated(false)} />
        : <Auth onAuth={() => setIsAuthenticated(true)} />}
    </div>
  );
}

export default App;
