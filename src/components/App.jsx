import React, { Component } from 'react';
import './App.css';
import PokeInfo from "./PokeInfo";
import 'bootstrap/dist/css/bootstrap.min.css';
import LazyLoad from 'react-lazy-load'

class App extends Component {
    state = {
        pokemons : [],
        pokemonInfo: {
            name: "Loading...",
            sprites: {
                front_gif: "https://media.giphy.com/media/qSrK4HvZyLMJi/giphy.gif",
                back_gif: "https://media.giphy.com/media/qSrK4HvZyLMJi/giphy.gif"
            },
            id: 0,
            height: 0,
            weight: 0,
            types: [],
            stats: [{stat: {name: ""}, baseStat: 0}],
            statsData: [],
            initialized: false
        },
        pokemonNames:[],
        next: null,
    };
    limit = 0;

    constructor(props) {
        super(props);
        this.state = {
            pokemons : [],
            pokemonNames:[],
            pokemonInfo: {
                name: "Loading...",
                sprites: {
                    front_gif: "https://media.giphy.com/media/qSrK4HvZyLMJi/giphy.gif",
                    back_gif: "https://media.giphy.com/media/qSrK4HvZyLMJi/giphy.gif"
                },
                id: 0,
                height: 0,
                weight: 0,
                types: [],
                stats: [{stat: {name: ""}, baseStat: 0}],
                statsData: [],
                initialized: false
            },
            hasMore : true,
            next: ""
        };
        this.showInfoHandler = this.showInfoHandler.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        var Pokedex = require('pokeapi-js-wrapper')
        this.P = new Pokedex.Pokedex({
            protocol: 'https'
        });
    }

    render() {
    return (
      <div className="App">
          <div id="pokelist" className="poke-list" ref={pokeList => this.pokeList = pokeList}>
                  {this.state.pokemons.map((pokemon, index) => {
                      return(
                      <LazyLoad
                          key={"lazy-" + pokemon.id}
                        width={96}
                        height={96}
                        debounce={false}>
                          <img width={96} height={96} key={pokemon.id} src={`sprites/pokemon/${pokemon.id}.png`} alt={pokemon.name} onClick={() => this.showInfoHandler(pokemon)}/>
                      </LazyLoad>);
                  })}
          </div>
        {/*<PokeList pokemons={this.state.pokemons} showPokemon={this.showInfoHandler}/>*/}
        <PokeInfo pokemon={this.state.pokemonInfo}/>
      </div>
    );
    }

    componentDidMount() {
        this.limit = Math.floor(((window.innerHeight * 0.8)/96) * this.pokeList.clientWidth/96) + 10; // Very hacky form to do it, clientHeight doesn't work accordingly
        if (this.limit < 20){
            this.limit = 20;
        }
        this.fetchMoreData();
    }

    showInfoHandler(pokemon){
        this.P.getPokemonByName(pokemon.name).then(result => {
            result.sprites.front_gif = "https://play.pokemonshowdown.com/sprites/xyani/" + pokemon.name + ".gif";
            result.sprites.back_gif = "https://play.pokemonshowdown.com/sprites/xyani-back/" + pokemon.name + ".gif";
            result.statsData = result.stats.map(stat => {
                return {subject: stat.stat.name, A: stat.base_stat, fullMark: 186}
            });
            result.initialized = true;
            this.setState({
                pokemonInfo: result,
                selected: pokemon.id
            })
        })
    }

    fetchMoreData (){
        if (this.state.next === "") {
            this.P.getPokemonsList().then(response => {
                console.log(response);
                let pokemons = response.results.map(pokemon => {
                    let elem = pokemon.url.split("/");
                    pokemon.id = Number(elem[elem.length-2]);
                    return pokemon;
                });
                this.setState({
                    pokemons: pokemons,
                    next: response.next,
                    hasNext: false,
                })
            })
        }
    }
}

export default App;
