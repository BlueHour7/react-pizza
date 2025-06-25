import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

function isCategoryId(num: number): num is FilterSliceState['categoryId'] {
	return num >= 0 && num <= 5 && Number.isInteger(num)
}

function isSort(str: string): str is FilterSliceState['sort'] {
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
	isFilterReady: boolean;
	categoryId: 0 | 1 | 2 | 3 | 4 | 5;
	sort: SortSelect;
	orderDesc: boolean;
	searchValue: string;
	curentPagePagination: number;
	query: string;
}

export interface FilterFromURL {
	categoryId: number;
	sort: string;
	searchValue: string;
	curentPagePagination: number
}

const initialState: FilterSliceState = {
	isFilterReady: false,
	categoryId: 0,
	sort: SortSelect.RATING,
	orderDesc: true,
	searchValue: "",
	curentPagePagination: 1,
	query: buildQuery({
		categoryId: 0,
		sort: SortSelect.RATING,
		orderDesc: true,
		searchValue: "",
		curentPagePagination: 1,
	}),
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = isCategoryId(action.payload) ? action.payload : 0
			state.curentPagePagination = 1;
			state.query = buildQuery(state)
		},
		setSort(state, action: PayloadAction<FilterSliceState['sort']>) {
			state.sort = action.payload;
			state.curentPagePagination = 1;
			state.query = buildQuery(state)
		},
		setOrderDesc(state, action: PayloadAction<FilterSliceState['orderDesc']>) {
			state.orderDesc = action.payload;
			state.curentPagePagination = 1;
			state.query = buildQuery(state)
		},
		setSearchValue(state, action: PayloadAction<FilterSliceState['searchValue']>) {
			state.searchValue = action.payload;
			state.curentPagePagination = 1;
			state.query = buildQuery(state)
		},
		setCurentPagePagination(state, action: PayloadAction<FilterSliceState['curentPagePagination']>) {
			state.curentPagePagination = action.payload;
			state.query = buildQuery(state)
		},
		setAllFilterSetting(state, action: PayloadAction<FilterFromURL>) {
			state.isFilterReady = true;
			state.categoryId = isCategoryId(action.payload.categoryId) ? action.payload.categoryId : 0;
			state.sort = isSort(action.payload.sort) ? action.payload.sort : SortSelect.RATING;
			state.orderDesc = action.payload.sort === "-" ? true : false,
			state.searchValue = action.payload.searchValue;
			state.curentPagePagination = Number(
				action.payload.curentPagePagination
			);
			state.query = buildQuery(state)
		},
		setIsFilterReady(state) {
			state.isFilterReady = true;
		},
	},
});

function buildQuery(state: Omit<FilterSliceState, 'isFilterReady' | 'query'>) {
	const { categoryId, sort, orderDesc, searchValue, curentPagePagination} = state
	const amountPagePaginationInTime = 4;
	const linkCategory = categoryId === 0 ? "" : `category=${categoryId}&`;
	const linkSortBy = "sortBy=" + (orderDesc ? "-" : "") + `${sort}`;
	const linkSearch = searchValue === "" ? "" : `&title=*${searchValue}`;
	const linkPagination = `&page=${curentPagePagination}&limit=${amountPagePaginationInTime}`;
	const query = `${linkCategory}${linkSortBy}${linkSearch}${linkPagination}`;
	return query
}

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
	setIsFilterReady,
} = filterSlice.actions;

export default filterSlice.reducer;
