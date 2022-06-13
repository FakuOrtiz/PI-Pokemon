import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./PokemonCard.css"

let i = 0;
export default class PokemonCard extends Component {
  render() {
    return (
      <div className="contenedorCard">
          <NavLink className="navlink" to={`/pokemons/${this.props.id}`}>
            <img className="imagenCard" src={this.props.image} alt={this.props.name?.toLowerCase()}/>
            <h4 className="nombreCard">{this.props.name?.toUpperCase()}</h4>
          </NavLink>
          {this.props.types?.map((t) => {
            i++;
            return <h5 key={i} className="typesCard">{t}</h5>;
          })}
      </div>
    );
  }
}
