import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} FastShopping. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-1">
          Your one-stop shop for everything amazing!
        </p>
      </div>
    </footer>
  );
};

export default Footer;