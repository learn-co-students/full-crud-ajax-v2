function handleSearchInput(event, allPokemonData, pokemonContainer) {
  const filteredPokes = allPokemonData.filter(pokeObj => {
    return pokeObj.name.includes(event.target.value.toLowerCase())
  })
  const filteredPokeHTML = renderAllPokemon(filteredPokes)
  pokemonContainer.innerHTML = filteredPokeHTML ? filteredPokeHTML : `<p><center>There are no Pokémon here</center></p>`
}


function handlePokemonSubmit(event, arr) {
  event.preventDefault();
  const newPokemon = grabFormData()
  console.log('nnn', newPokemon)
  postNewPokemon(newPokemon)
}

function postNewPokemon(newPokemon){
  const reqObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newPokemon)
  }

  fetch('http://localhost:3000/pokemon', reqObj)
    .then(resp => resp.json())
    .then(data => { 
      debugger;
      renderNewPokemon(data)
    })
}

function renderNewPokemon(newPokemonData){
    const pokemonContainer = document.querySelector('#pokemon-container')
    const pokeHtml = renderSinglePokemon(newPokemonData)
    pokemonContainer.insertAdjacentHTML('beforeend', pokeHtml)
}




function grabFormData(){
  const nameEl = document.querySelector('#name-input')
  const spriteUrlEl = document.querySelector('#sprite-input')
  const name = nameEl.value
  const spriteUrl = spriteUrlEl.value

  nameEl.value = ''
  spriteUrlEl.value = ''

  return { name, sprites : { front: spriteUrl }}
}


function handleImgClick(event, allPokemonData) {
  if (event.target.dataset.action === 'flip') {
    const clickedPokemon = allPokemonData.find((pokemonObject) => pokemonObject.id == event.target.dataset.id)
    event.target.src = (event.target.src === clickedPokemon.sprites.front ? clickedPokemon.sprites.back : clickedPokemon.sprites.front)
  }
}

/************************* Helper Fns for Producing HTML **********************/
function renderAllPokemon(pokemonArray) {
  return pokemonArray.map(renderSinglePokemon).join('')
}

function renderSinglePokemon(pokemon) {
  return (`
  <div class="pokemon-card">
    <div class="pokemon-frame">
      <h1 class="center-text">${pokemon.name}</h1>
      <div class="pokemon-image">
        <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
      </div>
      <button data-action="delete" class="pokemon-button">Delete</button>
    </div>
  </div>`)
}
