import React, { Component } from 'react';
import './App.css';
import PokeInfo from "./PokeInfo";
import InfiniteScroll from 'react-infinite-scroll-component'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
    state = {
        pokemons : [],
        pokemonInfo: {},
        next: null
    };
    limit = 0;
    constructor(props) {
    super(props);
    this.state = {
        pokemons : [],
        pokemonInfo: {
            name: "Loading...",
            sprites: {
                front_default: "https://gifimage.net/wp-content/uploads/2017/08/pokeball-gif-12.gif"
            },
            id: 0,
            height: 0,
            weight: 0,
            types: [],
            stats: []
        },
        hasMore : true,
        next: ""
    };
    this.showInfoHandler = this.showInfoHandler.bind(this);
    this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    render() {
    return (
      <div className="App">
          <div id="pokelist" className="poke-list" ref={pokeList => this.pokeList = pokeList}>
              <InfiniteScroll
                  dataLength={this.state.pokemons.length}
                  scrollableTarget={"pokelist"}
                  next={this.fetchMoreData}
                  hasMore={this.state.hasMore && this.state.pokemons.length < 787}
                  loader={<div className="loader">Loading...</div>}>
                  {this.state.pokemons.map((pokemon, index) => {
                      return <img key={index+"-pokemon"} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={pokemon.name} onClick={() => this.showInfoHandler(pokemon)}/>
                  })}
              </InfiniteScroll>
          </div>
        {/*<PokeList pokemons={this.state.pokemons} showPokemon={this.showInfoHandler}/>*/}
        <PokeInfo pokemon={this.state.pokemonInfo}/>
      </div>
    );
    }

    componentDidMount() {
        this.limit = Math.floor((this.pokeList.clientWidth/96) / 2 * this.pokeList.clientWidth/96); // Very hacky form to do it, clientHeight doesn't work accordingly
        if (this.limit < 20){
            this.limit = 20;
        }
        this.fetchMoreData();
    }

    showInfoHandler(pokemon){
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          .then(data => data.json())
          .then((result)=>{
              //console.log(result)
              this.setState({
                  pokemonInfo: result
              })}
          )
    }

    fetchMoreData (){
      if (this.state.next === "") {
          fetch("https://pokeapi.co/api/v2/pokemon?limit=" + this.limit)
              .then((response) => response.json())
              .then(data => {
                  // eslint-disable-next-line
                  this.setState({
                      pokemons: data.results,
                      next: data.next
                  })
              });
      }else if (this.state.next != null){
          fetch(this.state.next)
              .then((response) => response.json())
              .then(data => {
                  // eslint-disable-next-line
                  data.results.map((pokemon) => {
                      this.setState({
                          pokemons: [...this.state.pokemons, pokemon],
                          next: data.next,
                          hasMore: data.next != null
                      })
                  });
              });
      }
    }
}

export default App;
