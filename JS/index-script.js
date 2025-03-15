('use strict');

import {TransformUrl, getData, getPokemon, callListPokemon} from './functions.js';

/************** Call Random Pokemon **************/
const randomNb = Math.floor(Math.random() * 1025 + 1);
const urlText = TransformUrl(randomNb);
// Appelle un pokémon random
getPokemon(urlText);




// /************** Call Grid Pokemon **************/

// Appelle une liste de 18 Pokémons randoms parmis les 1020 pokémons
	let randomNbList = Math.floor(Math.random() * 52 + 1);
	randomNbList = randomNbList * 20;
	pokemonList(randomNbList);

async function pokemonList(nb) {
	try {
		const dataPokemonList = await getData(`https://pokeapi.co/api/v2/pokemon/?offset=${nb}&limit=20`);
		// Récupère les 18 premiers pokémons du pokédex
		for (let i = 0; i < 18; i++) {
			const pokemonList = await getData(dataPokemonList.results[i].url);
			callListPokemon(pokemonList.id);
		}
	} catch (error) {
		console.error(error.message);
	}
}

