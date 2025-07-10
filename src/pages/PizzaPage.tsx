import { useNavigate, useParams } from "react-router";
import Pizza from "../components/Pizza";
import { useGetOneQuery, itemsApi } from "../redux/itemsApi";
import Skeleton from "../components/Pizza/Skeleton";
import { useEffect } from "react";

// тут не оч хорошо сделано, потому что useGetOneQuery(Number(id), { skip: !isValideId()}) может вернуть NaN
// но TS это пропустит потому что нан тоже число как бы. По сути у меня проверка есть, но не с точки зрения TS

function PizzaPage() {
	console.log('render');
	const { id } = useParams<{ id: string}>();
	const navigate: (to: string) => void = useNavigate()
	const { data } = useGetOneQuery(Number(id), { skip: !isValideId()});

	function isValideId() {
		return id !== undefined && Number(id) && Number(id) < 100 && Number(id) > 0
	}

	useEffect(() => {
		if (!isValideId()) {
			navigate('/')
			alert('Такой пиццы нет. Перенаправление на главную')
		}
	}, [id, navigate])

	if (!data) return <Skeleton />;

	return <Pizza {...data[0]} isPage={true} />;
}

export default PizzaPage;
