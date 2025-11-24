import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} from "../Features/addressThunk";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAddresses.pending, state => {
        state.loading = true;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      // UPDATE
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      // DELETE
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      // SET DEFAULT
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      });
  }
});

export default addressSlice.reducer;
