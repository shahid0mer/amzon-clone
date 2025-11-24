import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../services/axiosClient";

export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return res.data.order;

    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const getMyOrdersThunk = createAsyncThunk(
  "orders/getMyOrders",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.get("/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` }
      });

      return res.data.orders;

    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getOrderByIdThunk = createAsyncThunk(
  "orders/getOrderById",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.get(`/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return res.data.order;

    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
