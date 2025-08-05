// import styles from './Header.module.scss'
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	setSearchValue,
	resetFilters,
} from "../../redux/slices/filterSlice";
import { selectCartPizzas } from "../../redux/slices/cartSlice";
import { preloadCart } from "@/preload/cartPreload";

import "./header.scss";
import pizzaLogo from "/icons/pizza-logo.svg";
import drawerImg from "/icons/drawer.svg";
import searchLoupeImg from "/icons/search-loupe1.svg";
import closeImg from "/icons/close.svg";
import type { RootState } from "@/redux/store";

function Header() {
	const dispatch = useDispatch();
	const location = useLocation();
	const inputRef = useRef<HTMLInputElement>(null);
	const isFirstRender = useRef(true);

	const hideSearch = location.pathname === "/";
	const hideCartButton = location.pathname !== "/cart";

	const pizzas = useSelector(selectCartPizzas);
	const searchValue = useSelector(
		(state: RootState) => state.filterSlice.searchValue
	);
	const totalPrice = pizzas.reduce((acc, item) => acc + item.price, 0);
	const totalCount = pizzas.reduce((acc, item) => acc + item.count, 0);

	const [query, setQuery] = useState(searchValue ?? "");

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
			<Link
				to="/"
				className="header__logo"
				onClick={() => {
					setQuery("");
					dispatch(resetFilters());
				}}
			>
				<img src={pizzaLogo} width="38" height="38" alt="logo" />
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
						onChange={(e) => setQuery(e.target.value.slice(-10))}
						type="text"
						className="search-input"
						placeholder="Поиск пиццы"
					/>

					<button
						onMouseDown={() => {
							setQuery("");
							inputRef.current?.focus();
							// фокус не работает при он моуз даун, но работает с онКлик
						}}
						disabled={query === "" ? true : false}
					>
						<img src={closeImg} alt="" width={22} height={22} />
					</button>
				</div>
			)}

			{hideCartButton && (
				<Link
					to="/cart"
					className="button button-cart header-button"
					onMouseEnter={preloadCart}
				>
					{totalPrice} ₽<div className="vertical-line"></div>
					<img src={drawerImg} width="18" height="18" alt="" />
					{totalCount}
				</Link>
			)}
		</header>
	);
}

export default Header;
