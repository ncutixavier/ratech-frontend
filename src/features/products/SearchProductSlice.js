import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const searchProduct = createAsyncThunk(
  "product/search",
  async (data) => {
    try {
      const response = await http.get(`/product/search?query=${data}`);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      Promise.reject(err.response);
    }
  }
);

export const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState: {
    loading: false,
    error: null,
    products: [],
  },
  reducers: {},
  extraReducers: {
    [searchProduct.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.products = [];
    },
    [searchProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    [searchProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.products = [];
    },
  },
});

export const selectSearchProduct = (state) => state.searchProduct;
export const searchProductReducer = searchProductSlice.reducer;
