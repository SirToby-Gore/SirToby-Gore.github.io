import { Ingredient } from "./ingredient.js";

export type Unit =
	| 'g'
	| 'kg'
	| 'ml'
	| 'l'
	| 'cl'
	| 'lb'
	| 'oz'
	| 'cup'
	| 'each'
	| 'pc'
	| 'tsp'
	| 'tbsp';

export type Category =
	| 'produce'
	| 'meat'
	| 'dairy'
	| 'pantry'
	| 'frozen'
	| 'bakery'
	| 'spices'
	| 'japanese'
	| 'fish'
	| 'general';

export type RecipeIngredient = {
	ingredient: Ingredient;
	amount: number;
};

export type Recipe = {
	id: number;
	name: string;
	description: string;
	timeMinutes: number;
	servings: number;
	tags: string[];
	ingredients: RecipeIngredient[];
	steps: string[];
};
