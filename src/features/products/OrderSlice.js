import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const order = createAsyncThunk(
  "product/order",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/product/order", data);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [order.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [order.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [order.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectOrder = (state) => state.order;
export default orderSlice.reducer;
