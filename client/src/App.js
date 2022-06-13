import Pokemon from "./components/pokemon/Pokemon";
import Inicio from "./components/inicio/Inicio";
import NavBar from "./components/navBar/NavBar";
import CrearPokemon from "./components/crearPokemon/CrearPokemon";
import {Switch, Route} from "react-router-dom";
import PokemonDetails from "./components/pokemonDetails/PokemonDetails";
import "./style/App.css"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route exact path="/pokemons">
          <NavBar />
          <Pokemon />
        </Route>
        <Route exact path="/pokemons/:id">
          <NavBar />
          <PokemonDetails />
        </Route>
        <Route exact path="/crear">
          <NavBar />
          <CrearPokemon />
        </Route>
        <Route path="*">
          <Inicio />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
