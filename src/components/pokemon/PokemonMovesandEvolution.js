import React, { useEffect, useState} from 'react';
import axios from "axios";

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

const PokemonMovesAndEvolution = props => {
    const [pokemonMoves, setPokemonMoves] = useState({
        name: '',
        imageUrl:'',
        types:[],
        moves: [],
        evoChains: []
    });
    const pokemonMovesUrl = `https://pokeapi.co/api/v2/pokemon/${props.match.params.pokemonIndex}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${props.match.params.pokemonIndex}`;
    async function fetchPokemonDetails() {
        const pokemonRes =  await axios.get(pokemonMovesUrl);
        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;
        const types = pokemonRes.data.types.map(type => type.type.name);
        const moves = pokemonRes.data.moves.map(move => {
            return move.move.name.toLowerCase()
                .split('-')
                .map(s => s.charAt(0)
                    .toUpperCase()+ s.substring(1))
                .join(" ")
        });
        let evoChains = [];


        const res = await axios.get(pokemonSpeciesUrl);

       await axios.get(res.data.evolution_chain.url)
            .then((response) => {
                //console.log(response.data.chain);
                let evolve = response.data.chain;


                do {
                    let evoDetails = evolve.evolution_details[0];

                    //if(typeof evoDetails !== "undefined"){
                    evoChains.push({
                        "species_name": evolve.species.name,
                        "species_url": evolve.species.url.split('/')[evolve.species.url.split('/').length - 2],
                        "min_level": !evoDetails ? 1 : evoDetails.min_level,
                        "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                        "item": !evoDetails ? null : evoDetails.item,
                        "extra": false
                    });
                    let numberOfEvolutions = evolve['evolves_to'].length;
                    if(numberOfEvolutions > 1) {
                        for (let i = 1;i < numberOfEvolutions; i++) {
                            evoChains.push({
                                "species_name": evolve.evolves_to[i].species.name,
                                "species_url": evolve.evolves_to[i].species.url.split('/')[evolve.evolves_to[i].species.url.split('/').length - 2],
                                "trigger_name": !evolve.evolves_to[i].evolution_details[0]? null : evolve.evolves_to[i].evolution_details[0].trigger.name,
                                "min_level": !evolve.evolves_to[i].evolution_details[0] ? 1 : evolve.evolves_to[i].evolution_details[0].min_level,
                                "item": !evolve.evolves_to[i].evolution_details[0]? null : evolve.evolves_to[i].evolution_details[0].item,
                                "extra": true

                            });
                        }
                    }
                    //console.log(evoDetails);
                    //}


                    evolve = evolve.evolves_to[0];
                } while (!!evolve && evolve.hasOwnProperty('evolves_to'));
            });
       console.log(evoChains);
        setPokemonMoves({
            name,
            imageUrl,
            types,
            moves,
            evoChains
        });
    };
    useEffect(() => {
        fetchPokemonDetails();

    }, []);

    return (
        <div className="col">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-5">
                            <h5>{props.match.params.pokemonIndex}</h5>
                        </div>
                        <div className="col-7">
                            <div className="float-right">
                                <p className="lead">
                                    {pokemonMoves.name.toLowerCase()
                                        .split(' ')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                        .join(' ')
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className=" col-md-3 ">
                            <img
                                alt={pokemonMoves.name}
                                src={pokemonMoves.imageUrl}
                                className="card-img-top rounded mx-auto mt-2"
                            />
                        </div>
                        <div className="col-md-9">
                            <h4>Move Lists</h4>
                            <div className="row align-items-center">
                                <div className='col-12 col-md-12'>
                                    { pokemonMoves.moves.map(move => (
                                        <span
                                            key={ move }
                                            className="badge badge-primary badge-pill mr-1"
                                            style={ {
                                                backgroundColor: `#${ TYPE_COLORS[pokemonMoves.types[0]] }`,
                                                color: 'white'
                                            } }
                                        >
                                      { move }
                                  </span>
                                    )) }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="card-body">
                    <h5 className="card-title text-center">
                        Evolution Information
                    </h5>
                    <div className="row">
                        { pokemonMoves.evoChains.map(chain => (
                            <div className={`col-md-3 col-sm-3 mb-6`}  key={chain.species_name}>
                                <div className="card">
                                    <div className="card-header">
                                        #{chain.species_url}
                                    </div>
                                    <img className="card-img-top rounded mx-auto mt-2" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species_url}.png`} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{chain.species_name.toLowerCase()
                                            .split(' ')
                                            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                            .join(' ') }
                                        </h5>
                                        <p className="card-text">Evolution is a key part of the Pokémon games. Evolving Pokémon makes them stronger and often gives them a wider movepool.</p>
                                        <ul className="list-group">
                                            {(chain.min_level !== null)?(
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    Level
                                                    <span className="badge badge-primary badge-pill">{chain.min_level}</span>
                                                </li>
                                            ): null}
                                            {(chain.trigger_name !== null)?(
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Trigger
                                                <span className="badge badge-success badge-pill">
                                                    {chain.trigger_name.toLowerCase()
                                                        .split('-')
                                                        .map(s => s.charAt(0)
                                                            .toUpperCase()+ s.substring(1))
                                                        .join(" ")}
                                                </span>
                                            </li>
                                            ): null}
                                            {(chain.item !== null)?(
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                Item
                                                <span className="badge badge-info badge-pill">{
                                                    chain.item.name.toLowerCase()
                                                        .split('-')
                                                        .map(s => s.charAt(0)
                                                            .toUpperCase()+ s.substring(1))
                                                        .join(" ")
                                                }</span>
                                            </li>
                                            ): null}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        )) }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PokemonMovesAndEvolution;