// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchListWorkers, deleteWork } from "../services/api";

// const initialState = {
//   workers: [],
//   error: null,
// };

// export const fetchWorkers = createAsyncThunk(
//   "workers/fetchWorkers",
//   async () => {
//     const response = await fetchListWorkers();
//     return response.data;
//   }
// );

// export const deleteWorker = createAsyncThunk(
//   "workers/deleteWorker",
//   async (id) => {
//     const response = await deleteWork(id);
//     return response; // Assuming deleteWork returns some confirmation or the deleted worker ID
//   }
// );

// export const addWorker = createAsyncThunk(
//   "workers/addWorker",
//   async ()=>{
//     const response = await addWorker();
//     return response;
//   }
// )

// const workersSlice = createSlice({
//   name: "workers",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {

//     builder.addCase(fetchWorkers.fulfilled, (state, action) => {
//       state.error = null;
//       state.workers = action.payload;
//     });
//     builder.addCase(fetchWorkers.rejected, (state) => {
//       state.error = "Error fetching workers";
//     });

//     builder.addCase(deleteWorker.fulfilled, (state, action) => {
//       state.error = null; // Reset any previous error
//       state.workers = state.workers.filter(worker => worker._id !== action.payload.id);
//     });

//     builder.addCase(deleteWorker.rejected, (state, action) => {
//       state.error = action.error.message; // Set the error message from the action payload
//     });
//   },
// });

// export default workersSlice.reducer;

import { apiSlice } from "../app/api/apiSlice";

export const WorkersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchWorkers: builder.mutation({
      query: () => ({
        url: "/workers",
        method: "GET",
      }),
    }),
    addWorker: builder.mutation({
      query: (worker) => ({
        url: "/workers/add",
        method: "POST",
        body: worker
      }),
    }),
    deleteWorker: builder.mutation({
      query: ({ id }) => ({
        url: `/workers/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFetchWorkersMutation, useDeleteWorkerMutation } =
  WorkersApiSlice;
