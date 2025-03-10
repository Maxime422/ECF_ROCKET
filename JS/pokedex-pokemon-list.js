import {getPokemon, searchPokemon, getData, updatePokemonGrid} from './functions.js';

/************** Form selection **************/
document.querySelector(`form`).addEventListener(`submit`, (event) => {
	event.preventDefault();
	const currentUrl = document.getElementById(`search`).value.toLowerCase();
	getPokemon(currentUrl);
});

/************** Form selection **************/
document.querySelector(`#searchPokemon`).addEventListener(`submit`, async (event) => {
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

/************** Call List Pokemon **************/
async function getPokemonByRegion(regionName) {
	const urlGen = `https://pokeapi.co/api/v2/pokedex/${regionName}`;
	const data = getData(urlGen);
	updatePokemonGrid(data.pokemon_entries);
}

getPokemonByRegion("kanto");
