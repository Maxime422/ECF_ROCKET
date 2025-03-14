('use strict');

import {TransformUrl, getData, getPokemon, callListPokemon} from './functions.js';

/************** Call Random Pokemon **************/
const randomNb = Math.floor(Math.random() * 1025 + 1);
const urlText = TransformUrl(randomNb);
getPokemon(urlText);
console.log(urlText);

// /************** Call Grid Pokemon **************/
async function pokemonList() {
	try {
		const dataPokemonList = await getData(`https://pokeapi.co/api/v2/pokemon/`);
		for (let i = 0; i < 18; i++) {
			const pokemonList = await getData(dataPokemonList.results[i].url);
			callListPokemon(pokemonList.id);
		}
	} catch (error) {
		console.error(error.message);
	}
}
pokemonList();