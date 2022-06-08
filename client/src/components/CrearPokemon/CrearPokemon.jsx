import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createPokemon } from '../../redux/actions';


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
    const history = useHistory();

    let handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        validateFinal(input, setInput);
        dispatch(createPokemon(input));
        alert("¡Pokémon creado correctamente!");
        history.push("/pokemons");
    }
    

  return (
      <div>
          <button onClick={() => history.push("/pokemons")}>BACK</button>
        <form>
            <div>
                {errors.name && <p>{errors.name}</p>}
                <label>Nombre: </label>
                <input type="text" name='name' value={input.name} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.hp && <p>{errors.hp}</p>}
                <label>HP: </label>
                <input type="number" name='hp' value={input.hp} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.attack && <p>{errors.attack}</p>}
                <label>Ataque: </label>
                <input type="number" name='attack' value={input.attack} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.defense && <p>{errors.defense}</p>}
                <label>Defensa: </label>
                <input type="number" name='defense' value={input.defense} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.speed && <p>{errors.speed}</p>}
                <label>Velocidad: </label>
                <input type="number" name='speed' value={input.speed} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.height && <p>{errors.height}</p>}
                <label>Altura: </label>
                <input type="number" name='height' value={input.height} onChange={e => handleInputChange(e)}/>
            </div>
            <br/>
            <div>
                {errors.weight && <p>{errors.weight}</p>}
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
                <label>Tipo/s: </label>
                <select name="type" id='selectBox' onChange={() => checkTypes(input, setInput)}>
                    {
                        type?.map(t => {
                            return (
                                <option value={t.id} key={t.id}>{t.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div>
                {
                    Object.keys(errors).length === 0 ? 
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Crear</button>
                    :
                    <>Crear</>
                } 
            </div>
        </form>
    </div>
  )
}

let validate = input => {
    let errors = {};
    if (!input.name || input.name.length > 25) errors.name = "El nombre debe tener entre 1 y 25 caracteres"
    if (input.hp > 1000 || input.hp < 1) errors.hp = "El valor debe estar entre 1 y 1000" 
    if (input.attack > 1000 || input.attack < 1) errors.attack = "El valor debe estar entre 1 y 1000" 
    if (input.defense > 1000 || input.defense < 1) errors.defense = "El valor debe estar entre 1 y 1000" 
    if (input.speed > 1000 || input.speed < 1) errors.speed = "El valor debe estar entre 1 y 1000" 
    if (input.height > 1000 || input.height < 1) errors.height = "El valor debe estar entre 1 y 1000" 
    if (input.weight > 1000 || input.weight < 1) errors.weight = "El valor debe estar entre 1 y 1000" 
    return errors;
}

let checkTypes = (input, setInput) => {
    let selectBox = document.getElementById("selectBox");
    let valorDelBox = selectBox.options[selectBox.selectedIndex].value;
    if (input.type.length === 3) {
        return null;
    }
    setInput({
        ...input,
        type: [...input.type, Number(valorDelBox)]
    })
}

let validateFinal = (input, setInput) => {
    if (!/(https?:\/\/.*\.(?:png|jpg))/i.test(input.image)) input.image = "";
    if (input.type.length < 1) {
        // let x = 10001;
        // setInput({
        //     ...input,
        //     type: [...input.type, x]
        // })
        input.type.push(10001)
    };
}

//999999999