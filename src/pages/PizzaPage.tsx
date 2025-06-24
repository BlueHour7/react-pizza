import { useParams } from "react-router";
import Pizza from "../components/Pizza";
import { useGetOneQuery, itemsApi } from "../redux/itemsApi";
import Skeleton from "../components/Pizza/Skeleton";

function PizzaPage() {
	console.log('render');
	const { id } = useParams();
	const { data, isLoading } = useGetOneQuery(id);

	if (isLoading) return <Skeleton />;

	return <Pizza {...data[0]} isPage={true} />;
}

export default PizzaPage;
