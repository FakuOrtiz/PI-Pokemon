import Pokemon from "./components/pokemon/Pokemon.jsx";
import Inicio from "./components/inicio/Inicio.jsx";
import NavBar from "./components/navBar/NavBar.jsx";
import CrearPokemon from "./components/crearPokemon/CrearPokemon.jsx";
import Footer from "./components/footer/Footer.jsx";
import PokemonDetails from "./components/pokemonDetails/PokemonDetails.jsx";
import {Switch, Route} from "react-router-dom";
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
          <Footer/>
        </Route>
        <Route exact path="/pokemons/:id">
          <NavBar />
          <PokemonDetails />
          <Footer/>
        </Route>
        <Route exact path="/crear">
          <NavBar />
          <CrearPokemon />
          <Footer/>
        </Route>
        <Route path="*">
          <Inicio />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
