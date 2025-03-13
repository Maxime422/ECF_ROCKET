'use strict';

/************** Dark Mode / Light Mode **************/
document.querySelector(`#darkLightMode`).addEventListener(`click`, () => {
	const mode = document.querySelector(`#mode`);

	const linkMode = mode.getAttribute(`href`);
	const pathPrefix = linkMode.substring(0, linkMode.indexOf('CSS/'));

	const light = `${pathPrefix}CSS/light-mode.css`;
	const dark = `${pathPrefix}CSS/dark-mode.css`;

	if (mode.getAttribute(`href`) === `${light}`) {
		mode.setAttribute(`href`, `${dark}`);
	} else if (mode.getAttribute(`href`) === `${dark}`) {
		mode.setAttribute(`href`, `${light}`);
	} else {
		console.log(`Erreur inattendue lors du changement de mode`);
	}
});

/************** Type Style Pokemon Object **************/
const pokemonTypes = {
	water: {
		color: '--color-eau',
		bgColor: '#DBDFFF',
		icon: '../IMG/ICONS/Icons-Pokemon-water.png',
	},
	normal: {
		color: '--color-normal',
		bgColor: '#C8CAC8',
		icon: '../IMG/ICONS/Icons-Pokemon-normal.png',
	},
	fire: {
		color: '--color-feu',
		bgColor: '#F5A1A6',
		icon: '../IMG/ICONS/Icons-Pokemon-fire.png',
	},
	grass: {
		color: '--color-plante',
		bgColor: '#6FF1A3',
		icon: '../IMG/ICONS/Icons-Pokemon-grass.png',
	},
	electric: {
		color: '--color-electric',
		bgColor: '#FFF35C',
		icon: '../IMG/ICONS/Icons-Pokemon-electric.png',
	},
	ice: {
		color: '--color-glace',
		bgColor: '#C3CCFA',
		icon: '../IMG/ICONS/Icons-Pokemon-ice.png',
	},
	fighting: {
		color: '--color-combat',
		bgColor: '#FFCD78',
		icon: '../IMG/ICONS/Icons-Pokemon-fighting.png',
	},
	poison: {
		color: '--color-poison',
		bgColor: '#C18CF0',
		icon: '../IMG/ICONS/Icons-Pokemon-poison.png',
	},
	ground: {
		color: '--color-sol',
		bgColor: '#C08A4B',
		icon: '../IMG/ICONS/Icons-Pokemon-ground.png',
	},
	flying: {
		color: '--color-vol',
		bgColor: '#DCE1FF',
		icon: '../IMG/ICONS/Icons-Pokemon-flying.png',
	},
	psychic: {
		color: '--color-psy',
		bgColor: '#FF94A8',
		icon: '../IMG/ICONS/Icons-Pokemon-psychic.png',
	},
	bug: {
		color: '--color-insecte',
		bgColor: '#B6C63F',
		icon: '../IMG/ICONS/Icons-Pokemon-bug.png',
	},
	rock: {
		color: '--color-roche',
		bgColor: '#D1CEA6',
		icon: '../IMG/ICONS/Icons-Pokemon-rock.png',
	},
	ghost: {
		color: '--color-spectre',
		bgColor: '#A07C9C',
		icon: '../IMG/ICONS/Icons-Pokemon-ghost.png',
	},
	dragon: {
		color: '--color-dragon',
		bgColor: '#9BA6F2',
		icon: '../IMG/ICONS/Icons-Pokemon-dragon.png',
	},
	dark: {
		color: '--color-tenebre',
		bgColor: '#8A7B79',
		icon: '../IMG/ICONS/Icons-Pokemon-dark.png',
	},
	steel: {
		color: '--color-acier',
		bgColor: '#A3C8D9',
		icon: '../IMG/ICONS/Icons-Pokemon-steel.png',
	},
	fairy: {
		color: '--color-fee',
		bgColor: '#FFB0FF',
		icon: '../IMG/ICONS/Icons-Pokemon-fairy.png',
	},
};

/************** Async Fetch **************/
async function getData(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error.message);
		return null;
	}
}

/************** Search Pokemon **************/
function TransformUrl(urlPokemon) {
	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${urlPokemon}`;
		const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${urlPokemon}`;
		return [url, urlSpecies];
	} catch (error) {
		console.error(error.message);
	}
}

/************** Get Pokemon Pokemon **************/
async function getPokemon(urlText) {
	console.log(urlText);
	const dataPokemon = await getData(urlText[0]);
	const dataSpecies = await getData(urlText[1]);
	if (dataPokemon && dataSpecies) {
		console.log(dataPokemon, dataSpecies);
		await updatePokemon(dataPokemon);
		await updateSpeciesPokemon(dataSpecies);
	}
}

/************** Get List Pokemon **************/
async function callListPokemon(data) {
	if (data) {
		const url = TransformUrl(data);

		const pokemon = await getData(url[0]);
		const species = await getData(url[1]);

		const pokemonElements = await updatePokemonGrid(pokemon);
		const SpeciesElements = await updateSpeciesPokemonGrid(species);
		createArticle([pokemonElements, SpeciesElements]);
	}
}
/************** Get Evolutions Pokemon **************/
async function pokemonEvolutions(url) {
	try {
		// Fetch de la chain du pokemon de l'url
		const dataSpecies = await getData(url);

		if (dataSpecies) {
			const pokemonName = dataSpecies.chain.species.name;
			let data = dataSpecies.chain;
			const evo = [];
			// Boucle qui vérifie les évolution du pokémon, si c'est le pokémon du fetch, alors on passe au suivant
			while (data.evolves_to.length > 0) {
				data = data.evolves_to[0];
				if (pokemonName !== data.species.name) {
					evo.push(data.species.name);
				}
			}
			if (evo.length === 0) {
				const div = document.querySelector('#gridPokemon');
				const alert = document.createElement('p');
				alert.textContent = 'Pas d’évolution pour ce Pokémon : Contacter le support Pokémon ;)';
				div.append(alert);
				return;
			} else {
				for (let i = 0; i < evo.length; i++) {
					callListPokemon(evo[i]);
				}
			}
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Species Pokemon **************/
async function updateSpeciesPokemon(url) {
	try {
		if (url) {
			if (document.querySelector('#evolutionBtn')) {
				await pokemonEvolutions(url.evolution_chain.url);
			}
			const name = document.querySelector('.PokemonName');
			name.textContent = getName(url);

			const description = document.querySelector('.description');
			description.textContent = getDescription(url);

			const gen = document.querySelector('.location');
			gen.textContent = getGeneration(url);

			const id = document.querySelector('.IdPokemon');
			id.textContent = getId(url);
		} else {
			console.error('Erreur lors dans les données species pokemon');
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Data Pokemon **************/
async function updatePokemon(url) {
	try {
		if (url) {
			const types = getType(url);
			const div = document.querySelector('#typesPokemons');
			div.innerHTML = '';
			if (types[1] !== undefined) {
				div.append(types[0], types[1]);
			} else {
				div.append(types[0]);
			}

			const typeRef = types[0].textContent;
			const bgColor = document.querySelector('.bgColor');

			bgColor.style.backgroundColor = `${pokemonTypes[typeRef].bgColor}`;

			const stats = statsPokemon(url);
			const statsContainer = document.querySelector('.statistiques');

			statsContainer.appendChild(stats);

			const talent = document.querySelector('.talentPokemon');
			talent.textContent = getTalent(url);

			const sprites = document.querySelector('#imgPokemon');
			sprites.alt = `Sprite du Pokémon ${url.name}`;
			sprites.src = getSprite(url);
			sprites.setAttribute('loading', `lazy`);
		} else {
			console.error('Aucune info en français trouvée');
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Data Pokemon Grid **************/
async function updatePokemonGrid(dataPokemon) {
	try {
		const img = document.createElement('img');
		img.src = getSprite(dataPokemon);
		img.alt = `Sprite du Pokémon ${dataPokemon.name}`;
		img.setAttribute('alt', `Pokemon de présentation ${dataPokemon.name}`);
		img.setAttribute('loading', `lazy`);

		// Récupère les types
		const types = getType(dataPokemon);
		const div = document.createElement(`div`);
		if (types[1] !== undefined) {
			div.append(types[0], types[1]);
		} else {
			div.append(types[0]);
		}

		const a = document.createElement(`a`);
		const currentPath = window.location.pathname;
		if (currentPath.includes('/HTML_PAGES/')) {
			a.href = `pokemon.html?p=${dataPokemon.name}`;
		} else {
			a.href = `./HTML_PAGES/pokemon.html?p=${dataPokemon.name}`;
		}
		a.textContent = 'voir plus';
		a.classList.add('cta');
		a.classList.add('primaryButton');

		div.classList.add('flexTypes');
		return [img, div, a];
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Species Pokemons Grids **************/
async function updateSpeciesPokemonGrid(dataSpecies) {
	try {
		const name = document.createElement(`h3`);
		name.classList.add('secondaryText', 'subText');
		name.textContent = getName(dataSpecies);

		const id = document.createElement('span');
		id.textContent = getId(dataSpecies);

		return [id, name];
	} catch (error) {
		console.error(error.message);
	}
}

/************** Create Articles **************/
function createArticle([pokemon, species]) {
	const article = document.createElement('article');
	article.classList.add('articlePokemon');

	const figure = document.createElement('figure');
	figure.append(pokemon[0]);

	const content = document.createElement('div');
	content.append(species[1]);

	content.append(pokemon[1]);
	content.append(species[0]);
	content.append(pokemon[2]);

	article.append(figure);
	article.append(content);

	const grid = document.querySelector('#gridPokemon');
	grid.append(article);
}

/************** Search Name Pokemon **************/
function getName(dataSpecies) {
	try {
		const frLang = dataSpecies.names.find((poke) => poke.language.name === 'fr');
		if (frLang !== undefined && frLang !== null) {
			return frLang.name;
		}
	} catch (error) {
		console.error(error.message);
		return 'pas de nom pour ce pokémon';
	}
}

/************** Search Description Pokemon Return **************/
function getDescription(dataSpecies) {
	try {
		const frLang = dataSpecies.flavor_text_entries.find((entry) => entry.language.name === 'fr');
		if (frLang !== undefined && frLang !== null) {
			return frLang.flavor_text;
		}
	} catch (error) {
		console.error(error.message);
		return 'pas de description pour ce pokémon';
	}
}

/************** Search Generation Pokemon Return **************/
function getGeneration(dataSpecies) {
	try {
		const generation = dataSpecies.generation.name;
		return generationTransform(generation);
	} catch (error) {
		console.error(error.message);
		return 'génération inconnue';
	}
}

/************** Transform Generation Pokemon To Text **************/
function generationTransform(generation) {
	switch (generation) {
		case 'generation-i':
			return 'Kanto';

		case 'generation-ii':
			return 'Johto';

		case 'generation-iii':
			return 'Hoenn';

		case 'generation-iv':
			return 'Sinnoh';

		case 'generation-v':
			return 'Unys';

		case 'generation-vi':
			return 'Kalos';

		case 'generation-vii':
			return 'Alola';

		case 'generation-viii':
			return 'Galar';

		case 'generation-ix':
			return 'Paldea';

		default:
			return 'Région inconnue';
	}
}

/************** Search ID Pokemon **************/
function getId(data) {
	try {
		return `${String(data.id)} du Pokédex`;
	} catch (error) {
		console.error(error.message);
		return 'numéro de pokédex inconnu';
	}
}

/************** Search Skills Pokemon **************/
function getTalent(dataPokemon) {
	try {
		const talent = dataPokemon.abilities[0].ability.name;
		return talent;
	} catch (error) {
		console.error(error.message);
		return 'talent inconnu';
	}
}

/************** Search Types Pokemon **************/
function getType(dataPokemon) {
	try {
		const styleType1 = document.createElement('div');

		styleType1.classList.add('typePokemon');

		const typePokemon1 = dataPokemon.types[0].type.name;

		// Création du premier type (si un seul type)
		const type1 = document.createElement('span');
		type1.textContent = typePokemon1;

		const icon1 = document.createElement('img');
		const currentPath = window.location.pathname;
		if (currentPath.includes('/HTML_PAGES/')) {
			icon1.src = pokemonTypes[typePokemon1].icon;
		} else {
			icon1.src = `./HTML_PAGES/${pokemonTypes[typePokemon1].icon}`;
		}

		const circle1 = document.createElement('div');
		circle1.append(icon1);
		styleType1.style.backgroundColor = `var(${pokemonTypes[typePokemon1].color})`;
		styleType1.append(circle1, type1);

		// Vérifie dans si il y a un second type
		if (dataPokemon.types.length > 1) {
			const styleType2 = document.createElement('div');
			styleType2.classList.add('typePokemon');

			const typePokemon2 = dataPokemon.types[1].type.name;

			const type2 = document.createElement('span');
			type2.textContent = typePokemon2;

			const icon2 = document.createElement('img');
			if (currentPath.includes('/HTML_PAGES/')) {
				icon1.src = pokemonTypes[typePokemon1].icon;
			} else {
				icon1.src = `./HTML_PAGES/${pokemonTypes[typePokemon2].icon}`;
			}
			const circle2 = document.createElement('div');
			circle2.append(icon2);
			styleType2.style.backgroundColor = `var(${pokemonTypes[typePokemon2].color})`;
			styleType2.append(circle2, type2);

			return [styleType1, styleType2];
		}

		return [styleType1];
	} catch (error) {
		console.error('Erreur dans getType :', error.message);
		return [];
	}
}

/************** Search Sprites Pokemon **************/
function getSprite(data) {
	const sprites = data.sprites.other['official-artwork'].front_default;
	return sprites;
}

/************** Create Stats Pokemon Return Div **************/
function statsPokemon(dataPokemon) {
	try {
		if (dataPokemon) {
			const statContainer = document.createElement(`div`);
			for (let i = 0; i < 6; i++) {
				const containData = document.createElement('span');
				const dataText = document.createElement('span');
				dataText.classList.add(`redText`);
				dataText.textContent = dataPokemon.stats[i].base_stat;
				containData.textContent = `${dataPokemon.stats[i].stat.name} : `;
				containData.appendChild(dataText);
				statContainer.appendChild(containData);
			}
			return statContainer;
		} else {
			const message = (document.createElement('span').textContent = 'pas de statistiques');
			return message;
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Form selection **************/
const form = document.querySelector('form');
if (form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const currentUrl = document.getElementById(`search`).value.toLowerCase();
		searchPokemon(currentUrl);
	});
}

/************** Event Listener Watch Pokemon **************/
const watchBtn = document.querySelector('#watchPokemon');
if (watchBtn) {
	watchBtn.addEventListener('click', () => {
		watchPokemon();
	});
}

/************** Function Move To Pokemon Page **************/
function watchPokemon() {
	let pokemon = document.querySelector(`.IdPokemon`).textContent;
	pokemon = pokemon.replace('du Pokédex', '');
	const currentUrl = window.location.pathname.toLowerCase();
	if (currentUrl.includes('html_pages')) {
		location.assign(`./pokemon.html?p=${pokemon}`);
	} else {
		location.assign(`./HTML_PAGES/pokemon.html?p=${pokemon}`);
	}
}

/************** Function Move To Pokemon Page **************/
async function searchPokemon(data) {
	try {
		const url = await getData(`https://pokeapi.co/api/v2/pokemon/${data}`);
		if (!url) {
			alert(`Aucun Pokémon existant pour ${data}`);
			return;
		}
	} catch (error) {
		alert(`Erreur lors de la récupération des données. ${error}`);
		return;
	}
	const currentUrl = window.location.pathname.toLowerCase();
	if (currentUrl.includes('html_pages')) {
		location.assign(`./pokemon.html?p=${data}`);
	} else {
		location.assign(`./HTML_PAGES/pokemon.html?p=${data}`);
	}
}

/************** LocalStorage Pokemon For Team **************/
function addPokemon() {
	const btn = document.querySelector('#addPokemonTeam');
	if (btn) {
		btn.addEventListener(`click`, () => {
			let pokemonID = document.querySelector('.IdPokemon').textContent;
			pokemonID = pokemonID.replace(' du Pokédex', '');

			const tailleMax = localStorage.length;
			const listPokemonLocal = [];

			for (let i = 0; i < tailleMax; i++) {
				listPokemonLocal.push(localStorage.key(i));

				if (tailleMax >= 6) {
					console.log('équipe déjà au maximum');
				} else if (localStorage.getItem(pokemonID)) {
					console.log('Pokémon déjà dans ton équipe');
					return;
				} else {
					localStorage.setItem(pokemonID, 'added');
					console.log(`Pokemon ${pokemonID} added to localStorage`);
				}
			}
		});
	}
}
addPokemon();

/************** Team Button **************/
const pokemon = document.querySelector('#teamButton');
if (pokemon) {
	pokemon.addEventListener(`click`, () => {
		if (window.localStorage.length === 0 || window.localStorage.length === null) {
			alert('pas encore de pokémon');
		} else {
			const currentPath = window.location.pathname;
			if (currentPath.includes('/HTML_PAGES/')) {
				location.assign('team-pokemon.html');
			} else {
				location.assign('./HTML_PAGES/team-pokemon.html');
			}
		}
	});
}

/************** Switch Evolution About Button **************/
const evolutionBtn = document.querySelector('#evolutionBtn');
const aboutBtn = document.querySelector('#aboutBtn');

const aboutSection = document.querySelector('#about');
const evolutionSection = document.querySelector('#evolution');

if (evolutionBtn && aboutBtn) {
	evolutionBtn.addEventListener(`click`, () => {
		if (aboutSection.classList !== 'hidden') {
			evolutionBtn.classList.add('redText');
			aboutSection.classList.add('hidden');

			evolutionSection.classList.remove('hidden');
			aboutBtn.classList.remove('redText');
		}
	});

	aboutBtn.addEventListener(`click`, () => {
		if (evolutionSection.classList !== 'hidden') {
			aboutBtn.classList.add('redText');
			evolutionSection.classList.add('hidden');

			aboutSection.classList.remove('hidden');
			evolutionBtn.classList.remove('redText');
		}
	});
}

/************** Export **************/
export {
	getData,
	getPokemon,
	TransformUrl,
	callListPokemon,
	updateSpeciesPokemon,
	updatePokemon,
	updatePokemonGrid,
	addPokemon,
	watchPokemon,
	searchPokemon,
	pokemonEvolutions,
	updateSpeciesPokemonGrid,
	createArticle,
};
