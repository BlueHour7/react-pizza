type PaginationProps = {
	currentP: number;
	totalP: number;
	onChangeP: (page: number) => void;
};

export default function Pagination({
	currentP,
	totalP,
	onChangeP,
}: PaginationProps) {
	return (
		<nav aria-label="Пагинация" className="pagination">
			<ul>
				{currentP !== 1 ? (
					<li>
						<button
							aria-label="Предыдущая страница"
							onClick={() => onChangeP(currentP - 1)}
						>{`‹`}</button>
					</li>
				) : null}
				{[...Array(totalP)].map((_, ind) => (
					<li key={ind}>
						<button
							type="button"
							aria-current="page"
							onClick={() => onChangeP(ind + 1)}
							className={currentP === ind + 1 ? 'selected' : ''}
						>
							{ind + 1}
						</button>
					</li>
				))}
				{currentP !== totalP ? (
					<li>
						<button
							aria-label="Следующая страница"
							onClick={() => onChangeP(currentP + 1)}
						>{`›`}</button>
					</li>
				) : null}
			</ul>
		</nav>
	);
}
