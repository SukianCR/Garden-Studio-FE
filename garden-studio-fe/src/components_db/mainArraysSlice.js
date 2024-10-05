import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const mainArraysSlice = createSlice({
  name: "mainArrays",
  initialState: {
    allPlants: [
      {
        id: 1,
        plant_name: "Dwarf",
        pic: "1",

        price: "15",
        zone: 1,
        water: 3,
        sun: 3,
        soil: 4,
      },
      {
        id: 2,
        plant_name: "Crowberr",

        pic: "2",
        price: "20",
        zone: 2,
        water: 1,
        sun: 4,
        soil: 5,
      },
      {
        id: 3,
        plant_name: "Paper birc",

        pic: "3",
        price: "25",
        zone: 2,
        water: 3,
        sun: 1,
        soil: 6,
      },
      {
        id: 4,
        plant_name: "Bunchberry",

        pic: "4",
        price: "10",
        zone: 3,
        water: 4,
        sun: 5,
        soil: 1,
      },
      {
        id: 5,
        plant_name: "Eucalyptus",

        pic: "5",
        price: "20",
        zone: 4,
        water: 5,
        sun: 4,
        soil: 2,
      },
      {
        id: 6,
        plant_name: "Foxglove",

        pic: "6",
        price: "35",
        zone: 5,
        water: 5,
        sun: 3,
        soil: 3,
      },
      {
        id: 7,
        plant_name: "Common juniper",

        pic: "7",
        price: "15",
        zone: 5,
        water: 5,
        sun: 3,
        soil: 3,
      },
      {
        id: 8,
        plant_name: "Goldenrod",

        pic: "8",
        price: "40",
        zone: 6,
        water: 4,
        sun: 2,
        soil: 4,
      },
      {
        id: 9,
        plant_name: "Sugar maple",

        pic: "9",
        price: "30",
        zone: 7,
        water: 1,
        sun: 1,
        soil: 5,
      },

      {
        id: 10,
        plant_name: "Crabapple tree",
        pic: "10",

        price: "25",
        zone: 7,
        water: 2,
        sun: 2,
        soil: 6,
      },
    ],
    allContainers: [
      {
        id: 1,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 2,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 3,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 4,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 5,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 6,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 7,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 8,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 9,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },

      {
        id: 10,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 11,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 12,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 13,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 14,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 15,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 16,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 17,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 18,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 19,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },

      {
        id: 20,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 21,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 22,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 23,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 24,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
    ],
    plantsInGarden: [],
    referencePlants: [
      {
        id: 1,
        plant_name: "Dwarf",
        pic: "1",
        price: "15",
        zone: 1,
        water: 3,
        sun: 3,
        soil: 4,
      },
      {
        id: 2,
        plant_name: "Crowberr",
        pic: "2",
        price: "20",
        zone: 2,
        water: 1,
        sun: 4,
        soil: 5,
      },
      {
        id: 3,
        plant_name: "Paper birc",
        pic: "3",
        price: "25",
        zone: 2,
        water: 3,
        sun: 1,
        soil: 6,
      },
      {
        id: 4,
        plant_name: "Bunchberry",
        pic: "4",
        price: "10",
        zone: 3,
        water: 4,
        sun: 5,
        soil: 1,
      },
      {
        id: 5,
        plant_name: "Eucalyptus",
        pic: "5",
        price: "20",
        zone: 4,
        water: 5,
        sun: 4,
        soil: 2,
      },
      {
        id: 6,
        plant_name: "Foxglove",
        pic: "6",
        price: "35",
        zone: 5,
        water: 5,
        sun: 3,
        soil: 3,
      },
      {
        id: 7,
        plant_name: "Common juniper",
        pic: "7",
        price: "15",
        zone: 5,
        water: 5,
        sun: 3,
        soil: 3,
      },
      {
        id: 8,
        plant_name: "Goldenrod",
        pic: "8",
        price: "40",
        zone: 6,
        water: 4,
        sun: 2,
        soil: 4,
      },
      {
        id: 9,
        plant_name: "Sugar maple",
        pic: "9",
        price: "30",
        zone: 7,
        water: 1,
        sun: 1,
        soil: 5,
      },

      {
        id: 10,
        plant_name: "Crabapple tree",
        pic: "10",
        price: "25",
        zone: 7,
        water: 2,
        sun: 2,
        soil: 6,
      },
    ],
  },
  reducers: {
    setAllPlants: (state, { payload }) => {
      state.allPlants = payload;
    },

    setAllContainers: (state, { payload }) => {
      state.allContainers = payload;
    },

    setPlantsInGarden: (state, { payload }) => {
      state.plantsInGarden = payload;
    },
    setReferencePlants: (state, { payload }) => {
      state.referencePlants = payload;
    },
  },
});

export const {
  setAllPlants,
  setAllContainers,
  setPlantsInGarden,
  setReferencePlants,
} = mainArraysSlice.actions;

export default mainArraysSlice.reducer;
