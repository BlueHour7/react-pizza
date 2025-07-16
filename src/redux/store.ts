import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import { itemsApi } from "./itemsApi";
import { localStorageMiddleware } from "./localStorageMiddleware";

export const store = configureStore({
    reducer: {
        filterSlice,
        cartSlice,
        [itemsApi.reducerPath]: itemsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([itemsApi.middleware, localStorageMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch