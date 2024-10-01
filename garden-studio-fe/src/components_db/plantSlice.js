import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const plantApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlants: builder.query({
      query: () => ({
        url: "/plants",
        method: "GET",
      }),
      providesTags: ["Plants"],
    }),
  }),
});

const plantsSlice = createSlice({
  name: "getPlants",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getPlants.matchFulfilled);
  },
});

export default plantsSlice.reducer;

export const { useGetPlantsQuery } = plantApi;
