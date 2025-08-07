import "./pizza.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizza } from "../../redux/slices/cartSlice";
import { selectCartPizzaId } from "../../redux/slices/cartSlice";
import { Link } from "react-router";
import type { PizzaType } from "@/types";
import { toast } from "react-toastify";

const fallback = import.meta.env.BASE_URL + "img/fallback-pizza.png";

function Pizza({
	title,
	price,
	img,
	types,
	sizes,
	id,
	isPage = false,
}: PizzaType) {
	const dispatch = useDispatch();
	let pizzaCount: number | null = useSelector(selectCartPizzaId(id));
	pizzaCount = pizzaCount === 0 ? null : pizzaCount;
	const [activeType, setActiveType] = useState(types[0]);
	const [activeSize, setActiveSize] = useState(0);
	const pizzaTypes = ["традиционное", "тонкое"];

	const isFallbackRef = useRef(false);
	const angleRef = useRef(0);
	const animationFrame = useRef(0);
	const speedRef = useRef(0);
	const targetSpeed = useRef(0.6);
	const pizzaImg = useRef<HTMLImageElement | null>(null);

	const animate = () => {
		speedRef.current += (targetSpeed.current - speedRef.current) * 0.05;

		if (speedRef.current > 0.59) speedRef.current = 0.6;
		angleRef.current += speedRef.current;

		if (pizzaImg.current) {
			pizzaImg.current.style.transform = `rotate(${angleRef.current}deg)`;
		}

		if (Math.abs(speedRef.current) > 0.01) {
			animationFrame.current = requestAnimationFrame(animate);
		} else {
			speedRef.current = 0;
			animationFrame.current = 0;
		}
	};

	const handleMouseEnter = () => {
		if (isFallbackRef.current) return;
		targetSpeed.current = 0.6;
		if (animationFrame.current === 0) {
			animationFrame.current = requestAnimationFrame(animate);
		}
	};

	const handleMouseLeave = () => {
		targetSpeed.current = 0;
	};

	useEffect(() => {
		return () => cancelAnimationFrame(animationFrame.current);
	}, []);

	const wrapperClass = isPage ? "pizza-page" : "pizza";

	function addPizzaToCart() {
		const keyConfigPizza =
			String(sizes[activeSize]) + String(pizzaTypes[activeType]);
		dispatch(
			addPizza({
				title,
				img,
				id,
				price: price[activeSize],
				size: sizes[activeSize],
				pizzaType: pizzaTypes[activeType],
				count: 1
			})
		);
		toast.info(`Пицца ${title} ${sizes[activeSize]} см добавлена в корзину`);
	}

	function stopLink(e: React.MouseEvent) {
		if (isPage) {
			e.preventDefault;
			e.stopPropagation;
		}
	}

	return (
		<div
			className={wrapperClass}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<>
				<Link to={`/pizza/${id}`}>
					<img
						className="pizza-img"
						src={img}
						alt="пицца"
						ref={pizzaImg}
						onClick={(e) => stopLink(e)}
						onError={(e) => {
							if (e.currentTarget.src !== fallback) {
								isFallbackRef.current = true;
								e.currentTarget.src = fallback;
							}
						}}
					/>
				</Link>
				<h3>
					<Link onClick={(e) => stopLink(e)} to={`/pizza/${id}`}>
						{title}
					</Link>
				</h3>
			</>

			<div className="pizza-info">
				{isPage && (
					<>
						<p>
							<b>Состав:</b> креветки, томаты, шампиньоны, соус
							песто, моцарелла, итальянские травы, фирменный
							томатный соус.
						</p>
						<p>
							<b>Энергетическая ценность: </b>226.4 ккал
							<br />
							<b>Белки: </b>10.1 г<br />
							<b>Жиры: </b>9.2 г<br />
							<b>Углеводы: </b>25.7 г<br />
							<b>Вес:</b> 490 г<br />
						</p>
					</>
				)}
				<div className="pizza-parameters">
					<ul className="pizza-dough">
						{types.map((type) => (
							<li
								key={type}
								className={
									activeType === type ? "is-active" : ""
								}
							>
								<button onClick={() => setActiveType(type)}>
									{pizzaTypes[type]}
								</button>
							</li>
						))}
					</ul>
					<ul className="pizza-size">
						{sizes.map((size, ind) => (
							<li
								key={size}
								className={
									sizes[activeSize] === size
										? "is-active"
										: ""
								}
							>
								<button onClick={() => setActiveSize(ind)}>
									{size} см
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="price-buy">
				<span>{price[activeSize]} ₽</span>
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
