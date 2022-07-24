import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const getChecklist = createAsyncThunk(
  "product/get/checklist",
  async (data) => {
    try {
      const response = await http.get(`/product/check`);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      Promise.reject(err.response);
    }
  }
);

export const getChecklistSlice = createSlice({
  name: "getChecklist",
  initialState: {
    loading: false,
    error: null,
    results: [],
  },
  reducers: {},
  extraReducers: {
    [getChecklist.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.results = [];
    },
    [getChecklist.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.results = action.payload;
    },
    [getChecklist.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.results = [];
    },
  },
});

export const selectGetChecklist = (state) => state.getChecklist;
export const getChecklistReducer = getChecklistSlice.reducer;
