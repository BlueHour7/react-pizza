import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
	setCurentPagePagination,
	selectFilterCategory,
	selectFilterSort,
	selectOrderDesc,
	selectCurentPagePagination,
	resetFilters,
} from "../redux/slices/filterSlice";
import type { FilterSliceState } from "../redux/slices/filterSlice";
import type { RootState } from "@/redux/store";
import { useGetItemsQuery } from "../redux/itemsApi";

import Pizza from "../components/Pizza";
import Skeleton from "../components/Pizza/Skeleton";

export function buildQuery(filters: FilterSliceState) {
	const { categoryId, sort, orderDesc, searchValue, curentPagePagination } =
		filters;
	const amountPagePaginationInTime = 4;
	const linkCategory = categoryId === 0 ? "" : `category=${categoryId}&`;
	const linkSortBy = "sortBy=" + (orderDesc ? "-" : "") + `${sort}`;
	const linkSearch = searchValue === "" ? "" : `&title=*${searchValue}`;
	const linkPagination = `&page=${curentPagePagination}&limit=${amountPagePaginationInTime}`;
	const query = `${linkCategory}${linkSortBy}${linkSearch}${linkPagination}`;
	return query;
}

function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const isFirstRender = useRef(true);

	const categoryId = useSelector(selectFilterCategory);
	const sort = useSelector(selectFilterSort);
	const orderDesc = useSelector(selectOrderDesc);
	const searchValue = useSelector(
		(state: RootState) => state.filterSlice.searchValue
	);
	const curentPagePagination = useSelector(selectCurentPagePagination);
	const getQuery = buildQuery({
		categoryId,
		sort,
		orderDesc,
		searchValue,
		curentPagePagination,
	});
	const getQueryForSearchParams = getQuery.slice(
		0,
		getQuery.lastIndexOf("&")
	);

	const { data, isFetching, isSuccess, error } = useGetItemsQuery(getQuery);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		const currentParams = searchParams.toString();
		const newParams =
			getQueryForSearchParams == "sortBy=-rating&page=1"
				? ""
				: getQueryForSearchParams;

		if (newParams !== currentParams) {
			if (isHome()) setSearchParams({});
			else setSearchParams(new URLSearchParams(getQueryForSearchParams));
		}
		if (isFirstRender.current) isFirstRender.current = false;
	}, [categoryId, sort, orderDesc, searchValue, curentPagePagination]);

	function isHome() {
	return (
		categoryId == 0 &&
		sort == "rating" &&
		orderDesc == true &&
		searchValue == "" &&
		curentPagePagination == 1
	);
}

	if (isFetching || !isSuccess)
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
			{isHome() && <h2>Все пиццы</h2>}
			<div className="pizzas">
				{items.length !== 0 ? (
					items.map((item) => <Pizza key={item.id} {...item} />)
				) : (
					<div className="content-wrapper info">
						<h2>Не найдено питс по заданным фильтрам 😔</h2>
						<p>Поменяйте фильтры или перейдите на главную</p>
						<Link
							to="/"
							className="header__logo"
							onClick={() => dispatch(resetFilters())}
						>
							<button className="button button-cart">
								Сбросить фильтры
							</button>
						</Link>
					</div>
				)}
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
