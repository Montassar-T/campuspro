import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListWorkers } from "../services/api";

const initialState = {
  workers: [],
  loading: false,
  error: null,
};

export const fetchWorkers = createAsyncThunk(
  "workers/fetchWorkers",
  async () => {
    const response = await fetchListWorkers();

    return response.data;
  }
);

const workersSlice = createSlice({
  name: "workers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWorkers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWorkers.fulfilled, (state, action) => {
      state.loading = false;

      state.workers = action.payload;
    });
    builder.addCase(fetchWorkers.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching workers";
    });
  },
});

export default workersSlice.reducer;
