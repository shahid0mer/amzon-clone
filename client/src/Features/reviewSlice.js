import { createSlice } from "@reduxjs/toolkit";
import { addReview, getReviews} from "../Features/reviewThunk";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      })

  },
});

export default reviewSlice.reducer;
