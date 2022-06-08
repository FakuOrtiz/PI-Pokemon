import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { cleanCache, getPokemonById } from "../../redux/actions";

export default function PokemonDetails() {
  let { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  let cleanAndBack = () => {
    history.push("/pokemons");
    //Borro el estado pokémon, para que al buscar otro pokémon, no aparezca el que busqué antes
    dispatch(cleanCache());
  };

  let pokemon = useSelector((state) => state.pokemon);

  let i = 0;
  return (
    <div>
      <button onClick={cleanAndBack}>BACK</button>
      {pokemon.name ? (
        <div>
          {pokemon.createdInDB ? null : <p>#{pokemon.id}</p>}
          <img src={pokemon.image} alt="pokemon" />
          <h4>{pokemon.name?.toUpperCase()}</h4>
          <div>
            Tipos:
            {pokemon.createdInDB ? (
              pokemon.types?.map((t) => {
                i++;
                return <p key={i}>{t.name}</p>;
              })
            ) : (
              <>
                {pokemon.types?.map((t) => {
                  i++;
                  return <p key={i}> {t} </p>;
                })}
              </>
            )}
          </div>
          <p>HP: {pokemon.hp}</p>
          <p>Ataque: {pokemon.attack}</p>
          <p>Defensa: {pokemon.defense}</p>
          <p>Velocidad: {pokemon.speed}</p>
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
        </div>
      ) : (
        <p>NO SE ECONTRÓ EL POKÉMON</p>
      )}
    </div>
  );
}
