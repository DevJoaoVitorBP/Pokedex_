// Create an object called 'pokeApi'.
const pokeApi = {};

// Define a function to convert PokeAPI detail data into a Pokemon object.
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon(); // Create a new Pokemon object.

    // Set the properties of the Pokemon object based on PokeAPI details.
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    // Extract the types and set them in the Pokemon object.
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types; // Get the primary type.
    
    pokemon.types = types; // Set all types.
    pokemon.type = type; // Set the primary type.

    // Set the photo URL of the Pokemon from PokeAPI details.
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon; // Return the constructed Pokemon object.
}

// Define a method 'getPokemonDetail' in the 'pokeApi' object.
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url) // Fetch the detailed data of the provided Pokemon.
        .then((response) => response.json()) // Convert the response to JSON.
        .then(convertPokeApiDetailToPokemon); // Convert the detailed data to a Pokemon object.
}

// Define a method 'getPokemons' in the 'pokeApi' object.
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url) // Fetch a list of Pokemon data.
        .then((response) => response.json()) // Convert the response to JSON.
        .then((jsonBody) => jsonBody.results) // Extract the list of Pokemon.
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Fetch detailed data for each Pokemon.
        .then((detailRequests) => Promise.all(detailRequests)) // Execute all detail requests concurrently.
        .then((pokemonsDetails) => pokemonsDetails); // Return the array of Pokemon objects with detailed data.
}