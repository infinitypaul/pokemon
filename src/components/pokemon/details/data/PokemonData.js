import React, { useEffect, useState } from 'react';
import axios from "axios";

const PokemonData = props => {
    const [species, setSpecies] = useState({
        eggGroup:'',
        genderRatioMale:'',
        genderRatioFemale:'',
        hatchSteps:'',
        catchRate: '',
        description:''
    });
    useEffect(()=>{
        if(props.url === '') return;
        async function fetchPokemonSpecies() {
            await axios
                .get(props.url)
                .then((result)=>{
                    // console.log(result.data);
                    let description = '';
                    result.data.flavor_text_entries.some(flavor => {
                        if(flavor.language.name === 'en'){
                            description = flavor.flavor_text;
                        }
                        return false;
                    });
                    const femaleRate = result.data['gender_rate'];
                    const genderRatioFemale = 12.5 * femaleRate;
                    const genderRatioMale = 12.5 * (8 - femaleRate);

                    const catchRate = Math.round((100/225) * result.data['capture_rate']);

                    const eggGroup = result.data['egg_groups'].map(group=>{
                        return group.name
                            .toLowerCase()
                            .split('-')
                            .map(s => s.charAt(0)
                                .toUpperCase()+ s.substring(1))
                            .join(" ")
                    }).join(", ");

                    const hatchSteps = 255 * (result.data['hatch_counter'] + 1);

                    setSpecies({
                        description,
                        genderRatioFemale,
                        genderRatioMale,
                        eggGroup,
                        catchRate,
                        hatchSteps,
                    })
                })
        }
        fetchPokemonSpecies()
    }, [props.url]);
    return (
        <React.Fragment>
            <div className="row mt-2">
                <div className="col">
                    <p className="p-2">{species.description}</p>
                </div>
            </div>
            <hr />
        <div className="card-body">
            <h5 className="card-title text-center">
                Data
            </h5>
            <div className="row">
                <div className="col-md-12">

                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Cache Rate:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{species.catchRate} %.</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Gender Ratio:</h6>
                        </div>

                        <div className="col-md-7">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={ {
                                        width: `${ species.genderRatioFemale }%`,
                                        backgroundColor: '#c2185b'
                                    } }
                                    aria-valuenow="15"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ species.genderRatioFemale }</small>
                                </div>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={ {
                                        width: `${ species.genderRatioMale }%`,
                                        backgroundColor: '#1976d2'
                                    } }
                                    aria-valuenow="30"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ species.genderRatioMale }</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Egg Groups:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{species.eggGroup}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Hatch Steps:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{species.hatchSteps}</h6>
                        </div>
                    </div>

                </div>
            </div>

        </div>
            <div className="card-footer text-muted">
                Data From{ ' ' }
                <a href="https://pokeapi.co/" target="_blank"  rel="noopener noreferrer" className="card-link">
                    PokeAPI.co
                </a>
            </div>
        </React.Fragment>
    );
};

export default PokemonData;