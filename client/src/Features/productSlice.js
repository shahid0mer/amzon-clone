import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById , fetchProductsByCategory} from "../Features/productThunk";

const initialState = {
  products: [],
  total: 0,
  page: 1,
  limit: 12,
  product: null, 
  categoryProducts: [], 
  category: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCategoryProducts: (state) => {
      state.categoryProducts = [];
      state.category = null;
    }
  },

  extraReducers: (builder) => {
    builder

      
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
    
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload.products;
        state.category = action.payload.category;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
