import React, { Component } from "react";
import { NavLink } from "react-router-dom";

let i = 0;
export default class PokemonCard extends Component {
  render() {
    return (
      <div key={this.props.id}>
        <NavLink to={`/pokemons/${this.props.id}`}>
          <img src={this.props.image} alt={this.props.name?.toLowerCase()} />
        </NavLink>

        <NavLink to={`/pokemons/${this.props.id}`}>
          <h4>{this.props.name?.toUpperCase()}</h4>
        </NavLink>
        
        {this.props.types?.map((t) => {
          i++;
          return <p key={i}>{t}</p>;
        })}
      </div>
    );
  }
}
