import React, {useEffect, useState} from 'react';
import axios from "axios";
import classes from './PokemonEvolution.module.css';

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
            console.log(evoChains);
            setPokemonEvo({
                evoChains
            })

        }
        fetchPokemonEvolution();
    }, [props.url]);
    return (

        <div className="card-body" >
            <h5 className="card-title text-center">
                Evolution Information
            </h5>
            <div className="row" style={{ height : '400px'}}>
                { pokemonEvo.evoChains.map((chain, index, arr) => (
                    <React.Fragment key={chain.species_name}>
                       {/* {console.log(arr[index===arr.length-1?0:index+1].extra)}*/}
                {(chain.extra) ? (
                    <React.Fragment>
                    <div className={classes.item}>
                        <div>
                            <img width={2} className="card-img-top rounded mx-auto mt-2" src="https://static.thenounproject.com/png/143046-200.png" alt={chain.species_name} />
                            <p>
                                { arr[index===arr.length-1?0:index+1].trigger_name.toLowerCase()
                                    .split('-')
                                    .map(s => s.charAt(0)
                                        .toUpperCase() + s.substring(1))
                                    .join(" ")
                                } {
                                (
                                    Object.keys(arr[index===arr.length-1?0:index+1].item).length !== 0)
                                    ? arr[index===arr.length-1?0:index+1]
                                        .item.name
                                        .toLowerCase()
                                        .split('-')
                                        .map(s => s.charAt(0)
                                            .toUpperCase() + s.substring(1))
                                        .join(" ")
                                    : null
                            }
                            </p>
                        </div>
                        <div>&nbsp;</div>
                        <div>
                            <img width={2} className="card-img-top rounded mx-auto mt-2" src="https://static.thenounproject.com/png/143042-200.png" alt={chain.species_name} />
                            <p className="card-title">
                                { chain.trigger_name.toLowerCase()
                                    .split('-')
                                    .map(s => s.charAt(0)
                                        .toUpperCase() + s.substring(1))
                                    .join(" ")
                                }
                            </p>
                        </div>
                    </div>
                        <div className={classes.item}>
                            <div>
                                <img className="card-img-top rounded mx-auto mt-2" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species_url}.png`} alt={arr[index===arr.length-1?0:index+1].species_name} />
                                <h5 className="card-title">{arr[index===arr.length-1?0:index+1].species_name.toLowerCase()
                                    .split(' ')
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ') }
                                </h5>
                            </div>
                            <div>&nbsp;</div>
                            <div>
                                <img className="card-img-top rounded mx-auto mt-2" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species_url}.png`} alt={chain.species_name} />
                                <h5 className="card-title">{
                                    chain.species_name.toLowerCase()
                                        .split(' ')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                        .join(' ')
                                }
                                </h5>
                            </div>
                        </div>
                    </React.Fragment>

                    ) : (
                    <React.Fragment>
                        {
                            ((index !== arr.length - 1) || !arr[index===0?arr.length-1:index-1].extra) ? (
                                <div className={classes.item}>
                                    <div>
                                        <img className="card-img-top rounded mx-auto mt-2" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species_url}.png`} alt={chain.species_name} />
                                        <h5 className="card-title">{chain.species_name.toLowerCase()
                                            .split(' ')
                                            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                            .join(' ') }
                                        </h5>
                                    </div>
                                </div>
                            ) : null
                        }

                        {
                            ((index === arr.length - 1) || arr[index===arr.length-1?0:index+1].extra) ? null :
                                (
                                    <div className={classes.item}>
                                        {console.log(arr[index===arr.length-1?0:index+1].extra)}
                                        <div>
                                            <img width={2} className="card-img-top rounded mx-auto mt-2" src="https://static.thenounproject.com/png/13487-200.png" alt={chain.species_name} />
                                            <p className="card-title">
                                                { chain.trigger_name
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                        }

                    </React.Fragment>
                )}
                    </React.Fragment>
                )) }


            </div>
        </div>
    )
};

export default PokemonEvolution;