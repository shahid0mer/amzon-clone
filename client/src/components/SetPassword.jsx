import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPasswordThunk } from '../Features/authThunk';
import AmazonLogo1 from '../assets/Amazon_logo.svg?url';
import inimg from "../assets/in.svg?url";
import { useEffect } from 'react';
import { toast } from 'sonner';


const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); 
  const dispatch = useDispatch();
  const token = useSelector((state)=> state.auth.token);


  
  useEffect(() => {
  if (token === null) return; 
  if (!token) {
    toast.warning("Token missing. Please login again.");
    navigate('/signin');
  }
}, [token, navigate]);

const handleSetPassword = async (e) => {
  e.preventDefault();

  if (!password || !confirm) {
    toast.warning("Please enter password and confirm it.");
    return;
  }

  if (password !== confirm) {
    toast.warning("Passwords do not match!");
    return;
  }

  try {
    await dispatch(setPasswordThunk({ token, newPassword: password })).unwrap();
    // dispatch(clearSetPasswordToken());
    toast.success("Password set successfully!");
    navigate('/');
  } catch (err) {
    toast.error(err.message || "Failed to set password. Token may be invalid or expired.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 sm:pt-16">
      <div className="mb-4 flex gap-0.5">
        <img src={AmazonLogo1} alt="Amazon.in Logo" className="w-24 h-8 object-contain" />
        <img className='w-[15px] mb-2 ' src={inimg} alt="" />
      </div>

      <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
        <h1 className="text-2xl font-normal mb-4">Set your password</h1>
        <form onSubmit={handleSetPassword}>
          <label className="block text-sm font-bold mb-1">New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-4"
          />
          <label className="block text-sm font-bold mb-1">Confirm password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-2 border border-gray-400 rounded-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-sm mb-4"
          />
          <button
            type="submit"
            className="w-full py-1.5  hover:bg-(--color-amazon-orange) text-sm border border-yellow-400 rounded-sm shadow-sm transition duration-150"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
