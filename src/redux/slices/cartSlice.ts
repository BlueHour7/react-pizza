import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { CartItem } from "@/types";

export interface CartSliceState {
	pizzas: CartItem[];
}

const initialState: CartSliceState = {
	pizzas: [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addPizza(state, action: PayloadAction<CartItem>) {
			const addedPizza = action.payload;
			const thisPizza = state.pizzas.find(
				(item) =>
					item.id === addedPizza.id &&
					item.size === addedPizza.size &&
					item.pizzaType === addedPizza.pizzaType
			);
			if (thisPizza) thisPizza.count++;
			else state.pizzas.push(addedPizza);
		},

		minusPizza(
			state,
			action: PayloadAction<{
				id: number;
				size: number;
				pizzaType: string;
			}>
		) {
			const addedPizza = action.payload;
			const thisPizza = state.pizzas.find(
				(item) =>
					item.id === addedPizza.id &&
					item.size === addedPizza.size &&
					item.pizzaType === addedPizza.pizzaType
			);
			if (!thisPizza || thisPizza.count < 1) return; // так ли обязательна эта стррока нужна? Без неё тс ругается, но проверки есть в компонентах
			thisPizza.count -= 1;
		},

		deletePizza(
			state,
			action: PayloadAction<{
				id: number;
				size: number;
				pizzaType: string;
			}>
		) {
			const addedPizza = action.payload;
			state.pizzas = state.pizzas.filter(
				(item) =>
					item.id !== addedPizza.id ||
					item.size !== addedPizza.size ||
					item.pizzaType !== addedPizza.pizzaType
			);
		},

		clearCart(state) {
			state.pizzas = [];
		},
	},
});

export const selectCartPizzas = (state: RootState) => state.cartSlice.pizzas;

export const selectCartPizzaId = (id: number) => (state: RootState) =>
	state.cartSlice.pizzas
		.filter((item: CartItem) => item.id === id)
		.reduce((acc, item) => acc + item.count, 0);

export const { addPizza, deletePizza, clearCart, minusPizza } =
	cartSlice.actions;

export default cartSlice.reducer;
