import React, { Component } from 'react'
import SearchBar from '../searchBar/SearchBar'
import titulo from "../../assets/img/titulo.png"
import { Switch, Route, NavLink } from 'react-router-dom'
import "./NavBar.css"


export default class NavBar extends Component {
  render() {
    return (
        <div className='contenedorNavbar'>
            <NavLink to="/pokemons">
                <img src={titulo} alt="titulo" className='tituloNavbar'/>
            </NavLink>
            <Switch>
                <Route exact path={"/pokemons"}>
                    <SearchBar />
                </Route>
            </Switch>
        </div>
    )
  }
}
