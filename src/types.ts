export type PizzaType = {
	title: string;
	price: number;
	img: string;
	types: [0] | [1] | [0, 1];
	sizes: (25 | 30 | 40)[];
	id: number;
	isPage?: boolean;
}

export type CartItem = {
	title: string;
	price: number;
	img: string;
	id: number;
	activeSize: number;
	pizzaType: string;
	count: number;
};