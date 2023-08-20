// Seleciona o elemento HTML com o ID 'pokemonAbout' que será usado para exibir os detalhes do Pokémon.
const pokemonDetailsContainer = document.getElementById('pokemonAbout');

// Obtém os parâmetros da URL da janela atual.
const params = new URLSearchParams(window.location.search);

// Obtém o valor do parâmetro 'pokemon' da URL.
const pokemonName = params.get('pokemon');

// Faz uma requisição para a API da PokeAPI para obter os detalhes do Pokémon.
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  .then(response => response.json()) // Converte a resposta para JSON.
  .then(data => {
        // Extrai informações relevantes do objeto 'data'.

     // Mapeia as habilidades do Pokémon e as formata em uma string separada por vírgulas.
    const abilities = data.abilities.map(ability => ability.ability.name).join(', ');

    // Função para formatar a altura do Pokémon.
    const formatHeight = (heightInDecimeters) => {
      if (heightInDecimeters < 10) {
        return `${heightInDecimeters * 10} cm`;
      } else {
        return `${(heightInDecimeters / 10).toFixed(1)} m`;
      }
    };
    
    // Função para formatar o peso do Pokémon.
    const formatWeight = weightInHectograms => {
      return `${(weightInHectograms / 10).toFixed(1)} kg`;
    };

    // Formata a altura e o peso do Pokémon.
    const heightFormatted = formatHeight(data.height);
    const weightFormatted = formatWeight(data.weight);

    // Cria uma string contendo o HTML a ser exibido na página.
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
     // Insere o HTML criado no container selecionado.
    pokemonDetailsContainer.innerHTML = html;
  })
  .catch(error => {
    // Em caso de erro, exibe uma mensagem de erro no container.
    console.error('Erro ao buscar dados do Pokémon:', error);
    pokemonDetailsContainer.innerHTML = '<p>Erro ao buscar dados do Pokémon.</p>';
  });
