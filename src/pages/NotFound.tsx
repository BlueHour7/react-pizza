// стилизовать и дописать

import { Link } from "react-router";

function NotFound() {
	return (
		<div className="not-found">
			<h1>Ничего не найдено :(</h1>
			<button className="button button-add">
                <span>
                    <Link to='/'>На главную</Link>
                </span>
            </button>
		</div>
	);
}

export default NotFound;
