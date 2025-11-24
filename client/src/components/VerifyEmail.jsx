import React from 'react';

const VerifyEmail = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 sm:pt-16">
      {/* Optional: Amazon Logo (not visible in this specific screenshot, but usually present) */}
      {/* <div className="mb-4">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/31/gno/assets/images/header/logo._CB658249089_.png"
          alt="Amazon.in Logo"
          className="w-24 h-8 object-contain"
        />
      </div> */}

      {/* Verify Email Address Card */}
      <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
        <h1 className="text-2xl font-normal mb-4">Verify email address</h1>

        <p className="text-sm mb-4 leading-normal">
          To verify your email, we've sent a One Time Password (OTP) to{' '}
          <span className="font-bold">jagdishmandhalkar1308@gmail.com</span> (<a href="#" className="text-blue-600 hover:text-red-700 hover:underline">Change</a>)
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="otp" className="block text-sm font-bold mb-1">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-6"
            maxLength="6" 
          />

          <button
            type="submit"
            className="w-full py-1.5 bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) text-sm border border-yellow-400 rounded-sm shadow-sm transition duration-150"
          >
            Create your Amazon account
          </button>
        </form>

        <p className="text-xs mt-3 leading-4">
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
          .{' '}
          <span className="italic">You agree that you are creating this business account on behalf of your organization and have authority to bind your organization.</span>
        </p>
        
        <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-red-700 hover:underline">Resend OTP</a>
        </div>
      </div>

      {/* Footer Links (Simplified) */}
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

export default VerifyEmail;