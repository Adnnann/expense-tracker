import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionsAPI = createApi({
    reducerPath: "transactionsAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    tagTypes: ["Transaction"],
    endpoints: (builder) => ({
        fetchUserTransactions: builder.query({
            query: () => "api/transaction",
            providesTags:['Transaction'],
            transformResponse: (response, meta, arr) => {
                return response.message;
            }
        }),
        createTransaction: builder.mutation({
            query: (transaction) => ({
                url: "api/transaction",
                method: "POST",
                body: transaction,
            }),
            invalidatesTags: ['Transaction']
        }),
        updateUserTransaction: builder.mutation({
            query: (transaction) => ({
                url: `api/transaction/${transaction.params}`,
                method: "PUT",
                body: {
                    title: transaction.title,
                    amountInBAM: transaction.amountInBAM,
                    amountInEUR: transaction.amountInEUR,
                    amountInUSD: transaction.amountInUSD,
                    currency: transaction.currency,
                },
            }),
            invalidatesTags: ['Transaction']
        }),
        deleteTransaction: builder.mutation({
            query: (params) => ({
                url: `api/transaction/${params}`,
                method: "DELETE",
            }),
           invalidatesTags: ['Transaction']
        }),
        fetchUserTransactionData: builder.query({
            query: () => "/transaction/data",
          
        }),
    }),
});

export const {
    useFetchUserTransactionsQuery,
    useCreateTransactionMutation,
    useUpdateUserTransactionMutation,
    useDeleteTransactionMutation,
    useFetchUserTransactionDataQuery,
} = transactionsAPI;
