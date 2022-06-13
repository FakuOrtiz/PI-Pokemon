import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import error404 from "../../assets/img/404.png"
import { cleanCache } from '../../redux/actions'
import "./Error404.css"

export default function Error404() {

    const history = useHistory()
    const dispatch = useDispatch()

    let handleClick = () => {
      history.push("/pokemons");
      dispatch(cleanCache())
    }

  return (
    <div className='contenedor404'>
        <button onClick={handleClick} className="buttonBack button404">{"<-"} BACK</button>
        <img src={error404} alt="" className='error404'/>
    </div>
  )
}
