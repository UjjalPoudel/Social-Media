// src/components/Sidebar.jsx
import React from 'react';

const Sidebar = ({selectedTab, setSelectedTab}) => {
  const handleOnClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className="bg-dark text-white p-3 min-vh-100" style={{ width: '180px', position: 'sticky', top: 0 }}>
      <span className="fs-4 fw-bold mb-3 d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list me-2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
        Menu
      </span>
      <ul className="nav flex-column">
        <li className="nav-item" onClick={() => handleOnClick("Home")}>
          <a className="nav-link text-white" href="#">Home</a>
        </li>
        <li className="nav-item" onClick={() => handleOnClick("Create Post")}>
          <a className="nav-link text-white" href="#">Create Post</a>
        </li>
        <li className="nav-item" onClick={() => handleOnClick("Profile")}>
          <a className="nav-link text-white" href="#">Profile</a>
        </li>
        <li className="nav-item" onClick={() => handleOnClick("Settings")}>
          <a className="nav-link text-white" href="#">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
