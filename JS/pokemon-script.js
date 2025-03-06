('use strict');

import {updatePokemon, updateSpeciesPokemon} from './functions.js';

/************** Call Random Pokemon **************/
let currentUrl = window.location.search;
currentUrl = currentUrl.replace('?p=', '');
console.log(currentUrl);
const url = `https://pokeapi.co/api/v2/pokemon/${currentUrl}`;
const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${currentUrl}`;
updatePokemon(url);
updateSpeciesPokemon(urlSpecies);
