('use strict');

import {getPokemon, TransformUrl} from './functions.js';

// Ajoute les pokémon du localStorage au tableau teamPokemons pour éviter les problèmes de theme
const teamPokemons = [];
function teamPokemon() {
	console.log(localStorage, teamPokemons);
	teamPokemons.length = 0;
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key.includes('pokemon_')) {
			const temp = key.replace('pokemon_', '');
			teamPokemons.push(temp);
		}
	}
}
teamPokemon();

// Bouton de suppression du pokémon
const removeBtn = document.querySelector('#removePokemon');
removeBtn.addEventListener('click', removePokemon);

/************** Get Pokemon and add Class Active **************/
function Team(data, btn) {
	removeBtn.classList.replace('primaryButton', 'secondaryButton');
	// Récupère la clé du pokémon via le numéro (1,2,3...)
	if (data) {
		// Si la clé existe alors, je l'envoie à getPokemon()
		const url = TransformUrl(data);
		getPokemon(url);
		// Suprrime la class circleActive pour tout le monde et l'ajoute au bouton correspondant
		const classBtn = document.querySelector('.circleActive');
		classBtn.classList.remove('circleActive');
		btn.classList.add('circleActive');
	}
}

/************** Pokemon n°1 **************/
const btn1 = document.querySelector(`#pokemon1`);
btn1.addEventListener(`click`, () => {
	if (teamPokemons[0]) {
		Team(teamPokemons[0], btn1);
	}
});

/************** Pokemon n°2 **************/
const btn2 = document.querySelector(`#pokemon2`);
btn2.addEventListener(`click`, () => {
	// Si le pokémon 1 existe dans le local storage, j'enovie 1
	if (teamPokemons[1]) {
		Team(teamPokemons[1], btn2);
	}
});

/************** Pokemon n°3 **************/
const btn3 = document.querySelector(`#pokemon3`);
btn3.addEventListener(`click`, () => {
	if (teamPokemons[2]) {
		Team(teamPokemons[2], btn3);
	}
});

/************** Pokemon n°4 **************/
const btn4 = document.querySelector(`#pokemon4`);
btn4.addEventListener(`click`, () => {
	if (teamPokemons[3]) {
		Team(teamPokemons[3], btn4);
	}
});

/************** Pokemon n°5 **************/
const btn5 = document.querySelector(`#pokemon5`);
btn5.addEventListener(`click`, () => {
	if (teamPokemons[4]) {
		Team(teamPokemons[4], btn5);
	}
});

/************** Pokemon n°6 **************/
const btn6 = document.querySelector(`#pokemon6`);
btn6.addEventListener(`click`, () => {
	if (teamPokemons[5]) {
		Team(teamPokemons[5], btn6);
	}
});

// Ajoute d'office le pokémon 1
Team(teamPokemons[0], btn1);
/************** Remove Pokemon List **************/
function removePokemon() {
	// boucle tous les Pokémons
	for (let i = 0; i < 6; i++) {
		const pokemon = document.querySelector(`#pokemon${i + 1}`);
		const pokemonKey = teamPokemons[i];
		if (pokemon) {
			// Si le pokémon a la class circleActive, alors je supprime le pokémon de la liste
			if (pokemon.classList.contains('circleActive')) {
				localStorage.removeItem(`pokemon_${pokemonKey}`);
				teamPokemons.splice(i, 1);
				teamPokemon();

				removeBtn.classList.replace('secondaryButton', 'primaryButton');
				break;
			}
		}
	}
}
