type Unit =
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

type Category =
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

type RecipeIngredient = {
	ingredient: Ingredient;
	amount: number;
};

type Recipe = {
	id: number;
	name: string;
	description: string;
	timeMinutes: number;
	servings: number;
	tags: string[];
	ingredients: RecipeIngredient[];
	steps: string[];
};

const UNIT_CONVERSIONS: Record<
	string,
	{ to: Unit; factor: number; group: 'weight' | 'volume' | 'discrete' }
> = {
	g: { to: 'g', factor: 1, group: 'weight' },
	kg: { to: 'g', factor: 1000, group: 'weight' },
	lb: { to: 'g', factor: 453.59, group: 'weight' },
	oz: { to: 'g', factor: 28.35, group: 'weight' },
	ml: { to: 'ml', factor: 1, group: 'volume' },
	cl: { to: 'ml', factor: 10, group: 'volume' },
	l: { to: 'ml', factor: 1000, group: 'volume' },
	tsp: { to: 'ml', factor: 5, group: 'volume' },
	tbsp: { to: 'ml', factor: 15, group: 'volume' },
	cup: { to: 'ml', factor: 240, group: 'volume' },
	each: { to: 'each', factor: 1, group: 'discrete' },
	pc: { to: 'each', factor: 1, group: 'discrete' },
};

class Ingredient {
	constructor(
		public name: string,
		public unit: Unit = 'each',
		public category: Category = 'general',
		public allergens: string[] = [],
		public amount: number = 0,
	) {}

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

class IDManger {
	static lastID = 1;

	static getNextId(): number {
		return IDManger.lastID++;
	}
}

class App {
	recipes: Recipe[] = [
		{
			id: IDManger.getNextId(),
			name: 'Toad in the hole',
			description:
				'Classic British sausages in Yorkshire pudding batter. A family favourite that is surprisingly easy to make and perfect for a cold winter evening.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.porkSausages.getAmount(8),
				Ingredient.plainFlour.getAmount(110, 'g'),
				Ingredient.largeEggs.getAmount(3),
				Ingredient.vegetableOil.getAmount(5, 'tbsp'),
				Ingredient.seaSalt.getAmount(2, 'tsp'),
				Ingredient.groundBlackPepper.getAmount(2, 'tsp'),
				Ingredient.fennelSeed.getAmount(1, 'tsp'),
				Ingredient.wholeMilk.getAmount(300, 'ml'),
			],
			steps: [
				'Preheat the oven to 200°C (180°C fan).',
				'Sift the flour and a pinch of salt into a large mixing bowl.',
				'Make a well in the centre of the flour and crack in the eggs.',
				'Whisk the eggs, gradually drawing in the flour from the sides.',
				'Slowly pour in the milk, whisking continuously to form a smooth batter.',
				'Stir in the fennel seeds and ground black pepper.',
				'Cover the bowl and leave the batter to rest for at least 30 minutes (or up to 3 hours).',
				'Place the sausages in a roasting tin, drizzle with a little oil, and bake for 15 minutes until browned.',
				'Remove the tin from the oven and carefully pour the resting batter over the hot sausages.',
				'Return to the oven and bake for 25-30 minutes until the batter is risen, crisp, and golden brown.',
			],
			tags: ['dinner', 'british', 'simple', 'one pot meal', 'winter'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Turkey with peaches',
			description:
				'A sweet and savoury dish featuring tender turkey and juicy peaches in a creamy nutmeg-scented sauce.',
			timeMinutes: 30,
			servings: 3,
			ingredients: [
				Ingredient.turkeyBreast.getAmount(500, 'g'),
				Ingredient.cremeFraiche.getAmount(300, 'g'),
				Ingredient.chickenStock.getAmount(300, 'ml'),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.plainFlour.getAmount(50, 'g'),
				Ingredient.groundNutmeg.getAmount(2, 'tsp'),
				Ingredient.seaSalt.getAmount(2, 'tsp'),
				Ingredient.groundBlackPepper.getAmount(2, 'tsp'),
				Ingredient.tinnedPeaches.getAmount(1),
				Ingredient.vegetableOil.getAmount(1, 'tbsp'),
			],
			steps: [
				'Slice the turkey breast into bite-sized pieces.',
				'In a bowl, mix the flour, ground nutmeg, salt, and pepper.',
				'Toss the turkey pieces in the seasoned flour until evenly coated.',
				'Heat the vegetable oil in a large frying pan over medium-high heat.',
				'Fry the turkey pieces until golden brown all over, then remove from the pan and set aside.',
				'Finely chop the white onion and crush the garlic cloves.',
				'In the same pan, fry the onion until softened, then add the garlic and cook for 1 minute.',
				'Stir in any remaining seasoned flour and cook for 1 minute.',
				'Gradually pour in the chicken stock, stirring continuously to prevent lumps.',
				'Drain the tinned peaches and cut them into slices.',
				'Stir the crème fraîche and sliced peaches into the sauce.',
				'Return the turkey to the pan and simmer gently for 5-10 minutes until the turkey is cooked through and the sauce has thickened.',
			],
			tags: ['dinner', 'sweet & savoury', 'turkey'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Chili con carne',
			description:
				'A hearty beef chili with a complex spice profile. Best served with rice, sour cream, and fresh coriander.',
			timeMinutes: 80,
			servings: 6,
			ingredients: [
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.celery.getAmount(2, 'pc'),
				Ingredient.redBellPepper.getAmount(1),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.chilliPowder.getAmount(0.5, 'tsp'),
				Ingredient.groundCumin.getAmount(0.5, 'tsp'),
				Ingredient.smokedPaprika.getAmount(1, 'tsp'),
				Ingredient.mincedBeef.getAmount(500, 'g'),
				Ingredient.beefStock.getAmount(500, 'ml'),
				Ingredient.choppedTomatoes.getAmount(1),
				Ingredient.driedOregano.getAmount(1, 'tsp'),
				Ingredient.casterSugar.getAmount(15, 'g'),
				Ingredient.tomatoPuree.getAmount(2, 'tbsp'),
				Ingredient.redKidneyBeans.getAmount(1),
				Ingredient.vegetableOil.getAmount(1, 'tbsp'), // Added oil for frying
			],
			steps: [
				'Finely chop the white onion, celery, and red bell pepper.',
				'Heat a little oil in a large heavy-based pot over medium heat.',
				'Fry the onion, celery, and red pepper until softened (about 8-10 minutes).',
				'Crush the garlic and add it to the pot, cooking for another minute.',
				'Stir in the chilli powder, cumin, and smoked paprika, and cook for 1 minute until fragrant.',
				'Add the minced beef, breaking it up with a spoon, and cook until browned all over.',
				'Stir in the tomato purée and cook for 2 minutes.',
				'Pour in the beef stock and chopped tomatoes, then add the dried oregano and sugar.',
				'Bring to a boil, then reduce the heat, cover, and simmer gently for 45 minutes, stirring occasionally.',
				'Drain and rinse the red kidney beans, then stir them into the chili.',
				'Simmer uncovered for a further 15 minutes to allow the sauce to thicken.',
			],
			tags: ['dinner', 'comforting', 'mexican'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Butter chicken',
			description:
				'Rich, creamy Indian classic with aromatic spices and a smooth tomato-based sauce.',
			timeMinutes: 60,
			servings: 4,
			ingredients: [
				Ingredient.chickenThighs.getAmount(4),
				Ingredient.cardamomPods.getAmount(6),
				Ingredient.lemonJuice.getAmount(1, 'tbsp'),
				Ingredient.sunflowerOil.getAmount(1, 'tbsp'),
				Ingredient.garamMasala.getAmount(1, 'tsp'),
				Ingredient.groundCumin.getAmount(0.5, 'tsp'),
				Ingredient.groundCoriander.getAmount(0.5, 'tsp'),
				Ingredient.smokedPaprika.getAmount(0.5, 'tsp'),
				Ingredient.butter.getAmount(50, 'g'),
				Ingredient.garlicCloves.getAmount(3),
				Ingredient.freshGinger.getAmount(20, 'g'),
				Ingredient.tomatoPassata.getAmount(400, 'ml'),
				Ingredient.doubleCream.getAmount(100, 'ml'),
				Ingredient.greekYogurt.getAmount(25, 'g'),
			],
			steps: [
				'Cut the chicken thighs into bite-sized pieces.',
				'In a bowl, mix the chicken with the lemon juice, Greek yogurt, half of the garlic (crushed), half of the ginger (grated), and a pinch of salt. Leave to marinate for at least 30 minutes.',
				'Heat the sunflower oil in a large pan over high heat and fry the marinated chicken until charred and cooked through. Remove and set aside.',
				'In the same pan, melt the butter over medium heat.',
				'Lightly crush the cardamom pods and add them to the butter along with the remaining crushed garlic and grated ginger. Fry for 1 minute.',
				'Stir in the garam masala, cumin, coriander, and smoked paprika, cooking for 30 seconds until fragrant.',
				'Pour in the tomato passata and bring to a gentle simmer.',
				'Simmer the sauce for 15-20 minutes until slightly thickened.',
				'Stir in the double cream and return the cooked chicken to the pan.',
				'Simmer for a further 5 minutes until everything is heated through.',
			],
			tags: ['indian', 'curry', 'dinner', 'classic'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Sausage leek gnocchi',
			description:
				'Quick creamy one-pot gnocchi with savoury sausages and sweet leeks.',
			timeMinutes: 50,
			servings: 3,
			ingredients: [
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.porkSausages.getAmount(8),
				Ingredient.leeks.getAmount(1),
				Ingredient.gnocchi.getAmount(400, 'g'),
				Ingredient.vegetableStock.getAmount(300, 'ml'),
				Ingredient.cremeFraiche.getAmount(300, 'g'),
				Ingredient.tomato.getAmount(3),
				Ingredient.seaSalt.getAmount(1, 'tsp'),
				Ingredient.groundBlackPepper.getAmount(1, 'tsp'),
				Ingredient.parmesanCheese.getAmount(50, 'g'),
				Ingredient.oliveOil.getAmount(1, 'tbsp'), // Added oil for frying
			],
			steps: [
				'Slice the leeks, finely chop the onion, crush the garlic, and roughly chop the tomatoes.',
				'Squeeze the sausage meat out of its casings.',
				'Heat a little olive oil in a large deep frying pan or casserole dish over medium-high heat.',
				'Add the sausage meat, breaking it up with a spoon, and fry until browned and crispy.',
				'Reduce the heat to medium and add the leeks and onion to the pan with the sausage meat.',
				'Sweat the vegetables for 5-8 minutes until softened, then add the garlic and cook for 1 minute.',
				'Pour in the vegetable stock and bring to a gentle simmer.',
				'Add the gnocchi to the pan and simmer for 2-3 minutes, or until they float to the surface.',
				'Stir in the crème fraîche, chopped tomatoes, and grated parmesan cheese.',
				'Season with sea salt and ground black pepper to taste, and simmer for another 2 minutes until the sauce coats the gnocchi.',
			],
			tags: ['italian', 'pasta', 'one pot dish', 'dinner'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Chicken gyros',
			description:
				'Greek street food at home with marinated chicken, tzatziki, and warm pita bread.',
			timeMinutes: 90,
			servings: 4,
			ingredients: [
				Ingredient.greekYogurt.getAmount(600, 'g'), // split between marinade and tzatziki
				Ingredient.garlicCloves.getAmount(6),
				Ingredient.oliveOil.getAmount(8, 'tbsp'),
				Ingredient.lemonJuice.getAmount(6, 'tbsp'),
				Ingredient.groundCoriander.getAmount(1, 'tsp'),
				Ingredient.driedOregano.getAmount(1, 'tsp'),
				Ingredient.smokedPaprika.getAmount(1, 'tsp'),
				Ingredient.groundCinnamon.getAmount(1, 'tsp'),
				Ingredient.cayennePepper.getAmount(0.25, 'tsp'),
				Ingredient.chickenThighs.getAmount(8),
				Ingredient.seaSalt.getAmount(1, 'tsp'),
				Ingredient.groundBlackPepper.getAmount(1, 'tsp'),
				Ingredient.pitaBread.getAmount(4),
				Ingredient.freshMint.getAmount(2, 'g'),
				Ingredient.redOnion.getAmount(1),
				Ingredient.wholeLemon.getAmount(1),
				Ingredient.chips.getAmount(200, 'g'),
				Ingredient.cucumber.getAmount(0.5), // Added for tzatziki
				Ingredient.tomato.getAmount(2), // Added for serving
			],
			steps: [
				'For the marinade: Mix half the Greek yogurt, 3 crushed garlic cloves, 4 tbsp olive oil, 3 tbsp lemon juice, and all the spices in a large bowl.',
				'Cut the chicken thighs into chunks, coat thoroughly in the marinade, cover, and chill for at least 1 hour.',
				'Preheat the oven to 200°C (180°C fan).',
				'Thread the marinated chicken pieces onto skewers and place them on a baking tray lined with foil.',
				'Roast the chicken skewers in the oven for 25-30 minutes, turning halfway, until cooked through and slightly charred.',
				'Cook the frozen chips according to the packet instructions.',
				'To make the tzatziki: Grate the cucumber and squeeze out the excess water. Mix with the remaining Greek yogurt, 3 crushed garlic cloves, 3 tbsp lemon juice, chopped mint, and a pinch of salt.',
				'Finely slice the red onion and tomatoes.',
				'Warm the pita breads in the oven or a toaster.',
				'To assemble: Spread tzatziki on a warm pita, add pieces of roasted chicken, chips, sliced red onion, and tomato. Squeeze over some fresh lemon juice before wrapping.',
			],
			tags: ['dinner', 'greek', 'mediterranean', 'national dish'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Pasta bacon broccoli',
			description:
				'Quick creamy pasta with crispy bacon and fresh broccoli.',
			timeMinutes: 30,
			servings: 4,
			ingredients: [
				Ingredient.penne.getAmount(300, 'g'),
				Ingredient.baconRashers.getAmount(4),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.floretBroccoli.getAmount(0.5), // represents half a head of broccoli
				Ingredient.cremeFraiche.getAmount(300, 'g'),
				Ingredient.seaSalt.getAmount(0.5, 'tsp'),
				Ingredient.groundBlackPepper.getAmount(0.5, 'tsp'),
			],
			steps: [
				'Bring a large pan of salted water to the boil and cook the penne according to the packet instructions.',
				'Chop the broccoli into small florets.',
				'Add the broccoli to the pasta water for the final 3-4 minutes of cooking time.',
				'Meanwhile, chop the bacon rashers and finely dice the white onion.',
				'Heat a large frying pan over medium-high heat and fry the bacon until crispy.',
				'Add the diced onion to the bacon and fry for a further 5 minutes until softened.',
				'Drain the pasta and broccoli, reserving a splash of the cooking water.',
				'Add the pasta, broccoli, crème fraîche, and a splash of the pasta water to the frying pan with the bacon and onion.',
				'Stir everything together over a low heat until the sauce is creamy and coats the pasta.',
				'Season generously with black pepper and a little sea salt before serving.',
			],
			tags: ['dinner', 'italian', 'pasta'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Seafood and chicken paella',
			description:
				'Vibrant Spanish rice dish with saffron, seafood, and chicken.',
			timeMinutes: 45,
			servings: 4,
			ingredients: [
				Ingredient.chickenThighs.getAmount(4),
				Ingredient.chorizoSausage.getAmount(150, 'g'),
				Ingredient.rawPrawns.getAmount(300, 'g'),
				Ingredient.paellaRice.getAmount(300, 'g'),
				Ingredient.chickenStock.getAmount(700, 'ml'),
				Ingredient.saffron.getAmount(1, 'tsp'),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.redBellPepper.getAmount(1),
				Ingredient.frozenPeas.getAmount(100, 'g'),
				Ingredient.oliveOil.getAmount(2, 'tbsp'), // Added oil
				Ingredient.garlicCloves.getAmount(2), // Added garlic
			],
			steps: [
				'Place the saffron strands in a small bowl with 2 tablespoons of warm water and leave to infuse.',
				'Chop the chicken thighs into chunks, slice the chorizo, finely chop the onion, dice the red pepper, and crush the garlic.',
				'Heat the olive oil in a large, wide paella pan or frying pan over medium-high heat.',
				'Fry the chicken and chorizo for 5-8 minutes until the chicken is browned and the chorizo has released its oils.',
				'Add the onion, red pepper, and garlic to the pan and sauté for 5 minutes until softened.',
				'Stir in the paella rice, ensuring all the grains are coated in the flavorful oils.',
				'Pour in the chicken stock and the infused saffron water. Season with a little salt.',
				'Bring to a simmer, then reduce the heat to low. Do not stir the rice from this point onwards.',
				'Cook uncovered for 15 minutes, or until most of the liquid has been absorbed and the rice is almost tender.',
				'Scatter the raw prawns and frozen peas over the top of the rice and push them down slightly into the mixture.',
				'Cook for a further 5-8 minutes until the prawns are pink and cooked through, and all the liquid has been absorbed.',
				'Remove from the heat, cover with a clean tea towel, and let it rest for 5 minutes before serving.',
			],
			tags: ['spanish', 'seafood', 'chicken', 'dinner'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Pork and apple burgers',
			description: 'Juicy burgers with a sweet twist of grated apple.',
			timeMinutes: 15,
			servings: 4,
			ingredients: [
				Ingredient.porkMince.getAmount(500, 'g'),
				Ingredient.desertApple.getAmount(1),
				Ingredient.whiteOnion.getAmount(0.5),
				Ingredient.breadcrumbs.getAmount(50, 'g'),
				Ingredient.largeEggs.getAmount(1),
				Ingredient.burgerBuns.getAmount(4),
				Ingredient.vegetableOil.getAmount(1, 'tbsp'), // Added oil for frying
				Ingredient.seaSalt.getAmount(1, 'tsp'), // Added seasoning
				Ingredient.groundBlackPepper.getAmount(1, 'tsp'), // Added seasoning
			],
			steps: [
				'Peel and coarsely grate the apple. Finely dice the half white onion.',
				'In a large bowl, combine the pork mince, grated apple, diced onion, breadcrumbs, and egg.',
				'Season well with sea salt and ground black pepper.',
				'Use your hands to mix everything thoroughly, then divide the mixture into 4 equal portions.',
				'Shape each portion into a flat burger patty.',
				'Heat the vegetable oil in a large frying pan over medium heat.',
				'Fry the burgers for 5-6 minutes on each side, or until thoroughly cooked through and golden brown.',
				'Slice the burger buns in half and lightly toast them if desired.',
				'Serve the pork and apple burgers in the buns with your favourite accompaniments.',
			],
			tags: ['burger', 'pork', 'simple', 'dinner'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Veggie lasagne',
			description:
				'Comforting meat-free lasagne with layers of roasted vegetables and béchamel sauce.',
			timeMinutes: 45,
			servings: 4,
			ingredients: [
				Ingredient.lasagneSheets.getAmount(12),
				Ingredient.aubergine.getAmount(1),
				Ingredient.courgette.getAmount(2),
				Ingredient.tomatoPassata.getAmount(500, 'ml'),
				Ingredient.cheddarCheese.getAmount(250, 'g'),
				Ingredient.wholeMilk.getAmount(1, 'l'),
				Ingredient.plainFlour.getAmount(25, 'g'),
				Ingredient.butter.getAmount(30, 'g'),
				Ingredient.spinach.getAmount(200, 'g'),
				Ingredient.oliveOil.getAmount(2, 'tbsp'), // Added for roasting veg
			],
			steps: [
				'Preheat the oven to 200°C (180°C fan).',
				'Dice the aubergine and courgettes into roughly 2cm cubes.',
				'Spread the vegetables on a baking tray, drizzle with olive oil, season, and roast for 20-25 minutes until soft and slightly charred.',
				'Meanwhile, to make the white sauce, melt the butter in a saucepan over medium heat.',
				'Stir in the flour and cook for 1-2 minutes to form a paste (roux).',
				'Gradually whisk in the whole milk, stirring constantly until the sauce thickens and is completely smooth.',
				'Remove the sauce from the heat and stir in half of the grated cheddar cheese.',
				'In a separate pan, briefly wilt the fresh spinach.',
				'To assemble the lasagne, spread a thin layer of tomato passata in the base of a baking dish.',
				'Add a layer of lasagne sheets, followed by half of the roasted vegetables, half of the wilted spinach, and more passata.',
				'Repeat the layers (lasagne sheets, remaining veg, remaining spinach, passata).',
				'Top with a final layer of lasagne sheets and pour over the cheese sauce to cover completely.',
				'Sprinkle the remaining grated cheddar cheese over the top.',
				'Bake for 30-35 minutes until the top is bubbling and golden brown.',
			],
			tags: ['vegetarian', 'italian', 'pasta', 'dinner'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Katsu chicken',
			description:
				'Crispy breaded chicken with a mildly spiced Japanese curry sauce.',
			timeMinutes: 20,
			servings: 2,
			ingredients: [
				Ingredient.chickenBreast.getAmount(2),
				Ingredient.plainFlour.getAmount(50, 'g'),
				Ingredient.largeEggs.getAmount(1),
				Ingredient.breadcrumbs.getAmount(100, 'g'),
				Ingredient.whiteOnion.getAmount(2),
				Ingredient.mildCurryPowder.getAmount(3, 'tsp'),
				Ingredient.chickenStock.getAmount(500, 'ml'),
				Ingredient.soySauce.getAmount(2, 'tbsp'),
				Ingredient.carrot.getAmount(2),
				Ingredient.groundBlackPepper.getAmount(2, 'tsp'),
				Ingredient.seaSalt.getAmount(2, 'tsp'),
				Ingredient.vegetableOil.getAmount(3, 'tbsp'), // Added oil for frying chicken
				Ingredient.garlicCloves.getAmount(1), // Added aromatics for sauce
				Ingredient.freshGinger.getAmount(10, 'g'), // Added aromatics for sauce
			],
			steps: [
				'Place the chicken breasts between two sheets of cling film and bash them gently with a rolling pin until they are about 1cm thick.',
				'Set up a breading station: seasoned flour on one plate, a beaten egg in a shallow bowl, and breadcrumbs on another plate.',
				'Coat each chicken breast first in the flour, then dip into the egg, and finally coat thoroughly in the breadcrumbs.',
				'Heat 2 tbsp of vegetable oil in a large frying pan over medium-high heat.',
				'Fry the breaded chicken for 5-6 minutes on each side until golden, crispy, and cooked through. Remove and keep warm.',
				'To make the sauce: Finely chop the onions and carrots, crush the garlic, and grate the ginger.',
				'In a separate saucepan, heat the remaining 1 tbsp of oil and fry the onion and carrots until softened.',
				'Stir in the garlic and ginger, cooking for 1 minute.',
				'Add the mild curry powder and stir well to coat the vegetables.',
				'Pour in the chicken stock and soy sauce. Bring to a boil, then reduce the heat and simmer for 15 minutes until the carrots are tender.',
				'Use a stick blender to blend the sauce until smooth (or leave chunky if preferred).',
				'Slice the crispy chicken and serve with rice, pouring the warm katsu curry sauce over the top.',
			],
			tags: ['japanese', 'chicken', 'curry', 'dinner'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Tomato mozzarella toastie',
			description:
				'Classic cheesy toastie with basil pesto and fresh tomato.',
			timeMinutes: 10,
			servings: 1,
			ingredients: [
				Ingredient.whiteBread.getAmount(2),
				Ingredient.butter.getAmount(10, 'g'),
				Ingredient.tomato.getAmount(1),
				Ingredient.mozzarellaBall.getAmount(0.5), // reduced to half a ball for one toastie
				Ingredient.pesto.getAmount(4, 'tsp'),
				Ingredient.seaSalt.getAmount(1, 'tsp'),
				Ingredient.groundBlackPepper.getAmount(1, 'tsp'),
			],
			steps: [
				'Butter one side of each slice of bread.',
				'Slice the tomato and the mozzarella ball.',
				'Place one slice of bread, butter-side down, on a board or directly into a cold frying pan.',
				'Spread the basil pesto over the unbuttered side facing up.',
				'Layer the sliced mozzarella and tomato evenly over the pesto.',
				'Season the tomatoes with a little sea salt and ground black pepper.',
				'Top with the second slice of bread, ensuring the buttered side is facing outwards.',
				'Place the frying pan over medium heat and toast the sandwich for 3-4 minutes until the bottom is golden brown and crispy.',
				'Carefully flip the toastie using a spatula and cook for a further 3-4 minutes on the other side, pressing down gently until the cheese is melted.',
				'Cut in half and serve immediately.',
			],
			tags: ['lunch', 'snack', 'vegetarian'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Brie + cranberry + spinach + bacon jacket potatoes',
			description:
				'Gourmet stuffed potatoes with melted brie and sweet cranberry.',
			timeMinutes: 60,
			servings: 2,
			ingredients: [
				Ingredient.largePotatoes.getAmount(2),
				Ingredient.brie.getAmount(100, 'g'),
				Ingredient.cranberrySauce.getAmount(2, 'tbsp'),
				Ingredient.spinach.getAmount(50, 'g'),
				Ingredient.baconRashers.getAmount(4),
				Ingredient.oliveOil.getAmount(1, 'tsp'), // added for rubbing potatoes
				Ingredient.seaSalt.getAmount(1, 'tsp'), // added for potato skin
			],
			steps: [
				'Preheat the oven to 200°C (180°C fan).',
				'Prick the large potatoes several times with a fork, rub them lightly with a little olive oil, and sprinkle with sea salt.',
				'Bake the potatoes directly on the oven shelf for 1 to 1.5 hours, until the skin is crisp and the inside is soft.',
				'While the potatoes are baking, slice the brie and roughly chop the bacon rashers.',
				'Fry the bacon in a pan until crispy, then remove from the heat.',
				'In the same pan using the residual bacon fat, briefly wilt the fresh spinach.',
				'Once the potatoes are cooked, remove them from the oven and cut a cross in the top of each one, squeezing the base slightly to open them up.',
				'Dollop a spoonful of cranberry sauce into each potato.',
				'Layer in the wilted spinach, crispy bacon, and top generously with slices of brie.',
				'Return the filled potatoes to the oven for 5 minutes, or until the brie is oozing and melted.',
			],
			tags: ['dinner', 'lunch', 'potato'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Bolognese',
			description:
				'A slow-cooked, rich Italian meat sauce perfect with tagliatelle or spaghetti.',
			timeMinutes: 120,
			servings: 4,
			ingredients: [
				Ingredient.mincedBeef.getAmount(500, 'g'),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.carrot.getAmount(1),
				Ingredient.celery.getAmount(1, 'pc'),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.tomatoPuree.getAmount(2, 'tbsp'),
				Ingredient.choppedTomatoes.getAmount(1),
				Ingredient.beefStock.getAmount(200, 'ml'),
				Ingredient.driedOregano.getAmount(1, 'tsp'),
				Ingredient.oliveOil.getAmount(1, 'tbsp'),
			],
			steps: [
				'Finely dice the onion, carrot, and celery.',
				'Sauté the vegetables in olive oil over medium heat until softened.',
				'Add the minced beef and brown thoroughly, breaking up lumps.',
				'Stir in the garlic and tomato purée, cooking for 2 minutes.',
				'Add chopped tomatoes, beef stock, and oregano.',
				'Simmer on low heat for at least 1.5 hours until thick and rich.',
			],
			tags: ['italian', 'dinner', 'classic'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Lasagne',
			description:
				'Layers of rich bolognese, creamy béchamel sauce, and pasta topped with melted cheese.',
			timeMinutes: 90,
			servings: 6,
			ingredients: [
				Ingredient.lasagneSheets.getAmount(12),
				Ingredient.mincedBeef.getAmount(500, 'g'),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.choppedTomatoes.getAmount(1),
				Ingredient.butter.getAmount(50, 'g'),
				Ingredient.plainFlour.getAmount(50, 'g'),
				Ingredient.wholeMilk.getAmount(600, 'ml'),
				Ingredient.cheddarCheese.getAmount(150, 'g'),
				Ingredient.parmesanCheese.getAmount(50, 'g'),
			],
			steps: [
				'Prepare a meat sauce by browning beef with onions and simmering with tomatoes.',
				'Make a béchamel by melting butter, stirring in flour, and gradually whisking in milk until thick.',
				'In an ovenproof dish, layer meat sauce, then pasta sheets, then white sauce.',
				'Repeat layers, finishing with white sauce on top.',
				'Sprinkle with cheddar and parmesan.',
				'Bake at 200°C for 35-40 minutes until golden and bubbling.',
			],
			tags: ['italian', 'dinner', 'baked'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Veggie Lasagne',
			description:
				'A Mediterranean vegetable twist on the classic baked pasta.',
			timeMinutes: 75,
			servings: 4,
			ingredients: [
				Ingredient.aubergine.getAmount(1),
				Ingredient.courgette.getAmount(2),
				Ingredient.redBellPepper.getAmount(2),
				Ingredient.tomatoPassata.getAmount(500, 'ml'),
				Ingredient.lasagneSheets.getAmount(9),
				Ingredient.mozzarellaBall.getAmount(1),
				Ingredient.wholeMilk.getAmount(500, 'ml'),
				Ingredient.butter.getAmount(40, 'g'),
				Ingredient.plainFlour.getAmount(40, 'g'),
			],
			steps: [
				'Slice and roast the aubergine, courgette, and peppers until tender.',
				'Combine the roasted vegetables with passata and herbs.',
				'Make a white sauce using the butter, flour, and milk.',
				'Layer vegetable sauce, pasta, and white sauce in a dish.',
				'Top with torn mozzarella and bake at 190°C for 30 minutes.',
			],
			tags: ['vegetarian', 'italian', 'dinner'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Gyros',
			description:
				'Greek-style wraps with spiced meat, fresh salad, and creamy yogurt sauce.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.chickenThighs.getAmount(6),
				Ingredient.pitaBread.getAmount(4),
				Ingredient.greekYogurt.getAmount(200, 'g'),
				Ingredient.cucumber.getAmount(0.5),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.driedOregano.getAmount(1, 'tsp'),
				Ingredient.smokedPaprika.getAmount(1, 'tsp'),
				Ingredient.tomato.getAmount(2),
				Ingredient.redOnion.getAmount(1),
			],
			steps: [
				'Marinate chicken in oil, oregano, paprika, and garlic, then grill until charred.',
				'Grate cucumber and squeeze out liquid, mix with yogurt and garlic for tzatziki.',
				'Warm the pita breads.',
				'Slice the chicken and place in pitas with sliced tomatoes, onion, and tzatziki.',
				'Wrap tightly and serve immediately.',
			],
			tags: ['greek', 'street-food', 'quick'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Chicken Tikka Masala',
			description:
				"The nation's favourite curry: marinated chicken in a creamy, spiced tomato sauce.",
			timeMinutes: 50,
			servings: 4,
			ingredients: [
				Ingredient.chickenBreast.getAmount(3),
				Ingredient.greekYogurt.getAmount(150, 'g'),
				Ingredient.tomatoPassata.getAmount(400, 'ml'),
				Ingredient.doubleCream.getAmount(100, 'ml'),
				Ingredient.garamMasala.getAmount(2, 'tsp'),
				Ingredient.groundCumin.getAmount(1, 'tsp'),
				Ingredient.turmeric.getAmount(1, 'tsp'),
				Ingredient.freshGinger.getAmount(20, 'g'),
				Ingredient.garlicCloves.getAmount(3),
			],
			steps: [
				'Coat diced chicken in yogurt and half the spices; grill until slightly charred.',
				'Fry onions, ginger, and garlic in a pan until soft.',
				'Add remaining spices and passata, simmer for 15 minutes.',
				'Stir in the grilled chicken and double cream.',
				'Heat through and serve with basmati rice.',
			],
			tags: ['curry', 'indian', 'dinner'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Meatballs (Pork)',
			description:
				'Juicy pork meatballs seasoned with fennel and herbs in a light tomato sauce.',
			timeMinutes: 45,
			servings: 4,
			ingredients: [
				Ingredient.porkMince.getAmount(500, 'g'),
				Ingredient.breadcrumbs.getAmount(50, 'g'),
				Ingredient.largeEggs.getAmount(1),
				Ingredient.fennelSeed.getAmount(1, 'tsp'),
				Ingredient.garlicCloves.getAmount(1),
				Ingredient.tomatoPassata.getAmount(500, 'ml'),
				Ingredient.driedOregano.getAmount(1, 'tsp'),
				Ingredient.parmesanCheese.getAmount(30, 'g'),
			],
			steps: [
				'Mix pork mince, breadcrumbs, egg, crushed fennel seeds, and garlic.',
				'Roll into golf-ball sized spheres.',
				'Brown the meatballs in a pan with a little oil.',
				'Pour over the passata and oregano, then simmer for 20 minutes.',
				'Serve over pasta with a grating of parmesan.',
			],
			tags: ['pork', 'dinner', 'family'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Normandy Pork',
			description:
				'A classic French dish of pork cooked with apples, cider, and cream.',
			timeMinutes: 60,
			servings: 4,
			ingredients: [
				Ingredient.porkLoin.getAmount(600, 'g'),
				Ingredient.desertApple.getAmount(2),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.cider.getAmount(300, 'ml'),
				Ingredient.chickenStock.getAmount(150, 'ml'),
				Ingredient.doubleCream.getAmount(100, 'ml'),
				Ingredient.butter.getAmount(25, 'g'),
				Ingredient.driedOregano.getAmount(1, 'tsp'),
			],
			steps: [
				'Slice pork into medallions and brown in butter; remove from pan.',
				'Sauté sliced onions and apples until golden.',
				'Pour in cider and stock, return pork to the pan.',
				'Simmer for 20 minutes until the pork is tender.',
				'Stir in the cream and heat gently before serving.',
			],
			tags: ['french', 'pork', 'creamy'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Creamy Chicken Curry',
			description:
				'A mild and silky curry using coconut milk or cream, perfect for the whole family.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.chickenThighs.getAmount(5),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.mildCurryPowder.getAmount(2, 'tbsp'),
				Ingredient.chickenStock.getAmount(200, 'ml'),
				Ingredient.doubleCream.getAmount(150, 'ml'),
				Ingredient.frozenPeas.getAmount(100, 'g'),
				Ingredient.vegetableOil.getAmount(1, 'tbsp'),
			],
			steps: [
				'Fry onion and diced chicken until chicken is browned.',
				'Stir in curry powder and cook for 1 minute.',
				'Add chicken stock and simmer for 15 minutes.',
				'Add peas and double cream, simmering for another 5 minutes until thickened.',
				'Serve with naan bread or rice.',
			],
			tags: ['curry', 'chicken', 'mild'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Eggs Benedict',
			description:
				'The ultimate brunch: poached eggs and ham on muffins with buttery hollandaise.',
			timeMinutes: 20,
			servings: 2,
			ingredients: [
				Ingredient.largeEggs.getAmount(4),
				Ingredient.whiteBread.getAmount(2),
				Ingredient.baconRashers.getAmount(4),
				Ingredient.butter.getAmount(100, 'g'),
				Ingredient.lemonJuice.getAmount(10, 'ml'),
			],
			steps: [
				'Make hollandaise by whisking 2 egg yolks and lemon juice over a bain-marie, slowly adding melted butter.',
				'Toast the bread (or muffins) and fry the bacon until crispy.',
				'Poach the remaining eggs in simmering water for 3 minutes.',
				'Place bacon on toast, top with poached eggs, and smother in hollandaise.',
			],
			tags: ['brunch', 'breakfast', 'eggs'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Salad Niçoise',
			description:
				'A fresh French salad with tuna, green beans, and hard-boiled eggs.',
			timeMinutes: 30,
			servings: 2,
			ingredients: [
				Ingredient.tunaSteak.getAmount(200, 'g'),
				Ingredient.largePotatoes.getAmount(2),
				Ingredient.greenBeans.getAmount(100, 'g'),
				Ingredient.largeEggs.getAmount(2),
				Ingredient.blackOlives.getAmount(50, 'g'),
				Ingredient.tomato.getAmount(2),
				Ingredient.oliveOil.getAmount(3, 'tbsp'),
			],
			steps: [
				'Boil potatoes until tender; blanch green beans in the same water.',
				'Hard-boil the eggs, then peel and quarter.',
				'Sear tuna steaks in a hot pan for 2 minutes each side.',
				'Arrange lettuce, potatoes, beans, tomatoes, olives, and eggs on a plate.',
				'Top with sliced tuna and a dressing of olive oil and lemon.',
			],
			tags: ['salad', 'french', 'healthy'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Carrot and Coriander Soup',
			description:
				'A vibrant and healthy soup with earthy spices and fresh herbs.',
			timeMinutes: 35,
			servings: 4,
			ingredients: [
				Ingredient.carrot.getAmount(6),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.groundCoriander.getAmount(1, 'tsp'),
				Ingredient.vegetableStock.getAmount(1000, 'ml'),
				Ingredient.vegetableOil.getAmount(1, 'tbsp'),
			],
			steps: [
				'Sauté diced onion and carrots in a large pot.',
				'Add ground coriander and cook for 1 minute.',
				'Pour in the stock and simmer for 20 minutes until carrots are soft.',
				'Blend until smooth using a stick blender.',
				'Season well and serve with crusty bread.',
			],
			tags: ['soup', 'vegetarian', 'lunch'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Leek and Potato Soup',
			description: 'A thick, comforting British classic.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.leeks.getAmount(3),
				Ingredient.largePotatoes.getAmount(3),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.vegetableStock.getAmount(800, 'ml'),
				Ingredient.doubleCream.getAmount(50, 'ml'),
				Ingredient.butter.getAmount(30, 'g'),
			],
			steps: [
				'Clean and slice the leeks; peel and dice the potatoes.',
				'Melt butter and sweat the leeks and onions until soft but not brown.',
				'Add potatoes and stock; simmer for 20 minutes.',
				'Blend half the soup for a chunky-creamy texture.',
				'Stir in the cream and season.',
			],
			tags: ['soup', 'classic', 'british'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Cabbage and Bacon Soup',
			description:
				'A rustic, hearty soup that makes the most of simple ingredients.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.baconRashers.getAmount(6),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.largePotatoes.getAmount(2),
				Ingredient.chickenStock.getAmount(1000, 'ml'),
			],
			steps: [
				'Fry chopped bacon until crisp; remove half for garnish.',
				'Add onion and diced potato to the pan, cooking for 5 minutes.',
				'Add shredded cabbage and stock.',
				'Simmer for 15 minutes until vegetables are tender.',
				'Serve topped with the reserved crispy bacon.',
			],
			tags: ['soup', 'rustic', 'bacon'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Broccoli and Stilton Soup',
			description: 'Indulgently creamy with a punchy hit of blue cheese.',
			timeMinutes: 30,
			servings: 4,
			ingredients: [
				Ingredient.floretBroccoli.getAmount(2),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.vegetableStock.getAmount(800, 'ml'),
				Ingredient.stiltonCheese.getAmount(100, 'g'),
				Ingredient.doubleCream.getAmount(50, 'ml'),
			],
			steps: [
				'Sauté onion until soft.',
				'Add chopped broccoli and stock; simmer for 10-12 minutes.',
				'Blend until smooth.',
				'Stir in the crumbled Stilton and cream until melted.',
				'Season with plenty of black pepper.',
			],
			tags: ['soup', 'cheese', 'vegetarian'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Hunters Chicken',
			description:
				'Chicken breast wrapped in bacon, smothered in BBQ sauce and melted cheese.',
			timeMinutes: 35,
			servings: 2,
			ingredients: [
				Ingredient.chickenBreast.getAmount(2),
				Ingredient.baconRashers.getAmount(4),
				Ingredient.bbqSauce.getAmount(100, 'ml'),
				Ingredient.cheddarCheese.getAmount(50, 'g'),
			],
			steps: [
				'Wrap each chicken breast in two rashers of bacon.',
				'Bake in the oven at 200°C for 20 minutes.',
				'Pour BBQ sauce over the chicken and top with cheese.',
				'Bake for another 5-10 minutes until cheese is golden and bubbling.',
			],
			tags: ['chicken', 'pub-classic', 'dinner'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Country Chicken Pie',
			description:
				'Tender chicken and veg in a creamy sauce under a flaky puff pastry lid.',
			timeMinutes: 60,
			servings: 4,
			ingredients: [
				Ingredient.chickenThighs.getAmount(4),
				Ingredient.leeks.getAmount(2),
				Ingredient.carrot.getAmount(1),
				Ingredient.chickenStock.getAmount(300, 'ml'),
				Ingredient.doubleCream.getAmount(100, 'ml'),
				Ingredient.puffPastry.getAmount(320, 'g'),
				Ingredient.largeEggs.getAmount(1),
			],
			steps: [
				'Fry chicken, leeks, and carrots until softened.',
				'Add stock and cream; simmer until the sauce thickens slightly.',
				'Pour into a pie dish.',
				'Top with puff pastry, brush with beaten egg, and cut a steam vent.',
				'Bake at 200°C for 25 minutes until puffed and golden.',
			],
			tags: ['pie', 'comforting', 'british'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Mac & Cheese',
			description:
				'The ultimate cheesy pasta bake with a crispy topping.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.penne.getAmount(400, 'g'),
				Ingredient.butter.getAmount(50, 'g'),
				Ingredient.plainFlour.getAmount(50, 'g'),
				Ingredient.wholeMilk.getAmount(600, 'ml'),
				Ingredient.cheddarCheese.getAmount(200, 'g'),
				Ingredient.breadcrumbs.getAmount(50, 'g'),
			],
			steps: [
				'Boil pasta for 2 minutes less than the pack instructions.',
				'Make a cheese sauce by making a roux with butter/flour, adding milk, then cheese.',
				'Mix the pasta into the cheese sauce.',
				'Transfer to a dish, top with breadcrumbs and extra cheese.',
				'Bake at 200°C for 20 minutes.',
			],
			tags: ['pasta', 'cheese', 'kids'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Potato Salad',
			description:
				'Creamy new potatoes with spring onions and a tangy mayo dressing.',
			timeMinutes: 25,
			servings: 6,
			ingredients: [
				Ingredient.largePotatoes.getAmount(7),
				Ingredient.mayonaisse.getAmount(150, 'g'),
				Ingredient.springOnion.getAmount(4),
				Ingredient.dijonMustard.getAmount(1, 'tsp'),
				Ingredient.lemonJuice.getAmount(1, 'tsp'),
			],
			steps: [
				'Boil cubed potatoes in salted water until tender.',
				'Drain and let cool completely.',
				'Mix mayonnaise, mustard, and lemon juice.',
				'Toss potatoes with the dressing and sliced spring onions.',
			],
			tags: ['side', 'salad', 'bbq'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Creamy Cheesy Dauphinoise Potatoes',
			description:
				'Thinly sliced potatoes baked in a garlic-infused cream sauce.',
			timeMinutes: 75,
			servings: 6,
			ingredients: [
				Ingredient.largePotatoes.getAmount(7),
				Ingredient.doubleCream.getAmount(400, 'ml'),
				Ingredient.wholeMilk.getAmount(100, 'ml'),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.cheddarCheese.getAmount(100, 'g'),
			],
			steps: [
				'Thinly slice potatoes (approx 2mm thick).',
				'Heat cream, milk, and crushed garlic in a pan until just simmering.',
				'Layer potatoes in a buttered dish, seasoning each layer.',
				'Pour over the cream mixture.',
				'Top with cheese and bake at 160°C for 1 hour.',
			],
			tags: ['side', 'french', 'indulgent'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Coleslaw',
			description: 'Crunchy, fresh, and much better than shop-bought.',
			timeMinutes: 15,
			servings: 6,
			ingredients: [
				Ingredient.carrot.getAmount(2),
				Ingredient.whiteOnion.getAmount(0.5),
				Ingredient.mayonaisse.getAmount(100, 'g'),
				Ingredient.lemonJuice.getAmount(1, 'tsp'),
			],
			steps: [
				'Finely shred the cabbage and onion.',
				'Grate the carrots.',
				'Whisk mayonnaise and lemon juice together.',
				'Toss everything together until well coated.',
			],
			tags: ['side', 'salad', 'fresh'],
		},
		{
			id: IDManger.getNextId(),
			name: 'French Onion Soup',
			description:
				'Deeply caramelised onions in a rich beef broth, topped with cheesy bread.',
			timeMinutes: 60,
			servings: 4,
			ingredients: [
				Ingredient.whiteOnion.getAmount(6),
				Ingredient.beefStock.getAmount(1200, 'ml'),
				Ingredient.butter.getAmount(50, 'g'),
				Ingredient.whiteBread.getAmount(4),
				Ingredient.gruyereCheese.getAmount(100, 'g'),
				Ingredient.brandy.getAmount(1, 'tbsp'),
			],
			steps: [
				'Slowly cook sliced onions in butter for 40 minutes until dark brown.',
				'Add brandy and deglaze the pan.',
				'Add stock and simmer for 15 minutes.',
				'Toast bread, top with cheese, and grill until melted.',
				'Serve soup in bowls with the cheesy toast floating on top.',
			],
			tags: ['french', 'soup', 'classic'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Creamy Tomato Sauce Pasta',
			description:
				'A smooth, comforting pasta dish that is ready in minutes.',
			timeMinutes: 20,
			servings: 2,
			ingredients: [
				Ingredient.penne.getAmount(200, 'g'),
				Ingredient.tomatoPassata.getAmount(300, 'ml'),
				Ingredient.doubleCream.getAmount(50, 'ml'),
				Ingredient.garlicCloves.getAmount(1),
				Ingredient.freshBasil.getAmount(10, 'g'),
			],
			steps: [
				'Boil pasta in salted water.',
				'Gently heat passata with crushed garlic for 10 minutes.',
				'Stir in the cream and fresh basil.',
				'Toss the cooked pasta in the sauce and serve.',
			],
			tags: ['pasta', 'quick', 'vegetarian'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Mango Chutney Creamy Pasta',
			description:
				'A quirky, fusion-style sweet and savoury pasta sauce.',
			timeMinutes: 20,
			servings: 2,
			ingredients: [
				Ingredient.penne.getAmount(200, 'g'),
				Ingredient.mangoChutney.getAmount(20, 'g'),
				Ingredient.cremeFraiche.getAmount(150, 'g'),
				Ingredient.mildCurryPowder.getAmount(1, 'tsp'),
			],
			steps: [
				'Cook the pasta according to instructions.',
				'In a pan, mix crème fraîche, mango chutney, and curry powder.',
				'Warm gently—do not boil.',
				'Mix with the pasta and serve, optionally with coriander.',
			],
			tags: ['fusion', 'pasta', 'unique'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Cottage and Shepherd Pie',
			description:
				'A British staple. Use minced beef for Cottage or lamb for Shepherd.',
			timeMinutes: 60,
			servings: 4,
			ingredients: [
				Ingredient.mincedBeef.getAmount(500, 'g'),
				Ingredient.largePotatoes.getAmount(4),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.carrot.getAmount(1),
				Ingredient.beefStock.getAmount(300, 'ml'),
				Ingredient.butter.getAmount(50, 'g'),
			],
			steps: [
				'Fry meat, onion, and carrots until browned.',
				'Add stock and simmer for 20 minutes.',
				'Boil and mash potatoes with butter and milk.',
				'Place meat in a dish, top with mash, and fork the surface.',
				'Bake at 200°C for 25 minutes until the peaks are crispy.',
			],
			tags: ['british', 'meat', 'pie'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Classic Creamy Fish Pie',
			description:
				'Mixed fish and prawns in a silky white sauce topped with buttery mash.',
			timeMinutes: 50,
			servings: 4,
			ingredients: [
				Ingredient.whiteFishFillet.getAmount(300, 'g'),
				Ingredient.salmonFillet.getAmount(200, 'g'),
				Ingredient.cookedPrawns.getAmount(100, 'g'),
				Ingredient.largePotatoes.getAmount(4),
				Ingredient.wholeMilk.getAmount(500, 'ml'),
				Ingredient.butter.getAmount(50, 'g'),
				Ingredient.plainFlour.getAmount(50, 'g'),
			],
			steps: [
				'Poach fish in milk, then remove and flake. Reserve the milk.',
				'Make a white sauce using butter, flour, and the reserved milk.',
				'Stir fish and prawns into the sauce.',
				'Top with mashed potatoes and bake at 200°C for 25 minutes.',
			],
			tags: ['fish', 'british', 'comforting'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Bubble and Squeak',
			description:
				'The traditional way to use up Sunday roast leftovers.',
			timeMinutes: 20,
			servings: 2,
			ingredients: [
				Ingredient.largePotatoes.getAmount(4),
				Ingredient.butter.getAmount(20, 'g'),
				Ingredient.baconRashers.getAmount(2),
			],
			steps: [
				'Mash leftover potatoes and mix with finely chopped cooked cabbage.',
				'Fry bacon in a pan until fat renders.',
				'Add the veg mix to the pan and press down into a cake.',
				'Fry until a dark brown crust forms, then flip and repeat.',
			],
			tags: ['british', 'leftovers', 'breakfast'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Vegetable Samosas',
			description:
				'Crispy pastry triangles filled with spiced potatoes and peas.',
			timeMinutes: 45,
			servings: 4,
			ingredients: [
				Ingredient.phylloPastry.getAmount(270, 'g'),
				Ingredient.largePotatoes.getAmount(2),
				Ingredient.frozenPeas.getAmount(100, 'g'),
				Ingredient.garamMasala.getAmount(1, 'tsp'),
				Ingredient.turmeric.getAmount(0.5, 'tsp'),
			],
			steps: [
				'Boil and cube potatoes; mix with peas and spices.',
				'Cut pastry into strips, place filling at the end, and fold into triangles.',
				'Brush with oil and bake at 200°C for 15-20 minutes until golden.',
			],
			tags: ['indian', 'snack', 'vegetarian'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Crispy Vegetable Spring Rolls',
			description:
				'Light and crunchy appetizers filled with stir-fried vegetables.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.springRollWrappers.getAmount(8),
				Ingredient.carrot.getAmount(1),
				Ingredient.beansprouts.getAmount(100, 'g'),
				Ingredient.soySauce.getAmount(1, 'tbsp'),
				Ingredient.freshGinger.getAmount(10, 'g'),
			],
			steps: [
				'Stir fry shredded carrots, ginger, and sprouts with soy sauce.',
				'Place filling on wrappers, roll tightly, and seal with a little water.',
				'Deep fry or brush with oil and bake until crispy.',
			],
			tags: ['chinese', 'appetizer', 'vegetarian'],
		},
		{
			id: IDManger.getNextId(),
			name: "Millionaire's Shortbread",
			description:
				'Three layers of heaven: shortbread, gooey caramel, and thick chocolate.',
			timeMinutes: 90,
			servings: 12,
			ingredients: [
				Ingredient.plainFlour.getAmount(250, 'g'),
				Ingredient.butter.getAmount(225, 'g'),
				Ingredient.casterSugar.getAmount(75, 'g'),
				Ingredient.goldenSyrup.getAmount(30, 'g'),
				Ingredient.darkChocolate.getAmount(200, 'g'),
			],
			steps: [
				'Rub 175g butter into flour and sugar; press into a tin and bake at 180°C for 20 mins.',
				'Boil remaining butter, syrup, and condensed milk (pantry) until thick and golden.',
				'Pour caramel over shortbread and let set.',
				'Melt chocolate and pour over the caramel. Chill until firm.',
			],
			tags: ['sweet', 'baking', 'classic'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Classic Italian Tiramisu',
			description:
				'A coffee-flavoured dessert with layers of sponge and mascarpone cream.',
			timeMinutes: 30,
			servings: 6,
			ingredients: [
				Ingredient.fingerBiscuits.getAmount(24),
				Ingredient.mascarpone.getAmount(500, 'g'),
				Ingredient.espresso.getAmount(300, 'ml'),
				Ingredient.largeEggs.getAmount(3),
				Ingredient.casterSugar.getAmount(100, 'g'),
			],
			steps: [
				'Whisk egg yolks and sugar until pale, then fold into mascarpone.',
				'Dip biscuits quickly in coffee and layer in a dish.',
				'Spread half the cream over biscuits; repeat layers.',
				'Dust with cocoa powder and chill for 4 hours.',
			],
			tags: ['italian', 'dessert', 'no-bake'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Classic Prawn Cocktail',
			description: 'A retro starter that never goes out of style.',
			timeMinutes: 15,
			servings: 4,
			ingredients: [
				Ingredient.cookedPrawns.getAmount(400, 'g'),
				Ingredient.icebergLettuce.getAmount(1),
				Ingredient.mayonaisse.getAmount(150, 'g'),
				Ingredient.smokedPaprika.getAmount(0.5, 'tsp'),
				Ingredient.lemonJuice.getAmount(1, 'tsp'),
			],
			steps: [
				'Shred the lettuce and place in the bottom of glasses.',
				'Mix mayo with a splash of ketchup (pantry), lemon juice, and paprika.',
				'Toss prawns in the sauce and spoon over lettuce.',
				'Top with a pinch of paprika and a lemon wedge.',
			],
			tags: ['starter', 'seafood', 'classic'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Chicken Paprikash',
			description:
				'A Hungarian classic of tender chicken in a smoky, creamy paprika sauce.',
			timeMinutes: 50,
			servings: 4,
			ingredients: [
				Ingredient.chickenThighs.getAmount(6),
				Ingredient.whiteOnion.getAmount(2),
				Ingredient.smokedPaprika.getAmount(2, 'tbsp'),
				Ingredient.chickenStock.getAmount(300, 'ml'),
				Ingredient.cremeFraiche.getAmount(150, 'g'),
			],
			steps: [
				'Brown chicken thighs and remove from pan.',
				"Sauté onions, then stir in paprika (don't burn it!).",
				'Add stock and return chicken; simmer for 30 minutes.',
				'Stir in crème fraîche at the end and serve with noodles or rice.',
			],
			tags: ['hungarian', 'chicken', 'smoky'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Spicy Chicken Jalfrezi',
			description:
				'A vibrant stir-fried curry with peppers, onions, and green chillies.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.chickenBreast.getAmount(3),
				Ingredient.redBellPepper.getAmount(1),
				Ingredient.dicedGreenBellPepper.getAmount(1),
				Ingredient.tomatoPassata.getAmount(200, 'ml'),
				Ingredient.garamMasala.getAmount(1, 'tsp'),
				Ingredient.turmeric.getAmount(1, 'tsp'),
			],
			steps: [
				'Fry chicken until sealed; remove from pan.',
				'Stir fry peppers and onions until slightly charred.',
				'Add spices, return chicken, and pour in passata.',
				'Cook on high heat for 10 minutes until sauce is thick and coating the meat.',
			],
			tags: ['indian', 'spicy', 'curry'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Soft Indian Naan Bread',
			description:
				'Home-made flatbreads, soft and bubbly, perfect for mopping up curry sauce.',
			timeMinutes: 90,
			servings: 4,
			ingredients: [
				Ingredient.strongBreadFlour.getAmount(250, 'g'),
				Ingredient.yeast.getAmount(7, 'g'),
				Ingredient.greekYogurt.getAmount(20, 'g'),
				Ingredient.butter.getAmount(20, 'g'),
			],
			steps: [
				'Mix flour, yeast, yogurt, and warm water into a dough; knead for 10 mins.',
				'Let rise for 1 hour.',
				'Divide into 4 and roll out thinly.',
				'Fry in a very hot, dry pan for 1-2 minutes each side until bubbly and charred.',
			],
			tags: ['indian', 'bread', 'side'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Crispy Onion Bhajis',
			description:
				'Spiced onion fritters, deep-fried until golden and crunchy.',
			timeMinutes: 30,
			servings: 4,
			ingredients: [
				Ingredient.whiteOnion.getAmount(2),
				Ingredient.plainFlour.getAmount(100, 'g'),
				Ingredient.turmeric.getAmount(1, 'tsp'),
				Ingredient.groundCumin.getAmount(1, 'tsp'),
				Ingredient.sunflowerOil.getAmount(500, 'ml'),
			],
			steps: [
				'Thinly slice onions and toss with spices and flour.',
				'Add just enough water to create a thick batter that coats the onions.',
				'Drop spoonfuls into hot oil and fry for 3-4 minutes until crisp.',
			],
			tags: ['indian', 'snack', 'fried'],
		},
		{
			id: IDManger.getNextId(),
			name: 'Margherita Pizza',
			description:
				'The simple classic: tomato, mozzarella, and fresh basil.',
			timeMinutes: 60,
			servings: 2,
			ingredients: [
				Ingredient.strongBreadFlour.getAmount(300, 'g'),
				Ingredient.yeast.getAmount(7, 'g'),
				Ingredient.tomatoPassata.getAmount(150, 'ml'),
				Ingredient.mozzarellaBall.getAmount(1),
				Ingredient.freshBasil.getAmount(5, 'g'),
			],
			steps: [
				'Make a dough with flour, yeast, and water; let rise.',
				'Roll out into two thin circles.',
				'Spread passata, top with torn mozzarella.',
				'Bake at the highest possible oven temp for 8-10 minutes.',
				'Top with fresh basil and a drizzle of olive oil.',
			],
			tags: ['italian', 'pizza', 'vegetarian'],
		},
	];

	searchQuery: string = '';
	basket: Record<number, number> = {};
	checked: Record<string, boolean> = {};
	sortMode: 'alphabetical' | 'quantity' | 'category' = 'alphabetical';

	constructor() {
		this.load();
		this.render();
		this.updateBasketCount();

		const searchBar = document.getElementById('search') as HTMLInputElement;
		if (searchBar) {
			searchBar.oninput = (e) => {
				this.searchQuery = (
					e.target as HTMLInputElement
				).value.toLowerCase();
				this.render();
			};
		}
	}

	save() {
		localStorage.setItem(
			'shopping-list',
			JSON.stringify({
				basket: this.basket,
				checked: this.checked,
				sortMode: this.sortMode,
			}),
		);
	}

	load() {
		const raw = localStorage.getItem('shopping-list');
		if (!raw) return;
		const data = JSON.parse(raw);
		this.basket = data.basket || {};
		this.checked = data.checked || {};
		this.sortMode = data.sortMode || 'alphabetical';
	}

	navigate(path: string) {
		location.hash = path;
	}

	render() {
		const route = location.hash.slice(1) || '/';
		const root = document.getElementById('app')!;
		if (!root) return;
		root.innerHTML = '';
		if (route === '/basket') return this.viewBasket(root);
		if (route.startsWith('/recipe/'))
			return this.viewRecipe(root, parseInt(route.split('/')[2]));
		this.viewHome(root);
	}

	addRecipe(id: number) {
		this.basket[id] = (this.basket[id] || 0) + 1;
		this.updateBasketCount();
		this.save();
		this.render();
	}

	incrementRecipe(id: number) {
		this.addRecipe(id);
	}

	decrementRecipe(id: number) {
		if (!this.basket[id]) return;
		this.basket[id]--;
		if (this.basket[id] <= 0) delete this.basket[id];
		this.updateBasketCount();
		this.save();
		this.render();
	}

	removeRecipe(id: number) {
		delete this.basket[id];
		this.updateBasketCount();
		this.save();
		this.render();
	}

	clearAll() {
		this.basket = {};
		this.checked = {};
		this.save();
		this.updateBasketCount();
		this.render();
	}

	toggleChecked(name: string) {
		this.checked[name] = !this.checked[name];
		this.save();
		this.render();
	}

	setSortMode(mode: string) {
		this.sortMode = mode as any;
		this.save();
		this.render();
	}

	formatUnit(amount: number, unit: Unit): string {
		if (unit === 'g' && amount >= 1000)
			return (amount / 1000).toFixed(1) + ' kg';
		if (unit === 'ml' && amount >= 1000)
			return (amount / 1000).toFixed(1) + ' l';

		// If unit is purely discrete, omit the unit text entirely
		if (['each', 'pc', 'each', 'each'].includes(unit)) {
			return amount.toString();
		}

		return `${amount.toFixed(1).replace(/\.0$/, '')} ${unit}`;
	}

	getAggregatedIngredients() {
		const map: Record<
			string,
			{ amount: number; unit: Unit; category: Category }
		> = {};
		Object.entries(this.basket).forEach(([idStr, count]) => {
			const recipe = this.recipes.find((r) => r.id === parseInt(idStr));
			if (!recipe) return;
			recipe.ingredients.forEach(({ ingredient, amount }) => {
				if (!map[ingredient.name]) {
					map[ingredient.name] = {
						amount: 0,
						unit: ingredient.unit,
						category: ingredient.category,
					};
				}
				map[ingredient.name].amount += amount * count;
			});
		});
		return map;
	}

	sortEntries(entries: [string, any][]) {
		if (this.sortMode === 'alphabetical')
			return entries.sort((a, b) => a[0].localeCompare(b[0]));
		if (this.sortMode === 'quantity')
			return entries.sort((a, b) => b[1].amount - a[1].amount);
		if (this.sortMode === 'category')
			return entries.sort((a, b) =>
				a[1].category.localeCompare(b[1].category),
			);
		return entries;
	}

	updateBasketCount() {
		const total = Object.values(this.basket).reduce((a, b) => a + b, 0);
		const el = document.getElementById('count');
		if (el) el.innerText = total.toString();
	}

	viewHome(root: HTMLElement) {
		root.innerHTML = '';

		const filtered = this.recipes.filter((r) => {
			if (!this.searchQuery) return true;

			const query = this.searchQuery.toLowerCase().trim();

			if (query.startsWith('#')) {
				const tag = query.slice(1);
				return r.tags.some((t) => t.toLowerCase().includes(tag));
			}

			if (query.startsWith('&')) {
				const ing = query.slice(1);
				return r.ingredients.some((i) =>
					i.ingredient.name.toLowerCase().includes(ing),
				);
			}

			return r.name.toLowerCase().includes(query);
		});

		const grid = document.createElement('div');
		grid.className = 'grid';

		if (filtered.length === 0) {
			root.innerHTML = `<p style="padding: 2rem; text-align: center; opacity: 0.5;">No recipes found for "${this.searchQuery}"</p>`;
			return;
		}

		filtered.forEach((recipe) => {
			const description =
				recipe.description.length > 100
					? recipe.description.substring(0, 100) + '...'
					: recipe.description;

			const tile = document.createElement('div');
			tile.className = 'tile';
			tile.innerHTML = `
                <div class="tile-header">
                    <h3>${recipe.name}</h3>
                    <div class="tags">
                        ${recipe.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <p class="description">${description}</p>
                <div class="metadata">
                    <span>${recipe.timeMinutes}m</span>
                    <span>Serves ${recipe.servings}</span>
                    <span>${recipe.steps.length} steps</span>
                </div>
                <button class="add-btn">Add to List</button>
            `;

			tile.onclick = () => this.navigate(`/recipe/${recipe.id}`);

			const addBtn = tile.querySelector('button');
			if (addBtn) {
				addBtn.onclick = (e) => {
					e.stopPropagation();
					this.addRecipe(recipe.id);
				};
			}

			grid.appendChild(tile);
		});

		root.appendChild(grid);
	}

	viewRecipe(root: HTMLElement, id: number) {
		const recipe = this.recipes.find((r) => r.id === id);
		if (!recipe) return;

		// Collect all allergens from ingredients
		const allergens = new Set<string>();
		recipe.ingredients.forEach((i) => {
			i.ingredient.allergens.forEach((a) => allergens.add(a));
		});

		root.innerHTML = `
            <div class="full">
				<div class="back-link" onclick="app.navigate('/')">← Back to Recipes</div>
                <h1>${recipe.name}</h1>
				
				<div class="full-meta">
					<div class="tags">
						${recipe.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
					</div>
					<div class="stats">
						<p>${recipe.timeMinutes} mins</p>
						<p>${recipe.servings} Servings</p>
						<p>${recipe.steps.length} Steps</p>
					</div>
				</div>

				${
					allergens.size > 0
						? `
					<div class="allergen-warning">
						<strong>Allergen Warning:</strong> This recipe contains ${Array.from(allergens).join(', ')}.
					</div>
				`
						: ''
				}

				<p class="full-description">${recipe.description}</p>

                <div class="recipe-grid">
					<div class="ingredients-section">
						<h2>Ingredients</h2>
						<ul class="ingredient-list">
							${recipe.ingredients.map((i) => `<li><strong>${this.formatUnit(i.amount, i.ingredient.unit)}</strong> ${i.ingredient.name}</li>`).join('')}
						</ul>
						<button class="primary-btn" onclick="app.addRecipe(${recipe.id})">Add to Shopping List</button>
					</div>

					<div class="steps-section">
						<h2>Method</h2>
						<ol class="step-list">
							${recipe.steps.map((step) => `<li>${step}</li>`).join('')}
						</ol>
					</div>
				</div>
            </div>
        `;
	}

	viewBasket(root: HTMLElement) {
		const container = document.createElement('div');
		container.className = 'full';

		const recipeListHtml =
			Object.entries(this.basket).length === 0
				? '<p class="dim-text">No recipes added.</p>'
				: Object.entries(this.basket)
						.map(([idStr, count]) => {
							const r = this.recipes.find(
								(rec) => rec.id === parseInt(idStr),
							);
							return r
								? `
					<div class="list">
						<span>${r.name} <strong>x${count}</strong></span>
						<div>
							<button onclick="app.decrementRecipe(${r.id})" class="inc-dec-button">-</button>
							<button onclick="app.incrementRecipe(${r.id})" class="inc-dec-button">+</button>
							<button onclick="app.removeRecipe(${r.id})" class="delete-button">Remove</button>
						</div>
					</div>`
								: '';
						})
						.join('');

		container.innerHTML = `
			<div class="back-link" onclick="app.navigate('/')">← Back to Recipes</div>
			<h1>Your Shopping List</h1>
			
			<div class="recipes">
				<div class="top-row">
					<h2>Selected Recipes</h2>
					<button onclick="app.clearAll()">Clear All</button>
				</div>
				${recipeListHtml}
			</div>

			<div class="basket-controls">
				<select onchange="app.setSortMode(this.value)">
					<option value="alphabetical" ${this.sortMode === 'alphabetical' ? 'selected' : ''}>Sort A-Z</option>
					<option value="quantity" ${this.sortMode === 'quantity' ? 'selected' : ''}>Sort by Quantity</option>
					<option value="category" ${this.sortMode === 'category' ? 'selected' : ''}>Sort by Category</option>
				</select>
			</div>
			<div id="items"></div>
		`;

		const itemsDiv = container.querySelector('#items')!;
		const aggregated = this.getAggregatedIngredients();

		if (Object.keys(aggregated).length === 0) {
			itemsDiv.innerHTML =
				'<p>Your list is empty. Add some recipes to get started!</p>';
		} else {
			const sorted = this.sortEntries(Object.entries(aggregated));

			sorted.forEach(([name, data]) => {
				const row = document.createElement('div');
				row.className = 'shopping-item';

				row.innerHTML = `
					<span class="item-name">
						${name}: ${this.formatUnit(data.amount, data.unit)}
					</span>
					<input type="checkbox" ${this.checked[name] ? 'checked' : ''}>
				`;
				itemsDiv.appendChild(row);
			});
		}
		root.appendChild(container);
	}
}

window.onload = () => {
	const app = new App();
	(window as any).app = app;
	window.onhashchange = () => app.render();
};
