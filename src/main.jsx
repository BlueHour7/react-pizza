import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { store } from './redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")).render(

		<Provider store={store}>
			<BrowserRouter basename="/react-pizza/">
				<App />
			</BrowserRouter>
		</Provider>

);
