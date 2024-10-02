import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const currentViewSlice = createSlice({
  name: "currentView",
  initialState: {
    water: 0,
    sun: 0,
    soil: 0,
    zone: 0,
    cvShape: 1,
    cvPlants: [],
    shapes: [
      {
        id: 1,
        name: "square",
      },
      {
        id: 2,
        name: "circle",
      },
      {
        id: 3,
        name: "diamond",
      },
      {
        id: 4,
        name: "hearth",
      },
    ],
  },
  reducers: {
    setWater: (state, { payload }) => {
      state.water = payload;
    },

    setZone: (state, { payload }) => {
      state.zone = payload;
    },

    setSun: (state, { payload }) => {
      state.sun = payload;
    },
    setSoil: (state, { payload }) => {
      state.soil = payload;
    },
    setCvShape: (state, { payload }) => {
      state.cvShape = payload;
    },
    setCvPlants: (state, { payload }) => {
      state.cvPlants = payload;
    },
    setCvShapes: (state, { payload }) => {
      state.shapes = payload;
    },
  },
});

export const {
  setWater,
  setZone,
  setSun,
  setSoil,
  setCvShape,
  setCvPlants,
  setCvShapes,
} = currentViewSlice.actions;

export default currentViewSlice.reducer;
