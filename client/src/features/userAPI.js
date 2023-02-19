import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        fetchUser: builder.query({
            query: () => "api/user",
            providesTags:['User'],
            transformResponse: (response, meta, arr) => {
                return response.message;
            }
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: "api/user",
                method: "POST",
                body: user,
            }),
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
            invalidatesTags: ['User']
        }),
        signoutUser: builder.mutation({
            query: () => ({
                url: "/auth/signout",
                method: "POST",
            }),
            invalidatesTags: ['User']
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
} = userAPI;




