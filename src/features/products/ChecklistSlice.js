import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../http-common";

export const checklist = createAsyncThunk(
  "product/checklist",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post("/product/check", data);
      console.log("response::", response);
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const checklistSlice = createSlice({
  name: "checklist",
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [checklist.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    },
    [checklist.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [checklist.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export const selectChecklist = (state) => state.checklist;
export default checklistSlice.reducer;
