import { createSlice } from "@reduxjs/toolkit";
import {
  createOrderThunk,
  getMyOrdersThunk,
  getOrderByIdThunk,
  
} from "../Features/orderThunk";

const initialState = {
  myOrders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE ORDER
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MY ORDERS
      .addCase(getMyOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE ORDER
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
  }
});

export default orderSlice.reducer;
