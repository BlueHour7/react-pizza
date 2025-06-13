import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pizzas: [],
	totalPrice: 0,
	totalCount: 0,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addPizza(state, action) {
			const thisPizza = state.pizzas.find( (item) => item.id === action.payload.id)
			if (thisPizza) thisPizza.count++
			else state.pizzas.push(action.payload);
			state.totalPrice += action.payload.price;
			state.totalCount++;
		},
		minusPizza(state, action) {
			const thisPizza = state.pizzas.find((item) => item.id === action.payload.id)
			thisPizza.count -= 1
			state.totalPrice -= thisPizza.price
			state.totalCount -= 1
			if (thisPizza.count === 0) state.pizzas = state.pizzas.filter((item) => item.id !== thisPizza.id);
		},
		deletePizza(state, action) {
			const thisPizza = state.pizzas.find((item) => item.id === action.payload.id)
			state.totalPrice -= thisPizza.price * thisPizza.count
			state.totalCount -= thisPizza.count;
			state.pizzas = state.pizzas.filter((item) => item.id !== action.payload.id);
		},
		clearCart(state) {
			state.pizzas = [];
			state.totalPrice = 0;
			state.totalCount = 0;
		},
	},
});

export const selectCartPrice = (state) => state.cartSlice.totalPrice
export const selectCartCount = (state) => state.cartSlice.totalCount
export const selectCartPizzaId = (id) => (state) => state.cartSlice.pizzas.find((item) => item.id === id)?.count

export const { addPizza, deletePizza, clearCart, minusPizza } = cartSlice.actions;

export default cartSlice.reducer;
