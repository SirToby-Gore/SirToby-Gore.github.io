import { Recipes } from './recipes.js';
import { Category } from './types.js';
import { Unit } from './types.js';
import { Ingredient } from './ingredient.js';

export class App {
	recipes = Recipes.getRecipes();

	looseItems: Record<
		string,
		{ amount: number; unit: Unit; category: Category }
	> = {};

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
				looseItems: this.looseItems,
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
		this.looseItems = data.looseItems || {};
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
		Object.entries(this.looseItems).forEach(([name, info]) => {
			if (!map[name]) {
				map[name] = {
					amount: 0,
					unit: info.unit,
					category: info.category,
				};
			}
			map[name].amount += info.amount;
		});
		return map;
	}

	addLooseItem(
		name: string,
		amount: number,
		unit: Unit = 'each',
		category: Category = 'general',
	) {
		if (!name || amount <= 0) return;
		const normalized = name.trim();
		Ingredient.createOrGet(normalized, unit, category);
		this.looseItems[normalized] = {
			amount: (this.looseItems[normalized]?.amount || 0) + amount,
			unit,
			category,
		};
		this.save();
		this.render();
	}

	removeLooseItem(name: string) {
		delete this.looseItems[name];
		this.save();
		this.render();
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

		const recipeListHtml = this.buildRecipeListHtml();

		container.innerHTML = `
        <div class="back-link" onclick="app.navigate('/')">← Back to Recipes</div>
        <h1>Your Shopping List</h1>

        <div class="recipes collapsible">
            <div class="top-row header-row">
                <h2>Selected Recipes</h2>
                <div>
                    <button onclick="app.clearAll()">Clear All</button>
                    <button class="collapse-toggle" data-target="recipes-list">Toggle</button>
                </div>
            </div>
            <div id="recipes-list" class="collapsible-body">
                ${recipeListHtml}
            </div>
        </div>

        <div class="loose collapsible">
            <div class="top-row header-row">
                <h2>Loose Items</h2>
                <div>
                    <button class="collapse-toggle" data-target="loose-list">Toggle</button>
                </div>
            </div>
            <div id="loose-list" class="collapsible-body"></div>
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

		this.attachCollapseHandlers(container);
		this.renderItemsSection(container);
		this.renderLooseList(container);

		root.appendChild(container);
	}

	private buildRecipeListHtml(): string {
		if (Object.entries(this.basket).length === 0)
			return '<p class="dim-text">No recipes added.</p>';
		return Object.entries(this.basket)
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
	}

	private renderItemsSection(container: HTMLElement) {
		const itemsDiv = container.querySelector('#items')!;
		const aggregated = this.getAggregatedIngredients();

		if (Object.keys(aggregated).length === 0) {
			const empty = document.createElement('p');
			empty.className = 'dim-text';
			empty.textContent =
				'Your list is empty. Add some recipes to get started!';
			itemsDiv.appendChild(empty);
			return;
		}

		const sorted = this.sortEntries(Object.entries(aggregated));
		sorted.forEach(([name, data]) => {
			const row = document.createElement('div');
			row.className = 'shopping-item';

			const label = document.createElement('span');
			label.className = 'item-name';
			label.textContent = `${name}: ${this.formatUnit(data.amount, data.unit)}`;

			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.checked = !!this.checked[name];
			checkbox.setAttribute('aria-label', `Mark ${name} as bought`);
			checkbox.onchange = () => {
				this.checked[name] = checkbox.checked;
				this.save();
				this.render();
			};

			row.appendChild(label);
			row.appendChild(checkbox);
			itemsDiv.appendChild(row);
		});
	}

	private renderLooseList(container: HTMLElement) {
		const looseListDiv = container.querySelector('#loose-list')!;
		looseListDiv.innerHTML = '';

		const formRow = document.createElement('div');
		formRow.className = 'add-loose-row';
		formRow.innerHTML = `
        <input id="loose-name-2" placeholder="Item name" />
        <input id="loose-amount-2" type="number" step="any" placeholder="Amount" />
        <select id="loose-unit-2">
            <option value="each">each</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
        </select>
        <select id="loose-category-2">
            <option value="general">general</option>
            <option value="produce">produce</option>
            <option value="dairy">dairy</option>
            <option value="bakery">bakery</option>
        </select>
        <button id="add-loose-2">Add</button>
    `;
		looseListDiv.appendChild(formRow);

		const addBtn = formRow.querySelector(
			'#add-loose-2',
		) as HTMLButtonElement;
		const nameInput = formRow.querySelector(
			'#loose-name-2',
		) as HTMLInputElement;
		const amountInput = formRow.querySelector(
			'#loose-amount-2',
		) as HTMLInputElement;
		const unitSelect = formRow.querySelector(
			'#loose-unit-2',
		) as HTMLSelectElement;
		const categorySelect = formRow.querySelector(
			'#loose-category-2',
		) as HTMLSelectElement;

		addBtn.onclick = () => {
			const name = nameInput.value.trim();
			const amount = parseFloat(amountInput.value) || 0;
			const unit = unitSelect.value as Unit;
			const category = categorySelect.value as Category;
			if (!name || amount <= 0) return;
			const aggregatedMap = this.getAggregatedIngredients();
			const existing = aggregatedMap[name];
			if (existing && !this.isUnitCompatible(existing.unit, unit)) {
				window.alert(
					`Unit "${unit}" is not compatible with existing unit "${existing.unit}" for "${name}".`,
				);
				return;
			}
			this.addLooseItem(name, amount, unit, category);
			nameInput.value = '';
			amountInput.value = '';
			this.render();
		};

		const looseEntries = Object.entries(this.looseItems || {});
		if (looseEntries.length === 0) {
			const p = document.createElement('p');
			p.className = 'dim-text';
			p.textContent = 'No loose items added.';
			looseListDiv.appendChild(p);
			return;
		}

		looseEntries.forEach(([name, info]) => {
			const r = document.createElement('div');
			r.className = 'list';

			const span = document.createElement('span');
			span.innerHTML = `${name} <strong>x${this.formatUnit(info.amount, info.unit)}</strong>`;

			const controls = document.createElement('div');

			const dec = document.createElement('button');
			dec.className = 'inc-dec-button';
			dec.textContent = '-';
			dec.onclick = (e) => {
				e.stopPropagation();
				this.looseItems[name].amount =
					Math.round((this.looseItems[name].amount - 1) * 100) / 100;
				if (this.looseItems[name].amount <= 0)
					delete this.looseItems[name];
				this.save();
				this.render();
			};

			const inc = document.createElement('button');
			inc.className = 'inc-dec-button';
			inc.textContent = '+';
			inc.onclick = (e) => {
				e.stopPropagation();
				this.looseItems[name].amount =
					Math.round((this.looseItems[name].amount + 1) * 100) / 100;
				this.save();
				this.render();
			};

			const removeBtn = document.createElement('button');
			removeBtn.className = 'delete-button';
			removeBtn.textContent = 'Remove';
			removeBtn.onclick = (e) => {
				e.stopPropagation();
				this.removeLooseItem(name);
			};

			controls.appendChild(dec);
			controls.appendChild(inc);
			controls.appendChild(removeBtn);

			r.appendChild(span);
			r.appendChild(controls);
			looseListDiv.appendChild(r);
		});
	}

	private attachCollapseHandlers(container: HTMLElement) {
		const toggles = Array.from(
			container.querySelectorAll('.collapse-toggle'),
		) as HTMLButtonElement[];
		toggles.forEach((btn) => {
			const targetId = btn.getAttribute('data-target') || '';
			const target = container.querySelector(
				`#${targetId}`,
			) as HTMLElement | null;
			if (!target) return;
			btn.onclick = () => {
				const isHidden =
					target.style.display === 'none' ||
					getComputedStyle(target).display === 'none';
				target.style.display = isHidden ? '' : 'none';
				btn.setAttribute('aria-expanded', String(isHidden));
			};
		});
	}

	private isUnitCompatible(existing: Unit, incoming: Unit): boolean {
		if (existing === incoming) return true;
		const mass = ['g', 'kg'];
		const volume = ['ml', 'l'];
		const each = ['each', 'pc'];
		if (mass.includes(existing) && mass.includes(incoming)) return true;
		if (volume.includes(existing) && volume.includes(incoming)) return true;
		if (each.includes(existing) && each.includes(incoming)) return true;
		return false;
	}

	private removeAggregatedItem(name: string) {
		if (this.looseItems && this.looseItems[name]) {
			delete this.looseItems[name];
			this.save();
			this.render();
			return;
		}
		const recipeIds = Object.keys(this.basket);
		for (const idStr of recipeIds) {
			const recipe = this.recipes.find((r) => r.id === parseInt(idStr));
			if (!recipe) continue;
			const uses = recipe.ingredients.some(
				(ing) => ing.ingredient.name === name,
			);
			if (uses) {
				delete this.basket[parseInt(idStr)];
			}
		}
		this.save();
		this.render();
	}
}
