('use strict');

import {getPokemon, TransformUrl} from './functions.js';

/************** Call Pokemon **************/
let currentUrl = window.location.search;
currentUrl = currentUrl.replace('?p=', '');
console.log(currentUrl);
const url = TransformUrl(currentUrl);
getPokemon(url);

/************** It's Ditto !!! **************/
let pokemon = document.querySelector(`.IdPokemon`).textContent;
pokemon = pokemon.replace('du Pokédex', '');
if (pokemon !== 132) {
	const interval = setInterval(() => {
		const randomNb = Math.floor(Math.random() * 11);

		console.log(randomNb);
		if (randomNb === 10) {
			const urlText = TransformUrl(132);
			getPokemon(urlText);
			clearInterval(interval);
		}
	}, 100000);
}
