import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosClient"

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/reviews", data);
      return res.data.review;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/reviews/${productId}`);
      console.log(res.data);
      
      return res.data.reviews;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

