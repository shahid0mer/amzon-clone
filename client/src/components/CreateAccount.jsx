import React, { useState, useEffect } from "react";
import AmazonLogo1 from "../assets/Amazon_logo.svg";
import inimg from "../assets/in.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, registerUser } from "../Features/authThunk";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  // Redirect after successful registration
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      // Define listener separately so you can remove it properly
      const handleMessage = async (event) => {
        // IMPORTANT: Check origin matches your backend URL
        const backendUrl = new URL(import.meta.env.VITE_API_URL);
        if (event.origin !== backendUrl.origin) {
          console.log("Message from wrong origin:", event.origin);
          return;
        }

        console.log("Received message:", event.data);

        const { token, isNewUser, user, error } = event.data;

        if (error) {
          toast.error(error);
          window.removeEventListener("message", handleMessage);
          return;
        }

        if (!token) {
          toast.error("No token received from Google login");
          window.removeEventListener("message", handleMessage);
          return;
        }

        try {
          // Save token to Redux - pass as object!
          await dispatch(loginWithGoogle({ token, isNewUser, user })).unwrap();

          // Clean up listener
          window.removeEventListener("message", handleMessage);

          // Navigate based on whether user needs to set password
          if (isNewUser) {
            navigate("/create-password");
          } else {
            navigate("/");
          }
        } catch (err) {
          console.error("Redux error:", err);
          toast.error(err.message || "Failed to process Google login");
          window.removeEventListener("message", handleMessage);
        }
      };

      // Add listener BEFORE opening popup
      window.addEventListener("message", handleMessage);

      // Open popup AFTER listener is active
      const popup = window.open(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        "_blank",
        "width=500,height=600"
      );

      // Optional: Check if popup was blocked
      if (!popup) {
        toast.warning("Popup was blocked. Please allow popups for this site.");
        window.removeEventListener("message", handleMessage);
      }
    } catch (err) {
      console.error("Google login error:", err);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 sm:pt-16">
      <div className="mb-4 flex gap-0.5">
        <img src={AmazonLogo1} alt="Amazon Logo" className="w-24 h-8" />
        <img className="w-[15px] mb-2" src={inimg} alt="" />
      </div>

      <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
        <h1 className="text-2xl font-normal mb-4">Create Account</h1>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-600 mb-3">{error.message || error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-sm font-bold mb-1">
            Your name
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-sm text-sm mb-4"
            required
          />

          <label htmlFor="email" className="block text-sm font-bold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-sm text-sm mb-4"
            required
          />

          <label htmlFor="password" className="block text-sm font-bold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            className="w-full p-2 border border-gray-400 rounded-sm text-sm mb-6"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-1.5 bg-(--color-amazon-yellow) hover:bg-(--color-amazon-orange) disabled:bg-yellow-300 text-sm border border-yellow-400 rounded-sm shadow-sm"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <h2 className="text-sm font-bold">Buying for work?</h2>
          <a className="text-sm text-blue-600 hover:text-red-700 hover:underline">
            Create a free business account
          </a>
        </div>

        <hr className="my-5" />

        <div className="mb-4">
          <h2 className="text-sm font-bold mb-2">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 hover:text-red-700 hover:underline font-normal"
            >
              Sign in »
            </Link>
          </h2>
        </div>

        <p className="text-xs leading-4">
          By creating an account or logging in, you agree to Amazon's{" "}
          <a className="text-blue-600 hover:text-red-700 hover:underline">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a className="text-blue-600 hover:text-red-700 hover:underline">
            Privacy Notice
          </a>
          .
        </p>

        <div className="relative text-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative inline-block px-2 text-xs text-gray-500 bg-white">
            or
          </div>
        </div>

        <button
          className="w-full py-1.5 bg-white hover:bg-gray-50 text-sm border border-gray-400 rounded-sm flex items-center justify-center space-x-2"
          onClick={handleGoogleLogin}
        >
          {/* Google Icon */}
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

      <div className="w-full mt-10 border-t border-gray-300 pt-5 pb-10 bg-gray-100 flex flex-col items-center">
        <div className="flex space-x-4 text-xs">
          <a className="text-blue-600 hover:text-red-700 hover:underline">
            Conditions of Use
          </a>
          <a className="text-blue-600 hover:text-red-700 hover:underline">
            Privacy Notice
          </a>
          <a className="text-blue-600 hover:text-red-700 hover:underline">
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

export default CreateAccount;
