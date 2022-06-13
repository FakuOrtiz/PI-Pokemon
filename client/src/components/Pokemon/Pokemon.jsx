import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonCard from "../pokemonCard/PokemonCard";
import Loading from "../loading/Loading";
import "./Pokemon.css"
import { cleanCacheAll, filterByAlphabet, filterByAttack, filterByOrigen, filterByType, getAllPokemons, getAllTypes } from "../../redux/actions";

export default function Pokemon() {
  let [page, setPage] = useState(0);
  let [/*filtrados*/, setFiltrados] = useState();

  let pokemons = useSelector(state => state.pokemons);
  let pokemonsFiltrados = useSelector(state => state.pokemonsFiltrados);
  let types = useSelector(state => state.types);
  const dispatch = useDispatch();


  useEffect(() => {
    if (pokemons.length < 1) dispatch(getAllPokemons())
    dispatch(getAllTypes());
  }, [dispatch, pokemons.length]);

  const pokePerPage = () => {
    return pokemonsFiltrados.slice(page, page + 12);
  }

  const allPokemons = pokePerPage();

  
  let nextPage = () => {
    setPage(page + 12)
  }

  let prevPage = () => {
    setPage(page - 12);
  }

  let handleAlphabet = (e) => {
    dispatch(filterByAlphabet(e.target.value));
    //Necesita otro cambio para que se renderize el estado anterior
    setFiltrados(e.target.value);
    setPage(0);
  }

  let handleOrigen = (e) => {
    dispatch(filterByOrigen(e.target.value));
    setFiltrados(e.target.value);
    setPage(0);
  }

  let handleAttack = (e) => {
    dispatch(filterByAttack(e.target.value));
    setFiltrados(e.target.value);
    setPage(0);
  }

  let handleType = (e) => {
    dispatch(filterByType(e.target.value));
    setFiltrados(e.target.value);
    setPage(0);
  }

  let handleReset = () => {
    dispatch(cleanCacheAll());
    dispatch(getAllPokemons())
  }


  return (
    pokemons.length < 2 ?
    <Loading/> :
    <>
      <div>
        <select defaultValue="Ordenar alfabeticamente:" name='order-alphabet' onChange={e => handleAlphabet(e)}>
            <option disabled>Ordenar alfabeticamente:</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
        </select>

        <select defaultValue="Ordenar por origen:" name='order-origen' onChange={e => handleOrigen(e)}>
            <option disabled>Ordenar por origen:</option>
            <option value="originales">Originales</option>
            <option value="creados">Creados</option>
        </select>

        <select defaultValue="Ordenar por ataque:" name='order-attack' onChange={e => handleAttack(e)}>
            <option disabled>Ordenar por ataque:</option>
            <option value="masAtaque">Mayor ataque</option>
            <option value="menosAtaque">Menor ataque</option>
        </select>

        <select defaultValue="Ordenar por tipo:" name='order-type' onChange={e => handleType(e)}>
          <option disabled>Ordenar por tipo:</option>
        {
          types && types.map(t => {
            return (
              <option value={t.name} key={t.id}>{t.name}</option>
            )
          })
        }
        </select>
        {/*AGREGAR UNA FUNCION QUE HAGA CLEAN Y LLAME DE NUEVO LOS POKES */}
        <button onClick={() => handleReset()}>RESET</button>

    </div>
      <button disabled={page === 0} onClick={() => prevPage()}>PREV</button>
      <button disabled={allPokemons.length < 12} onClick={() => nextPage()}>NEXT</button>
      <div className="contenedorPokemon">
        {
        allPokemons && allPokemons.map((p) => {
            if (p.createdInDB) {
              return (
                  <PokemonCard key={p.id} id={p.id} name={p.name} image={p.image} types={p.types?.map(t => t.name)}/>
              );
            }else{
              return (
                  <PokemonCard key={p.id} id={p.id} name={p.name} image={p.image} types={p.types} />
              );
            }
        })}
      </div>
      <button disabled={page === 0} onClick={() => prevPage()}>PREV</button>
      <button disabled={allPokemons.length < 12} onClick={() => nextPage()}>NEXT</button>
    </>
  );

}