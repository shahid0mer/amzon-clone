import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AmazonLogo1 from "../assets/Amazon_logo.svg?url";
import inimg from "../assets/in.svg?url";
import { useDispatch } from "react-redux";
import { loginUser, loginWithGoogle } from "../Features/authThunk";
import { toast } from "sonner";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignIn = () => {
  const [step, setStep] = useState(1); // 1 = email step, 2 = password step
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    if (step === 1 && email.trim() !== "") {
      setStep(2);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();

      navigate("/"); // Redirect after login
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Login failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Send the access token to your backend
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/google`,
          {
            access_token: tokenResponse.access_token,
          }
        );

        const { token, isNewUser, user } = response.data;

        // Save token to Redux using your existing thunk
        await dispatch(loginWithGoogle({ token, isNewUser, user })).unwrap();

        // Navigate based on whether user needs to set password
        if (isNewUser) {
          navigate("/create-password");
        } else {
          navigate("/");
        }

        toast.success("Successfully logged in with Google!");
      } catch (err) {
        console.error("Google login error:", err);
        toast.error(err.response?.data?.error || "Google login failed");
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      toast.error("Google login failed");
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 sm:pt-16">
      {/* Amazon Logo */}
      <div className="mb-4 flex gap-0.5">
        <img
          src={AmazonLogo1}
          alt="Amazon.in Logo"
          className="w-24 h-8 object-contain"
        />
        <img className="w-[15px] mb-2 " src={inimg} alt="" />
      </div>

      {/* Sign-in Card */}
      <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
        <h1 className="text-2xl font-normal mb-4">Sign in</h1>

        <form onSubmit={step === 1 ? handleContinue : handleSignIn}>
          {step === 1 ? (
            <>
              <label htmlFor="email" className="block text-sm font-bold mb-1">
                Email or mobile phone number
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-4"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) text-sm border border-yellow-400 rounded-sm shadow-sm transition duration-150"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-1"
              >
                Enter your password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-4"
              />
              <button
                type="submit"
                className="w-full py-1.5 bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) text-sm border border-yellow-400 rounded-sm shadow-sm transition duration-150"
              >
                Sign in
              </button>
            </>
          )}
        </form>

        <p className="text-xs mt-3 leading-4">
          By continuing, you agree to Amazon's{" "}
          <a
            href="#"
            className="text-blue-600 hover:text-red-700 hover:underline"
          >
            Conditions of Use
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-blue-600 hover:text-red-700 hover:underline"
          >
            Privacy Notice
          </a>
          .
        </p>

        <div className="mt-4">
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-red-700 hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1 transform rotate-90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Need help?
          </a>
        </div>

        <hr className="my-5 border-t border-gray-200" />

        {/* Buying for work section */}
        <div>
          <h2 className="text-sm font-bold">Buying for work?</h2>
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-red-700 hover:underline"
          >
            Shop on Amazon Business
          </a>
        </div>
      </div>

      {/* Separator and Create Account/Google */}
      <div className="w-full max-w-sm mt-5">
        <div className="relative text-center mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative inline-block px-2 text-xs text-gray-500 bg-gray-100">
            New to Amazon?
          </div>
        </div>

        <Link to="/signup">
          <button className="w-full py-1.5 bg-gray-100 hover:bg-gray-200 text-sm border border-gray-400 rounded-sm shadow-sm mb-4">
            Create your Amazon account
          </button>
        </Link>

        <div className="relative text-center mb-4">
          <div className="relative inline-block px-2 text-xs text-gray-500 bg-gray-100">
            or
          </div>
        </div>

        <button
          onClick={() => googleLogin()}
          className="w-full py-1.5 bg-white hover:bg-gray-50 text-sm border border-gray-400 rounded-sm shadow-sm flex items-center justify-center space-x-2"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.62-.05-1.22-.17-1.81H12v3.42h5.88c-.26 1.37-1.04 2.53-2.21 3.32v2.66h3.42c2.01-1.85 3.17-4.57 3.17-7.61z"
              fill="#4285F4"
            />
            <path
              d="M12 23c3.24 0 5.95-1.08 7.94-2.93l-3.42-2.66c-1.02.68-2.33 1.08-3.92 1.08-3.03 0-5.59-2.05-6.51-4.83H1.93v2.75C3.92 20.32 7.64 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.49 14.18c-.24-.68-.38-1.42-.38-2.18s.14-1.5.38-2.18V7.15H1.93c-.76 1.54-1.16 3.28-1.16 5.07s.4 3.53 1.16 5.07l3.56-2.92z"
              fill="#FBBC05"
            />
            <path
              d="M12 4.67c1.77 0 3.34.61 4.59 1.78l3.05-3.04C17.95 1.53 15.24.4 12 .4 7.64.4 3.92 3.12 1.93 7.15l3.56 2.92c.92-2.78 3.48-4.83 6.51-4.83z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-sm">Login with Google</span>
        </button>
      </div>

      {/* Footer Links */}
      <div className="w-full mt-10 border-t border-gray-300 pt-5 pb-10 bg-gray-100 flex flex-col items-center">
        <div className="flex space-x-4 text-xs">
          <a
            href="#"
            className="text-blue-600 hover:text-red-700 hover:underline"
          >
            Conditions of Use
          </a>
          <a
            href="#"
            className="text-blue-600 hover:text-red-700 hover:underline"
          >
            Privacy Notice
          </a>
          <a
            href="#"
            className="text-blue-600 hover:text-red-700 hover:underline"
          >
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

export default SignIn;
