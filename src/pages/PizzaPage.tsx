import { Navigate, useParams } from "react-router";
import Pizza from "../components/Pizza";
import { useGetOneQuery } from "../redux/itemsApi";
import Skeleton from "../components/Pizza/Skeleton";
import { toast } from "react-toastify";

function isValideId(id: string | undefined): id is string {
	return id !== undefined && Number(id) < 100 && Number(id) > 0;
}

function PizzaPage() {
	const { id } = useParams<{ id: string }>();

	if (!isValideId(id)) {
		toast.error('Такой пиццы нет. Перенаправление на главную')
		return <Navigate to="/" replace />;
	}
	
	const { data } = useGetOneQuery(id, { skip: !isValideId(id) });

	if (!data) return <Skeleton />;
	return <Pizza {...data[0]} isPage={true} />;
}

export default PizzaPage;
