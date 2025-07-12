import "./App.scss";
import { Route, Routes } from "react-router";

import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import PizzaPage from "./pages/PizzaPage";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<div className="wrapper">
			<Header />
			<Routes>
				<Route path="" element={<Home />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/pizza/:id" element={<PizzaPage />} />
			</Routes>
			<ToastContainer position="top-center"/>
		</div>
	);
}

export default App;
