import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosClient";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/login", credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async ({ token, isNewUser, user }, { rejectWithValue }) => {
    try {
      return { token, isNewUser, user  };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const setPasswordThunk = createAsyncThunk(
  "auth/setPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/setpass", {
        token,
        newPassword,
      });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/register", formData);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);