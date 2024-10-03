import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const plantsPSlice = createSlice({
  name: "plantsP",
  initialState: {
    zones: [
      {
        id: 1,
        name: "-60 to -20 ",
      },
      {
        id: 2,
        name: "-20 to 0 ",
      },
      {
        id: 3,
        name: "-20 to 0 ",
      },
      {
        id: 4,
        name: "0 to 10 ",
      },
      {
        id: 5,
        name: "10 to 20 ",
      },
      {
        id: 6,
        name: "20 to 30 ",
      },
      {
        id: 7,
        name: "30 to 40 ",
      },
    ],
    waters: [
      {
        id: 1,
        name: "Arid",
      },
      {
        id: 2,
        name: "Dry",
      },
      {
        id: 3,
        name: "Moist",
      },
      {
        id: 4,
        name: "Wet",
      },
      {
        id: 5,
        name: "Damp",
      },
    ],
    suns: [
      {
        id: 1,
        name: "Full Sun",
      },
      {
        id: 2,
        name: "2/3 sun",
      },
      {
        id: 3,
        name: "1/2 sun",
      },
      {
        id: 4,
        name: "1/3 sun",
      },
      {
        id: 5,
        name: "No Sun",
      },
    ],
    soils: [
      {
        id: 1,
        name: "Clay",
      },
      {
        id: 2,
        name: "Sandy",
      },
      {
        id: 3,
        name: "Chalky",
      },
      {
        id: 4,
        name: "Loamy",
      },
      {
        id: 5,
        name: "Peat",
      },
      {
        id: 6,
        name: "Silty",
      },
    ],
  },
  reducers: {
    setZones: (state, { payload }) => {
      state.zones = payload;
    },

    setWaters: (state, { payload }) => {
      state.waters = payload;
    },

    setSuns: (state, { payload }) => {
      state.suns = payload;
    },
    setSoils: (state, { payload }) => {
      state.soils = payload;
    },
  },
});

export const { setZones, setWaters, setSuns, setSoils } = plantsPSlice.actions;

export default plantsPSlice.reducer;
