import "./App.scss";
import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PizzaPage from "./pages/PizzaPage";
import Filter from "./components/Filter";

const Cart = lazy( () => import('./pages/Cart'));

function App() {
	return (
		<div className="wrapper">
			<Header />
			<Routes>
				<Route
					path=""
					element={
						<>
							<Filter />
							<Home />
						</>
					}
				/>
				<Route
					path="/cart"
					element={
						<Suspense
							fallback={
								<div className="fallbackCart">
									<h1>Загрузка корзины...</h1>
								</div>
							}
						>
							<Cart />
						</Suspense>
					}
				/>
				<Route path="*" element={<NotFound />} />
				<Route path="/pizza/:id" element={<PizzaPage />} />
			</Routes>
			<ToastContainer position="top-right" />
		</div>
	);
}

export default App;
