import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['User', 'Transaction'],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => 'api/users',
      providesTags: ['User'],
      transformResponse: (response, meta, arr) => {
        return response;
      },
    }),
    isSignedUser: builder.query({
      query: () => '/auth/isSigned',
      providesTags: ['User'],
      transformResponse: (response, meta, arr) => {
        return response;
      },
    }),
    signUpGoogleUser: builder.mutation({
      query: (user) => ({
        url: '/auth/google',
        method: 'POST',
        body: user,
      }),
    invalidatesTags: ['User'],
    }),
    signUpUser: builder.mutation({
      query: (user) => ({
        url: 'api/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `api/user/${user.params}`,
        method: 'PUT',
        body: {
          firstName: user.firstName,
          lastName: user.lastName,
          nickname: user.nickname,
        },
      }),
      invalidatesTags: ['User'],
    }),
    // checkPassword: builder.mutation({
    //   query: (userData) => ({
    //     url: 'auth/signin',
    //     method: 'POST',
    //     body: userData,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
    updatePassword: builder.mutation({
      query: (user) => ({
        url: `api/user/${user.params}`,
        method: 'PUT',
        body: {
          password: user.password,
        },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (params) => ({
        url: `api/user/${params}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    signinUser: builder.mutation({
      query: (userData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: userData,
      }),
    }),
    signoutUser: builder.mutation({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Transaction'],
    }),
    userToken: builder.mutation({
      query: () => ({
        url: '/protected',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
  }),
  closeAccount: builder.mutation({
    query: (params) => ({
      url: `api/user/${params}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useFetchUserQuery,
  useSignUpUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSigninUserMutation,
  useSignoutUserMutation,
  useUserTokenMutation,
  useCheckPasswordMutation,
  useUpdatePasswordMutation,
  useIsSignedUserQuery,
  useSignUpGoogleUserMutation,
} = userAPI;
