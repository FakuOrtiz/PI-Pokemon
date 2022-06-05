const axios = require("axios");
const {Pokemon, Tipo} = require("../db.js");


module.exports = {
    getPokemons: async (req, res, next) => {
        let {name} = req.query;
        if (!name || name === undefined) {
            try {
                let {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
                
                let urls = [];
                data.results?.map(p => urls.push(p.url));
    
                let pokemons = [];
                for (let i = 0; i < urls.length; i++) {
                    let {data} = await axios.get(urls[i]);
                    pokemons.push({
                        id: data.id,
                        nombre: data.name,
                        hp: data.stats[0].base_stat,
                        ataque: data.stats[1].base_stat,
                        defensa: data.stats[2].base_stat,
                        velocidad: data.stats[5].base_stat,
                        altura: data.height,
                        peso: data.weight,
                        imagen: data.sprites.front_default
                    })
                }
                res.json(pokemons)
            } catch (error) {
                next(error);
            }
        }else{
            try {
                let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                
                res.json({
                    id: data.id,
                    nombre: data.name,
                    hp: data.stats[0].base_stat,
                    ataque: data.stats[1].base_stat,
                    defensa: data.stats[2].base_stat,
                    velocidad: data.stats[5].base_stat,
                    altura: data.height,
                    peso: data.weight,
                    imagen: data.sprites.front_default
                });
            } catch (error) {
                next(error);
            }
        }
    },
    getOnePokemon: async (req, res, next) => {
        let {idPokemon} = req.params;
        //Si tiene "-", es un pokemon creado, sino viene de la API
        if (idPokemon.includes("-")) {
            try {
                let data = await Pokemon.findByPk({
                    where: {
                        id: id
                    },
                    include: { //Lo traigo linkeado a la tabla Tipo con su atributo
                        model: Tipo,
                        attributes: ["nombre"]
                    }
                });
                res.json(data);
            } catch (error) {
                next(error);
            }
        }else{
            try {
                let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);

                res.json({
                    id: data.id,
                    nombre: data.name,
                    hp: data.stats[0].base_stat,
                    ataque: data.stats[1].base_stat,
                    defensa: data.stats[2].base_stat,
                    velocidad: data.stats[5].base_stat,
                    altura: data.height,
                    peso: data.weight,
                    imagen: data.sprites.front_default
                });
            } catch (error) {
                next(error);
            }
        }
    },
    postPokemons: async (req, res, next) => {
        let {nombre, hp, ataque, defensa, velocidad, altura, peso, imagen} = req.body;
        if (!nombre) return res.status(404).send("Falta enviar datos obligatorios");
        try {
            let pokemon = {nombre, hp, ataque, defensa, velocidad, altura, peso, imagen};
            let newPoke = await Pokemon.create(pokemon);
            res.json(newPoke);
        } catch (error) {
            next(error)
        }
    },
    getTypes: async (req, res, next) => {
        try {
            let {data} = await axios.get("https://pokeapi.co/api/v2/type/")
                
            let urls = [];
            data.results?.map(p => urls.push(p.url));

            for (let i = 0; i < urls.length; i++) {
                let {data} = await axios.get(urls[i]);
                await Tipo.findOrCreate({
                    where: {
                        id: data.id,
                        nombre: data.name
                    }
                })
            }

            let tipos = await Tipo.findAll();
            res.json(tipos);
        } catch (error) {
            next(error);
        }
    }
}