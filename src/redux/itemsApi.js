import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = 'https://eaf192b91ef37184.mokky.dev/'

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: builder => ({
        getItems: builder.query({
            query: (params) => `items?${params}`,
        }),
        getOne: builder.query({
            query: (id) => `items?id=${id}`
        })
    })
})

export const { useGetItemsQuery, useGetOneQuery } = itemsApi;
