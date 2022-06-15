import axios from "axios"
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const CLEAN_CACHE = "CLEAN_CACHE";
export const CLEAN_CACHE_ALL = "CLEAN_CACHE_ALL";
export const ORDER_ALPHABET = "ORDER_ALPHABET";
export const FILTER_ORIGEN = "FILTER_ORIGEN";
export const ORDER_ATTACK = "ORDER_ATTACK";
export const FILTER_TYPE = "FILTER_TYPE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export function getAllPokemons() {
    return function(dispatch) {
        return fetch("http://localhost:3001/pokemons")
        .then(r => r.json())
        .then(data => dispatch({type: GET_ALL_POKEMONS, payload: data}))
        .catch(e => console.log(e))
    }
}

export function getPokemonById(id) {
    return function (dispatch) {
        return fetch(`http://localhost:3001/pokemons/${id}`)
        .then(r => r.json())
        .then(data => dispatch({type: GET_POKEMON_BY_ID, payload: data}))
        .catch(e => console.log(e))
    }
}

export function getPokemonByName(name) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/pokemons?name=${name}`)
        .then(r => r.json())
        .then(data => dispatch({type: GET_POKEMON_BY_NAME, payload: data}))
        .catch(e => console.log(e))
    }
}

export function getAllTypes() {
    return function(dispatch) {
        return fetch("http://localhost:3001/types")
        .then(r => r.json())
        .then(data => dispatch({type: GET_ALL_TYPES, payload: data}))
        .catch(e => console.log(e))
    }
}

export function createPokemon(values) {
    return async function(dispatch) {
        try {
            const {data} = await axios.post("http://localhost:3001/pokemons", values);
            dispatch({type: CREATE_POKEMON, payload: data});
        } catch (error) {
            console.log(error);
        }
    }
};

export const cleanCache = () => {
    return {type: CLEAN_CACHE}
}

export const cleanCacheAll = () => {
    return {type: CLEAN_CACHE_ALL}
}


export const orderByAlphabet = (payload) => {
    return {type: ORDER_ALPHABET, payload}
}

export const filterByOrigen = (payload) => {
    return {type: FILTER_ORIGEN, payload}
}

export const orderByAttack = (payload) => {
    return {type: ORDER_ATTACK, payload}
}

export const filterByType = (payload) => {
    return {type: FILTER_TYPE, payload}
}

export const setCurrentPage = (payload) => {
    return {type: SET_CURRENT_PAGE, payload}
}