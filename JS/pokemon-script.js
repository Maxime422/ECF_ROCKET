('use strict');

import {getPokemon, TransformUrl} from './functions.js';

/************** Call Pokemon **************/
let currentUrl = window.location.search;
// Récupère et nettoie l'id du pokémon dans l'url pour conserver uniquement Id à envoyer à getPokemon()
currentUrl = currentUrl.replace('?p=', '');
const url = TransformUrl(currentUrl);
getPokemon(url);

/************** It's Ditto !!! **************/
let pokemon = document.querySelector(`.IdPokemon`).textContent;
pokemon = pokemon.replace('du Pokédex', '');
// Si ditto existe pas, faire un math floor.  Si le numéro du Pokémon est identique, remplace par Ditto :)
if (pokemon !== 132) {
	const interval = setInterval(() => {
		const randomNb = Math.floor(Math.random() * 11);
		if (randomNb === 10) {
			const urlText = TransformUrl(132);
			getPokemon(urlText);
			clearInterval(interval);
		}
	}, 100000);
}
