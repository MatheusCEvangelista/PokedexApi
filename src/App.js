import React, { useEffect, useState } from "react";
import './style.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [error, setError] = useState(null);

  function loadAPI() {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokemon não encontrado');
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        setPokemon(json);
        setError(null);
      })
      .catch(err => {
        console.log(err);
        setPokemon(null);
        setError(err.message);
      });
  }

  useEffect(() => {
    if (pokemonName) {
      loadAPI();
    }
  }, [pokemonName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pokemonName.trim()) {
      loadAPI();
    } else {
      setError("Por favor, insira o nome do Pokémon.");
    }
  };

  return (
    <div className="container">
      <header>
        <strong>Pokemon Api</strong>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Pokémon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <div className="error">{error}</div>}
      {pokemon && (
        <div>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div>Name: {pokemon.name}</div>
          <div>Nº: {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10}kg</div>
          <div>Altura: {pokemon.height / 10}m</div>
          <div>Tipos: {pokemon.types.map(type => type.type.name).join(', ')}</div>
          <div>Habilidades: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</div>
        </div>
      )}
      {!pokemon && !error && <div>Digite o nome do pokemon para buscar.</div>}
    </div>
  );
}

export default App;