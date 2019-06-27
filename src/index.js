document.addEventListener('DOMContentLoaded', () => {
  let allPokemonData = []
  const pokemonContainer = document.querySelector('#pokemon-container')
  const pokemonSearchInput = document.querySelector('#pokemon-search-form')
  const pokemonCreateForm = document.querySelector('#pokemon-post-form')


  fetch('http://localhost:3000/pokemon')
    .then((responseObject) => responseObject.json())
    .then((pokeJSONData) => {
      allPokemonData = pokeJSONData
      pokemonContainer.innerHTML = renderAllPokemon(allPokemonData)
    })

    pokemonSearchInput.addEventListener('input', (event) => handleSearchInput(event, allPokemonData, pokemonContainer))

    pokemonContainer.addEventListener('click', (event) => handleImgClick(event, allPokemonData))

    pokemonCreateForm.addEventListener('submit', (event) => handlePokemonSubmit(event))
})
