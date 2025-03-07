('use strict');

import {getData, relocate, searchPokemon} from './functions.js';
/************** Starting Pokemon1 **************/
const btn1 = document.querySelector(`#pokemon1`);
btn1.addEventListener(`click`, () => {
	if (localStorage.key(0)) {
		onLoad(0, btn1);
	}
});
onLoad(0, btn1);
function onLoad(i, btn) {
	const key = localStorage.key(i);
	if (localStorage.key(i)) {
		relocate(key);

		document.querySelectorAll('.circleActive').forEach((clRemove) => clRemove.classList.remove('circleActive'));
		btn.classList.add('circleActive');
	}
}

/************** Pokemon2 **************/
const btn2 = document.querySelector(`#pokemon2`);
btn2.addEventListener(`click`, () => {
	if (localStorage.key(1)) {
		onLoad(1, btn2);
	}
});

/************** Starting Pokemon3 **************/
const btn3 = document.querySelector(`#pokemon3`);
btn3.addEventListener(`click`, () => {
	if (localStorage.key(2)) {
		onLoad(2, btn3);
	}
});

/************** Starting Pokemon4 **************/
const btn4 = document.querySelector(`#pokemon4`);
btn4.addEventListener(`click`, () => {
	if (localStorage.key(3)) {
		onLoad(3, btn4);
	}
});

/************** Starting Pokemon5 **************/
const btn5 = document.querySelector(`#pokemon5`);
btn5.addEventListener(`click`, () => {
	if (localStorage.key(4)) {
		onLoad(4, btn5);
	}
});

/************** Starting Pokemon6 **************/
const btn6 = document.querySelector(`#pokemon6`);
btn6.addEventListener(`click`, () => {
	if (localStorage.key(5)) {
		onLoad(5, btn6);
	}
});

function removePokemon() {
	for (let i = 0; i < localStorage.length; i++) {
		const pokemonKey = localStorage.key(i);
		if (document.querySelector(`#pokemon${i + 1}`).classList.contains('circleActive')) {
			localStorage.removeItem(pokemonKey);
			console.log(`Pokemon ${pokemonKey} removed from localStorage`);

			document.querySelector(`#pokemon${i + 1}`).classList.remove('circleActive');
			break;
		}
	}
}

const removeBtn = document.querySelector('#removePokemon');
removeBtn.addEventListener('click', removePokemon);

console.log(localStorage);

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
