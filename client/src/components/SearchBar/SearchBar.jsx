import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getPokemonByName } from "../../redux/actions";

export default function SearchBar() {
  let [name, setName] = useState("");
  let [flag, setFlag] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  let pokemon = useSelector((state) => state.pokemon);

  return (
    <div>
      <div>
        <button onClick={() => history.push("/crear")}>CREAR POKÉMON</button>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          dispatch(getPokemonByName(name));
        }}
      >
        <input
          type="text"
          placeholder="Nombre de pokémon..."
          onChange={(e) => setName(e.target.value?.toLowerCase())}
        />
        {name ? (
          <button type="submit" onClick={() => setFlag(true)}>
            Buscar
          </button>
        ) : null}
      </form>
      {/* El flag es pq cuando vuelvo con el botón "Back" desde Details, el pokemon.id da true en la condición,
       enotnces al renderizar a este componente, el flag es false, por lo que no redirecciona infinitamente*/}
      {pokemon.id && flag ? <Redirect to={`/pokemons/${pokemon.id}`} /> : null}
    </div>
  );
}
