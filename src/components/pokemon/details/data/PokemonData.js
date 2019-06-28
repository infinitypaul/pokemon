import React from 'react';

const PokemonData = props => {
    return (
        <div className="card-body">
            <h5 className="card-title text-center">
                Data
            </h5>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Height:</h6>
                        </div>
                        <div className="col-md-7">
                            <h6 className="float-left">{props.pokemon.height} ft.</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Weight:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{props.pokemon.weight} lbs.</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Cache Rate:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{props.specy.catchRate} %.</h6>
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
                                        width: `${ props.specy.genderRatioFemale }%`,
                                        backgroundColor: '#c2185b'
                                    } }
                                    aria-valuenow="15"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ props.specy.genderRatioFemale }</small>
                                </div>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={ {
                                        width: `${ props.specy.genderRatioMale }%`,
                                        backgroundColor: '#1976d2'
                                    } }
                                    aria-valuenow="30"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ props.specy.genderRatioMale }</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Egg Groups:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{props.specy.eggGroup}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Hatch Steps:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{props.specy.hatchSteps}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">Abilities:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{props.pokemon.abilities}</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="float-right">EVS:</h6>
                        </div>

                        <div className="col-md-7">
                            <h6 className="float-left">{props.pokemon.evs}</h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PokemonData;