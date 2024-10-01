import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "../components_db/registrationSlice";
import userReducer from "../components_db/userSlice";
import referenceReducer from "../components_db/referenceSlice";
import plantsReducer from "../components_db/plantSlice";
import gardenReducer from "../components_db/gardenSlice";
import currentView from "../components_db/currentViewSlice";
import mainArrays from "../components_db/mainArraysSlice";
import usr from "../components_db/usrSlice";

import { api } from "./api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    registration: registrationReducer,
    user: userReducer,
    reference: referenceReducer,
    plants: plantsReducer,
    garden: gardenReducer,
    currentView,
    mainArrays,
    usr,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
