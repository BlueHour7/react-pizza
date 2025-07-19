import { Middleware } from "@reduxjs/toolkit";

// для action использую any, потому вообще хз как это типизировать. ГПТ дает советы которые приводят к ошибкам, 
// типа цкилического RootState, в документации нет номальных примеров 
export const localStorageMiddleware: Middleware =
	(store) => (next) => (action: any) => {
		const result = next(action);
		if (action.type.startsWith("cart/")) {
			const cart = store.getState().cartSlice;
			localStorage.setItem("cart", JSON.stringify(cart));
		}
		return result;
	};
