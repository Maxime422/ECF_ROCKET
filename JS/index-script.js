('use strict');

import {gridPokemon, relocate, watchPokemon, searchPokemon, getData} from './functions.js';

/************** Call Random Pokemon **************/
const randomNb = Math.floor(Math.random() * 1025 + 1);
relocate(randomNb);

/************** Call List Pokemon **************/
const urlGrid = `https://pokeapi.co/api/v2/pokemon/`;
const urlSpeciesGrid = `https://pokeapi.co/api/v2/pokemon-species/`;
gridPokemon(urlGrid, urlSpeciesGrid);

/************** Form selection **************/
document.querySelector(`form`).addEventListener(`submit`, async (event) => {
	event.preventDefault();
	const id = document.getElementById(`search`).value.toLowerCase();
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	try {
	  const data = await getData(url);
	  if (data) {
		searchPokemon(id);
	  } else {
		console.error('Aucune donnée trouvée pour ce Pokémon !');
	  }
	} catch (error) {
	  console.error('Erreur lors de la récupération des données :', error.message);
	}
  });

/************** View Pokemon **************/
document.querySelector(`#watchPokemon`).addEventListener(`click`, () => {
	watchPokemon();
});
