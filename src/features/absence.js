// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchListAbsence } from "../services/api";

// const initialState = {
//   error: null,
//   loading: false,
//   absences: [],
// };

// export const fetchAbsences = createAsyncThunk("absence/fetchAbsence", async () => {
//   const response = await fetchListAbsence();
//   return response;
// });

// const absenceSlice = createSlice({
//   name: "absence",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchAbsences.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(fetchAbsences.fulfilled, (state, action) => {
//       state.loading = false;
//       state.absences = action.payload;
//     });
//     builder.addCase(fetchAbsences.rejected, (state) => {
//       state.loading = false;
//       state.error = "Error";
//     });
//   },
// });

// export default absenceSlice.reducer;


import { apiSlice } from "../app/api/apiSlice";


const absenceApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    getAbsences: builder.query({
      query:()=>({
        url:'/absence',
        method: 'GET'
      })
     

  })
})

})


export const  {useGetAbsencesQuery} = absenceApiSlice;