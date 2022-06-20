/* eslint-disable array-callback-return */
import {
    GET_ALL_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    GET_ALL_TYPES,
    CREATE_POKEMON,
    CLEAN_CACHE,
    ORDER_ALPHABET,
    FILTER_ORIGEN,
    CLEAN_CACHE_ALL,
    ORDER_ATTACK,
    FILTER_TYPE,
    SET_CURRENT_PAGE,
    DELETE_POKE
} from "../actions"

const initialState = {
    pokemons: [],
    pokemonsFiltrados: [],
    pokemon: [],
    types: {},
    page: 1
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS: return {
            ...state,
            pokemons: action.payload,
            pokemonsFiltrados: action.payload,
            page: 1
        }
        case GET_POKEMON_BY_ID: 
        if (action.payload.msj) {
            let error = {error: "No se encontró el pokémon"}
            return {
                ...state,
                pokemon: error,
                page: 1
            }
        }
        return {
            ...state,
            pokemon: action.payload,
            page: 1
        }
        case GET_POKEMON_BY_NAME: 
        if (action.payload.msj) {
            let error = {error: "No se encontró el pokémon"}
            return {
                ...state,
                pokemon: error,
                page: 1
            }
        }
        return {
            ...state,
            pokemon: action.payload,
            page: 1
        }
        case GET_ALL_TYPES: return {
            ...state,
            types: action.payload
        }
        case CREATE_POKEMON: return {
            ...state,
            pokemons: [...state.pokemons, action.payload],
            pokemonsFiltrados: [...state.pokemons, action.payload],
            page: 1
        }
        case DELETE_POKE: return {
            ...state,
            page: 1
        }
        case CLEAN_CACHE: return {
            ...state,
            pokemon: [],
            page: 1
        }
        case CLEAN_CACHE_ALL: return {
            ...state,
            pokemons: [],
            page: 1
        }
        case ORDER_ALPHABET:
            let pokesAlpha;
            if (action.payload === "az") {
                pokesAlpha = state.pokemonsFiltrados.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                });
            } else {
                pokesAlpha = state.pokemonsFiltrados.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
            }
            // console.log(pokesAlpha)
            return {
                ...state,
                pokemonsFiltrados: pokesAlpha,
                page: 1
            }
        case FILTER_ORIGEN:
            if (action.payload === "default") {
                return {
                    ...state,
                    pokemonsFiltrados: state.pokemons,
                    page: 1
                }
            }
            let pokesOrigen;
            if (action.payload === "originales") {
                pokesOrigen = state.pokemons.filter(p => !p.hasOwnProperty("createdInDB"));
            } else {
                pokesOrigen = state.pokemons.filter(p => p.createdInDB);
            }
            // console.log(pokesOrigen)
            if (pokesOrigen.length === 0) {
                alert("No hay pokémons creados");
                return {
                    ...state,
                    pokemonsFiltrados: state.pokemons,
                    page: 1
                }
            }
            return {
                ...state,
                pokemonsFiltrados: pokesOrigen,
                page: 1
            }
        case ORDER_ATTACK:
            let pokesAttack;
            if (action.payload === "masAtaque") {
                pokesAttack = state.pokemonsFiltrados.sort((a, b) => b.attack - a.attack);
            } else {
                pokesAttack = state.pokemonsFiltrados.sort((a, b) => a.attack - b.attack);
            }
            // console.log(pokesAttack)
            return {
                ...state,
                pokemonsFiltrados: pokesAttack,
                page: 1
            }
        case FILTER_TYPE:
            if (action.payload === "default") {
                return {
                    ...state,
                    pokemonsFiltrados: state.pokemons,
                    page: 1
                }
            }
            let pokesType;
            pokesType = state.pokemons.filter(p => {
                if (p.createdInDB) {
                    for (let i = 0; i < p.types.length; i++) {
                        if (p.types[i].name === action.payload) return p
                    }
                }else{
                    return p.types.includes(action.payload)
                }
            });
            // console.log(pokesType);
            if (pokesType.length === 0) {
                alert(`No hay pokémons de tipo ${action.payload}`);
                return {
                    ...state,
                    pokemonsFiltrados: state.pokemons,
                    page: 1
                }
            }
            return {
                ...state,
                pokemonsFiltrados: pokesType,
                page: 1
            }
        case SET_CURRENT_PAGE: return {
            ...state,
            page: action.payload
        }
        default: return state
    }
}

export default rootReducer