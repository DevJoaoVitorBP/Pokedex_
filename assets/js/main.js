// Get a reference to the HTML element with the ID 'pokemonList'.
const pokemonList = document.getElementById('pokemonList');
// Get a reference to the HTML element with the ID 'loadMoreButton'.
const loadMoreButton = document.getElementById('loadMoreButton');

// Define the maximum number of Pokémon records.
const maxRecords = 151;
// Define the limit for each batch of Pokémon.
const limit = 10;
// Initialize the offset for pagination.
let offset = 0;

// Function to convert a Pokemon object to an HTML list item.
function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="namee" data-pokemon="${pokemon.name}">${pokemon.name}</span>

    <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.photo}"
             alt="${pokemon.name}">
    </div>
</li>
`;
}

// Function to load Pokémon items and append them to the list.
function loadPokemonItems(offset, limit) {
    // Fetch Pokémon data using the 'pokeApi' object.
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Convert the Pokémon data to HTML list items and join them.
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        // Append the new HTML to the 'pokemonList' element.
        pokemonList.innerHTML += newHtml;
    });
}

// Initial loading of Pokémon items.
loadPokemonItems(offset, limit);

// Add a click event listener to the 'pokemonList' element.
pokemonList.addEventListener('click', (event) => {
    // Find the closest '.pokemon' element (Pokemon name clicked).
    const clickedPokemon = event.target.closest('.namee');
    if (clickedPokemon) {
        // Get the Pokemon's name from the 'data-pokemon' attribute.
        const pokemonName = clickedPokemon.getAttribute('data-pokemon');
        // Navigate to the Pokemon's details page.
        window.location.href = `pokemon.html?pokemon=${pokemonName}`;
    }
});

// Add a click event listener to the 'loadMoreButton' element.
loadMoreButton.addEventListener('click', () => {
    // Increase the offset for the next batch.
    offset += limit;
    // Calculate the number of records including the next page.
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        // Calculate the limit for the final batch.
        const newLimit = maxRecords - offset;
        // Load the final batch of Pokémon items.
        loadPokemonItems(offset, newLimit);

        // Remove the 'loadMoreButton' when reaching the end.
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        // Load the next batch of Pokémon items.
        loadPokemonItems(offset, limit);
    }
});
