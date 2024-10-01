import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const gardenApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createGarden: builder.mutation({
      query: ({ specifications }) => ({
        url: "/garden",
        method: "POST",
        body: specifications,
      }),
      invalidatesTags: ["Garden"],
    }),
    getMyGarden: builder.query({
      query: (user_id) => ({
        url: `/gardens/${user_id}`,
        method: "GET",
      }),
      providesTags: ["Garden"],
    }),
    getUserGarden: builder.query({
      query: ({ user_id, garden_id }) => ({
        url: `/garden/${user_id}/myGarden/${garden_id}`,
        method: "GET",
      }),
      providesTags: ["Garden"],
    }),
    //-Drew - not sure if I need to add anything to the get to be able to return the garden info and the garden_plants info
    //also should it be id instead of garden_id?
    updateGarden: builder.mutation({
      query: ({ garden_id, form }) => ({
        url: `/garden/${garden_id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["Garden"],
    }),
    deleteGarden: builder.mutation({
      query: (garden_id) => ({
        url: `/garden/${garden_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Garden"],
    }),
    addGardenPlant: builder.mutation({
      query: ({ garden_id, plant }) => ({
        url: `/garden/plants/${garden_id}`,
        method: "POST",
        body: plant,
      }),
      invalidatesTags: ["Garden"],
    }),
    deleteGardenPlant: builder.mutation({
      query: (garden_plant_id) => ({
        url: `/garden/plants/${garden_plant_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Garden"],
    }),
    updateGardenPlant: builder.mutation({
      query: ({ garden_plant_id, garden }) => ({
        url: `/garden/plants/${garden_plant_id}`,
        method: "PUT",
        body: garden,
      }),
      invalidatesTags: ["Garden"],
    }),
  }),
});

const storeGarden = (state, { payload }) => {
 // console.log("storeGarden", payload);
  state.garden = payload.gardenInfo;
  state.currentGardenCanvas = payload.gardenInfo?.[0].shape_id;
};
const storeUpdatedGarden = (state, { payload }) => {
 // console.log("updateGarden's payload", payload);
  state.garden = payload.gardenInfo;
  state.currentGardenCanvas = payload.gardenInfo?.[0].shape_id;
};
const gardenSlice = createSlice({
  name: "garden",
  initialState: {},
  reducers: {
    setCurrentGardenCanvas: (state, { payload }) => {
      state.currentGardenCanvas = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.createGarden.matchFulfilled, storeGarden);
    builder.addMatcher(api.endpoints.getMyGarden.matchFulfilled, storeGarden);
    builder.addMatcher(
      api.endpoints.updateGarden.matchFulfilled,
      storeUpdatedGarden
    );
  },
});

export const {
  useCreateGardenMutation,
  useGetUserGardenQuery,
  useGetMyGardenQuery,
  useUpdateGardenMutation,
  useAddGardenPlantMutation,
  useDeleteGardenPlantMutation,
  useUpdateGardenPlantMutation,
} = gardenApi;

export const { setCurrentGardenCanvas } = gardenSlice.actions;

export default gardenSlice.reducer;
