import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons, getAllTypes } from "../../redux/actions";

export default function Inicio() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  return (
    <div>
      <NavLink to="/pokemons">
        <button>COMENZAR</button>
      </NavLink>
    </div>
  );
}

/* <button onClick={() => dispatch(createPokemon({
    "name": "facu6",
    "hp": 1000,
    "defense": 500,
    "attack": 999,
    "speed": 777,
    "height": 182,
    "weight": 93,
    "types": [1, 2]
}))}>CREAR POKEMON</button> */
