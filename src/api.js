export function getPokemon(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((r) => {
            if (r.ok) return r.json();
            return r.text().then((error) => {
                // console.log(r)  // Response{... status: 404...}
                // console.log(error) // "Not Found"
                throw error;
            });
        })
        .then(pokemon => {
            return {
                name: pokemon.name,
                sprite: pokemon.sprites.front_default
            }
        })
}