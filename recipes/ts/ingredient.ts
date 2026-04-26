import { Category } from './types.js';
import { RecipeIngredient } from './types.js';
import { Unit } from './types.js';
import { UNIT_CONVERSIONS } from './units.js';

export class Ingredient {
	static ingredientsMap: Record<string, Ingredient> = {};

	constructor(
		public name: string,
		public unit: Unit = 'each',
		public category: Category = 'general',
		public allergens: string[] = [],
		public amount: number = 0,
	) {
		Ingredient.ingredientsMap[name] = this;
	}

	static createOrGet(
		name: string,
		unit: Unit = 'each',
		category: Category = 'general',
		allergens: string[] = [],
	): Ingredient {
		const existing = Ingredient.ingredientsMap[name];
		if (existing) {
			existing.unit = unit;
			existing.category = category;
			existing.allergens = allergens;
			return existing;
		}
		return new Ingredient(name, unit, category, allergens, 0);
	}

	getAmount(inputAmount: number, inputUnit?: Unit): RecipeIngredient {
		const targetUnit = this.unit;
		const sourceUnit = inputUnit || targetUnit;

		const sourceConversion = UNIT_CONVERSIONS[sourceUnit];
		const targetConversion = UNIT_CONVERSIONS[targetUnit];

		if (!sourceConversion || !targetConversion) {
			throw new Error(
				`Unknown unit conversion for ${sourceUnit} or ${targetUnit}`,
			);
		}

		if (sourceConversion.group !== targetConversion.group) {
			throw new Error(
				`Incompatible units for "${this.name}": Cannot convert ${sourceUnit} (${sourceConversion.group}) to ${targetUnit} (${targetConversion.group})`,
			);
		}

		const amountInBase = inputAmount * sourceConversion.factor;
		const normalizedAmount = amountInBase / targetConversion.factor;

		return {
			ingredient: this,
			amount: normalizedAmount,
		};
	}

	//#region ingredient definitions
	static aubergine = new Ingredient('Aubergine', 'each', 'produce');
	static avocado = new Ingredient('Avocado', 'each', 'produce');
	static asparagusSpears = new Ingredient(
		'Asparagus Spears',
		'each',
		'produce',
	);
	static beansprouts = new Ingredient('Beansprouts', 'g', 'produce');
	static broccoliFlorets = new Ingredient('Broccoli Florets', 'g', 'produce');
	static floretBroccoli = new Ingredient('Broccoli', 'each', 'produce');
	static brownMushrooms = new Ingredient('Brown Mushrooms', 'g', 'produce');
	static carrot = new Ingredient('Carrot', 'each', 'produce');
	static celery = new Ingredient('Celery', 'pc', 'produce');
	static celeryStalks = new Ingredient('Celery Stalks', 'each', 'produce');
	static cucumber = new Ingredient('Cucumber', 'each', 'produce');
	static courgette = new Ingredient('Courgette', 'each', 'produce');
	static freshGinger = new Ingredient('Fresh Ginger', 'g', 'produce');
	static garlicCloves = new Ingredient('Garlic Cloves', 'each', 'produce');
	static redBellPepper = new Ingredient('Red Bell Pepper', 'each', 'produce');
	static dicedGreenBellPepper = new Ingredient(
		'Diced Green Bell Pepper',
		'each',
		'produce',
	);
	static icebergLettuce = new Ingredient(
		'Iceberg Lettuce',
		'each',
		'produce',
	);
	static largePotatoes = new Ingredient('Large Potatoes', 'each', 'produce');
	static leeks = new Ingredient('Leeks', 'each', 'produce');
	static redOnion = new Ingredient('Red Onion', 'each', 'produce');
	static spinach = new Ingredient('Fresh Spinach', 'g', 'produce');
	static springOnion = new Ingredient('Spring Onion', 'each', 'produce');
	static tomato = new Ingredient('Tomato', 'each', 'produce');
	static whiteOnion = new Ingredient('White Onion', 'each', 'produce');
	static wholeLemon = new Ingredient('Whole Lemon', 'each', 'produce');
	static lemonJuice = new Ingredient('Lemon Juice', 'ml', 'produce');
	static desertApple = new Ingredient('Desert Apple', 'each', 'produce');
	static freshMint = new Ingredient('Fresh Mint', 'g', 'produce');
	static freshBasil = new Ingredient('Fresh Basil', 'g', 'produce');

	static plainFlour = new Ingredient('Plain Flour', 'g', 'pantry', [
		'gluten',
	]);
	static casterSugar = new Ingredient('Caster Sugar', 'g', 'pantry');
	static tomatoPuree = new Ingredient('Tomato Puree', 'ml', 'pantry');
	static tomatoPassata = new Ingredient('Tomato Passata', 'ml', 'pantry');
	static choppedTomatoes = new Ingredient(
		'Chopped Tomatoes',
		'each',
		'pantry',
	);
	static redKidneyBeans = new Ingredient(
		'Red Kidney Beans',
		'each',
		'pantry',
	);
	static chickenStock = new Ingredient('Chicken Stock', 'ml', 'pantry');
	static beefStock = new Ingredient('Beef Stock', 'ml', 'pantry');
	static vegetableStock = new Ingredient('Vegetable Stock', 'ml', 'pantry');
	static vegetableOil = new Ingredient('Vegetable Oil', 'ml', 'pantry');
	static sunflowerOil = new Ingredient('Sunflower Oil', 'ml', 'pantry');
	static oliveOil = new Ingredient('Olive Oil', 'ml', 'pantry');
	static breadcrumbs = new Ingredient('Breadcrumbs', 'g', 'pantry', [
		'gluten',
	]);
	static cranberrySauce = new Ingredient('Cranberry Sauce', 'ml', 'pantry');

	static pesto = new Ingredient('Pesto', 'ml', 'pantry', ['nuts', 'dairy']);
	static soySauce = new Ingredient('Soy Sauce', 'ml', 'pantry', [
		'soy',
		'gluten',
	]);
	static fishSauce = new Ingredient('Fish Sauce', 'ml', 'pantry', ['fish']);
	static tinnedPeaches = new Ingredient('Tinned Peaches', 'each', 'pantry');
	static frozenPeas = new Ingredient('Frozen Peas', 'g', 'frozen');
	static chips = new Ingredient('Frozen Chips', 'g', 'frozen');
	static porkSausages = new Ingredient('Pork Sausages', 'each', 'meat', [
		'gluten',
	]);
	static turkeyBreast = new Ingredient('Turkey Breast', 'g', 'meat');
	static mincedBeef = new Ingredient('Minced Beef', 'g', 'meat');
	static chickenThighs = new Ingredient('Chicken Thighs', 'each', 'meat');
	static chickenBreast = new Ingredient('Chicken Breast', 'each', 'meat');
	static baconRashers = new Ingredient('Bacon Rashers', 'each', 'meat');
	static chorizoSausage = new Ingredient('Chorizo Sausage', 'g', 'meat');
	static rawPrawns = new Ingredient('Raw Prawns', 'g', 'meat', ['shellfish']);
	static porkMince = new Ingredient('Pork Mince', 'g', 'meat');
	static largeEggs = new Ingredient('Large Eggs', 'each', 'dairy', ['eggs']);
	static butter = new Ingredient('Butter', 'g', 'dairy', ['dairy']);
	static cremeFraiche = new Ingredient('Crème Fraîche', 'g', 'dairy', [
		'dairy',
	]);
	static doubleCream = new Ingredient('Double Cream', 'ml', 'dairy', [
		'dairy',
	]);
	static wholeMilk = new Ingredient('Whole Milk', 'ml', 'dairy', ['dairy']);
	static greekYogurt = new Ingredient('Greek Yogurt', 'g', 'dairy', [
		'dairy',
	]);
	static cheddarCheese = new Ingredient('Cheddar Cheese', 'g', 'dairy', [
		'dairy',
	]);
	static brie = new Ingredient('Brie Cheese', 'g', 'dairy', ['dairy']);
	static mozzarellaBall = new Ingredient('Mozzarella Ball', 'each', 'dairy', [
		'dairy',
	]);
	static parmesanCheese = new Ingredient('Parmesan Cheese', 'g', 'dairy', [
		'dairy',
	]);
	static gnocchi = new Ingredient('Gnocchi', 'g', 'pantry', ['gluten']);
	static paellaRice = new Ingredient('Paella Rice', 'g', 'pantry');
	static penne = new Ingredient('Penne', 'g', 'pantry', ['gluten']);
	static lasagneSheets = new Ingredient('Lasagne Sheets', 'each', 'pantry', [
		'gluten',
	]);
	static pitaBread = new Ingredient('Pita Bread', 'each', 'bakery', [
		'gluten',
	]);
	static burgerBuns = new Ingredient('Burger Buns', 'each', 'bakery', [
		'gluten',
	]);
	static whiteBread = new Ingredient('White Bread', 'each', 'bakery', [
		'gluten',
	]);
	static seaSalt = new Ingredient('Sea Salt', 'tsp', 'spices');
	static groundBlackPepper = new Ingredient(
		'Ground Black Pepper',
		'tsp',
		'spices',
	);
	static fennelSeed = new Ingredient('Fennel Seeds', 'tsp', 'spices');
	static groundNutmeg = new Ingredient('Ground Nutmeg', 'tsp', 'spices');
	static chilliPowder = new Ingredient('Chilli Powder', 'tsp', 'spices');
	static groundCumin = new Ingredient('Ground Cumin', 'tsp', 'spices');
	static smokedPaprika = new Ingredient('Smoked Paprika', 'tsp', 'spices');
	static driedOregano = new Ingredient('Dried Oregano', 'tsp', 'spices');
	static cardamomPods = new Ingredient('Cardamom Pods', 'each', 'spices');
	static garamMasala = new Ingredient('Garam Masala', 'tsp', 'spices');
	static groundCoriander = new Ingredient(
		'Ground Coriander',
		'tsp',
		'spices',
	);
	static groundCinnamon = new Ingredient('Ground Cinnamon', 'tsp', 'spices');
	static cayennePepper = new Ingredient('Cayenne Pepper', 'tsp', 'spices');
	static saffron = new Ingredient('Saffron', 'tsp', 'spices');
	static mildCurryPowder = new Ingredient(
		'Mild Curry Powder',
		'tsp',
		'spices',
	);
	static noriSheets = new Ingredient('Nori Sheets', 'each', 'japanese');
	static lambMince = new Ingredient('Lamb Mince', 'g', 'meat');
	static porkLoin = new Ingredient('Pork Loin', 'g', 'meat');
	static whiteFishFillet = new Ingredient('White Fish Fillet', 'g', 'fish', [
		'fish',
	]);
	static smokedHaddock = new Ingredient('Smoked Haddock', 'g', 'fish', [
		'fish',
	]);
	static salmonFillet = new Ingredient('Salmon Fillet', 'g', 'fish', [
		'fish',
	]);
	static tunaSteak = new Ingredient('Tuna Steak', 'g', 'fish', ['fish']);
	static cookedPrawns = new Ingredient('Cooked Prawns', 'g', 'meat', [
		'shellfish',
	]);
	static stiltonCheese = new Ingredient('Stilton Cheese', 'g', 'dairy', [
		'dairy',
	]);
	static gruyereCheese = new Ingredient('Gruyere Cheese', 'g', 'dairy', [
		'dairy',
	]);
	static mascarpone = new Ingredient('Mascarpone', 'g', 'dairy', ['dairy']);
	static bbqSauce = new Ingredient('BBQ Sauce', 'ml', 'pantry');
	static mangoChutney = new Ingredient('Mango Chutney', 'g', 'pantry');
	static worcestershireSauce = new Ingredient(
		'Worcestershire Sauce',
		'ml',
		'pantry',
		['fish'],
	);
	static dijonMustard = new Ingredient('Dijon Mustard', 'tsp', 'pantry');
	static whiteWineVinegar = new Ingredient(
		'White Wine Vinegar',
		'ml',
		'pantry',
	);
	static redWineVinegar = new Ingredient('Red Wine Vinegar', 'ml', 'pantry');
	static cider = new Ingredient('Dry Cider', 'ml', 'pantry');
	static whiteWine = new Ingredient('White Wine', 'ml', 'pantry');
	static brandy = new Ingredient('Brandy', 'ml', 'pantry');
	static strongBreadFlour = new Ingredient(
		'Strong Bread Flour',
		'g',
		'pantry',
		['gluten'],
	);
	static yeast = new Ingredient('Dried Yeast', 'g', 'pantry');
	static cornflour = new Ingredient('Cornflour', 'g', 'pantry');
	static lightBrownSugar = new Ingredient('Light Brown Sugar', 'g', 'pantry');
	static goldenSyrup = new Ingredient('Golden Syrup', 'g', 'pantry');
	static darkChocolate = new Ingredient('Dark Chocolate', 'g', 'pantry', [
		'dairy',
	]);
	static fingerBiscuits = new Ingredient(
		'Savoiardi Biscuits',
		'g',
		'pantry',
		['gluten', 'eggs'],
	);
	static espresso = new Ingredient('Strong Espresso', 'ml', 'pantry');
	static mayonaisse = new Ingredient('Mayonaisse', 'g', 'pantry', ['eggs']);
	static greenBeans = new Ingredient('Green Beans', 'g', 'produce');
	static blackOlives = new Ingredient('Black Olives', 'g', 'pantry');
	static capers = new Ingredient('Capers', 'g', 'pantry');
	static honey = new Ingredient('Honey', 'ml', 'pantry');
	static springRollWrappers = new Ingredient(
		'Spring Roll Wrappers',
		'each',
		'pantry',
		['gluten'],
	);
	static phylloPastry = new Ingredient('Phyllo Pastry', 'g', 'pantry', [
		'gluten',
	]);
	static puffPastry = new Ingredient('Puff Pastry', 'g', 'pantry', [
		'gluten',
	]);
	static turmeric = new Ingredient('Turmeric', 'tsp', 'spices');
	static bayLeaf = new Ingredient('Bay Leaf', 'each', 'spices');
	//#endregion
}
