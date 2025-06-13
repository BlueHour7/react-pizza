import "./pizza.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../redux/slices/cartSlice";
import { selectCartPizzaId } from "../../redux/slices/cartSlice";
import { Link } from "react-router";

const base = import.meta.env.BASE_URL

function Pizza({ title, price, img, types = [0], sizes = [0], id }) {
	const [activeType, setActiveType] = useState(types[0]);
	const [activeSize, setActiveSize] = useState(sizes[0]);
	const pizzaTypes = ["традиционное", "тонкое"];

	const dispatch = useDispatch();
	const pizzaCount = useSelector(selectCartPizzaId(id))

	function addPizzaToCart() {
		dispatch(
			addPizza({
				title,
				price,
				img,
				id,
				activeSize,
				pizzaType: pizzaTypes[activeType],
				count: 1,
			})
		);
	}

	return (
		<div className="pizza">
			<Link to={`/pizza/${id}`}>
				<img src={`${base}img/${img}`} alt="пицца" />
				<h3>{title}</h3>
			</Link>
			<div className="pizza-parameters">
				<ul className="pizza-dough">
					{types.map((type) => (
						<li
							key={type}
							className={activeType === type ? "is-active" : ""}
						>
							<button onClick={() => setActiveType(type)}>
								{pizzaTypes[type]}
							</button>
						</li>
					))}
				</ul>
				<ul className="pizza-size">
					{sizes.map((size) => (
						<li
							key={size}
							className={activeSize === size ? "is-active" : ""}
						>
							<button onClick={() => setActiveSize(size)}>
								{size} см
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className="price-buy">
				<span>от {price} ₽</span>
				<button className="button button-add" onClick={addPizzaToCart}>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
					{pizzaCount && <i>{pizzaCount}</i>}
				</button>
			</div>
		</div>
	);
}

export default Pizza;
