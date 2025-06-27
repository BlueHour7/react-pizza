import { PizzaType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = 'https://eaf192b91ef37184.mokky.dev/'

type responseDataType = {
    meta: {
        total_items: number,
        total_pages: number,
        current_page: number,
        per_page: number,
        remaining_count: number
    };
    items: PizzaType[]
}

export const itemsApi = createApi({
    reducerPath: 'itemsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    endpoints: builder => ({
        getItems: builder.query<responseDataType, string>({
            query: (params) => `items?${params}`,
        }),
        getOne: builder.query<PizzaType[], number>({
            query: (id) => `items?id=${id}`
        })
    })
})

export const { useGetItemsQuery, useGetOneQuery } = itemsApi;
