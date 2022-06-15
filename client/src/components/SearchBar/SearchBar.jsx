import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getPokemonByName } from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar() {
  let [name, setName] = useState("");
  let [flag, setFlag] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();

  let pokemon = useSelector(state => state.pokemon);

  return (
    <div className="contenedorSearchbar">
      <div className="contenedorButtonCrear">
        <button onClick={() => history.push("/crear")} className="buttonCrear">CREAR POKÉMON</button>
      </div>
      <form className="contenedorButtonSearch"
        onSubmit={async (e) => {
          e.preventDefault();
          dispatch(getPokemonByName(name));
        }}
      >
        <input
        className="inputSearch"
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setName(e.target.value?.toLowerCase())}
        />
          <button disabled={name.length === 0} type="submit" onClick={() => setFlag(true)} className="buttonSearch">
            Buscar
          </button>
      </form>
      {/* El flag es pq cuando vuelvo con el botón "Back" desde Details, el pokemon.id da true en la condición,
       enotnces al renderizar a este componente, el flag es false, por lo que no redirecciona infinitamente*/}
      {pokemon.id && flag ? <Redirect to={`/pokemons/${pokemon.id}`} /> : null}
    </div>
  );
}
