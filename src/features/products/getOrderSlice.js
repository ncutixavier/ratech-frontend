import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const getOrder = createAsyncThunk(
  "product/get/order",
  async (data) => {
    try {
      const response = await http.get(`/product/order`);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      Promise.reject(err.response);
    }
  }
);

export const getOrderSlice = createSlice({
  name: "getOrder",
  initialState: {
    loading: false,
    error: null,
    results: [],
  },
  reducers: {},
  extraReducers: {
    [getOrder.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.results = [];
    },
    [getOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.results = action.payload;
    },
    [getOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.results = [];
    },
  },
});

export const selectGetOrder = (state) => state.getOrder;
export const getOrderReducer = getOrderSlice.reducer;
