// import styles from './Header.module.scss'
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	setSearchValue,
	setAllFilterSetting,
	SortSelect,
} from "../../redux/slices/filterSlice";
import { selectCartPizzas } from "../../redux/slices/cartSlice";
import { useSearchParams } from "react-router";
import "./header.scss";

import pizzaLogo from '/icons/pizza-logo.svg'
import drawerImg from '/icons/drawer.svg'
import searchLoupeImg from '/icons/search-loupe1.svg'
import closeImg from '/icons/close.svg'

function Header() {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const [query, setQuery] = useState("");
	const location = useLocation();
	const inputRef = useRef<HTMLInputElement>(null);
	const isFirstRender = useRef(true);

	const hideSearch = location.pathname === "/";
	const hideCartButton = location.pathname !== "/cart";

	const pizzas = useSelector(selectCartPizzas);
	const totalPrice = pizzas.reduce((acc, item) => acc + item.price, 0);
	const totalCount = pizzas.length

	useEffect(() => {
		let urlParams = Object.fromEntries(searchParams.entries());
		if (!urlParams.title) return;
		setQuery(urlParams.title.slice(1));
	}, []);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		const timerId = setTimeout(() => {
			dispatch(setSearchValue(query));
		}, 600);

		return () => clearTimeout(timerId);
	}, [query]);

	return (
		<header className="header">
			{/* вот здесб надо добавить обработчик на клик */}
			<Link
				to="/"
				className="header__logo"
				onClick={() => {
					setQuery("");
					dispatch(
						setAllFilterSetting({
							categoryId: 0,
							sort: SortSelect.RATING,
							searchValue: "",
							curentPagePagination: 1,
						})
					);
				}}
			>
				<img
					src={pizzaLogo}
					width="38"
					height="38"
					alt="logo"
				/>
				<div>
					<h1>React pizza</h1>
					<span>самая вкусная пицца во вселенной</span>
				</div>
			</Link>

			{hideSearch && (
				<div className="search">
					<img
						src={searchLoupeImg}
						alt=""
						width={22}
						height={22}
						className="search-loupe"
					/>
					<input
						ref={inputRef}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						type="text"
						className="search-input"
						placeholder="Поисе пиццы"
					/>

					<button
						onMouseDown={() => {
							setQuery("");
							inputRef.current?.focus();
							// фокус не работает при он моуз даун, но работает с онКлик
						}}
						disabled={query === "" ? true : false}
					>
						<img
							src={closeImg}
							alt=""
							width={22}
							height={22}
						/>
					</button>
				</div>
			)}

			{hideCartButton && (
				<Link to="/cart" className="button button-cart">
					{totalPrice} ₽<div className="vertical-line"></div>
					<img src={drawerImg} width="18" height="18" alt="" />
					{totalCount}
				</Link>
			)}
		</header>
	);
}

export default Header;
