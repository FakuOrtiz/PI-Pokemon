import {
    GET_ALL_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    GET_ALL_TYPES,
    CREATE_POKEMON,
    DELETE_POKEMON,
    CLEAN_CACHE,
    FILTER_ALPHABET,
    FILTER_ORIGEN,
    CLEAN_CACHE_ALL,
    FILTER_ATTACK,
    FILTER_TYPE
} from "../actions"

const initialState = {
    pokemons: [],
    pokemonsFiltrados: [],
    pokemon: [],
    types: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS: return {
            ...state,
            pokemons: action.payload,
            pokemonsFiltrados: action.payload
        }
        case GET_POKEMON_BY_ID: return {
            ...state,
            pokemon: action.payload
        }
        case GET_POKEMON_BY_NAME: return {
            ...state,
            pokemon: action.payload
        }
        case GET_ALL_TYPES: return {
            ...state,
            types: action.payload
        }
        case CREATE_POKEMON: return {
            ...state,
            pokemons: [...state.pokemons, action.payload],
            pokemonsFiltrados: [...state.pokemons, action.payload]
        }
        case DELETE_POKEMON: return {
            ...state,
            pokemons: state.pokemons.filter(({id}) => id !== action.payload)
        }
        case CLEAN_CACHE: return {
            ...state,
            pokemon: []
        }
        case CLEAN_CACHE_ALL: return {
            ...state,
            pokemons: []
        }
        case FILTER_ALPHABET:
            let pokesAlpha;
            if (action.payload === "az") {
                pokesAlpha = state.pokemons.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                });
            } else {
                pokesAlpha = state.pokemons.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
            }
            // console.log(pokesAlpha)
            return {
                ...state,
                pokemonsFiltrados: pokesAlpha
            }
        case FILTER_ORIGEN:
            let pokesOrigen;
            if (action.payload === "originales") {
                pokesOrigen = state.pokemons.filter(p => !p.hasOwnProperty("createdInDB"));
            } else {
                pokesOrigen = state.pokemons.filter(p => p.createdInDB);
            }
            // console.log(pokesOrigen)
            return {
                ...state,
                pokemonsFiltrados: pokesOrigen
            }
        case FILTER_ATTACK:
            let pokesAttack;
            if (action.payload === "masAtaque") {
                pokesAttack = state.pokemons.sort((a, b) => b.attack - a.attack);
            } else {
                pokesAttack = state.pokemons.sort((a, b) => a.attack - b.attack);
            }
            // console.log(pokesAttack)
            return {
                ...state,
                pokemonsFiltrados: pokesAttack
            }
        case FILTER_TYPE:
            let pokesType;
            // eslint-disable-next-line array-callback-return
            pokesType = state.pokemons.filter(p => {
                if (p.createdInDB) {
                    for (let i = 0; i < p.types.length; i++) {
                        if (p.types[i].name === action.payload) return p
                    }
                }else{
                    return p.types.includes(action.payload)
                }
            });
            // console.log(pokesType)
            return {
                ...state,
                pokemonsFiltrados: pokesType
            }
        default: return state
    }
}

export default rootReducer