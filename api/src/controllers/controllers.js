const axios = require("axios");
const {Pokemon, Type} = require("../db.js");

function crearObj(data) {
    return {
        id: data.id,
        name: data.name,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        image: data.sprites.front_default,
        types: data.types.map(t => t.type.name)
    }
}

module.exports = {
    getPokemons: async (req, res, next) => {
        let {name} = req.query;
        let pokemonsCreated = await Pokemon.findAll({
            include: { //Lo traigo linkeado a la tabla Type con sus atributos
                model: Type,
                attributes: ["name"]
            }
        });

        if (!name || name === undefined) {
            try {
                let {data} = await axios.get("https://pokeapi.co/api/v2/pokemon")
                
                let urls = [];
                data.results?.map(p => urls.push(p.url));
    
                let pokemons = [];
                for (let url of urls) {
                    let {data} = await axios.get(url);
                    pokemons.push(crearObj(data));
                }

                if (pokemonsCreated.length > 0) {
                    pokemonsCreated = pokemonsCreated.map(p => p.dataValues);
                    pokemons = pokemons.concat(pokemonsCreated);
                }

                res.json(pokemons)
            } catch (error) {
                next(error);
            }
        }else{ //Si me pasan ?name=...
            try {
                if (pokemonsCreated.length === 0) {
                    let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    res.json(crearObj(data));
                } else {
                    let find = await Pokemon.findOne({
                        where: {
                            name: name
                        },
                        include: {
                            model: Type,
                            attributes: ["name"]
                        }
                    })
                    if (find) {
                        return res.json(find);
                    }
                    let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    res.json(crearObj(data));
                }
            } catch (error) {
                res.status(500).send("No se encuentra el pokemon solicitado");
            }
        }
    },

    getOnePokemon: async (req, res, next) => {
        let {id} = req.params;
        //Si tiene "-", es un pokemon creado, sino viene de la API
        if (id.includes("-")) {
            try {
                let data = await Pokemon.findByPk(
                    id, {
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
                let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);

                res.json(crearObj(data));
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
        let tiposDB = await Type.findAll();
            if (tiposDB.length === 0) {
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
                res.json(tiposDB);
            }
    }
}