import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

const usrSlice = createSlice({
  name: "usr",
  initialState: {
    email: "0",
    password: "0",
    fname: "0",
    lname: "0",
    phone: "0",
    zone: "0",
    token: false,
  },
  reducers: {
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setPassword: (state, { payload }) => {
      state.password = payload;
    },
    setFname: (state, { payload }) => {
      state.fname = payload;
    },
    setLname: (state, { payload }) => {
      state.lname = payload;
    },
    setPhone: (state, { payload }) => {
      state.phone = payload;
    },
    setZone: (state, { payload }) => {
      state.zone = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setFname,
  setLname,
  setPhone,
  setZone,
  setToken,
} = usrSlice.actions;

export default usrSlice.reducer;
