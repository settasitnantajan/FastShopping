import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] bg-gray-50 text-center p-6"> {/* Adjust min-h if needed based on nav/footer */}
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or maybe you just mistyped the URL.
      </p>
      {/* Optional: You can add an illustration. If you have one, place it in your public folder.
      <img 
        src="/pic/undraw_page_not_found.svg" // Example path
        alt="Page Not Found Illustration" 
        className="w-64 h-64 mb-8" 
      />
      */}
      <Link
        to="/"
        className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;