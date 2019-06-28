import React, { useEffect, useState} from 'react';
import axios from "axios";


import PokemonMove from "./data/PokemonMove";
import PokemonEvolution from "./data/PokemonEvolution";

const PokemonMovesAndEvolution = props => {
    const [pokemonMoves, setPokemonMoves] = useState({
        name: '',
        imageUrl:'',
        url:'',
        types:[],
        moves: [],
        evoChains: []
    });

    useEffect(() => {
        const pokemonMovesUrl = `https://pokeapi.co/api/v2/pokemon/${props.match.params.pokemonIndex}`;
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
            const url = pokemonRes.data.species.url;

            setPokemonMoves({
                name,
                imageUrl,
                url,
                types,
                moves
            });
        };
        fetchPokemonDetails();

    }, [props.match.params.pokemonIndex]);

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
                            <PokemonMove
                                pokemon={pokemonMoves}
                            />
                            <hr/>
                            <PokemonEvolution
                                url={pokemonMoves.url}
                            />
            </div>
        </div>
    )
};

export default PokemonMovesAndEvolution;