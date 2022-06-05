const { Router } = require('express');
const {
    getPokemons,
    getOnePokemon,
    postPokemons,
    getTypes
} = require("../controllers/controllers");

const router = Router();

router.get("/pokemons", getPokemons);
router.post("/pokemons", postPokemons);
router.get("/types", getTypes);
//A lo último porque es variable
router.get("/pokemons/:idPokemon", getOnePokemon);

module.exports = router;
