('use strict');

import {TransformUrl, getData, getPokemon, callListPokemon} from './functions.js';

/************** Call Random Pokemon **************/
const randomNb = Math.floor(Math.random() * 1025 + 1);
const urlText = TransformUrl(randomNb);
getPokemon(urlText);
console.log(urlText);


// /************** Call Grid Pokemon **************/

const dataPokemonList = await getData(`data`);
for (let i = 0; i < dataPokemonList.results.length; i++) {
    const pokemonList = await getData(dataPokemonList.results[i].url);
    callListPokemon(pokemonList.id);
}

