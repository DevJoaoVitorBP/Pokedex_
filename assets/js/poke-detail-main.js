// Selects the HTML element with the ID 'pokemonAbout' which will be used to display Pokémon details.
const pokemonDetailsContainer = document.getElementById('pokemonAbout');

// Gets the parameters from the URL of the current window.
const params = new URLSearchParams(window.location.search);

// Gets the value of the 'pokemon' parameter from the URL.
const pokemonName = params.get('pokemon');

// Makes a request to the PokeAPI's API to fetch Pokémon details.
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then(response => response.json()) // Converts the response to JSON.
  .then(data => {
        // Extracts relevant information from the 'data' object.

     // Maps the Pokémon's abilities and formats them into a comma-separated string.
    const abilities = data.abilities.map(ability => ability.ability.name).join(', ');

    // Function to format the Pokémon's height.
    const formatHeight = (heightInDecimeters) => {
      if (heightInDecimeters < 10) {
        return `${heightInDecimeters * 10} cm`;
      } else {
        return `${(heightInDecimeters / 10).toFixed(1)} m`;
      }
    };
    
    // Function to format the Pokémon's weight.
    const formatWeight = weightInHectograms => {
      return `${(weightInHectograms / 10).toFixed(1)} kg`;
    };

    // Formats the Pokémon's height and weight.
    const heightFormatted = formatHeight(data.height);
    const weightFormatted = formatWeight(data.weight);

    // Creates a string containing the HTML to be displayed on the page.
    const html = `
      <div class="header">
        <span class="number">#${data.id}</span>
        <div class="details">
          <span class="name">${data.name}</span>
          ${data.types.map((type) => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
        </div>
      </div>
      <img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt="${data.name}" width="100%">
      <div class="card-body">
        <h1>About: </h1>
        <p>Species: <span>${data.species.name}</span></p>
        <p>Height: <span>${heightFormatted}</span></p>
        <p>Weight: <span>${weightFormatted}</span></p>
        <p>Abilities: <span>${abilities}</span></p>
      </div>
    `;
     // Inserts the generated HTML into the selected container.
    pokemonDetailsContainer.innerHTML = html;
  })
  .catch(error => {
    // In case of an error, displays an error message in the container.
    console.error('Error fetching Pokémon data:', error);
    pokemonDetailsContainer.innerHTML = '<p>Error fetching Pokémon data.</p>';
  });
