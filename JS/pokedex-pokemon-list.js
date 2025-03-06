import {gridPokemon, relocate, watchPokemon} from './functions.js';

/************** Form selection **************/
document.querySelector(`form`).addEventListener(`submit`, (event) => {
	event.preventDefault();
	const currentUrl = document.getElementById(`search`).value.toLowerCase();
	relocate(currentUrl);
});