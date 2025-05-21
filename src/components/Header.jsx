import React, { useEffect, useState } from "react";

function Header({ selectedTab, setSelectedTab, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const dropdownItems = document.querySelectorAll('.dropdown');
    dropdownItems.forEach(dropdown => {
      dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.dropdown-menu').classList.add('show');
      });
      dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.dropdown-menu').classList.remove('show');
      });
    });
    return () => {
      dropdownItems.forEach(dropdown => {
        dropdown.removeEventListener('mouseenter', () => {});
        dropdown.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const handleOnClick = (tabName) => {
    setSelectedTab(tabName);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    window.alert("You have been logged out!");
    setSelectedTab('Register');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark position-relative">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#" onClick={() => handleOnClick("Home")}>Social Media</a>
        <button 
          className="d-md-none btn btn-dark border-0" 
          type="button" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list fs-4"></i>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item" onClick={() => handleOnClick("Home")}>
              <a className={`nav-link text-white ${selectedTab === "Home" ? "active" : ""}`} aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item" onClick={() => handleOnClick("Profile")}>
              <a className={`nav-link text-white ${selectedTab === "Profile" ? "active" : ""}`} href="#">Profile</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-white" href="#" id="exploreDropdown">
                Explore
              </a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li onClick={() => handleOnClick("Trending")}><a className="dropdown-item text-white" href="#">Trending</a></li>
                <li onClick={() => handleOnClick("Discover")}><a className="dropdown-item text-white" href="#">Discover</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li onClick={() => handleOnClick("Communities")}><a className="dropdown-item text-white" href="#">Communities</a></li>
              </ul>
            </li>
            <li className="nav-item" onClick={() => handleOnClick("Messages")}>
              <a className={`nav-link text-white ${selectedTab === "Messages" ? "active" : ""}`} href="#">Messages</a>
            </li>
          </ul>
          <div className="d-flex">
            <ul className="navbar-nav">
              <li className="nav-item" onClick={() => handleOnClick("Register")}>
                <a className={`nav-link text-white ${selectedTab === "Register" ? "active" : ""}`} href="#">Register</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
