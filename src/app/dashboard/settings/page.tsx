'use client'
import React, { useState } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    language: 'English',
  });

  const handleInputChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <h1 className="block text-lg leading-tight font-medium text-black">Cài Đặt</h1>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                name="darkMode"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={settings.darkMode}
                onChange={handleInputChange}
              />
              <span className="ml-2 text-gray-700">Chế độ tối</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                name="notifications"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={settings.notifications}
                onChange={handleInputChange}
              />
              <span className="ml-2 text-gray-700">Thông báo</span>
            </label>
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Ngôn ngữ
            </label>
            <select
              name="language"
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={settings.language}
              onChange={handleInputChange}
            >
              <option value="English">Tiếng Anh</option>
              <option value="Spanish">Tiếng Tây Ban Nha</option>
              <option value="Japanese">Tiếng Nhật</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
