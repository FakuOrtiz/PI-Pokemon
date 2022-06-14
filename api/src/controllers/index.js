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
        image: data.sprites.other.home.front_default,
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
                let {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
                
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
                            name: name.toLowerCase()
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
                res.status(404).json({msj: "No se encuentra el pokemon solicitado"});
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
                res.status(404).json({msj: "No se encuentra el pokemon solicitado"});
            }
        }else{
            try {
                let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);

                res.json(crearObj(data));
            } catch (error) {
                console.log(error)
                res.status(404).json({msj: "No se encuentra el pokemon solicitado"});
            }
        }
    },

    postPokemons: async (req, res, next) => {
        //Los types llegan como un array de IDs
        let {name, hp, attack, defense, speed, height, weight, image, type} = req.body;
        if (!image || image === undefined || image === "" || !/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(image)) {
            image = "https://camo.githubusercontent.com/5d1fe59c3f0e4cfb5480bb8d8b1eb3ba58906acef846904fde8afcc5f773adbb/68747470733a2f2f692e696d6775722e636f6d2f583962314b75362e706e67";
        }
        if (!type || type.length === 0) type = [10001];
        try {
            name = name.toLowerCase();
            let pokemon = {name, hp, attack, defense, speed, height, weight, image, type};
            let newPoke = await Pokemon.create(pokemon);
            await newPoke.addType(type);
            res.json(newPoke);
        } catch (error) {
            next(error);
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