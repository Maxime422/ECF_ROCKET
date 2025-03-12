('use strict');

import {getPokemon, getData,createArticle, updatePokemonGrid, updateSpeciesPokemonGrid} from './functions.js';

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
			for (let i = 0; i < dataPokemon.results.length; i++) {
				const pokemonData = await getData(dataPokemon.results[i].url);
				const speciesData = await getData(dataSpeciesPokemon.results[i].url);

				const getPokemon = await updatePokemonGrid(pokemonData);
				const getSpecies = await updateSpeciesPokemonGrid(speciesData);
				if (getPokemon && getSpecies) {
					createArticle(getPokemon, getPokemon);
				}
				else {
					console.error('Aucune info en français trouvée');
				}
			}
		}
	} catch (error) {
		console.error('Erreur lors de la récupération des données :', error.message);
	}
}
callListPokemon();