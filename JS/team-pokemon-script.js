('use strict');

import {updatePokemon, updateSpeciesPokemon} from './functions.js';

/************** Call Team Pokemons **************/

const urlPokemon = {
	pokemon1: '392',
	pokemon2: '144',
	pokemon3: '11',
	pokemon4: '156',
	pokemon5: '841',
	pokemon6: '111',
};

const url = `https://pokeapi.co/api/v2/pokemon/${urlPokemon.pokemon1}`;
const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${urlPokemon.pokemon1}`;
updatePokemon(url);
updateSpeciesPokemon(urlSpecies);

document.querySelector(`#pokemon2`).addEventListener(`click`, () => {
	const url = `https://pokeapi.co/api/v2/pokemon/${urlPokemon.pokemon2}`;
	const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${urlPokemon.pokemon2}`;
	updatePokemon(url);
	updateSpeciesPokemon(urlSpecies);
});

document.querySelector(`#pokemon3`).addEventListener(`click`, () => {
	const url = `https://pokeapi.co/api/v2/pokemon/${urlPokemon.pokemon3}`;
	const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${urlPokemon.pokemon3}`;
	updatePokemon(url);
	updateSpeciesPokemon(urlSpecies);
});

document.querySelector(`#pokemon4`).addEventListener(`click`, () => {
	const url = `https://pokeapi.co/api/v2/pokemon/${urlPokemon.pokemon4}`;
	const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${urlPokemon.pokemon4}`;
	updatePokemon(url);
	updateSpeciesPokemon(urlSpecies);
});

document.querySelector(`#pokemon5`).addEventListener(`click`, () => {
	const url = `https://pokeapi.co/api/v2/pokemon/${urlPokemon.pokemon5}`;
	const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${urlPokemon.pokemon5}`;
	updatePokemon(url);
	updateSpeciesPokemon(urlSpecies);
});

document.querySelector(`#pokemon6`).addEventListener(`click`, () => {
	const url = `https://pokeapi.co/api/v2/pokemon/${urlPokemon.pokemon6}`;
	const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${urlPokemon.pokemon6}`;
	updatePokemon(url);
	updateSpeciesPokemon(urlSpecies);
});
