('use strict');

import {updatePokemon, gridPokemon, updateSpeciesPokemon} from './functions.js';

/************** Call Random Pokemon **************/
const randomNb = Math.floor(Math.random() * 1025 + 1);
const url = `https://pokeapi.co/api/v2/pokemon/${randomNb}`;
const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${randomNb}`;
updatePokemon(url);
updateSpeciesPokemon(urlSpecies);

const urlGrid = `https://pokeapi.co/api/v2/pokemon/`;
const urlSpeciesGrid = `https://pokeapi.co/api/v2/pokemon-species/`;
gridPokemon(urlGrid, urlSpeciesGrid);

/************** Form selection **************/
document.querySelector(`form`).addEventListener(`submit`, (event) => {
	event.preventDefault();
	relocate();
});

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
document.querySelector(`#watchPokemon`).addEventListener(`click`, () => {
	watchPokemon();
});

function watchPokemon() {
	let pokemon = document.querySelector(`.IdPokemon`).textContent;
	pokemon = pokemon.replace('du Pokédex', '');

	location.assign(`./HTML/pokemon.html?p=${pokemon}`);
}
