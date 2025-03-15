('use strict');

import {getPokemon, TransformUrl} from './functions.js';

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
	if (localStorage.key(1)) {
		Team(localStorage.key(1), btn1);
	}
});

/************** Pokemon n°2 **************/
const btn2 = document.querySelector(`#pokemon2`);
btn2.addEventListener(`click`, () => {
	// Si le pokémon 1 existe dans le local storage, j'enovie 1
	if (localStorage.key(2)) {
		Team(localStorage.key(2), btn2);
	}
});

/************** Pokemon n°3 **************/
const btn3 = document.querySelector(`#pokemon3`);
btn3.addEventListener(`click`, () => {
	if (localStorage.key(3)) {
		Team(localStorage.key(3), btn3);
	}
});

/************** Pokemon n°4 **************/
const btn4 = document.querySelector(`#pokemon4`);
btn4.addEventListener(`click`, () => {
	if (localStorage.key(4)) {
		Team(localStorage.key(4), btn4);
	}
});

/************** Pokemon n°5 **************/
const btn5 = document.querySelector(`#pokemon5`);
btn5.addEventListener(`click`, () => {
	if (localStorage.key(5)) {
		Team(localStorage.key(5), btn5);
	}
});

/************** Pokemon n°6 **************/
const btn6 = document.querySelector(`#pokemon6`);
btn6.addEventListener(`click`, () => {
	if (localStorage.key(6)) {
		Team(localStorage.key(6), btn6);
	}
});

// Ajoute d'office le pokémon 1
Team(localStorage.key(1), btn1);

/************** Remove Pokemon List **************/
function removePokemon() {
	// boucle tous les Pokémons
	for (let i = 1; i < 7; i++) {
		const pokemon = document.querySelector(`#pokemon${i}`);
		const pokemonKey = localStorage.key(i);
		if (pokemon) {
			// Si le pokémon a la class circleActive, alors je supprime le pokémon de la list
			if (pokemon.classList.contains('circleActive')) {
				localStorage.removeItem(pokemonKey);
				removeBtn.classList.replace('secondaryButton', 'primaryButton');
			}
		}
	}
}
