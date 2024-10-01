import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["User"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getRefresh: builder.query({
      query: () => ({
        url: `/refresh`,
        method: "GET",
      }),
      providesTags: ["User"],
      onQueryStarted: (arg, { _, queryFulfilled }) => {
        //   console.log("Refresh Query Start");
        queryFulfilled
          .then(({ data }) => {
            //     console.log("Refresh fulfilled", data)
          })
          .catch((err) => console.error("Refresh Query failed", err));
      },
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

const storeUser = (state, { payload }) => {
  // console.log("storeuser: payload", payload);

  //TODO - modify this to
  state.user = payload.user;

  // state.id = payload.user.id;
  // state.firstname = payload.user.firstname;
  // state.lastname = payload.user.lastname;
  // state.email = payload.user.email;
  // state.phone_number = payload.user.phone_number;
  // state.zone_id = payload.user.zone_id;
  // state.user_role_id = payload.user.user_role_id;
};

const storeUpdateUser = (state, { payload }) => {
  // console.log("storeUpdateUser: payload", payload);

  //TODO - modify this to
  state.user = payload;

  // state.id = payload.id;
  // state.firstname = payload.firstname;
  // state.lastname = payload.lastname;
  // state.email = payload.email;
  // state.phone_number = payload.phone_number;
  // state.zone_id = payload.zone_id;
  // state.user_role_id = payload.user_role_id;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setLoginToken: (state, { payload }) => {
      //   console.log("storeLoginToken: payload", payload);
      window.sessionStorage.setItem("Token", payload.token);
      state.currentUserId = payload.user.id;
      state.user = payload.user;
    },

    clearLoginToken: ({ state }) => {
      window.sessionStorage.removeItem("Token");
      state.currentUserId = null;
      state.user = null;
    },

    // storeUser: (state, { payload }) => {
    //   state.currentUserId = payload.user.id;
    //   state.user = payload.user;
    // },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        //   console.log("bob");
        state.user = payload.user;
        window.sessionStorage.setItem("Token", payload.token);
      }
    );
    builder.addMatcher(api.endpoints.getUser.matchFulfilled, storeUser);
    builder.addMatcher(api.endpoints.getRefresh.matchFulfilled, storeUser);
    builder.addMatcher(
      api.endpoints.updateUser.matchFulfilled,
      storeUpdateUser
    );
  },
});

export const {
  useLoginMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useLazyGetUserQuery,
  useGetRefreshQuery,
  useLazyGetRefreshQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

export const { setLoginToken, clearLoginToken /*,  storeUser*/ } =
  userSlice.actions;

export default userSlice.reducer;
