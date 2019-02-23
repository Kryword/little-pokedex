import React, { Component } from 'react';
import './App.css';
import PokeList from "./PokeList";
import PokeInfo from "./PokeInfo";
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  state = {
      pokemons : [],
      pokemonInfo: {}
  }
  constructor(props) {
    super(props);
    this.state = {
        pokemons : [],
        pokemonInfo: {
            name: "Loading...",
            sprites: {
                front_default: ""
            },
            id: 0,
            height: 0,
            weight: 0,
            types: [],
            stats: []
        }
    }
    this.showInfoHandler = this.showInfoHandler.bind(this);
  }

  render() {
    return (
      <div className="App">
        <PokeList pokemons={this.state.pokemons} showPokemon={this.showInfoHandler}/>
        <PokeInfo pokemon={this.state.pokemonInfo}/>
      </div>
    );
  }

  componentDidMount(){
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
        .then((response) => response.json())
        .then(data => {
            // eslint-disable-next-line
            data.results.map((pokemon, index) => {
                pokemon.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
            })
            this.setState({pokemons: data.results})
        });
  }

  showInfoHandler(pokemon){
      let sprite = pokemon.sprite;
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then(data => data.json())
          .then((result)=>{
              //console.log(result)
              this.setState({
                  pokemonInfo: result
              })}
          )
  }
}

export default App;
