('use strict');

import {getData, getPokemon, searchPokemon, TransformUrl} from './functions.js';

/************** Form selection **************/
document.querySelector(`#searchPokemon`).addEventListener(`submit`, (event) => {
	event.preventDefault();
	const id = document.getElementById(`search`).value.toLowerCase();
	searchPokemon(id);
});

/************** Call Pokemon **************/
let currentUrl = window.location.search;
currentUrl = currentUrl.replace('?p=', '');
console.log(currentUrl);
const url = TransformUrl(currentUrl);
getPokemon(url);


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
