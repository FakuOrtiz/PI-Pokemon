/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { cleanCache, cleanCacheAll, deletePokemon, getPokemonById } from "../../redux/actions";
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
  }, [dispatch]);

  let cleanAndBack = () => {
    history.push("/pokemons");
    dispatch(cleanCache());
  };

  let handleDelete = () => {
    history.push("/pokemons");
    alert("¡Pokémon eliminado!")
    dispatch(cleanCache());
    dispatch(cleanCacheAll());
    dispatch(deletePokemon(id));
  }

  let i = 0;
  return (
    pokemon.error ?
    <Error404 /> :
    pokemon.length === 0 ? 
    <Loading/>
    :
    <>
      <button onClick={cleanAndBack} className="buttonBack">{"<-"} BACK</button>
      <div>
        {
          <div className="contenedorDetails">
              {pokemon.createdInDB ? null : <p>#{pokemon.id}</p>}
              <img src={pokemon.image} className="imagenDetails" alt="pokemon" />
              <h4>{pokemon.name?.toUpperCase()}</h4>
              <div className="tiposDetails">
                {
                    pokemon.types?.map((t) => {
                      i++;
                      return (
                        <p key={i}>{pokemon.createdInDB ? t.name : t}</p>
                        );
                    })
                }
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
        {
          pokemon.createdInDB && (
            <div className="contenedorDelete">
              <button onClick={() => handleDelete()} className="btnDelete">BORRAR</button>
            </div>
          )
        }
      </div>
    </>
  );
}
