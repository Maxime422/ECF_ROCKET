import {getData, callListPokemon} from './functions.js';

/************** Call List Pokemon **************/
const btn = document.querySelector(`#GenSelecting`);
btn.addEventListener('change', () => {
	event.preventDefault();
	const tags = document.querySelector(`#GenSelecting`).value;
	console.log(tags);
	getPokemonByRegion(tags);
});

getPokemonByRegion('kanto');
async function getPokemonByRegion(data) {
	try {
		const dataPokemonList = await getData(`https://pokeapi.co/api/v2/pokedex/${data}`);
		const div = document.querySelector(`#gridPokemon`);
		div.innerHTML = '';
		dataPokemonList.pokemon_entries.forEach((pokemon) => {
			callListPokemon(pokemon.entry_number);
		});
	} catch (error) {
		console.error(error.message);
	}
}
