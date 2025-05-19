import React from 'react';

const Footer = () => {
  return (
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        {[
          { name: 'Home', link: '#' },
          { name: 'Features', link: '#' },
          { name: 'Pricing', link: '#' },
          { name: 'FAQs', link: '#' },
          { name: 'About', link: '#' },
        ].map((item, index) => (
          <li key={index} className="nav-item">
            <a href={item.link} className="nav-link px-2 text-body-secondary">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-center text-body-secondary">
        &copy; {new Date().getFullYear()} Company, Inc
      </p>
    </footer>
  );
};

export default Footer;
