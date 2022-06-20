const { Router } = require('express');
const {
    getPokemons,
    getOnePokemon,
    postPokemons,
    getTypes,
    deletePokemon,
    updatePokemon
} = require("../controllers");

const router = Router();

router.get("/pokemons", getPokemons);
router.post("/pokemons", postPokemons);
router.get("/types", getTypes);
router.get("/pokemons/:id", getOnePokemon);
router.delete("/pokemons/:id", deletePokemon);
router.patch("/pokemons/:id", updatePokemon)

module.exports = router;
