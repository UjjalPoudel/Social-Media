import React, { useEffect } from 'react';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    // Optionally, you can redirect or update state here
  }, [onLogout]);

  return (
    <div className="text-center py-5">
      <h4>You have been logged out.</h4>
    </div>
  );
};

export default Logout;