import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem } from "@/types";

interface CartSliceState {
	pizzas: CartItem[];
}

const initialState: CartSliceState = {
	pizzas: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addPizza(
			state,
			action: PayloadAction<CartItem | number>
		) {
			if (typeof action.payload === "number") {
				const thisPizza = state.pizzas.find(
					(item) => item.id === action.payload
				);
				if (thisPizza) thisPizza.count++;

			} else {
				state.pizzas.push(action.payload);
			}
		},
		minusPizza(state, action: PayloadAction<number>) {
			const thisPizza = state.pizzas.find(
				(item) => item.id === action.payload
			);
			if (!thisPizza) return; // так ли обязательна эта стррока нужна? Без неё тс ругается, но проверки есть в компонентах
			thisPizza.count -= 1;
			if (thisPizza.count === 0)
				state.pizzas = state.pizzas.filter(
					(item) => item.id !== thisPizza.id
				);
		},
		deletePizza(state, action) {
			const thisPizza = state.pizzas.find(
				(item) => item.id === action.payload.id
			);
			if (!thisPizza) return;
			state.pizzas = state.pizzas.filter(
				(item) => item.id !== action.payload.id
			);
		},
		clearCart(state) {
			state.pizzas = [];
		},
	},
});

export const selectCartPizzas = (state: RootState) => state.cartSlice.pizzas

export const selectCartPizzaId = (id: number) => (state: RootState) =>
	state.cartSlice.pizzas.find((item: CartItem) => item.id === id)?.count;

export const { addPizza, deletePizza, clearCart, minusPizza } =
	cartSlice.actions;

export default cartSlice.reducer;
