import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { cleanCache, getPokemonById } from "../../redux/actions";
import Error404 from "../error404/Error404";
import Loading from "../loading/Loading";
import "./PokemonDetails.css";


export default function PokemonDetails() {
  let { id } = useParams();
  
  const dispatch = useDispatch();
  const history = useHistory();
  const pokemon = useSelector((state) => state.pokemon);
  
  useEffect(() => {
    dispatch(getPokemonById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  let cleanAndBack = () => {
    history.push("/pokemons");
    dispatch(cleanCache());
  };

  let i = 0;
  return (
    pokemon.msj ?
    <Error404/>
    :
    pokemon.length === 0 ? 
    <Loading/>
    :
    <div>
      <button onClick={cleanAndBack} className="buttonBack">{"<-"} BACK</button>
      {
          <div className="contenedorDetails">
            {pokemon.createdInDB ? null : <p>#{pokemon.id}</p>}
            <img src={pokemon.image} className="imagenDetails" alt="pokemon" />
            <h4>{pokemon.name?.toUpperCase()}</h4>
            <div className="tiposDetails">
              {pokemon.createdInDB ? (
                pokemon.types?.map((t) => {
                  i++;
                  return <p key={i}>{t.name}</p>;
                })
              ) : (
                <>
                  {pokemon.types?.map((t) => {
                    i++;
                    return <p key={i}>{t}</p>;
                  })}
                </>
              )}
            </div>
            <div className="contenedorDetails2">
              <p>HP: {pokemon.hp}</p>
              <p>Velocidad: {pokemon.speed}</p>
              <p>Ataque: {pokemon.attack}</p>
              <p>Defensa: {pokemon.defense}</p>
              <p>Altura: {pokemon.height}</p>
              <p>Peso: {pokemon.weight}</p>
            </div>
          </div>
      }
    </div>
  );
}
