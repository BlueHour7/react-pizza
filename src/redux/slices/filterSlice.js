import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isFilterReady: false,
	categoryId: 0,
	sort: "rating",
	orderDesc: true,
	searchValue: "",
	curentPagePagination: 1,
	query: buildQuery({
		categoryId: 0,
		sort: "rating",
		orderDesc: true,
		searchValue: "",
		curentPagePagination: 1,
	}),
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setCategoryId(state, action) {
			// console.log(state.curentPagePagination + 'categoryId');
			state.categoryId = action.payload;
			state.curentPagePagination = 1;
			state.query = buildQuery(state)
		},
		setSort(state, action) {
			// console.log(state.curentPagePagination + 'sort');
			state.sort = action.payload;
			state.curentPagePagination = 1;
			state.query = buildQuery(state)
		},
		setOrderDesc(state, action) {
			// console.log(state.curentPagePagination + 'orderDesc');
			state.orderDesc = action.payload;
			state.curentPagePagination = 1;
			state.query = buildQuery(state)
		},
		setSearchValue(state, action) {
			// console.log(state.curentPagePagination + 'searchValue');
			state.searchValue = action.payload;
			state.curentPagePagination = 1;
			state.query = buildQuery(state)
		},
		setCurentPagePagination(state, action) {
			// console.log(state.curentPagePagination + 'pagination');
			state.curentPagePagination = action.payload;
			state.query = buildQuery(state)
		},
		setAllFilterSetting(state, action) {
			state.isFilterReady = true;
			state.categoryId = Number(action.payload.categoryId);
			state.sort = action.payload.sort;
			state.orderDesc = action.payload.orderDesc;
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

function buildQuery(state) {
	const { categoryId, sort, orderDesc, searchValue, curentPagePagination} = state
	const amountPagePaginationInTime = 4;
	const linkCategory = categoryId === 0 ? "" : `category=${categoryId}&`;
	const linkSortBy = "sortBy=" + (orderDesc ? "-" : "") + `${sort}`;
	const linkSearch = searchValue === "" ? "" : `&title=*${searchValue}`;
	const linkPagination = `&page=${curentPagePagination}&limit=${amountPagePaginationInTime}`;
	const query = `${linkCategory}${linkSortBy}${linkSearch}${linkPagination}`;
	return query
}

export const selectFilterCategory = (state) => state.filterSlice.categoryId;
export const selectFilterSort = (state) => state.filterSlice.sort;
export const selectOrderDesc = (state) => state.filterSlice.orderDesc;
export const selectCurentPagePagination = (state) =>
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
