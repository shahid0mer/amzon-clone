import React from 'react';
import AmazonBusinessLogo from './AmazonBusinessLogo'; // Placeholder for the logo component

const AmazonBusinessStep1 = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      
      {/* Header and Step Indicator */}
      <div className="w-full bg-amazon-darkblue text-white py-2 flex justify-center">
        <div className="w-full max-w-lg flex justify-between items-center px-4">
          
          {/* Amazon Business Logo (Simplified) */}
          <div className="text-xl font-bold">
            <span className="text-white">amazon</span>
            <span className="font-normal text-yellow-500">business</span>
          </div>

          {/* Step Indicator */}
          <div className="flex space-x-6 text-xs items-center">
            {/* Step 1: Active */}
            <div className="flex items-center space-x-1">
              <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-xs font-bold bg-white text-amazon-darkblue">1</span>
              <span>ACCOUNT CREATION</span>
            </div>
            
            {/* Arrow/Separator - simplified */}
            <span className="text-gray-400">»</span> 

            {/* Step 2: Inactive */}
            <div className="flex items-center space-x-1 text-gray-400">
              <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400">2</span>
              <span>BUSINESS DETAILS</span>
            </div>
            
            {/* Arrow/Separator - simplified */}
            <span className="text-gray-400">»</span>

            {/* Step 3: Inactive */}
            <div className="flex items-center space-x-1 text-gray-400">
              <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-400">3</span>
              <span>FINISH</span>
            </div>
          </div>
        </div>
      </div>


      {/* Main Form Card */}
      <div className="mt-10 w-full max-w-lg p-8 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-normal mb-6">
          Enter your full name and choose your business password
        </h1>

        <form onSubmit={(e) => e.preventDefault()}>
          
          {/* Your name field */}
          <label htmlFor="name" className="block text-sm font-bold mb-1">
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-4"
          />

          {/* Mobile numbers field */}
          <label htmlFor="mobile" className="block text-sm font-bold mb-1">
            Mobile numbers
          </label>
          <input
            type="tel"
            id="mobile"
            className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-4"
          />

          {/* Password field */}
          <label htmlFor="password" className="block text-sm font-bold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-1"
          />
          <p className="text-xs text-red-600 mb-4 flex items-center">
            {/* Exclamation Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amazon-orange" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Passwords must be at least 6 characters.
          </p>


          {/* Password again field */}
          <label htmlFor="password-again" className="block text-sm font-bold mb-1">
            Password again
          </label>
          <input
            type="password"
            id="password-again"
            className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-6"
          />

          <button
            type="submit"
            className="w-full py-1.5 bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) text-sm border border-yellow-400 rounded-sm shadow-sm transition duration-150 font-bold"
          >
            Next step
          </button>
        </form>
        
        {/* Terms and Conditions */}
        <p className="text-xs mt-4 leading-4">
          By creating an account or logging in, you agree to Amazon's{' '}
          <a href="#" className="text-blue-600 hover:text-red-700 hover:underline">
            Conditions of Use
          </a>
          ,{' '}
          <a href="#" className="text-blue-600 hover:text-red-700 hover:underline">
            Privacy Notice
          </a>
          , and the{' '}
          <a href="#" className="text-blue-600 hover:text-red-700 hover:underline">
            Amazon Business Terms and Conditions
          </a>
          . You agree that you are creating this business account on behalf of your organization and have authority to bind your organization.
        </p>
      </div>


      {/* Footer Links - Note: The footer in the image is simple, so reusing the standard footer structure */}
      <div className="w-full mt-10 border-t border-gray-300 pt-5 pb-10 bg-gray-100 flex flex-col items-center">
        <div className="flex space-x-4 text-xs">
          <a href="#" className="text-blue-600 hover:text-red-700 hover:underline">
            Conditions of Use
          </a>
          <a href="#" className="text-blue-600 hover:text-red-700 hover:underline">
            Privacy Notice
          </a>
          <a href="#" className="text-blue-600 hover:text-red-700 hover:underline">
            Help
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
      
    </div>
  );
};

export default AmazonBusinessStep1;

// You would also define custom Tailwind colors in your tailwind.config.js for accuracy:
// 'amazon-darkblue': '#131A22',
// 'amazon-orange': '#C45500',