import "./filter.scss";
import { useSelector, useDispatch } from "react-redux";
import {
	setCategoryId,
	setSort,
	setOrderDesc,
	selectFilterCategory,
	selectFilterSort,
	selectOrderDesc,
	SortSelect
} from "../../redux/slices/filterSlice";

const categories = [
	"Все",
	"Мясные",
	"Вегетарианские",
	"Гриль",
	"Острые",
	"Закрытые",
];

function Filter() {
	const dispatch = useDispatch();
	const categoryId = useSelector(selectFilterCategory);
	const sort = useSelector(selectFilterSort);
	const orderDesc = useSelector(selectOrderDesc);

	return (
		<nav className="filter">
			<ul className="categories">
				{categories.map((item, ind) => (
					<li key={ind}>
						<button
							onClick={() => dispatch(setCategoryId(ind))}
							className={`button button-group ${
								ind === categoryId
									? "is-active"
									: ""
							}`}
						>
							{item}
						</button>
					</li>
				))}
			</ul>

			<div className="sorted">
				<span>Сортировка по: </span>
				<label htmlFor="filtering" className="visually-hidden">
					Filtering
				</label>
				<select
					value={sort}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setSort(e.target.value as SortSelect))}
					id="filtering"
				>
					<option value="rating">популярности</option>
					<option value="price">цене</option>
					<option value="title">алфавиту</option>
				</select>
				<button
					onClick={() =>
						dispatch(setOrderDesc(!orderDesc))
					}
					className={`btn-shift-sorted ${
						orderDesc ? "" : "down"
					}`}
				>
					▲
				</button>
			</div>
		</nav>
	);
}

export default Filter;
