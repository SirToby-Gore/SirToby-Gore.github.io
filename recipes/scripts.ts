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
	| 'tbsp'
	| 'clove'
	| 'sheet';

type Category =
	| 'produce'
	| 'meat'
	| 'dairy'
	| 'pantry'
	| 'frozen'
	| 'bakery'
	| 'spices'
	| 'japanese'
	| 'general';

class Ingredient {
	constructor(
		public name: string,
		public unit: Unit = 'each',
		public category: Category = 'general',
		public allergens = [],
		public amount: number = 0,
	) {}

	getAmount(amount: number) {
		return {
			ingredient: this,
			amount: amount,
		};
	}

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
	static garlicCloves = new Ingredient('Garlic Cloves', 'clove', 'produce');
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
	static lemonJuice = new Ingredient('Lemon Juice', 'tbsp', 'produce');
	static desertApple = new Ingredient('Desert Apple', 'each', 'produce');

	static freshMint = new Ingredient('Fresh Mint', 'g', 'produce');
	static freshBasil = new Ingredient('Fresh Basil', 'g', 'produce');

	static plainFlour = new Ingredient('Plain Flour', 'g', 'pantry');
	static casterSugar = new Ingredient('Caster Sugar', 'g', 'pantry');
	static tomatoPuree = new Ingredient('Tomato Puree', 'tbsp', 'pantry');
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
	static vegetableOil = new Ingredient('Vegetable Oil', 'tbsp', 'pantry');
	static sunflowerOil = new Ingredient('Sunflower Oil', 'tbsp', 'pantry');
	static oliveOil = new Ingredient('Olive Oil', 'tbsp', 'pantry');
	static breadcrumbs = new Ingredient('Breadcrumbs', 'g', 'pantry');
	static cranberrySauce = new Ingredient('Cranberry Sauce', 'tbsp', 'pantry');
	static pesto = new Ingredient('Pesto', 'tbsp', 'pantry');
	static soySauce = new Ingredient('Soy Sauce', 'tbsp', 'pantry');
	static fishSauce = new Ingredient('Fish Sauce', 'tbsp', 'pantry');
	static tinnedPeaches = new Ingredient('Tinned Peaches', 'each', 'pantry');

	static frozenPeas = new Ingredient('Frozen Peas', 'g', 'frozen');
	static chips = new Ingredient('Frozen Chips', 'g', 'frozen');

	static porkSausages = new Ingredient('Pork Sausages', 'each', 'meat');
	static turkeyBreast = new Ingredient('Turkey Breast', 'g', 'meat');
	static mincedBeef = new Ingredient('Minced Beef', 'g', 'meat');
	static chickenThighs = new Ingredient('Chicken Thighs', 'each', 'meat');
	static chickenBreast = new Ingredient('Chicken Breast', 'each', 'meat');
	static baconRashers = new Ingredient('Bacon Rashers', 'each', 'meat');
	static chorizoSausage = new Ingredient('Chorizo Sausage', 'g', 'meat');
	static rawPrawns = new Ingredient('Raw Prawns', 'g', 'meat');
	static porkMince = new Ingredient('Pork Mince', 'g', 'meat');

	static largeEggs = new Ingredient('Large Eggs', 'each', 'dairy');
	static butter = new Ingredient('Butter', 'g', 'dairy');
	static cremeFraiche = new Ingredient('Crème Fraîche', 'g', 'dairy');
	static doubleCream = new Ingredient('Double Cream', 'ml', 'dairy');
	static wholeMilk = new Ingredient('Whole Milk', 'ml', 'dairy');
	static greekYogurt = new Ingredient('Greek Yogurt', 'g', 'dairy');
	static cheddarCheese = new Ingredient('Cheddar Cheese', 'g', 'dairy');
	static brie = new Ingredient('Brie Cheese', 'g', 'dairy');
	static mozzarellaBall = new Ingredient('Mozzarella Ball', 'each', 'dairy');
	static parmesanCheese = new Ingredient('Parmesan Cheese', 'g', 'dairy');

	static gnocchi = new Ingredient('Gnocchi', 'g', 'pantry');
	static paellaRice = new Ingredient('Paella Rice', 'g', 'pantry');
	static penne = new Ingredient('Penne', 'g', 'pantry');
	static lasagneSheets = new Ingredient('Lasagne Sheets', 'each', 'pantry');

	static pitaBread = new Ingredient('Pita Bread', 'each', 'bakery');
	static burgerBuns = new Ingredient('Burger Buns', 'each', 'bakery');
	static whiteBread = new Ingredient('White Bread', 'each', 'bakery');

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
	static casterSugarBasics = new Ingredient('Caster Sugar', 'tsp', 'spices');

	static noriSheets = new Ingredient('Nori Sheets', 'sheet', 'japanese');
}

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

class App {
	recipes: Recipe[] = [
		{
			id: 1,
			name: 'Toad in the hole',
			description:
				'Classic British sausages in Yorkshire pudding batter.',
			timeMinutes: 40,
			servings: 4,
			ingredients: [
				Ingredient.porkSausages.getAmount(8),
				Ingredient.plainFlour.getAmount(110),
				Ingredient.largeEggs.getAmount(3),
				Ingredient.vegetableOil.getAmount(5),
				Ingredient.seaSalt.getAmount(2),
				Ingredient.groundBlackPepper.getAmount(2),
				Ingredient.fennelSeed.getAmount(1),
				Ingredient.wholeMilk.getAmount(300),
			],
			steps: [
				'Sieve flour into a bowl and make a well in the center',
				'Mix eggs into the flour',
				'Add milk gradually and mix',
				'Add salt, pepper, and fennel seeds',
				'Rest batter for ~3 hours',
				'Bake sausages at 180°C for 15 min',
				'Add oil and heat again for 5 min',
				'Pour batter over sausages',
				'Bake 20 min until risen and golden',
			],
			tags: ['dinner', 'british', 'simple', 'one pot meal', 'winter'],
		},
		{
			id: 2,
			name: 'Turkey with peaches',
			description:
				'A sweet and savoury dish featuring tender turkey and juicy peaches.',
			timeMinutes: 30,
			servings: 3,
			ingredients: [
				Ingredient.turkeyBreast.getAmount(500),
				Ingredient.cremeFraiche.getAmount(300),
				Ingredient.chickenStock.getAmount(300),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.plainFlour.getAmount(50),
				Ingredient.groundNutmeg.getAmount(2),
				Ingredient.seaSalt.getAmount(2),
				Ingredient.groundBlackPepper.getAmount(2),
				Ingredient.tinnedPeaches.getAmount(1),
				Ingredient.vegetableOil.getAmount(1),
			],
			steps: [
				'Season flour with salt, pepper, nutmeg',
				'Coat turkey in flour',
				'Fry until golden',
				'Remove and set aside',
				'Fry onion, then garlic',
				'Add remaining flour',
				'Slowly add stock',
				'Stir in crème fraîche and peaches',
				'Return turkey and simmer 5–10 min',
			],
			tags: ['dinner', 'sweet & savoury', 'turkey'],
		},
		{
			id: 3,
			name: 'Chili con carne',
			description: 'A hearty beef chili.',
			timeMinutes: 80,
			servings: 6,
			ingredients: [
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.celery.getAmount(2),
				Ingredient.redBellPepper.getAmount(1),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.chilliPowder.getAmount(0.5),
				Ingredient.groundCumin.getAmount(0.5),
				Ingredient.smokedPaprika.getAmount(1),
				Ingredient.mincedBeef.getAmount(500),
				Ingredient.beefStock.getAmount(500),
				Ingredient.choppedTomatoes.getAmount(1),
				Ingredient.driedOregano.getAmount(1),
				Ingredient.casterSugar.getAmount(1),
				Ingredient.tomatoPuree.getAmount(2),
				Ingredient.redKidneyBeans.getAmount(1),
			],
			steps: [
				'Cook onions until translucent',
				'Add pepper and celery',
				'Add garlic',
				'Add spices',
				'Brown mince',
				'Simmer with stock and tomatoes',
				'Add sugar',
				'Add beans and simmer further',
			],
			tags: ['dinner', 'comforting', 'mexican'],
		},
		{
			id: 4,
			name: 'Butter chicken',
			description: 'Rich, creamy Indian classic',
			timeMinutes: 60,
			servings: 4,
			ingredients: [
				Ingredient.chickenThighs.getAmount(4),
				Ingredient.cardamomPods.getAmount(6),
				Ingredient.lemonJuice.getAmount(1),
				Ingredient.sunflowerOil.getAmount(1),
				Ingredient.garamMasala.getAmount(1),
				Ingredient.groundCumin.getAmount(0.5),
				Ingredient.groundCoriander.getAmount(0.5),
				Ingredient.smokedPaprika.getAmount(0.5),
				Ingredient.butter.getAmount(50),
				Ingredient.garlicCloves.getAmount(3),
				Ingredient.freshGinger.getAmount(20),
				Ingredient.tomatoPassata.getAmount(400),
				Ingredient.doubleCream.getAmount(100),
			],
			steps: [
				'Marinate chicken',
				'Cook until charred',
				'Fry aromatics in butter',
				'Add passata and spices',
				'Simmer',
				'Add cream and chicken',
				'Finish simmering',
			],
			tags: ['indian', 'curry', 'dinner', 'classic'],
		},
		{
			id: 5,
			name: 'Sausage leek gnocchi',
			description: 'Quick creamy one-pot gnocchi.',
			timeMinutes: 50,
			servings: 3,
			ingredients: [
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.garlicCloves.getAmount(2),
				Ingredient.porkSausages.getAmount(8),
				Ingredient.leeks.getAmount(1),
				Ingredient.gnocchi.getAmount(400),
				Ingredient.vegetableStock.getAmount(300),
				Ingredient.cremeFraiche.getAmount(300),
				Ingredient.tomato.getAmount(3),
				Ingredient.seaSalt.getAmount(1),
				Ingredient.groundBlackPepper.getAmount(1),
				Ingredient.parmesanCheese.getAmount(50),
			],
			steps: [
				'Sweat leeks',
				'Add onion and garlic',
				'Add stock and gnocchi',
				'Simmer',
				'Stir in crème fraîche and cheese',
			],
			tags: ['italian', 'pasta', 'one pot dish', 'dinner'],
		},
		{
			id: 6,
			name: 'Chicken gyros',
			description: 'Greek street food at home.',
			timeMinutes: 90,
			servings: 4,
			ingredients: [
				Ingredient.greekYogurt.getAmount(600),
				Ingredient.garlicCloves.getAmount(6),
				Ingredient.oliveOil.getAmount(8),
				Ingredient.lemonJuice.getAmount(6),
				Ingredient.groundCoriander.getAmount(1),
				Ingredient.driedOregano.getAmount(1),
				Ingredient.smokedPaprika.getAmount(1),
				Ingredient.groundCinnamon.getAmount(1),
				Ingredient.cayennePepper.getAmount(0.25),
				Ingredient.chickenThighs.getAmount(8),
				Ingredient.seaSalt.getAmount(1),
				Ingredient.groundBlackPepper.getAmount(1),
				Ingredient.pitaBread.getAmount(4),
				Ingredient.freshMint.getAmount(2),
				Ingredient.redOnion.getAmount(1),
				Ingredient.wholeLemon.getAmount(1),
				Ingredient.chips.getAmount(200),
			],
			steps: [
				'Marinate chicken',
				'Roast on skewers',
				'Cook chips',
				'Make tzatziki',
				'Prepare salad',
				'Assemble gyros',
			],
			tags: ['dinner', 'greek', 'mediterranean', 'national dish'],
		},
		{
			id: 7,
			name: 'Pasta bacon broccoli',
			description: 'Quick creamy pasta',
			timeMinutes: 30,
			servings: 4,
			ingredients: [
				Ingredient.penne.getAmount(300),
				Ingredient.baconRashers.getAmount(4),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.floretBroccoli.getAmount(0.5),
				Ingredient.cremeFraiche.getAmount(300),
				Ingredient.seaSalt.getAmount(0.5),
				Ingredient.groundBlackPepper.getAmount(0.5),
			],
			steps: [
				'Boil pasta',
				'Steam broccoli',
				'Fry bacon',
				'Add onion',
				'Mix everything with crème fraîche',
				'Season',
			],
			tags: ['dinner', 'italian', 'pasta'],
		},
		{
			id: 8,
			name: 'Seafood and chicken paella',
			description: 'Vibrant Spanish rice dish.',
			timeMinutes: 45,
			servings: 4,
			ingredients: [
				Ingredient.chickenThighs.getAmount(4),
				Ingredient.chorizoSausage.getAmount(150),
				Ingredient.rawPrawns.getAmount(300),
				Ingredient.paellaRice.getAmount(300),
				Ingredient.chickenStock.getAmount(700),
				Ingredient.saffron.getAmount(1),
				Ingredient.whiteOnion.getAmount(1),
				Ingredient.redBellPepper.getAmount(1),
				Ingredient.frozenPeas.getAmount(100),
			],
			steps: [
				'Fry meat',
				'Sauté vegetables',
				'Add rice and saffron',
				'Add stock',
				'Add seafood',
				'Finish cooking',
			],
			tags: ['spanish', 'seafood', 'chicken', 'dinner'],
		},
		{
			id: 9,
			name: 'Pork and apple burgers',
			description: 'Juicy burgers with a sweet twist.',
			timeMinutes: 15,
			servings: 4,
			ingredients: [
				Ingredient.porkMince.getAmount(500),
				Ingredient.desertApple.getAmount(1),
				Ingredient.whiteOnion.getAmount(0.5),
				Ingredient.breadcrumbs.getAmount(50),
				Ingredient.largeEggs.getAmount(1),
				Ingredient.burgerBuns.getAmount(4),
			],
			steps: [
				'Mix ingredients',
				'Shape patties',
				'Cook burgers',
				'Serve in buns',
			],
			tags: ['burger', 'pork', 'simple', 'dinner'],
		},
		{
			id: 10,
			name: 'Veggie lasagne',
			description: 'Comforting meat-free lasagne.',
			timeMinutes: 45,
			servings: 4,
			ingredients: [
				Ingredient.lasagneSheets.getAmount(12),
				Ingredient.aubergine.getAmount(1),
				Ingredient.courgette.getAmount(2),
				Ingredient.tomatoPassata.getAmount(500),
				Ingredient.cheddarCheese.getAmount(250),
				Ingredient.wholeMilk.getAmount(1000),
				Ingredient.plainFlour.getAmount(25),
				Ingredient.butter.getAmount(30),
				Ingredient.spinach.getAmount(200),
			],
			steps: ['Roast veg', 'Make sauce', 'Layer lasagne', 'Bake'],
			tags: ['vegetarian', 'italian', 'pasta', 'dinner'],
		},
		{
			id: 11,
			name: 'Katsu chicken',
			description: 'Crispy chicken with curry sauce',
			timeMinutes: 20,
			servings: 2,
			ingredients: [
				Ingredient.chickenBreast.getAmount(2),
				Ingredient.plainFlour.getAmount(50),
				Ingredient.largeEggs.getAmount(1),
				Ingredient.breadcrumbs.getAmount(100),
				Ingredient.whiteOnion.getAmount(2),
				Ingredient.mildCurryPowder.getAmount(3),
				Ingredient.chickenStock.getAmount(500),
				Ingredient.soySauce.getAmount(2),
				Ingredient.carrot.getAmount(2),
				Ingredient.groundBlackPepper.getAmount(2),
				Ingredient.seaSalt.getAmount(2),
			],
			steps: [
				'Bread chicken',
				'Fry until golden',
				'Make curry sauce',
				'Serve',
			],
			tags: ['japanese', 'chicken', 'curry', 'dinner'],
		},
		{
			id: 12,
			name: 'Tomato mozzarella toastie',
			description: 'Classic cheesy toastie.',
			timeMinutes: 10,
			servings: 1,
			ingredients: [
				Ingredient.whiteBread.getAmount(2),
				Ingredient.butter.getAmount(10),
				Ingredient.tomato.getAmount(1),
				Ingredient.mozzarellaBall.getAmount(1),
				Ingredient.pesto.getAmount(4),
				Ingredient.seaSalt.getAmount(1),
				Ingredient.groundBlackPepper.getAmount(1),
			],
			steps: ['Butter bread', 'Assemble sandwich', 'Toast'],
			tags: ['lunch', 'snack', 'vegetarian'],
		},
		{
			id: 13,
			name: 'Brie + cranberry + spinach + bacon jacket potatoes',
			description: 'Gourmet stuffed potatoes.',
			timeMinutes: 60,
			servings: 2,
			ingredients: [
				Ingredient.largePotatoes.getAmount(2),
				Ingredient.brie.getAmount(100),
				Ingredient.cranberrySauce.getAmount(2),
				Ingredient.spinach.getAmount(50),
				Ingredient.baconRashers.getAmount(4),
			],
			steps: [
				'Bake potatoes',
				'Fry bacon',
				'Wilt spinach',
				'Stuff potatoes',
				'Melt cheese',
			],
			tags: ['dinner', 'lunch', 'potato'],
		},
	];

	basket: Record<number, number> = {};
	checked: Record<string, boolean> = {};
	looseItems: { ingredient: Ingredient; amount: number }[] = [];
	sortMode: 'alphabetical' | 'quantity' | 'category' = 'alphabetical';

	constructor() {
		this.load();
		this.router();
		this.bindSearch();
		this.updateBasketCount();
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

	router() {
		window.onhashchange = () => this.render();
		this.render();
	}

	render() {
		const route = location.hash.slice(1) || '/';
		const root = document.getElementById('app')!;
		root.innerHTML = '';
		if (route === '/basket') return this.viewBasket(root);
		if (route.startsWith('/recipe/'))
			return this.viewRecipe(root, parseInt(route.split('/')[2]));
		this.viewHome(root);
	}

	bindSearch() {
		const input = document.getElementById(
			'search',
		) as HTMLInputElement | null;
		if (!input) return;
		input.oninput = () =>
			this.viewHome(document.getElementById('app')!, input.value);
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
		return `${amount} ${unit}`;
	}

	getAggregatedIngredients() {
		const map: Record<
			string,
			{ amount: number; unit: Unit; category: Category }
		> = {};
		Object.entries(this.basket).forEach(([idStr, count]) => {
			const id = parseInt(idStr);
			const recipe = this.recipes.find((r) => r.id === id);
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

	viewHome(root: HTMLElement, query = '') {
		const recipes = this.recipes.filter((r) =>
			r.name.toLowerCase().includes(query.toLowerCase()),
		);
		const grid = document.createElement('div');
		grid.className = 'grid';

		recipes.forEach((recipe) => {
			const tile = document.createElement('div');
			tile.className = 'tile';
			tile.innerHTML = `
        <h3>${recipe.name}</h3>
        <p class="desc">${recipe.description}</p>
        <div class="tile-meta">
          <span>${recipe.timeMinutes}m</span>
          <button class="add-btn">Add</button>
        </div>
      `;
			tile.onclick = () => this.navigate(`/recipe/${recipe.id}`);
			const btn = tile.querySelector('.add-btn') as HTMLElement;
			btn.onclick = (e) => {
				e.stopPropagation();
				this.addRecipe(recipe.id);
			};
			grid.appendChild(tile);
		});
		root.appendChild(grid);
	}

	viewRecipe(root: HTMLElement, id: number) {
		const recipe = this.recipes.find((r) => r.id === id);
		if (!recipe) return;
		root.innerHTML = `
      <div class="full">
        <button class="back-link" onclick="app.navigate('/')">← Back</button>
        <h1>${recipe.name}</h1>
        <p class="recipe-desc">${recipe.description}</p>
        <button class="primary-btn" onclick="app.addRecipe(${recipe.id})">Add to List</button>
        <h2>Ingredients</h2>
        <ul>${recipe.ingredients.map((i) => `<li>${i.ingredient.name} (${this.formatUnit(i.amount, i.ingredient.unit)})</li>`).join('')}</ul>
        <h2>Method</h2>
        <ol>${recipe.steps.map((s) => `<li>${s}</li>`).join('')}</ol>
      </div>
    `;
	}

	viewBasket(root: HTMLElement) {
		const container = document.createElement('div');
		container.className = 'full';
		container.innerHTML = `
      <h1>Shopping List</h1>
      <div class="controls">
        <select onchange="app.setSortMode(this.value)">
          <option value="alphabetical" ${this.sortMode === 'alphabetical' ? 'selected' : ''}>A-Z</option>
          <option value="quantity" ${this.sortMode === 'quantity' ? 'selected' : ''}>Quantity</option>
          <option value="category" ${this.sortMode === 'category' ? 'selected' : ''}>Category</option>
        </select>
        <button class="clear-btn" onclick="app.clearAll()">Clear All</button>
      </div>
      <div class="basket-recipes-list">
        ${Object.entries(this.basket)
			.map(([idStr, count]) => {
				const r = this.recipes.find(
					(rec) => rec.id === parseInt(idStr),
				);
				return r
					? `<div class="basket-recipe-row">
            <span class="recipe-name">${r.name} x${count}</span>
            <div class="qty-btns">
              <button onclick="app.decrementRecipe(${r.id})">-</button>
              <button onclick="app.incrementRecipe(${r.id})">+</button>
              <button class="remove-btn" onclick="app.removeRecipe(${r.id})">×</button>
            </div>
          </div>`
					: '';
			})
			.join('')}
      </div>
      <div id="shopping-items"></div>
    `;
		const itemsDiv = container.querySelector('#shopping-items')!;
		const aggregated = this.getAggregatedIngredients();
		const sorted = this.sortEntries(Object.entries(aggregated));
		sorted.forEach(([name, data]) => {
			const itemRow = document.createElement('div');
			itemRow.className = `shopping-item ${this.checked[name] ? 'checked' : ''}`;
			itemRow.innerHTML = `
        <div class="item-info" onclick="app.toggleChecked('${name}')">
          <div class="item-name">${name}</div>
          <div class="item-meta">${this.formatUnit(data.amount, data.unit)} • ${data.category}</div>
        </div>
        <input type="checkbox" ${this.checked[name] ? 'checked' : ''}>
      `;
			const checkbox = itemRow.querySelector('input')!;
			checkbox.onchange = () => this.toggleChecked(name);
			itemsDiv.appendChild(itemRow);
		});
		root.appendChild(container);
	}
}
const app = new App();
(window as any).app = app;
