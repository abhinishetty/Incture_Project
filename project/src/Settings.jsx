import React, { useState, useEffect } from 'react';
import './settings.css'; // import your CSS

const Settings = () => {
  const [theme, setTheme] = useState('light');
  const [profile, setProfile] = useState({ name: '', email: '' });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    alert('Profile updated!');
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>

      {/* Theme Toggle */}
      <div className="settings-section">
        <h3 className="settings-subtitle">Theme</h3>
        <button onClick={toggleTheme} className="btn primary">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      {/* Profile Edit */}
      <div className="settings-section">
        <h3 className="settings-subtitle">Profile</h3>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          placeholder="Name"
          className="input"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
          placeholder="Email"
          className="input"
        />
        <button onClick={saveProfile} className="btn success">
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default Settings;
