import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const grdnSlice = createSlice({
  name: "grdn",
  initialState: {
    name: "New Garden",
    shape: "1",
    plants: [],
  },
  reducers: {
    setGName: (state, { payload }) => {
      state.zones = payload;
    },

    setGShape: (state, { payload }) => {
      state.waters = payload;
    },

    setGPlants: (state, { payload }) => {
      state.suns = payload;
    },
  },
});

export const { setGName, setGShape, setGPlants } = grdnSlice.actions;

export default grdnSlice.reducer;
