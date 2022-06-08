import {
    GET_ALL_POKEMONS,
    GET_POKEMON_BY_ID,
    GET_POKEMON_BY_NAME,
    GET_ALL_TYPES,
    CREATE_POKEMON,
    DELETE_POKEMON,
    CLEAN_CACHE
} from "../actions"

const initialState = {
    pokemons: [],
    pokemon: {},
    types: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS: return {
            ...state,
            pokemons: action.payload
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
            pokemons: [...state.pokemons, action.payload]
        }
        case DELETE_POKEMON: return {
            ...state,
            pokemons: state.pokemons.filter(({id}) => id !== action.payload)
        }
        case CLEAN_CACHE: return {
            ...state,
            pokemon: {...action.payload}
        }
        default: return state
    }
}

export default rootReducer