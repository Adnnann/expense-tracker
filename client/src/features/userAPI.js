import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ["User","Transaction"],
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        fetchUser: builder.query({
            query: () => "api/users",
            providesTags:['User'],
            transformResponse: (response, meta, arr) => {
                return response;
            }
        }),
        isSignedUser: builder.query({
            query: () => "/auth/isSigned",
            providesTags:['User'],
            transformResponse: (response, meta, arr) => {
                return response;
            },
          
           
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: "api/user",
                method: "POST",
                body: user,
            }),
            transformResponse: (response, meta, arr) => {
                return response;
            },
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `api/user/${user.params}`,
                method: "PUT",
                body: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    nickname: user.nickname,
                },
            }),
            invalidatesTags: ['User']
        }),
        checkPassword: builder.mutation({
            query: (userData) => ({
                url: "/auth/signin",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ['User']
        }),
        updatePassword: builder.mutation({
            query: (user) => ({
                url: `api/user/${user.params}`,
                method: "PUT",
                body: {
                    password: user.password,
                },
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: (params) => ({
                url: `api/user/${params}`,
                method: "DELETE",
            }),
              invalidatesTags: ['User']
        }),
        signinUser: builder.mutation({
            query: (userData) => ({
                url: "/auth/signin",
                method: "POST",
                body: userData,
            }),
        }),
        signoutUser: builder.mutation({
            query: () => ({
                url: "/auth/signout",
                method: "POST",
            }),
            invalidatesTags: ['User','Transaction']
        }),
        userToken: builder.mutation({
            query: () => ({
                url: "/protected",
                method: "GET",
            }),
            invalidatesTags: ['User']
        }),
        reloginUser: builder.mutation({
            query: (token) => ({
                url: "/auth/relogin",
                method: "POST",
                body: { token },
            }),
            invalidatesTags: ['User']
        })
    }),
})

export const {
    useFetchUserQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useSigninUserMutation,
    useSignoutUserMutation,
    useUserTokenMutation,
    useReloginUserMutation,
    useCheckPasswordMutation,
    useUpdatePasswordMutation,
    useIsSignedUserQuery,
} = userAPI;




