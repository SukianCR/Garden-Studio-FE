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
        in_garden: false,
        price: "15",
      },
      {
        id: 2,
        plant_name: "Crowberr",
        in_garden: false,
        pic: "2",
        price: "20",
      },
      {
        id: 3,
        plant_name: "Paper birc",
        in_garden: false,
        pic: "3",
        price: "25",
      },
      {
        id: 4,
        plant_name: "Bunchberry",
        in_garden: false,
        pic: "4",
        price: "10",
      },
      {
        id: 5,
        plant_name: "Eucalyptus",
        in_garden: false,
        pic: "5",
        price: "20",
      },
      {
        id: 6,
        plant_name: "Foxglove",
        in_garden: false,
        pic: "6",
        price: "35",
      },
      {
        id: 7,
        plant_name: "Common juniper",
        in_garden: false,
        pic: "7",
        price: "15",
      },
      {
        id: 8,
        plant_name: "Goldenrod",
        in_garden: false,
        pic: "8",
        price: "40",
      },
      {
        id: 9,
        plant_name: "Sugar maple",
        in_garden: false,
        pic: "9",
        price: "30",
      },

      {
        id: 10,
        plant_name: "Crabapple tree",
        pic: "10",
        in_garden: false,
        price: "25",
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
      {
        id: 25,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 26,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 27,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 28,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 29,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 30,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 31,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 32,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 33,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 34,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 35,
        plant_id: null,
        plant_pic: null,
        vacancy: true,
      },
      {
        id: 36,
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
        in_garden: false,
      },
      {
        id: 2,
        plant_name: "Crowberr",
        in_garden: false,
        pic: "2",
      },
      {
        id: 3,
        plant_name: "Paper birc",
        in_garden: false,
        pic: "3",
      },
      {
        id: 4,
        plant_name: "Bunchberry",
        in_garden: false,
        pic: "4",
      },
      {
        id: 5,
        plant_name: "Eucalyptus",
        in_garden: false,
        pic: "5",
      },
      {
        id: 6,
        plant_name: "Foxglove",
        in_garden: false,
        pic: "6",
      },
      {
        id: 7,
        plant_name: "Common juniper",
        in_garden: false,
        pic: "7",
      },
      {
        id: 8,
        plant_name: "Goldenrod",
        in_garden: false,
        pic: "8",
      },
      {
        id: 9,
        plant_name: "Sugar maple",
        in_garden: false,
        pic: "9",
      },

      {
        id: 10,
        plant_name: "Crabapple tree",
        pic: "10",
        in_garden: false,
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
