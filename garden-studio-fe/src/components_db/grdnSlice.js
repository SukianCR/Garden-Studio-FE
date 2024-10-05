import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const grdnSlice = createSlice({
  name: "grdn",
  initialState: {
    name: "New Garden",
    shape: "1",
    plants: [],
    paths: [],
  },
  reducers: {
    setGName: (state, { payload }) => {
      state.name = payload;
    },

    setGShape: (state, { payload }) => {
      state.shape = payload;
    },

    setGPlants: (state, { payload }) => {
      state.plants = payload;
    },

    setPaths: (state, { payload }) => {
      state.paths = payload;
    },
  },
});

export const { setGName, setGShape, setGPlants, setPaths } = grdnSlice.actions;

export default grdnSlice.reducer;
