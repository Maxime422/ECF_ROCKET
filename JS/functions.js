'use strict';

// Easter egg pour changer les sprites (voir ligne 633)
let toggle = '';
// Récupère le sprite, si aucune key sprite, alors ajoute ajoute le base
if (localStorage.getItem('sprites')) {
	toggle = localStorage.getItem('sprites');
} else {
	localStorage.setItem('sprites', 'base');
	toggle = 'base';
}

// Véfifie si il y a bien un theme dans le localStorage, si aucun, alors ajoute un theme
if (localStorage.getItem('theme')) {
	const theme = localStorage.getItem('theme');
	LightDark(theme);
} else {
	localStorage.setItem('theme', 'dark');
}

/************** Dark Mode / Light Mode **************/
document.querySelector(`#darkLightMode`).addEventListener(`click`, () => {
	// Véfifie si il y a bien un theme dans le localStorage, si aucun, alors ajoute un theme
	if (localStorage.getItem('theme')) {
		const theme = localStorage.getItem('theme');
		// Inverse le theme pour le changement de mode
		if (theme === 'dark') {
			LightDark('light');
		} else {
			LightDark('dark');
		}
	} else {
		localStorage.setItem('theme', 'dark');
	}
});

function LightDark(theme) {
	// Je récupère l'url de mon CSS dark ou Light mode
	const mode = document.querySelector(`#mode`);
	// Je récupère mon icon light ou darkMode
	const icon = document.querySelector(`#darkLightMode img`);
	const linkMode = mode.getAttribute(`href`);
	// Récupère la partie ./ ou ../ du href linkMode, on parcours pour chercher "CSS/" une fois récupérer on récupère une string de 0 jusqu'à CSS/
	// (Si besoin, c'est la même fonction que celle de mon projet Dashboard Manger)
	const pathPrefix = linkMode.substring(0, linkMode.indexOf('CSS/'));

	const light = `${pathPrefix}CSS/light-mode.css`;
	const dark = `${pathPrefix}CSS/dark-mode.css`;

	// Si le theme actuel est dark, alors on set le mode en dark et on change l'icon
	if (theme === 'dark') {
		mode.setAttribute(`href`, `${dark}`);
		icon.src = `${pathPrefix}IMG/POKEMON__ICONS/Icon-Moon.png`;
		// Ajoute le theme dark au localStorage
		localStorage.setItem('theme', 'dark');

		// Si le theme actuel est light, alors on set le mode en light et on change l'icon
	} else if (theme === 'light') {
		mode.setAttribute(`href`, `${light}`);
		icon.src = `${pathPrefix}IMG/POKEMON__ICONS/Icon-Sun.png`;

		// Ajoute le theme light au localStorage
		localStorage.setItem('theme', 'light');
	} else {
		console.log(`Erreur inattendue lors du changement de mode`);
	}
}

/************** Type Style Pokemon Object **************/
const pokemonTypes = {
	water: {
		color: '--color-eau',
		bgColor: '#DBDFFF',
		icon: '../IMG/ICONS/Icons-Pokemon-water.png',
	},
	normal: {
		color: '--color-normal',
		bgColor: '#C8CAC8',
		icon: '../IMG/ICONS/Icons-Pokemon-normal.png',
	},
	fire: {
		color: '--color-feu',
		bgColor: '#F5A1A6',
		icon: '../IMG/ICONS/Icons-Pokemon-fire.png',
	},
	grass: {
		color: '--color-plante',
		bgColor: '#6FF1A3',
		icon: '../IMG/ICONS/Icons-Pokemon-grass.png',
	},
	electric: {
		color: '--color-electric',
		bgColor: '#FFF35C',
		icon: '../IMG/ICONS/Icons-Pokemon-electric.png',
	},
	ice: {
		color: '--color-glace',
		bgColor: '#C3CCFA',
		icon: '../IMG/ICONS/Icons-Pokemon-ice.png',
	},
	fighting: {
		color: '--color-combat',
		bgColor: '#FFCD78',
		icon: '../IMG/ICONS/Icons-Pokemon-fighting.png',
	},
	poison: {
		color: '--color-poison',
		bgColor: '#C18CF0',
		icon: '../IMG/ICONS/Icons-Pokemon-poison.png',
	},
	ground: {
		color: '--color-sol',
		bgColor: '#C08A4B',
		icon: '../IMG/ICONS/Icons-Pokemon-ground.png',
	},
	flying: {
		color: '--color-vol',
		bgColor: '#DCE1FF',
		icon: '../IMG/ICONS/Icons-Pokemon-flying.png',
	},
	psychic: {
		color: '--color-psy',
		bgColor: '#FF94A8',
		icon: '../IMG/ICONS/Icons-Pokemon-psychic.png',
	},
	bug: {
		color: '--color-insecte',
		bgColor: '#B6C63F',
		icon: '../IMG/ICONS/Icons-Pokemon-bug.png',
	},
	rock: {
		color: '--color-roche',
		bgColor: '#D1CEA6',
		icon: '../IMG/ICONS/Icons-Pokemon-rock.png',
	},
	ghost: {
		color: '--color-spectre',
		bgColor: '#A07C9C',
		icon: '../IMG/ICONS/Icons-Pokemon-ghost.png',
	},
	dragon: {
		color: '--color-dragon',
		bgColor: '#9BA6F2',
		icon: '../IMG/ICONS/Icons-Pokemon-dragon.png',
	},
	dark: {
		color: '--color-tenebre',
		bgColor: '#8A7B79',
		icon: '../IMG/ICONS/Icons-Pokemon-dark.png',
	},
	steel: {
		color: '--color-acier',
		bgColor: '#A3C8D9',
		icon: '../IMG/ICONS/Icons-Pokemon-steel.png',
	},
	fairy: {
		color: '--color-fee',
		bgColor: '#FFB0FF',
		icon: '../IMG/ICONS/Icons-Pokemon-fairy.png',
	},
};

/************** Get URL and Return Page Location **************/
function getUrl() {
	// Permet de récupérer l'url sans les paramètres et en fonction de renvoyer la bonne partie de l'url courante
	const url = window.location.pathname;
	if (url.includes('/HTML_PAGES/')) {
		return `./`;
	} else {
		return `./HTML_PAGES/`;
	}
}

/************** Async Fetch **************/
async function getData(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error.message);
		return null;
	}
}

/************** Search Pokemon **************/
function TransformUrl(urlPokemon) {
	try {
		const url = `https://pokeapi.co/api/v2/pokemon/${urlPokemon}`;
		const urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${urlPokemon}`;
		return [url, urlSpecies];
	} catch (error) {
		console.error(error.message);
	}
}

/************** Get Pokemon Pokemon **************/
async function getPokemon(urlText) {
	// Fetch les données du pokémon
	const dataPokemon = await getData(urlText[0]);
	if (dataPokemon === null) {
		// Renvoie la page 404
		location.assign(`${getUrl()}error-page.html`);
	}
	const dataSpecies = await getData(urlText[1]);
	if (dataPokemon && dataSpecies) {
		// Appelle les fonctions de structure des Pokémons
		await updatePokemon(dataPokemon);
		await updateSpeciesPokemon(dataSpecies);
	}
}

/************** Get List Pokemon **************/
async function callListPokemon(data) {
	if (data) {
		const url = TransformUrl(data);

		const pokemon = await getData(url[0]);
		const species = await getData(url[1]);

		// Appel les fonctions de structrure des pokémons pour les grids
		const pokemonElements = await updatePokemonGrid(pokemon);
		const SpeciesElements = await updateSpeciesPokemonGrid(species);
		// Envoie les éléments à createArticle
		createArticle([pokemonElements, SpeciesElements]);
	}
}
/************** Get Evolutions Pokemon **************/
async function pokemonEvolutions(url) {
	try {
		// Fetch de la chain du pokemon de l'url
		const dataSpecies = await getData(url[0]);
		if (dataSpecies) {
			// Récupère le pokémon actuel (via url[1] qui contient le nom du pokémon actuel, pour éviter les doublons)
			const pokemonName = url[1].toLowerCase();
			let data = dataSpecies.chain;
			console.log(data, dataSpecies);
			const evo = [];
			// Boucle qui vérifie les évolutions du pokémon
			while (data) {
				// si c'est pas le pokémon du actuel, alors on l'ajoute au tableau evo
				if (pokemonName !== data.species.name) {
					evo.push(data.species.name);
				}
				// Le while parcourt le tableau d'évolution. Si le pokémon a une évolution, data est remplacé par cette nouvelle évolution
				// Qui elle-même a potentiellement des évolutions, si c'est le cas, la boucle continue, sinon elle s'arrête et pokemonEvolutionsCall est appelé.

				if (data.evolves_to.length > 0) {
					data = data.evolves_to[0];
				} else {
					break;
				}
			}
			pokemonEvolutionsCall(evo);
		}
	} catch (error) {
		console.error(error.message);
	}
}
function pokemonEvolutionsCall(data) {
	try {
		if (data.length === 0) {
			const div = document.querySelector('#gridPokemon');
			div.innerHTML = '';
			const alert = document.createElement('span');
			const link = document.createElement('a');
			// Délégation de service client :)
			link.setAttribute('href', 'https://support.pokemon.com/hc/fr/categories/115000426353-Informations-g%C3%A9n%C3%A9rales');
			link.innerHTML = 'Contacter le support de The Pokémon Company';
			link.classList.add('redText');
			link.setAttribute('title', 'Support Pokémon');
			alert.textContent = `Pas d’évolution pour ce Pokémon :(`;
			div.append(alert, link);
			return;
		} else {
			// On boucle l'appel aux Pokémons
			data.forEach((pokemon) => callListPokemon(pokemon));
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Species Pokemon **************/
async function updateSpeciesPokemon(url) {
	try {
		if (url) {
			const name = document.querySelector('.PokemonName');
			name.textContent = getName(url);

			// Récupère la liste des évolutions
			if (document.querySelector('#evolutionBtn')) {
				await pokemonEvolutions([url.evolution_chain.url, url.name]);
			}

			const description = document.querySelector('.description');
			description.textContent = getDescription(url);

			const gen = document.querySelector('.location');
			gen.textContent = getGeneration(url);

			const id = document.querySelector('.IdPokemon');
			id.textContent = getId(url);
		} else {
			console.error('Erreur lors dans les données species pokemon');
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Data Pokemon **************/
async function updatePokemon(url) {
	try {
		if (url) {
			const types = getType(url);
			const div = document.querySelector('#typesPokemons');
			div.innerHTML = '';
			// Si il y a deux types alors div récupère les deux
			if (types[1] !== undefined && types[1] !== null) {
				div.append(types[0], types[1]);
			} else {
				div.append(types[0]);
			}

			// En fonction du type, ajoute la bonne couleur au fond
			const typeRef = types[0].textContent;
			const bgColor = document.querySelector('.bgColor');

			bgColor.style.backgroundColor = `${pokemonTypes[typeRef].bgColor}`;

			const stats = statsPokemon(url);
			const statsContainer = document.querySelector('.statistiques');
			// Nettoie la div statistiques avant d'ajouter les stats
			statsContainer.innerHTML = '';

			statsContainer.appendChild(stats);

			const talent = document.querySelector('.talentPokemon');
			talent.textContent = getTalent(url);

			const sprites = document.querySelector('#imgPokemon');
			// Ajout des éléments SEO
			sprites.alt = `Sprite du Pokémon ${url.name}`;
			sprites.src = getSprite([url, toggle]);
			sprites.setAttribute('loading', `lazy`);
		} else {
			console.error('Aucune info en français trouvée');
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Data Pokemon Grid **************/
async function updatePokemonGrid(dataPokemon) {
	try {
		const img = document.createElement('img');
		img.src = getSprite([dataPokemon, toggle]);
		// Ajout des éléments SEO
		img.alt = `Sprite du Pokémon ${dataPokemon.name}`;
		img.setAttribute('loading', `lazy`);

		// Récupère les types
		const types = getType(dataPokemon);
		const div = document.createElement(`div`);
		// Si il y a deux types alors div récupère les deux
		if (types[1] !== undefined && types[1] !== null) {
			div.append(types[0], types[1]);
		} else {
			div.append(types[0]);
		}

		// Création du bouton voir plus du pokémon qui redirige vers le bon pokémon
		const a = document.createElement(`a`);
		a.href = `${getUrl()}pokemon.html?p=${dataPokemon.name}`;
		// Ajout des éléments SEO
		a.setAttribute('title', 'Accéder au Pokémon');
		const divA = document.createElement(`div`);
		divA.classList.add('btnArticle');
		divA.append(a);
		a.innerHTML = 'Voir&nbsp;plus';
		a.classList.add('cta');
		a.classList.add('primaryButton');

		div.classList.add('flexTypes');

		// Retourne l'image, les types et le bouton "voir plus"
		return [img, div, divA];
	} catch (error) {
		console.error(error.message);
	}
}

/************** Update Species Pokemons Grids **************/
async function updateSpeciesPokemonGrid(dataSpecies) {
	try {
		const name = document.createElement(`span`);
		name.classList.add('secondaryText', 'subText');
		name.textContent = getName(dataSpecies);

		const id = document.createElement('span');
		id.textContent = getId(dataSpecies);

		// Retourne l'id du pokémon et le nom
		return [id, name];
	} catch (error) {
		console.error(error.message);
	}
}

/************** Create Articles **************/
function createArticle([pokemon, species]) {
	// Création de l'article à partir des éléments de updateSpeciesPokemonGrid, updatePokemonGrid
	const article = document.createElement('article');
	article.classList.add('articlePokemon');

	const figure = document.createElement('figure');
	figure.append(pokemon[0]);

	const content = document.createElement('div');
	content.append(species[1]);

	content.append(pokemon[1]);
	content.append(species[0]);
	content.append(pokemon[2]);

	article.append(figure);
	article.append(content);

	// Ajoute l'article à la grid
	const grid = document.querySelector('#gridPokemon');
	grid.append(article);
}

/************** Search Description Pokemon Return **************/
function getDescription(dataSpecies) {
	try {
		// Parcours dans le tableau et cherche le fr et retourne la description du Pokémon
		const frLang = dataSpecies.flavor_text_entries.find((entry) => entry.language.name === 'fr');
		if (frLang) {
			return frLang.flavor_text;
		} else {
			return 'Pas de description pour ce Pokémon';
		}
	} catch (error) {
		console.error(error.message);
		return 'Pas de description pour ce Pokémon';
	}
}

/************** Search Name Pokemon **************/
function getName(dataSpecies) {
	try {
		// Parcours dans le tableau et cherche le fr et retourne le nom du Pokémon
		const frLang = dataSpecies.names.find((entry) => entry.language.name === 'fr');
		if (frLang) {
			return frLang.name;
		} else {
			return 'Pas de nom pour ce Pokémon';
		}
	} catch (error) {
		console.error(error.message);
		return 'Pas de nom pour ce Pokémon';
	}
}

/************** Search Generation Pokemon Return **************/
function getGeneration(dataSpecies) {
	try {
		// Récupère la génération et l'envoie à generationTransform()
		const generation = dataSpecies.generation.name;
		if (generation) {
			return generationTransform(generation);
		} else {
			return 'génération inconnue';
		}
	} catch (error) {
		console.error(error.message);
		return 'génération inconnue';
	}
}

/************** Transform Generation Pokemon To Text **************/
function generationTransform(generation) {
	// Transforme la génération en nom et en fr et la retourne
	switch (generation) {
		case 'generation-i':
			return 'Kanto';

		case 'generation-ii':
			return 'Johto';

		case 'generation-iii':
			return 'Hoenn';

		case 'generation-iv':
			return 'Sinnoh';

		case 'generation-v':
			return 'Unys';

		case 'generation-vi':
			return 'Kalos';

		case 'generation-vii':
			return 'Alola';

		case 'generation-viii':
			return 'Galar';

		case 'generation-ix':
			return 'Paldea';

		default:
			return 'Région inconnue';
	}
}

/************** Search ID Pokemon **************/
function getId(data) {
	try {
		if (data.id) {
			return `${data.id} du Pokédex`;
		} else {
			return 'Numéro de Pokédex inconnu';
		}
	} catch (error) {
		console.error(error.message);
		return 'Numéro de Pokédex inconnu';
	}
}

/************** Search Skills Pokemon **************/
function getTalent(dataPokemon) {
	try {
		const talent = dataPokemon.abilities[0].ability.name;
		if (talent) {
			return talent;
		} else {
			return 'Talent inconnu';
		}
	} catch (error) {
		console.error(error.message);
		return 'Talent inconnu';
	}
}

/************** Search Types Pokemon **************/
function getType(dataPokemon) {
	try {
		const styleType1 = document.createElement('div');

		styleType1.classList.add('typePokemon');

		const typePokemon1 = dataPokemon.types[0].type.name;

		// Création du premier type (si un seul type)
		const type1 = document.createElement('span');
		type1.textContent = typePokemon1;

		const icon1 = document.createElement('img');
		// Récupère l'url de l'icon depuis l'objet pokemonTypes
		icon1.src = `${getUrl()}${pokemonTypes[typePokemon1].icon}`;
		icon1.setAttribute(`role`, `presentation`);

		const circle1 = document.createElement('div');
		circle1.append(icon1);
		// Récupère le fond du type depuis l'objet pokemonTypes
		styleType1.style.backgroundColor = `var(${pokemonTypes[typePokemon1].color})`;
		styleType1.append(circle1, type1);

		// Vérifie dans si il y a un second type
		if (dataPokemon.types.length > 1) {
			const styleType2 = document.createElement('div');
			styleType2.classList.add('typePokemon');

			const typePokemon2 = dataPokemon.types[1].type.name;

			const type2 = document.createElement('span');
			type2.textContent = typePokemon2;

			const icon2 = document.createElement('img');
			icon2.src = `${getUrl()}${pokemonTypes[typePokemon2].icon}`;
			icon2.setAttribute(`role`, `presentation`);
			const circle2 = document.createElement('div');
			circle2.append(icon2);
			styleType2.style.backgroundColor = `var(${pokemonTypes[typePokemon2].color})`;
			styleType2.append(circle2, type2);

			return [styleType1, styleType2];
		}
		// Si deux types je retournes les deux, sinon je retourne un tableau de 1 type
		return [styleType1];
	} catch (error) {
		console.error('Erreur dans getType :', error.message);
		const message = (document.createElement('span').textContent = 'pas de statistiques');
		return [message];
	}
}

/************** Search Sprites Pokemon **************/
function getSprite(data) {
	// Si le local Storage contient base getSprite le récupère et affiche les pokémon en orignial
	if (data[1] === 'base') {
		if (data[0].sprites.other['official-artwork'].front_default) {
			// Récupère le sprite officiel du pokémon
			const sprites = data[0].sprites.other['official-artwork'].front_default;
			return sprites;
		} else {
			// Si pas de sprites disponibles
			return Missingo();
		}
		// Si le local Storage contient shiny getSprite le récupère et affiche les pokémon en shiny
	} else if (data[1] === 'shiny') {
		if (data[0].sprites.other['official-artwork'].front_shiny) {
			// Récupère le sprite officiel du pokémon
			const sprites = data[0].sprites.other['official-artwork'].front_shiny;
			return sprites;
		}
	} else {
		return Missingo();
	}
}
/************** Get Missingo **************/
// Si pas d'autre pokémon, Missigno remplace
function Missingo() {
	const url = window.location.pathname;
	if (url.includes('/HTML_PAGES/')) {
		return `../IMG/Missingo-Pokemon-Image-Small.png`;
	} else {
		return `./IMG/Missingo-Pokemon-Image-Small.png`;
	}
}

/************** Create Stats Pokemon Return Div **************/
function statsPokemon(dataPokemon) {
	const statContainer = document.createElement(`div`);
	statContainer.classList.add('statistiquesContainer');
	try {
		if (dataPokemon) {
			// Boucle la récupération des statistiques et renvoie une div
			for (let i = 0; i < 6; i++) {
				const containData = document.createElement('span');
				const dataText = document.createElement('span');
				dataText.classList.add(`redText`);
				dataText.textContent = dataPokemon.stats[i].base_stat;
				containData.textContent = `${dataPokemon.stats[i].stat.name} : `;
				containData.appendChild(dataText);
				statContainer.appendChild(containData);
			}
			return statContainer;
		} else {
			const message = (document.createElement('span').textContent = 'Pas de statistiques');
			statContainer.appendChild(message);
			return message;
		}
	} catch (error) {
		console.error(error.message);
	}
}

/************** Form selection **************/
const form = document.querySelector('form');
if (form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const pokemon = document.getElementById(`search`).value.toLowerCase();
		// Easter-eggs sympas
		switch (pokemon) {
			case 'prof chen':
				alertMessage(['Ce n’est pas le moment d’utiliser ça !', 'easter-egg']);
				break;
			case 'camion':
				alertMessage(['Vroum Vroum !!', 'easter-egg']);
				setTimeout(() => {
					location.assign(`${getUrl()}pokemon.html?p=${151}`);
				}, 2200);

				break;

			case 'shiny':
				localStorage.setItem('sprites', 'shiny');
				alertMessage(['Quoi ? les pokémons changent de couleur ?', 'easter-egg']);
				setTimeout(() => {
					location.reload();
				}, 2200);
				break;
			case 'base':
				localStorage.setItem('sprites', 'base');
				alertMessage(['Ils sont beaux pourtant, non ?', 'easter-egg']);
				setTimeout(() => {
					location.reload();
				}, 2200);
				break;
			default:
				searchPokemon(pokemon);
				break;
		}
		document.getElementById('search').value = '';
	});
}

/************** Function Move To Pokemon Page **************/
async function searchPokemon(data) {
	try {
		// Fonction de recherche de pokemon, si pokemon existe, alors je change de page
		const url = await getData(`https://pokeapi.co/api/v2/pokemon/${data}`);
		if (url === null || url === undefined) {
			alertMessage([`Aucun Pokémon existant pour ${data}`, 'remove']);
		} else {
			location.assign(`${getUrl()}pokemon.html?p=${data}`);
		}
	} catch (error) {
		alert(`Erreur lors de la récupération des données. ${error}`);
	}
}

/************** addEventListener Watch Pokemon **************/
const watchBtn = document.querySelector('#watchPokemon');
if (watchBtn) {
	watchBtn.addEventListener('click', () => {
		watchPokemon();
	});
}

/************** Function Move To Pokemon Page **************/
function watchPokemon() {
	// Bouton pour accéder au pokémon en fonction de l'id
	let pokemon = document.querySelector(`.IdPokemon`).textContent;
	pokemon = pokemon.replace('du Pokédex', '');
	location.assign(`${getUrl()}pokemon.html?p=${pokemon}`);
}

/************** LocalStorage Pokemon For Team **************/
const btn = document.querySelector('#addPokemonTeam');
const icon = document.querySelector('#addPokemonIcon');
if (btn) {
	btn.addEventListener(`click`, () => {
		addPokemon();
	});
}
function addPokemon() {
	// Je récupère l'id du pokémon actuel, et si la taille est inférieure à 6 j'ajoute le pokémon
	const pokemonName = document.querySelector('.PokemonName').textContent;
	let pokemonID = document.querySelector('.IdPokemon').textContent;
	pokemonID = pokemonID.replace(' du Pokédex', '');

	// Vérifie la place dans l'équipe (8 car le mode sombre et le type de sprites sont déjà ajoutés)
	if (localStorage.length >= 8) {
		alertMessage(["L'équipe est déjà au maximum (6 Pokémon)", 'alert']);
	}
	// J'essaie de récupérer le pokémon du localStorage, pour voir si il existe
	else if (localStorage.getItem(`pokemon_${pokemonID}`)) {
		alertMessage(['Ce Pokémon est déjà dans ton équipe', 'alert']);
	} else {
		// Ajout de "pokemon_" pour pas confondre avec les autres éléments du LocalStorage
		localStorage.setItem(`pokemon_${pokemonID}`, pokemonID);
		btn.classList.replace('secondaryButton', 'primaryButton');
		icon.className = '';
		icon.classList.add('fa-solid', 'fa-check');
		alertMessage([`Le Pokémon ${pokemonName} a été ajouté à ton équipe`, 'check']);
	}
}

console.log(localStorage);
/************** Team Button **************/
const pokemon = document.querySelector('#teamButton');
if (pokemon) {
	// Si j'ai des pokemons dans mon équipe, je peux accéder à la liste des pokémons
	pokemon.addEventListener(`click`, () => {
		if (window.localStorage.length < 3) {
			alertMessage(['Pas encore de Pokémon', 'alert']);
		} else {
			location.assign(`${getUrl()}team-pokemon.html`);
		}
	});
}

/************** Switch Evolution About Button **************/
const evolutionBtn = document.querySelector('#evolutionBtn');
const aboutBtn = document.querySelector('#aboutBtn');
// Boutons à propos et évolution (switch)
if (evolutionBtn && aboutBtn) {
	const aboutSection = document.querySelector('#about');
	const evolutionSection = document.querySelector('#evolution');
	evolutionBtn.addEventListener(`click`, () => {
		if (aboutSection.classList != 'hidden') {
			evolutionBtn.classList.add('redText');
			aboutSection.classList.add('hidden');
			evolutionSection.classList.remove('hidden');
			aboutBtn.classList.remove('redText');
		}
	});

	aboutBtn.addEventListener(`click`, () => {
		if (evolutionSection.classList != 'hidden') {
			aboutBtn.classList.add('redText');
			evolutionSection.classList.add('hidden');
			aboutSection.classList.remove('hidden');
			evolutionBtn.classList.remove('redText');
		}
	});
}

/************** DOM Loaded **************/
// Permet de faire dispaître le rideau au chargement
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 350);
});

/************** Alert Message **************/
function alertMessage(message) {
	const div = document.querySelector('#alertMessage');
	const text = document.querySelector('#alertMessageText');
	const icon = document.querySelector('#styleIconAlert');

	icon.className = '';
	// En fonction du type de message, ajoute un icône différent
	switch (message[1]) {
		case 'alert':
			icon.classList.add('fa-solid', 'fa-triangle-exclamation');
			break;
		case 'check':
			icon.classList.add('fa-solid', 'fa-circle-check');
			break;
		case '???':
			icon.classList.add('fa-solid', 'fa-question');
			break;

		case 'delete':
			icon.classList.add('fa-solid', 'fa-xmark');
			break;

		case 'easter-egg':
			icon.classList.add('fa-solid', 'fa-medal');
			break;

		default:
			icon.classList.add('fa-solid', 'fa-circle-info');
			break;
	}
	icon.classList.add('redText');

	text.textContent = message[0];
	div.classList.add('popup');

	// Fait appaître le popUp puis après un certains temps, le supprime et retire les class pour pouvoir le réutiliser
	setTimeout(() => {
		div.classList.add('hide');

		setTimeout(() => {
			div.classList.remove('popup', 'hide');
		}, 400);
	}, 5000);
}

/************** Export **************/
export {
	getData,
	getPokemon,
	TransformUrl,
	callListPokemon,
	updateSpeciesPokemon,
	updatePokemon,
	updatePokemonGrid,
	addPokemon,
	watchPokemon,
	searchPokemon,
	pokemonEvolutions,
	updateSpeciesPokemonGrid,
	createArticle,
	alertMessage,
};
