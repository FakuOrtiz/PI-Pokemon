/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../pokemonCard/PokemonCard.jsx";
import Loading from "../loading/Loading.jsx";
import "./Pokemon.css"
import { cleanCacheAll, orderByAlphabet, orderByAttack, filterByOrigen, filterByType, getAllPokemons, getAllTypes } from "../../redux/actions";
import Paginacion from "../paginacion/Paginacion.jsx";
import Error404 from "../error404/Error404.jsx";

export default function Pokemon() {
  let [/*filtrados*/, setFiltrados] = useState();


  let pokemon = useSelector(state => state.pokemon);
  let pokemons = useSelector(state => state.pokemons);
  let types = useSelector(state => state.types);
  let pokemonsFiltrados = useSelector(state => state.pokemonsFiltrados)
  const dispatch = useDispatch();


  let page = useSelector(state => state.page);
  let pokesPerPage = 12;

  const indexOfLastPoke = page * pokesPerPage; //2 * 12
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage; //24 - 12 = 12
  const currentPokes = pokemonsFiltrados.slice(indexOfFirstPoke, indexOfLastPoke); //12 - 24

  useEffect(() => {
    if (pokemons.length < 2) dispatch(getAllPokemons())
    dispatch(getAllTypes());
  }, [dispatch]);

  
  let handleAlphabet = (e) => {
    dispatch(orderByAlphabet(e.target.value));
    //Necesita otro cambio para que se renderize el estado anterior
    setFiltrados(e.target.value);
  }

  let handleOrigen = (e) => {
    dispatch(filterByOrigen(e.target.value));
    setFiltrados(e.target.value);
  }

  let handleAttack = (e) => {
    dispatch(orderByAttack(e.target.value));
    setFiltrados(e.target.value);
  }

  let handleType = (e) => {
    dispatch(filterByType(e.target.value));
    setFiltrados(e.target.value);
  }

  let handleReset = () => {
    dispatch(cleanCacheAll());
    dispatch(getAllPokemons());
  }

  return (
    pokemon.error ?
    <Error404 /> :
    pokemons.length < 2 ?
    <Loading/>
    :
    <>
      <div className="contenedorFiltros">
        <select defaultValue="Ordenar alfabeticamente:" name='order-alphabet' onChange={e => handleAlphabet(e)}>
            <option disabled>Ordenar alfabeticamente:</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
        </select>
        <select defaultValue="Ordenar por ataque:" name='order-attack' onChange={e => handleAttack(e)}>
            <option disabled>Ordenar por ataque:</option>
            <option value="masAtaque">Mayor ataque</option>
            <option value="menosAtaque">Menor ataque</option>
        </select>
        <select defaultValue="Filtrar por origen:" name='order-origen' onChange={e => handleOrigen(e)}>
            <option disabled>Filtrar por origen:</option>
            <option value="default">Todos</option>
            <option value="originales">Originales</option>
            <option value="creados">Creados</option>
        </select>
        <select defaultValue="Filtrar por tipo:" name='order-type' onChange={e => handleType(e)}>
          <option disabled>Filtrar por tipo:</option>
          <option value="default">Todos</option>
          {
            types?.map(t => {
              return (
                <option value={t.name} key={t.id}>{t.name}</option>
              )
            })
          }
        </select>
        <button className="buttonReset" onClick={() => handleReset()}>RESET</button>
      </div>
      <hr/>
      <Paginacion allPokes={pokemonsFiltrados.length}/>
      <div className="contenedorPokemon">
        {
          currentPokes?.map((p) => {
            return (
              <PokemonCard 
              key={p.id} 
              id={p.id} 
              name={p.name} 
              image={p.image} 
              types={p.createdInDB ? p.types?.map(t => t.name) : p.types} 
              />
            );
          })
        }
      </div>
      <Paginacion allPokes={pokemonsFiltrados.length}/>
    </>
  );
}