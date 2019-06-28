import React, {useEffect, useState} from 'react';
import axios from "axios";

const PokemonEvolution = props => {
    const [pokemonEvo, setPokemonEvo] = useState({
        evoChains: []
    });
    useEffect(() => {
        if(props.url === '') return;
        async function fetchPokemonEvolution() {
            const res = await axios.get(props.url);
            let evoChains = [];
            await axios.get(res.data.evolution_chain.url)
                .then((response)=>{
                    let evolve = response.data.chain;
                    do {
                        let evoDetails = evolve.evolution_details[0];
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
                        evolve = evolve.evolves_to[0];
                    }while (!!evolve && evolve.hasOwnProperty('evolves_to'));
                });
            setPokemonEvo({
                evoChains
            })

        }
        fetchPokemonEvolution();
    }, [props.url]);
    return (

        <div className="card-body">
            <h5 className="card-title text-center">
                Evolution Information
            </h5>
            <div className="row">
                { pokemonEvo.evoChains.map(chain => (
                    <div className={`col-md-3 col-sm-3 mb-6`}  key={chain.species_name}>
                        <div className="card">
                            <div className="card-header">
                                #{chain.species_url}
                            </div>
                            <img className="card-img-top rounded mx-auto mt-2" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species_url}.png`} alt={chain.species_name} />
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
    )
};

export default PokemonEvolution;