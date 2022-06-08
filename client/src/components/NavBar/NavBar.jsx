import React, { Component } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import titulo from "../../assets/img/titulo.png"
import { Switch, Route, NavLink } from 'react-router-dom'


export default class NavBar extends Component {
  render() {
    return (
        <div>
            <NavLink to="/pokemons">
                <img src={titulo} alt="titulo" />
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
