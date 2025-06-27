import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
	setCurentPagePagination,
	setAllFilterSetting,
	setIsFilterReady,
	selectFilterCategory,
	selectFilterSort,
	selectOrderDesc,
	selectCurentPagePagination,
} from "../redux/slices/filterSlice";
import { useGetItemsQuery } from "../redux/itemsApi";

import Filter from "../components/Filter";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";
import { RootState } from "@/redux/store";

function Home() {
	console.log("render");
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();

	const isFilterReady = useSelector(
		(state: RootState) => state.filterSlice.isFilterReady
	);
	const categoryId = useSelector(selectFilterCategory);
	const sort = useSelector(selectFilterSort);
	const orderDesc = useSelector(selectOrderDesc);
	const searchValue = useSelector(
		(state: RootState) => state.filterSlice.searchValue
	);
	const curentPagePagination = useSelector(selectCurentPagePagination);
	const getQuery = useSelector((state: RootState) => state.filterSlice.query);
	const getQueryForSearchParams = getQuery.slice(
		0,
		getQuery.lastIndexOf("&")
	);

	const { data, isFetching, isSuccess, error } = useGetItemsQuery(getQuery, {
		skip: !isFilterReady,
	});

	useEffect(() => {
		let urlParams = Object.fromEntries(searchParams.entries());
		if (Object.keys(urlParams).length === 0) {
			dispatch(setIsFilterReady());
			return;
		}

		dispatch(setAllFilterSetting({
			categoryId: Number(urlParams.category) ?? 0,
			sort: urlParams.sortBy[0] === "-" ? urlParams.sortBy.slice(1) : urlParams.sortBy,
			orderDesc: urlParams.sortBy[0] === "-" ? true : false,
			searchValue: urlParams.title?.slice(1) ?? "",
			curentPagePagination: Number(urlParams.page) ?? 1,
		}));
	}, []);

	useEffect(() => {
		if (!isFilterReady) return;

		const currentParams = searchParams.toString();
		const newParams =
			getQueryForSearchParams == "sortBy=-rating&page=1"
				? ""
				: getQueryForSearchParams;

		const isHomePage =
			categoryId == 0 &&
			sort == "rating" &&
			orderDesc == true &&
			searchValue == "" &&
			curentPagePagination == 1;

		if (newParams !== currentParams) {
			if (isHomePage) setSearchParams({});
			else setSearchParams(new URLSearchParams(getQueryForSearchParams));
		}
	}, [categoryId, sort, orderDesc, searchValue, curentPagePagination]);

	if (isFetching || !isSuccess)
		return (
			<>
				<Filter />
				<h2>Все пиццы</h2>
				<div className="pizzas">
					{[...Array(4)].map((_, i) => (
						<Skeleton key={i} />
					))}
				</div>
			</>
		);

	if (error)
		return (
			<div className="content-wrapper info">
				<h2>Произошла ошибка 😕</h2>
				<p>
					К сожалению, не удалось получить питсы. Попробуйте повторить
					попытку позже.
				</p>
			</div>
		);

	if (!data)
		return (
			<>
				<h2>Все пиццы</h2>
				<div className="pizzas">
					{[...Array(4)].map((_, i) => (
						<Skeleton key={i} />
					))}
				</div>
			</>
		);

	const items = data.items;
	const totalPagePagination = data.meta.total_pages;

	return (
		<>
			<h2>Все пиццы</h2>
			<Filter />
			<div className="pizzas">
				{items.map((item) => (
					<Pizza key={item.id} {...item} />
				))}
			</div>

			{totalPagePagination > 1 && (
				<div className="pagination">
					<ul>
						{curentPagePagination !== 1 ? (
							<li>
								<button
									onClick={() =>
										dispatch(
											setCurentPagePagination(
												curentPagePagination - 1
											)
										)
									}
								>{`<`}</button>
							</li>
						) : (
							""
						)}
						{[...Array(totalPagePagination)].map((_, ind) => (
							<li key={ind}>
								<button
									onClick={() =>
										dispatch(
											setCurentPagePagination(ind + 1)
										)
									}
									className={
										curentPagePagination === ind + 1
											? "selected"
											: ""
									}
								>
									{ind + 1}
								</button>
							</li>
						))}
						{curentPagePagination !== totalPagePagination ? (
							<li>
								<button
									onClick={() =>
										dispatch(
											setCurentPagePagination(
												curentPagePagination + 1
											)
										)
									}
								>{`>`}</button>
							</li>
						) : (
							""
						)}
					</ul>
				</div>
			)}
		</>
	);
}

export default Home;
