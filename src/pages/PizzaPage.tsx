import { useNavigate, useParams } from "react-router";
import Pizza from "../components/Pizza";
import { useGetOneQuery, itemsApi } from "../redux/itemsApi";
import Skeleton from "../components/Pizza/Skeleton";
import { useEffect } from "react";

function PizzaPage() {
	console.log('render');
	const { id } = useParams();
	const navigate = useNavigate()
	const { data } = useGetOneQuery(Number(id));

	useEffect(() => {
		const isValideId = id !== undefined && Number(id) && Number(id) < 100 && Number(id) > 0
		if (!isValideId) {
			navigate('/')
			alert('Такой пиццы нет. Перенаправление на главную')
		}
	}, [id, navigate])

	if (!data) return <Skeleton />;

	return <Pizza {...data[0]} isPage={true} />;
}

export default PizzaPage;
