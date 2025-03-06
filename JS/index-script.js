('use strict');

import {gridPokemon, relocate, watchPokemon} from './functions.js';

/************** Call Random Pokemon **************/
const randomNb = Math.floor(Math.random() * 1025 + 1);
relocate(randomNb);

/************** Call List Pokemon **************/
const urlGrid = `https://pokeapi.co/api/v2/pokemon/`;
const urlSpeciesGrid = `https://pokeapi.co/api/v2/pokemon-species/`;
gridPokemon(urlGrid, urlSpeciesGrid);

/************** Form selection **************/
document.querySelector(`form`).addEventListener(`submit`, (event) => {
	event.preventDefault();
	const currentUrl = document.getElementById(`search`).value.toLowerCase();
	relocate(currentUrl);
});

/************** View Pokemon **************/
document.querySelector(`#watchPokemon`).addEventListener(`click`, () => {
	watchPokemon();
});