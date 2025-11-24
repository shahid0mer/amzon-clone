import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosClient";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ 
    page = 1, 
    limit = 20,
    search, 
    category,
    brand,
    minPrice,
    maxPrice,
    rating,
    sort

   }, { rejectWithValue }) => {
    try {
       const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search && { search }),
        ...(category && { category }),
        ...(brand && { brand }),
        ...(minPrice && { minPrice: String(minPrice) }),
        ...(maxPrice && { maxPrice: String(maxPrice) }),
        ...(rating && { rating: String(rating) }),
        ...(sort && { sort }),
      });
      const res = await axios.get(`/product/list?${params.toString()}`);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/product/${id}`);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async ({ categoryName, page = 1, limit = 12, sort, minPrice, maxPrice, brand }, { rejectWithValue }) => {
    try {
      // Build query params
      const params = new URLSearchParams({
        page,
        limit,
        ...(sort && { sort }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        ...(brand && { brand }),
      });

      const res = await axios.get(`/product/category/${categoryName}?${params.toString()}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
