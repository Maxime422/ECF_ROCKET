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
const typeColors = {
	normal: 'colorBtnNormal',
	fighting: 'colorBtnCombat',
	flying: 'colorBtnVol',
	poison: 'colorBtnPoison',
	ground: 'colorBtnSol',
	rock: 'colorBtnRoche',
	bug: 'colorBtnInsecte',
	ghost: 'colorBtnSpectre',
	steel: 'colorBtnAcier',
	fire: 'colorBtnFeu',
	water: 'colorBtnEau',
	grass: 'colorBtnPlante',
	electric: 'colorBtnElectric',
	psychic: 'colorBtnPsy',
	ice: 'colorBtnGlace',
	dragon: 'colorBtnDragon',
	dark: 'colorBtnTenebre',
	fairy: 'colorBtnFee',
	stellar: 'colorBtnStar',
	unknown: 'colorBtnUnknown',
};

const typeIcons = {
	normal: '../IMG/ICONS/Icons-Pokemon-normal.png',
	fighting: '../IMG/ICONS/Icons-Pokemon-fighting.png',
	flying: '../IMG/ICONS/Icons-Pokemon-flying.png',
	poison: '../IMG/ICONS/Icons-Pokemon-poison.png',
	ground: '../IMG/ICONS/Icons-Pokemon-ground.png',
	rock: '../IMG/ICONS/Icons-Pokemon-rock.png',
	bug: '../IMG/ICONS/Icons-Pokemon-bug.png',
	ghost: '../IMG/ICONS/Icons-Pokemon-ghost.png',
	steel: '../IMG/ICONS/Icons-Pokemon-steel.png',
	fire: '../IMG/ICONS/Icons-Pokemon-fire.png',
	water: '../IMG/ICONS/Icons-Pokemon-water.png',
	grass: '../IMG/ICONS/Icons-Pokemon-grass.png',
	electric: '../IMG/ICONS/Icons-Pokemon-electric.png',
	psychic: '../IMG/ICONS/Icons-Pokemon-psychic.png',
	ice: '../IMG/ICONS/Icons-Pokemon-ice.png',
	dragon: '../IMG/ICONS/Icons-Pokemon-dragon.png',
	dark: '../IMG/ICONS/Icons-Pokemon-dark.png',
	fairy: '../IMG/ICONS/Icons-Pokemon-fairy.png',
	stellar: '../IMG/ICONS/',
	unknown: '../IMG/ICONS/',
};

/************** Async Fetch **************/
async function getData(urlFetch) {
	try {
		const response = await fetch(urlFetch);
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

/************** Call Data Pokemon Return Data **************/
async function Pokemon(url) {
	try {
		const dataPokemon = await getData(url);
		return dataPokemon;
	} catch (error) {
		console.error(error.message);
	}
}

/************** Call Species Pokemon Return Species **************/
async function PokemonSpecies(url) {
	try {
		const dataSpecies = await getData(url);
		return dataSpecies;
	} catch (error) {
		console.error(error.message);
	}
}
/************** Call Pokemon List Call Data Pokemon Grid and Data Species Grid **************/
async function gridPokemon(url, urlSpecies) {
	try {
		const dataSpeciesGrid = await getData(urlSpecies);
		const dataPokemonGrid = await getData(url);
		if (dataPokemonGrid && dataSpeciesGrid) {
			updatePokemonGrid(dataPokemonGrid);
			updateSpeciesPokemonGrid(dataSpeciesGrid);
		}
	} catch (error) {
		console.error(error.message);
	}
}

async function genPokemon(url) {
	try {
	  const dataPokemonGrid = await getData(url);
	  if (dataPokemonGrid) {

		updatePokemonGrid(dataPokemonGrid.pokemon_entries);
	  }
	} catch (error) {
	  console.error(error.message);
	}
  }
/************** Update Species Pokemon **************/
async function updateSpeciesPokemon(urlSpecies) {
	try {
		const dataSpecies = await PokemonSpecies(urlSpecies);
		if (dataSpecies !== undefined || dataSpecies !== null) {
			const name = document.querySelector('.PokemonName');
			name.textContent = getName(dataSpecies);

			const description = document.querySelector('.description');
			description.textContent = getDescription(dataSpecies);

			const gen = document.querySelector('.location');
			gen.textContent = getGeneration(dataSpecies);

			const id = document.querySelector('.IdPokemon');
			id.textContent = getId(dataSpecies);
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
		const dataPokemon = await Pokemon(url);
		if (dataPokemon !== undefined || dataPokemon !== null) {
			getType(dataPokemon);

			const styleType1 = document.createElement('div');
			const styleType2 = document.createElement('div');
			const type1 = document.createElement('span');
			const type2 = document.createElement('span');

			// get types
			const types = getType(dataPokemon);
			type1.textContent = types[0];
			type2.textContent = types[1];

			styleType1.classList.add(typeColors[types[0]]);

			const icon1 = document.createElement('img');
			const circle1 = document.createElement('div');
			icon1.src = typeIcons[types[0]];
			circle1.append(icon1);

			styleType1.append(circle1, type1);
			styleType1.classList.add('typePokemon');

			const div = document.querySelector('#typesPokemons');
			div.innerHTML = '';

			if (types[1]) {
				styleType2.classList.add(typeColors[types[1]]);
				styleType2.classList.add('typePokemon');

				const icon2 = document.createElement('img');
				const circle2 = document.createElement('div');
				icon2.src = typeIcons[types[1]];
				circle2.append(icon2);
				styleType2.append(circle2, type2);

				div.append(styleType1, styleType2);
			}
			div.append(styleType1);

			const stats = statsPokemon(dataPokemon);
			const statsContainer = document.querySelector('.statistiques');
			statsContainer.innerHTML = '';

			statsContainer.appendChild(stats);

			// get talents
			const talent = document.querySelector('.talentPokemon');
			talent.textContent = getTalent(dataPokemon);

			const sprites = document.querySelector('#imgPokemon');
			sprites.src = getSprite(dataPokemon);
		} else {
			console.error('Aucune info en français trouvée');
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Data Pokemon Grid **************/
async function updatePokemonGrid(dataPokemonGrid) {
	try {
		if (dataPokemonGrid) {
			const listPokemon = dataPokemonGrid.results;
			for (const pokemon of listPokemon) {
				const url = pokemon.url;
				const data = await Pokemon(url);

				const styleType2 = document.createElement('div');
				const styleType1 = document.createElement('div');

				const id = document.createElement('span');
				id.textContent = getId(data);

				const img = document.createElement('img');
				img.src = getSprite(data);

				// Types
				const types = getType(data);
				const type1 = document.createElement('span');
				type1.textContent = types[0];
				styleType1.classList.add(typeColors[types[0]]);

				const icon1 = document.createElement('img');
				const circle1 = document.createElement('div');
				icon1.src = typeIcons[types[0]];
				circle1.append(icon1);
				styleType1.classList.add('typePokemon');

				styleType1.append(circle1, type1);
				const speciesCompoment2 = [data.name];
				if (types[1]) {
					const type2 = document.createElement('span');
					type2.textContent = types[1];
					styleType2.classList.add(typeColors[types[1]]);
					styleType2.appendChild(type2);
					const icon2 = document.createElement('img');
					const circle2 = document.createElement('div');
					icon2.src = typeIcons[types[1]];
					circle2.append(icon2);
					styleType2.classList.add('typePokemon');

					styleType2.append(circle2, type2);
					const pokemonCompoment2 = [id, img, styleType1, styleType2];
					createArticle(pokemonCompoment2, speciesCompoment2);
				} else {
					const pokemonCompoment2 = [id, img, styleType1];
					createArticle(pokemonCompoment2, speciesCompoment2);
				}
			}
		} else {
			console.error('Aucune info en français trouvée');
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Species Pokemons Grids **************/
async function updateSpeciesPokemonGrid(dataSpeciesGrid) {
	try {
		if (dataSpeciesGrid) {
			const listPokemon = dataSpeciesGrid.results;
			for (const pokemon of listPokemon) {
				const url = pokemon.url;

				const dataSpecies = await Pokemon(url);

				const name = document.createElement(`h3`);
				name.textContent = getName(dataSpecies);

				const gen = document.querySelector('.location');
				gen.textContent = getGeneration(dataSpecies);
			}
		} else {
			console.error('Aucune info en français trouvée');
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Create Articles **************/
function createArticle(pokemonCompoment2, speciesCompoment2) {
	try {
		const article = document.createElement('article');
		article.classList.add('articlePokemon');

		const name = document.createElement('h3');
		name.textContent = speciesCompoment2[0];
		name.classList.add(`subText`);
		name.classList.add('secondaryText');

		const figure = document.createElement('figure');
		figure.classList.add(`articleFigurePokemon`);
		const img = pokemonCompoment2[1];
		img.setAttribute('alt', `Pokemon de présentation${name.textContent}`);
		figure.appendChild(img);

		const a = document.createElement(`a`);
		a.href = `./HTML_PAGES/pokemon.html?p=${name.textContent}`;
		a.textContent = 'voir plus';
		a.classList.add('cta');
		a.classList.add('primaryButton');

		const typesDiv = document.createElement('div');

		const typesDiv1 = document.createElement('div');
		typesDiv1.appendChild(pokemonCompoment2[2]);
		typesDiv1.classList.add('styleTypePokemon1');

		if (pokemonCompoment2[3] !== undefined && pokemonCompoment2[3] !== undefined) {
			const typesDiv2 = document.createElement('div');
			typesDiv2.appendChild(pokemonCompoment2[3]);
			typesDiv2.classList.add('styleTypePokemon2');
			typesDiv.append(typesDiv1, typesDiv2);
		} else {
			typesDiv.append(typesDiv1);
		}

		typesDiv.classList.add('flexTypes');

		const content = document.createElement('div');

		content.appendChild(name);

		content.appendChild(pokemonCompoment2[0]);
		content.appendChild(typesDiv);
		content.appendChild(a);

		article.appendChild(figure);
		article.appendChild(content);

		const grid = document.querySelector('#gridPokemon');
		grid.appendChild(article);
	} catch (error) {
		console.error(error.message);
	}
}

/************** Search Name Pokemon **************/
function getName(dataSpecies) {
	try {
		const frLang = dataSpecies.names.find((entry) => entry.language.name === 'fr');
		if (frLang !== undefined || frLang !== null) {
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
		if (frLang !== undefined || frLang !== null) {
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

/************** Search ID Pokemon **************/
function getId(data) {
	try {
		return `${String(data.id)} du Pokédex`;
	} catch (error) {
		console.error(error.message);
		return 'numéro de pokédex inconnu';
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

/************** Search Types Pokemon **************/
function getType(dataPokemon) {
	try {
		const typePokemon1 = dataPokemon.types[0].type.name;

		if (dataPokemon.types.length > 1) {
			const typePokemon2 = dataPokemon.types[1].type.name;
			return [typePokemon1, typePokemon2];
		} else {
			return [typePokemon1];
		}
	} catch (error) {
		console.error(error.message);
		return 'aucun type renseigné';
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

/************** Search Sprites Pokemon **************/
function getSprite(dataPokemon) {
	const sprites = dataPokemon.sprites.other['official-artwork'].front_default;
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
if (document.querySelector('form') === true) {
	document.querySelector(`form`).addEventListener(`submit`, (event) => {
		event.preventDefault();
		relocate();
	});
}

/************** Search Pokemon **************/
async function relocate(currentUrl) {
	try {
		const type1 = document.querySelector(`#typesPokemons`);
		type1.innerHTML = '';
		const url = `https://pokeapi.co/api/v2/pokemon/${currentUrl}`;
		const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${currentUrl}`;
		await updatePokemon(url);
		await updateSpeciesPokemon(urlSpecies);
	} catch (error) {
		console.error(error.message);
	}
}

/************** Event Listener Watch Pokemon **************/
if (document.querySelector('#watchPokemon') !== null && document.querySelector('#watchPokemon') !== undefined) {
	document.querySelector(`#watchPokemon`).addEventListener(`click`, () => {
		watchPokemon();
	});
}

/************** Function Move To Pokemon Page **************/
function watchPokemon() {
	let pokemon = document.querySelector(`.IdPokemon`).textContent;
	pokemon = pokemon.replace('du Pokédex', '');
	location.assign(`./HTML_PAGES/pokemon.html?p=${pokemon}`);
}

/************** Function Move To Pokemon Page **************/
function searchPokemon(id) {
	const currentUrl = window.location.pathname.toLowerCase();
	if (currentUrl.includes('html_pages')) {
		location.assign(`./pokemon.html?p=${id}`);
	} else {
		location.assign(`./HTML_PAGES/pokemon.html?p=${id}`);
	}
}

/************** LocalStorage Pokemon For Team **************/
function addPokemon() {
	const btn = document.querySelector('#addPokemonTeam');
	if (btn) {
		btn.addEventListener(`click`, () => {
			let pokemon = document.querySelector('.IdPokemon').textContent;
			pokemon = pokemon.replace(' du Pokédex', '');

			if (btn) {
				const count = localStorage.length;
				const listPokemonLocal = [];

				for (let i = 0; i < count; i++) {
					listPokemonLocal.push(localStorage.key(i));
				}
				console.log(listPokemonLocal);

				if (count >= 6) {
					console.log('équipe déjà au maximum');
				} else {
					let pokemonAlreadyAdded = false;

					for (let i = 0; i < listPokemonLocal.length; i++) {
						if (listPokemonLocal[i] === pokemon) {
							pokemonAlreadyAdded = true;
							console.log('pokemon déjà dans ton équipe');
							break;
						}
					}

					if (!pokemonAlreadyAdded) {
						localStorage.setItem(pokemon, 'added');
						console.log(`Pokemon ${pokemon} added to localStorage`);
					}
				}
			}
		});
	}
}
addPokemon();

document.querySelector('#teamButton').addEventListener(`click`, () => {
	if (window.localStorage.length === 0) {
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

/************** Export **************/
export {gridPokemon, Pokemon, updateSpeciesPokemon, updatePokemon, getData, updatePokemonGrid, updateSpeciesPokemonGrid, addPokemon, relocate, watchPokemon, searchPokemon, genPokemon};
