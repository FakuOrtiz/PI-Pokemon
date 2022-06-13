const { Router } = require('express');
const {
    getPokemons,
    getOnePokemon,
    postPokemons,
    getTypes
} = require("../controllers");

const router = Router();

router.get("/pokemons", getPokemons);
router.post("/pokemons", postPokemons);
router.get("/types", getTypes);
//A lo último porque es variable
router.get("/pokemons/:id", getOnePokemon);

module.exports = router;
