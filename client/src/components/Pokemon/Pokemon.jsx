import React from "react";
import { connect } from "react-redux";
import PokemonCard from "../PokemonCard/PokemonCard";

export function Pokemon(props) {

  return (
    <div>
      {
      props.pokemons && props.pokemons?.map((p) => {
          if (p.createdInDB) {
            return (
                <PokemonCard key={p.id} id={p.id} name={p.name} image={p.image} types={p.types?.map(t => t.name)}/>
            );
          }else{
            return (
                <PokemonCard key={p.id} id={p.id} name={p.name} image={p.image} types={p.types} />
            );
          }
      })}
    </div>
  );
}

export const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemons,
  };
};

export default connect(mapStateToProps, null)(Pokemon);