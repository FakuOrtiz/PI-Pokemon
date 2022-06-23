import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getPokemonByName } from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar() {
  let [name, setName] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  let pokemon = useSelector(state => state.pokemon);

  let handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") return dispatch(getPokemonByName(name));
    alert("Debes ingresar el nombre de un pokémon");
  }

  return (
    <div className="contenedorSearchbar">
      <div className="contenedorButtonCrear">
        <button onClick={() => history.push("/crear")} className="buttonCrear">CREAR POKÉMON</button>
      </div>

      <form className="contenedorButtonSearch" onSubmit={(e) => handleSubmit(e)}>
        <input className="inputSearch"
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setName(e.target.value?.toLowerCase())}
        />
          <button disabled={name.length === 0} type="submit" className="buttonSearch">Buscar</button>
      </form>

      {pokemon.id &&  <Redirect to={`/pokemons/${pokemon.id}`} />}
    </div>
  );
}
