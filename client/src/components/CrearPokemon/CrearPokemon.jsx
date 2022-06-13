import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { cleanCacheAll, createPokemon, getAllPokemons } from '../../redux/actions';
import "./CrearPokemon.css";


export default function CrearPokemon() {
    let [input, setInput] = useState({
        name: "",
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
        image: "",
        type: []
    })
    let [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const type = useSelector(state => state.types);
    const pokemons = useSelector(state => state.pokemons);
    const history = useHistory();


    let handleInputChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    let handleSubmit = e => {
        e.preventDefault();
        dispatch(createPokemon(input));
        dispatch(cleanCacheAll());
        dispatch(getAllPokemons());
        history.push("/pokemons");
        alert("¡Pokémon creado correctamente!");
    }


    let validate = input => {
        let errors = {};
        let search = pokemons.find(e => e.name.toLowerCase() === input.name.toLowerCase());
        if (search) errors.name = "Ya existe un pokémon con ese nombre"
        if (!input.name || input.name.length > 20) errors.name = "El nombre debe tener entre 1 y 20 caracteres"
        if (input.name[0] === " ") errors.name = "El primer caracter no puede ser un espacio"
        if (input.hp > 1000 || input.hp < 1) errors.hp = "El valor debe estar entre 1 y 1000" 
        if (input.attack > 1000 || input.attack < 1) errors.attack = "El valor debe estar entre 1 y 1000" 
        if (input.defense > 1000 || input.defense < 1) errors.defense = "El valor debe estar entre 1 y 1000" 
        if (input.speed > 1000 || input.speed < 1) errors.speed = "El valor debe estar entre 1 y 1000" 
        if (input.height > 1000 || input.height < 1) errors.height = "El valor debe estar entre 1 y 1000" 
        if (input.weight > 1000 || input.weight < 1) errors.weight = "El valor debe estar entre 1 y 1000" 
        return errors;
    }
    

    let eliminarOpcion = e => {
        let filtrados = input.type?.filter(t => t !== Number(e.target.value))
        setInput({
            ...input,
            type: filtrados
        })
    }

    
    let checkTypes = (input, setInput) => {
        let selectBox = document.getElementById("selectBox");
        let boxValue = selectBox.options[selectBox.selectedIndex].value;
    
        if (input.type.length === 2) {
            return null;
        }
    
        setInput({
            ...input,
            type: [...input.type, Number(boxValue)]
        })
    }

  return (
    <div>
        <button onClick={() => history.push("/pokemons")} className="buttonBack">{"<-"} BACK</button>
        <form className='formCrear'>
            <div>
                {errors.name && <p className='error'>{errors.name}</p>}
                <label>Nombre: </label>
                <input type="text" name='name' value={input.name} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.hp && <p className='error'>{errors.hp}</p>}
                <label>HP: </label>
                <input type="number" name='hp' value={input.hp} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.attack && <p className='error'>{errors.attack}</p>}
                <label>Ataque: </label>
                <input type="number" name='attack' value={input.attack} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.defense && <p className='error'>{errors.defense}</p>}
                <label>Defensa: </label>
                <input type="number" name='defense' value={input.defense} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.speed && <p className='error'>{errors.speed}</p>}
                <label>Velocidad: </label>
                <input type="number" name='speed' value={input.speed} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.height && <p className='error'>{errors.height}</p>}
                <label>Altura: </label>
                <input type="number" name='height' value={input.height} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.weight && <p className='error'>{errors.weight}</p>}
                <label>Peso: </label>
                <input type="number" name='weight' value={input.weight} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                <label>URL de imagen: </label>
                <input type="text" name="image" value={input.image} onChange={e => handleInputChange(e)} />
            </div>
            <br/>
            <div>
                <label>Tipo/s (máx. 2): </label>
                <select name="type" id='selectBox' onChange={() => checkTypes(input, setInput)}>
                    <option value="10001">Elegir:</option>
                    {
                        type?.map(t => {
                            return (
                                <option value={t.id} key={t.id}>{t.name}</option>
                            )
                        })
                    }
                </select>
                {/*Acá me renderiza los nombres de los tipos seleccionados*/}
                {
                    input.type && input.type.map(tId => {
                        let tipo = type.find(obj => obj.id === tId);
                        return (
                            <div key={tipo.id}>
                            <p>{tipo.name}</p>
                            <button type='button' value={tipo.id} onClick={e => eliminarOpcion(e)}>X</button>
                            </div>
                        )
                    })
                }
            </div>
            <br/>
            <div>
                <button disabled={!input.name || Object.keys(errors).length > 0} type="submit" onClick={(e) => handleSubmit(e)} className="buttonCrear">Crear</button>
            </div>
        </form>
    </div>
  )
}