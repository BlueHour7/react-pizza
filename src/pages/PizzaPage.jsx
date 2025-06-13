import { useParams } from "react-router";
import Pizza from "../components/Pizza";
import { useGetOneQuery, itemsApi } from "../redux/itemsApi";
import Skeleton from "../components/Pizza/Skeleton";

function PizzaPage() {
    const { id } = useParams()
    const { data, isLoading } = useGetOneQuery(id)

    if (isLoading) return <Skeleton />

    return (
        <div>
            <Pizza {...data[0]} />
        </div>
    )
}

export default PizzaPage