const axios = require("axios");
const {Pokemon, Type} = require("../db.js");


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
                        name: data.name,
                        hp: data.stats[0].base_stat,
                        attack: data.stats[1].base_stat,
                        defense: data.stats[2].base_stat,
                        speed: data.stats[5].base_stat,
                        height: data.height,
                        weight: data.weight,
                        image: data.sprites.front_default
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
                    name: data.name,
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    speed: data.stats[5].base_stat,
                    height: data.height,
                    weight: data.weight,
                    image: data.sprites.front_default
                });
            } catch (error) {
                res.status(500).send("No se encuentra el pokemon solicitado")
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
                        id: idPokemon
                    },
                    include: { //Lo traigo linkeado a la tabla Type con su atributo
                        model: Type,
                        attributes: ["name"]
                    }
                });
                res.json(data);
            } catch (error) {
                res.status(500).send("No se encuentra el pokemon solicitado");
            }
        }else{
            try {
                let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);

                res.json({
                    id: data.id,
                    name: data.name,
                    hp: data.stats[0].base_stat,
                    attack: data.stats[1].base_stat,
                    defense: data.stats[2].base_stat,
                    speed: data.stats[5].base_stat,
                    height: data.height,
                    weight: data.weight,
                    image: data.sprites.front_default
                });
            } catch (error) {
                res.status(500).send("No se encuentra el pokemon solicitado");
            }
        }
    },
    postPokemons: async (req, res, next) => {
        //Los types llegan como un array de IDs
        let {name, hp, attack, defense, speed, height, weight, image, types} = req.body;
        if (!image || image === undefined) {
            image = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/201.png";
        }
        try {
            let pokemon = {name, hp, attack, defense, speed, height, weight, image, types};
            let newPoke = await Pokemon.create(pokemon);
            await newPoke.addType(types);
            res.json(newPoke);
        } catch (error) {
            next(error)
        }
    },
    getTypes: async (req, res, next) => {
        let allTipos = await Type.findAll();
            if (allTipos.length === 0) {
                try {
                    let {data} = await axios.get("https://pokeapi.co/api/v2/type/");
        
                    let urls = [];
                    data.results?.map(p => urls.push(p.url));
        
                    for (let i = 0; i < urls.length; i++) {
                        let {data} = await axios.get(urls[i]);
                        await Type.findOrCreate({
                            where: {
                                id: data.id,
                                name: data.name
                            }
                        })
                    }
        
                    let tipos = await Type.findAll();
                    res.json(tipos);
                } catch (error) {
                    next(error);
                }
            }else{
                res.json(allTipos);
            }
    }
}