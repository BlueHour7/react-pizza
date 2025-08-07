import "./filter.scss";
import { useSelector, useDispatch } from "react-redux";
import {
	setCategoryId,
	setSort,
	setOrderDesc,
	selectFilterCategory,
	selectFilterSort,
	selectOrderDesc,
} from "../../redux/slices/filterSlice";
import { SortSelect } from "../../redux/slices/filterSlice";

export const categories = [
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
					<option value={SortSelect.RATING}>популярности</option>
					<option value={SortSelect.PRICE}>цене</option>
					<option value={SortSelect.TITLE}>алфавиту</option>
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
