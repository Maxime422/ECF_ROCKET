import {getData, callListPokemon} from './functions.js';

/************** Call List Generation Pokemon **************/
const btn = document.querySelector(`#GenSelecting`);
btn.addEventListener('change', () => {
	// Récupère la value du Select et envoie la nouvelle génération à getPokemonByRegion()
	const tags = document.querySelector(`#GenSelecting`);
	const div = document.querySelector(`#gridPokemon`);

	const text = document.querySelector(`#placeText`);
	// Récupéré sur Stackoverflow mais pas sûr que ce soit une bonne pratique
	// Récupère le texte de l'option séléctionnée
	text.textContent = `Voici les Pokémons de la région de : ${tags.options[tags.selectedIndex].text}`;
	// Nettoie la div avant ajout
	div.innerHTML = '';
	getPokemonByRegion(tags.value);
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

/************** Call List Type Pokemon **************/
const btnType = document.querySelector(`#TypeSelecting`);
btnType.addEventListener('change', () => {
	// Récupère la value du Select et envoie la type à getPokemonByType()
	const tags = document.querySelector(`#TypeSelecting`);

	const text = document.querySelector(`#placeText`);
	text.textContent = `Voici les Pokémons de type : ${tags.options[tags.selectedIndex].text}`;
	const div = document.querySelector(`#gridPokemon`);
	// Nettoie la div avant ajout
	div.innerHTML = '';
	getPokemonByType(tags.value);
});

// Permier appel de lancement de page
async function getPokemonByType(data) {
	try {
		const dataPokemonList = await getData(`https://pokeapi.co/api/v2/type/${data}`);

		// Appelle les Pokémons à partir des data récupérées et fait une boucle
		dataPokemonList.pokemon.forEach((pokemon) => {
			// Récupère l'id du lien pour éviter les pokémons variants (certains pokémons n'existent pas avec les noms du pokédex ou ont des noms alternatifs)
			const pokemonId = pokemon.pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '');
			pokemonId.replace('/', '');
			callListPokemon(pokemonId);
		});
	} catch (error) {
		console.error(error.message);
	}
}
