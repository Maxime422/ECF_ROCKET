import {getData, callListPokemon} from './functions.js';

/************** Call List Pokemon **************/
const btn = document.querySelector(`#GenSelecting`);
btn.addEventListener('change', () => {
	// Récupère la value du Select et envoie la nouvelle génération à getPokemonByRegion()
	const tags = document.querySelector(`#GenSelecting`).value;
	const div = document.querySelector(`#gridPokemon`);
	// Nettoie la div avant ajout
	div.innerHTML = '';
	getPokemonByRegion(tags);
});

// Permier appel de lancement de page
getPokemonByRegion('kanto');
async function getPokemonByRegion(data) {
	try {
		const dataPokemonList = await getData(`https://pokeapi.co/api/v2/pokedex/${data}`);

		// Appelle les Pokémons à partir des data récupérées et fait une boucle
		dataPokemonList.pokemon_entries.forEach((pokemon) => {
            // Récupère l'id du lien pour éviter les pokémons variants (certains pokémons n'existent pas avec les noms du pokédex ou ont des noms alternatifs)
			const pokemonId = pokemon.pokemon_species.url.replace('https://pokeapi.co/api/v2/pokemon-species/', '');
            pokemonId.replace('/', '');
			callListPokemon(pokemonId);
		});
	} catch (error) {
		console.error(error.message);
	}
}
