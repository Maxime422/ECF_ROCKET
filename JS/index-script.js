('use strict');

import {getPokemon, watchPokemon, searchPokemon, getData, updatePokemonGrid} from './functions.js';

/************** Call Random Pokemon **************/
const randomNb = Math.floor(Math.random() * 1025 + 1);
getPokemon(randomNb);

/************** Call List Pokemon **************/
async function callListPokemon() {
	try {
		const urlGrid = `https://pokeapi.co/api/v2/pokemon/`;
		const urlSpeciesGrid = `https://pokeapi.co/api/v2/pokemon-species/`;
		const dataPokemon = await getData(urlGrid);
		const dataSpeciesPokemon = await getData(urlSpeciesGrid);

		if (dataPokemon && dataSpeciesPokemon) {
			for (const pokemon of dataPokemon.results) {
				const url = pokemon.url;
				const data = await getData(url);
				if (data) {
					updatePokemonGrid(data);
				} else {
					console.error('Aucune info en français trouvée');
				}
			}
			for (const pokemon of dataSpeciesPokemon.results) {
				const url = pokemon.url;
				const data = await getData(url);
				if (data) {
					updatePokemonGrid(data);
				} else {
					console.error('Aucune info en français trouvée');
				}
			}
		}
	} catch (error) {
		console.error('Erreur lors de la récupération des données :', error.message);
	}
}
callListPokemon();

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
