import { configureStore } from "@reduxjs/toolkit";
import filterSlice, {
	isCategoryId,
	isSort,
	SortSelect,
} from "./slices/filterSlice";
import type { FilterSliceState } from "./slices/filterSlice";
import cartSlice, { CartSliceState } from "./slices/cartSlice";
import { itemsApi } from "./itemsApi";
import { localStorageMiddleware } from "./localStorageMiddleware";

function loadCartLocalStorage(): CartSliceState {
	try {
		const saved = localStorage.getItem("cart");
		if (saved) return JSON.parse(saved);
	} catch {}
	return { pizzas: [] };
}

function setFiltersFromURL(): FilterSliceState {
	const params = new URLSearchParams(window.location.search);
	const categoryId = Number(params.get("category"));
	const sortBy = params.get("sortBy");
	let sort: string;
	let orderDesc = true;
	if (sortBy === null || sortBy === undefined) sort = SortSelect.RATING;
	else {
		sort = sortBy;
		orderDesc = sort[0] === "-" ? true : false;
	}
	return {
		categoryId: isCategoryId(categoryId) ? categoryId : 0,
		sort: isSort(sort) ? sort : SortSelect.RATING,
		orderDesc,
		searchValue: params.get("title")?.slice(1, 11) ?? "",
		curentPagePagination: Number(params.get("page") ?? 1),
	};
}

export const store = configureStore({
	reducer: {
		filterSlice,
		cartSlice,
		[itemsApi.reducerPath]: itemsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			itemsApi.middleware,
			localStorageMiddleware,
		]),
	preloadedState: {
		cartSlice: loadCartLocalStorage(),
		filterSlice: setFiltersFromURL(),
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
