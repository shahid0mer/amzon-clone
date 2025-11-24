import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosClient";

// GET all addresses
export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, {getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get("/address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ADD address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (address, { getState, rejectWithValue }) => {
    try {
    const token = getState().auth.token;
      const res = await axios.post("/address", address, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.addresses;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// UPDATE address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
    const token = getState().auth.token;
      const res = await axios.put(`/address/${id}`, data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.addresses;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// DELETE address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.delete(`/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.addresses;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// SET DEFAULT address
export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (id, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
      const res = await axios.patch(`/address/default/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.addresses;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
