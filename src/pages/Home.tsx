import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import {
	setCurentPagePagination,
	selectFilterCategory,
	selectFilterSort,
	selectOrderDesc,
	selectSearchValue,
	selectCurentPagePagination,
	resetFilters,
	selectIsDefaultFilter,
} from '@/redux/slices/filterSlice';
import type { FilterSliceState } from '@/redux/slices/filterSlice';
import { useGetItemsQuery } from '@/redux/itemsApi';

import Pizza from '@/components/Pizza';
import Skeleton from '@/components/Pizza/Skeleton';
import Pagination from '@/components/Pagination';
import { categories } from '@/components/Filter';

const ITEMS_PER_PAGE = 4;

function buildSearchParams(filters: FilterSliceState) {
	const { categoryId, sort, orderDesc, searchValue, page } = filters;
	const params = new URLSearchParams();

	if (categoryId !== 0) {
		params.set('category', String(categoryId));
	}

	params.set('sortBy', `${orderDesc ? '-' : ''}${sort}`);
	if (searchValue) params.set('title', `*${searchValue}`);
	params.set('page', String(page));
	params.set('limit', String(ITEMS_PER_PAGE));

	return params;
}

function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const categoryId = useSelector(selectFilterCategory);
	const sort = useSelector(selectFilterSort);
	const orderDesc = useSelector(selectOrderDesc);
	const searchValue = useSelector(selectSearchValue);
	const currentPagePagination = useSelector(selectCurentPagePagination);
	const isDefaultFilter = useSelector(selectIsDefaultFilter);
	const queryParams = buildSearchParams({
		categoryId,
		sort,
		orderDesc,
		searchValue,
		page: currentPagePagination,
	});

	const getQueryURLParams = new URLSearchParams(queryParams);
	getQueryURLParams.delete('limit');

	const { data, isFetching, isSuccess, error } = useGetItemsQuery(
		queryParams.toString(),
	);

	useEffect(() => {
		const currentParams = searchParams.toString();
		const newParams = isDefaultFilter ? '' : getQueryURLParams;

		if (newParams.toString() !== currentParams) {
			if (isDefaultFilter) setSearchParams({});
			else setSearchParams(getQueryURLParams);
		}
	}, [categoryId, sort, orderDesc, searchValue, currentPagePagination]);
	// эффект который срабатывает при изменении фильтра. Если открыта главная, параметры урл пустые
	// В противном случае отображаются урл параметры фильтра

	if (isFetching)
		return (
			<>
				<h2>{categories[categoryId]} пиццы</h2>
				<div className="pizzas">
					{[...Array(ITEMS_PER_PAGE)].map((_, i) => (
						<Skeleton key={i} />
					))}
				</div>
			</>
		);

	if (error || !isSuccess)
		return (
			<div className="content-wrapper info">
				<h2>Произошла ошибка 😕</h2>
				<p>
					К сожалению, не удалось получить питсы. Попробуйте повторить попытку
					позже.
				</p>
			</div>
		);

	const items = data.items;
	const totalPagePagination = data.meta.total_pages;

	return (
		<>
			<h2>{categories[categoryId]} пиццы</h2>
			<div className="pizzas">
				{items.length !== 0 ? (
					items.map((item) => <Pizza key={item.id} {...item} />)
				) : (
					<div className="content-wrapper info">
						<h2>Не найдено питс по заданным фильтрам 😔</h2>
						<p>Поменяйте фильтры или перейдите на главную</p>
						{currentPagePagination > totalPagePagination && <p>Либо переключите страницу снизу на более подходящую</p>}
						<Link
							to="/"
							className="header__logo button button-cart"
							onClick={() => dispatch(resetFilters())}
						>
							Сбросить фильтры
						</Link>
					</div>
				)}
			</div>

			{totalPagePagination > 1 && (
				<Pagination
					currentP={currentPagePagination}
					totalP={totalPagePagination}
					onChangeP={ (page) => dispatch(setCurentPagePagination(page))}
				/>
			)}
		</>
	);
}

export default Home;
