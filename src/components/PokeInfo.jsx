import React, {Component} from 'react'
import './PokeInfo.css'
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

class PokeInfo extends Component {
    render() {
        return (
            <div className="poke-info center-div">
                <span className="badge badge-primary centro">{this.props.pokemon.name}<span key="id" className="badge badge-pill badge-success">#{this.props.pokemon.id}</span></span>
                <div className="imageDiv">

                    <img
                        className="imagenPokemon"
                        src={this.props.pokemon.sprites.front_gif} alt={this.props.pokemon.name}
                        onMouseOver={e => (e.currentTarget.src = this.props.pokemon.sprites.back_gif)}
                         onMouseOut={e => (e.currentTarget.src = this.props.pokemon.sprites.front_gif)}
                    />
                </div>
                <ul>
                    <li key="altura">Altura: {this.props.pokemon.height/10}m</li>
                    <li key="peso">Peso: {this.props.pokemon.weight/10}kg</li>
                    <li key="tipo">Tipo:
                        {this.props.pokemon.types.map((element) => {
                            return <span key={element.type.name} className={"badge badge-info m-2 "} id={element.type.name}>{element.type.name}</span>
                        })}
                    </li>
                </ul>
                {this.props.pokemon.initialized && <RadarChart
                    cx={125} cy={125} outerRadius={75} width={250} height={250}
                    data={this.props.pokemon.statsData}>
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#fff'}}/>
                    <PolarRadiusAxis/>
                    <Radar name={"Pokemon"} dataKey="A" stroke="#000000" fill="#aaff00" fillOpacity={0.8}/>
                </RadarChart>}
            </div>
        );
    }
}

export default PokeInfo;