import React, {Component} from 'react'
import './PokeInfo.css'

class PokeInfo extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="poke-info center-div">
                <img src={this.props.pokemon.sprites.front_default} alt={this.props.pokemon.name} onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}/>
                <ul>
                    <li key="nombre">Nombre: {this.props.pokemon.name}</li>
                    <li key="altura">Altura: {this.props.pokemon.height}</li>
                    <li key="peso">Peso: {this.props.pokemon.weight}</li>
                    <li key="tipo">Tipo:
                        {this.props.pokemon.types.map((element) => {
                            return <span key={element.type.name} className="badge badge-info m-2">{element.type.name}</span>
                        })}
                    </li>
                    <li key="stats">Stats:
                        <ul>
                            {this.props.pokemon.stats.map((stat) => {
                                return <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
                            })}
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default PokeInfo;