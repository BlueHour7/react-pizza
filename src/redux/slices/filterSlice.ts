import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export function isCategoryId(num: number): num is FilterSliceState['categoryId'] {
	return num >= 0 && num <= 5 && Number.isInteger(num)
}

export function isSort(str: string): str is FilterSliceState['sort'] {
	return (
		str === SortSelect.RATING ||
		str === SortSelect.PRICE ||
		str === SortSelect.TITLE
	)
}

export enum SortSelect {
	RATING = 'rating',
	PRICE = 'price',
	TITLE = 'title',
}

export interface FilterSliceState {
	categoryId: 0 | 1 | 2 | 3 | 4 | 5;
	sort: SortSelect;
	orderDesc: boolean;
	searchValue: string;
	curentPagePagination: number;
}

export const initialState: FilterSliceState = {
	categoryId: 0,
	sort: SortSelect.RATING,
	orderDesc: true,
	searchValue: "",
	curentPagePagination: 1,
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = isCategoryId(action.payload) ? action.payload : 0
			state.curentPagePagination = 1;
		},
		setSort(state, action: PayloadAction<FilterSliceState['sort']>) {
			state.sort = action.payload;
			state.curentPagePagination = 1;
		},
		setOrderDesc(state, action: PayloadAction<FilterSliceState['orderDesc']>) {
			state.orderDesc = action.payload;
			state.curentPagePagination = 1;
		},
		setSearchValue(state, action: PayloadAction<FilterSliceState['searchValue']>) {
			state.searchValue = action.payload;
			state.curentPagePagination = 1;
		},
		setCurentPagePagination(state, action: PayloadAction<FilterSliceState['curentPagePagination']>) {
			state.curentPagePagination = action.payload;
		},
		setAllFilterSetting(state, action: PayloadAction<FilterSliceState>) {
			state.categoryId = isCategoryId(action.payload.categoryId) ? action.payload.categoryId : 0;
			state.sort = isSort(action.payload.sort) ? action.payload.sort : SortSelect.RATING;
			state.orderDesc = action.payload.orderDesc;
			state.searchValue = action.payload.searchValue;
			state.curentPagePagination = Number(
				action.payload.curentPagePagination
			);
		},
	},
});

export const selectFilterCategory = (state: RootState) => state.filterSlice.categoryId;
export const selectFilterSort = (state: RootState) => state.filterSlice.sort;
export const selectOrderDesc = (state: RootState) => state.filterSlice.orderDesc;
export const selectCurentPagePagination = (state: RootState) =>
	state.filterSlice.curentPagePagination;

export const {
	setCategoryId,
	setSort,
	setOrderDesc,
	setSearchValue,
	setCurentPagePagination,
	setAllFilterSetting,
} = filterSlice.actions;

export default filterSlice.reducer;
