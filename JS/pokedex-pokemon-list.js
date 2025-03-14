import {getData, callListPokemon} from './functions.js';

/************** Call List Pokemon **************/
const btn = document.querySelector(`#GenSelecting`);
btn.addEventListener('change', () => {
	const tags = document.querySelector(`#GenSelecting`).value;
	const div = document.querySelector(`#gridPokemon`);
	div.innerHTML = '';
	console.log(tags);
	getPokemonByRegion(tags);
});

getPokemonByRegion('kanto');
async function getPokemonByRegion(data) {
    try {
        const dataPokemonList = await getData(`https://pokeapi.co/api/v2/pokedex/${data}`);

		dataPokemonList.pokemon_entries.sort();
        dataPokemonList.pokemon_entries.forEach(pokemon => {
            const pokemonId = pokemon.pokemon_species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '').replace('/', '');
            callListPokemon(pokemonId);
        });

    } catch (error) {
        console.error(error.message);
    }
}
