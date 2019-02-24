import React, {Component} from 'react'
import './PokeInfo.css'

class PokeInfo extends Component {
    render() {
        return (
            <div className="poke-info center-div">
                <img src={this.props.pokemon.sprites.front_default} alt={this.props.pokemon.name}/>
                <ul>
                    <li key="id" className="badge badge-info">#{this.props.pokemon.id}</li>
                    <li key="nombre">Nombre: {this.props.pokemon.name}</li>
                    <li key="altura">Altura: {this.props.pokemon.height/10}m</li>
                    <li key="peso">Peso: {this.props.pokemon.weight/10}kg</li>
                    <li key="tipo">Tipo:
                        {this.props.pokemon.types.map((element) => {
                            return <span key={element.type.name} className={"badge badge-info m-2 "} id={element.type.name}>{element.type.name}</span>
                        })}
                    </li>
                    <li key="stats" id="stats">Stats:
                        <ul>
                            {this.props.pokemon.stats.map((stat) => {
                                return <li key={stat.stat.name} className="badge badge-primary m-1 ">{stat.stat.name}: <span key={stat.stat.name + "span"} className="badge badge-pill badge-secondary">{stat.base_stat}</span></li>
                            })}
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default PokeInfo;