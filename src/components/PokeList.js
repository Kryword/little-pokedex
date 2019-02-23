import React, {Component} from 'react'
import './PokeList.css'

class PokeList extends Component{
    render() {
        return (
            <div className="poke-list center-div">
                {this.props.pokemons.map((pokemon, key)=>{
                    return (
                        <img key={key} src={pokemon.sprite} alt={pokemon.name} onClick={() => this.handleClick(pokemon)}/>
                    );
                })}
            </div>
        );
    }

    handleClick(pokemon){
        this.props.showPokemon(pokemon)
    }
}

export default PokeList;