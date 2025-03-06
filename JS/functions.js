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

/************** Style Pokemon **************/
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
	}
}

/************** Call Data Pokemon **************/
async function Pokemon(url) {
	const urlPokemon = url;
	const dataPokemon = await getData(urlPokemon);
	return dataPokemon;
}

/************** Call Species Pokemon **************/
async function PokemonSpecies(url) {
	const urlSpecies = url;
	const dataSpecies = await getData(urlSpecies);
	return dataSpecies;
}

/************** Call pokemon List **************/
async function gridPokemon() {
	const dataSpeciesGrid = await getData(urlSpecies);
	const dataPokemonGrid = await getData(url);
	if (dataPokemonGrid && dataSpeciesGrid) {
		updatePokemonGrid(dataPokemonGrid);
		updateSpeciesPokemonGrid(dataSpeciesGrid);
	}
}

/************** Update Species Pokemon Main **************/
async function updateSpeciesPokemon(urlSpecies) {
	const dataSpecies = await PokemonSpecies(urlSpecies);
	if (dataSpecies != undefined || dataSpecies != null) {
		const name = document.querySelector('.PokemonName');
		name.textContent = getName(dataSpecies);

		const description = document.querySelector('.description');
		description.textContent = getDecription(dataSpecies);

		const gen = document.querySelector('.location');
		gen.textContent = getGeneration(dataSpecies);

		const id = document.querySelector('.IdPokemon');
		id.textContent = getId(dataSpecies);
	} else {
		console.error('Aucune entrée en français trouvée');
	}
}

/************** Update Data Pokemon Main **************/
async function updatePokemon(url) {
	const dataPokemon = await Pokemon(url);
	if (dataPokemon != undefined || dataPokemon != null) {
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

		styleType1.appendChild(type1);
		styleType1.classList.add('typePokemon');

		const div = document.querySelector('#typesPokemons');
		div.innerHTML = '';

		if (types[1]) {
			styleType2.classList.add(typeColors[types[1]]);
			styleType2.appendChild(type2);
			styleType2.classList.add('typePokemon');
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
		sprites.src = getSrpite(dataPokemon);
	} else {
		console.error('Aucune entrée en français trouvée');
	}
}

/************** Update Data Pokemon Grid **************/
async function updatePokemonGrid(dataPokemonGrid) {
	if (dataPokemonGrid) {
		const listPokemon = dataPokemonGrid.results;
		for (const pokemon of listPokemon) {
			const url = pokemon.url;
			const data = await Pokemon(url);

			const styleType2 = document.createElement('div');
			const styleType1 = document.createElement('div');

			const types = getType(data);
			const type1 = document.createElement('span');
			type1.textContent = types[0];
			styleType1.classList.add(typeColors[types[0]]);
			styleType1.classList.add('typePokemon');

			styleType1.appendChild(type1);
			if (types[1]) {
				const type2 = document.createElement('span');
				type2.textContent = types[1];
				styleType2.classList.add(typeColors[types[1]]);
				styleType2.appendChild(type2);
				styleType2.classList.add('typePokemon');
			}

			const id = document.createElement('span');
			id.textContent = getId(data);

			const img = document.createElement('img');
			img.src = getSrpite(data);

			const pokemonCompoment2 = [id, img, styleType1, styleType2];
			const speciesCompoment2 = [data.name];
			console.log(data.name);

			createArticle(pokemonCompoment2, speciesCompoment2);
		}
	} else {
		console.error('Aucune entrée en français trouvée');
	}
}

/************** Update Species Pokemon Grid **************/
async function updateSpeciesPokemonGrid(dataSpeciesGrid) {
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
		console.error('Aucune entrée en français trouvée');
	}
}

/************** Create Article **************/
function createArticle(pokemonCompoment2, speciesCompoment2) {
	const article = document.createElement('article');
	article.classList.add('articlePokemon');

	const name = document.createElement('h3');
	name.textContent = speciesCompoment2[0];
	name.classList.add(`subText`);
	name.classList.add('secondaryText');

	const figure = document.createElement('figure');
	figure.classList.add(`articleFigurePokemon`);
	const img = pokemonCompoment2[1];
	img.setAttribute('alt', `Pokemon de présentation${name}`);
	figure.appendChild(img);

	const a = document.createElement(`a`);
	a.href = `./HTML/pokemon.html?p=${name.textContent}`;
	a.textContent = 'voir plus';

	const typesDiv = document.createElement('div');

	const typesDiv1 = document.createElement('div');
	typesDiv1.appendChild(pokemonCompoment2[2]);
	typesDiv1.classList.add('styleTypePokemon1');

	const typesDiv2 = document.createElement('div');
	typesDiv2.appendChild(pokemonCompoment2[3]);
	typesDiv2.classList.add('styleTypePokemon2');

	typesDiv.append(typesDiv1, typesDiv2);

	typesDiv.appendChild(a);
	typesDiv.classList.add('flexTypes');

	const content = document.createElement('div');

	content.appendChild(name);

	content.appendChild(pokemonCompoment2[0]);
	content.appendChild(typesDiv);

	article.appendChild(figure);
	article.appendChild(content);

	const test = document.querySelector('#gridPokemon');
	if (test) {
		test.appendChild(article);
	} else {
		console.error("Element with class 'test' not found.");
	}
}

/************** Name Pokemon **************/
function getName(dataSpecies) {
	const frLang = dataSpecies.names.find((entry) => entry.language.name === 'fr');
	return frLang.name;
}

/************** Description Pokemon **************/
function getDecription(dataSpecies) {
	if (dataSpecies) {
		const frLang = dataSpecies.flavor_text_entries.find((entry) => entry.language.name === 'fr');
		return frLang.flavor_text;
	}
}

/************** Generation Pokemon **************/
function getGeneration(dataSpecies) {
	if (dataSpecies) {
		const generation = dataSpecies.generation.name;
		return generationTransform(generation);
	}
}

/************** ID Pokemon **************/
function getId(data) {
	return `${String(data.id).padStart(2, '0')} du Pokédex`;
}

/************** Transform Generation Pokemon **************/
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

/************** Type Pokemon **************/
function getType(dataPokemon) {
	console.log(dataPokemon, 'ici');
	const typePokemon1 = dataPokemon.types[0].type.name;

	if (dataPokemon.types.length > 1) {
		const typePokemon2 = dataPokemon.types[1].type.name;
		return [typePokemon1, typePokemon2];
	} else {
		return [typePokemon1];
	}
}

/************** Skills Pokemon **************/
function getTalent(dataPokemon) {
	const talent = dataPokemon.abilities[0].ability.name;
	return talent;
}

/************** Sprites Pokemon **************/
function getSrpite(dataPokemon) {
	const sprites = dataPokemon.sprites.other['official-artwork'].front_default;
	return sprites;
}

/************** Stats Pokemon **************/
function statsPokemon(dataPokemon) {
	if (dataPokemon) {
		const speed = document.createElement('span');
		speed.classList.add(`redText`);
		speed.textContent = `Vitesse : ${dataPokemon.stats[5].base_stat}`;

		const hp = document.createElement('span');
		hp.classList.add(`redText`);
		hp.textContent = `PV : ${dataPokemon.stats[0].base_stat}`;

		const atk = document.createElement('span');
		atk.classList.add(`redText`);
		atk.textContent = `Attaque : ${dataPokemon.stats[1].base_stat}`;

		const def = document.createElement('span');
		def.classList.add(`redText`);
		def.textContent = `Défense : ${dataPokemon.stats[2].base_stat}`;

		const defSpe = document.createElement('span');
		defSpe.classList.add(`redText`);
		defSpe.textContent = `Attaque Spé : ${dataPokemon.stats[3].base_stat}`;

		const atkSpe = document.createElement('span');
		atkSpe.classList.add(`redText`);
		atkSpe.textContent = `Défense Spé : ${dataPokemon.stats[4].base_stat}`;

		const statContainer = document.createElement(`div`);
		statContainer.append(hp, atk, def, defSpe, atkSpe, speed);
		return statContainer;
	}
}

/************** Form selection **************/
if (document.querySelector('#form') === true) {
	document.querySelector(`form`).addEventListener(`submit`, (event) => {
		event.preventDefault();
		relocate();
	});
}

async function relocate() {
	try {
		const type1 = document.querySelector(`#typesPokemons`);
		type1.innerHTML = '';

		const currentUrl = document.getElementById(`search`).value.toLowerCase();
		const url = `https://pokeapi.co/api/v2/pokemon/${currentUrl}`;
		const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${currentUrl}`;
		updatePokemon(url);
		updateSpeciesPokemon(urlSpecies);
	} catch (error) {
		console.error(error.message);
	}
}

/************** View Pokemon **************/

if (document.querySelector('#watchPokemon') === true) {
	document.querySelector(`#watchPokemon`).addEventListener(`click`, () => {
		watchPokemon();
	});
}

function watchPokemon() {
	let pokemon = document.querySelector(`.IdPokemon`).textContent;
	pokemon = pokemon.replace('du Pokédex', '');

	location.assign(`./HTML/pokemon.html?p=${pokemon}`);
}

if (document.querySelector('#watchPokemon') === true) {
	function addPokemon() {
		let pokemon = document.querySelector(`.IdPokemon`).textContent;
		pokemon = pokemon.replace('du Pokédex', '');
		const set = localStorage.setItem(pokemon);
		console.log(set);
	}
	addPokemon();
}

export {gridPokemon, Pokemon, updateSpeciesPokemon, updatePokemon, getData, updatePokemonGrid, updateSpeciesPokemonGrid};


// // let bgColor = document.querySelector(".bgColor");

// // bgColor.classList.add(typeColors[colorsBgList[0]]);

// let typesPokemonBg = document.querySelector(`.typePokemon`);
// console.log(typesPokemonBg, "héo");

// // const colorsBgList = {
// // 	normal: 'colorBtnNormal',
// // 	fighting: 'colorBtnCombat',
// // 	flying: 'colorBtnVol',
// // 	poison: 'colorBtnPoison',
// // 	ground: 'colorBtnSol',
// // 	rock: 'colorBtnRoche',
// // 	bug: 'colorBtnInsecte',
// // 	ghost: 'colorBtnSpectre',
// // 	steel: 'colorBtnAcier',
// // 	fire: 'colorBtnFeu',
// // 	water: 'colorBtnEau',
// // 	grass: 'colorBtnPlante',
// // 	electric: 'colorBtnElectric',
// // 	psychic: 'colorBtnPsy',
// // 	ice: 'colorBtnGlace',
// // 	dragon: 'colorBtnDragon',
// // 	dark: 'colorBtnTenebre',
// // 	fairy: 'colorBtnFee',
// // 	stellar: 'colorBtnStar',
// // 	unknown: 'colorBtnUnknown',

// // };


