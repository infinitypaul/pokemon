import React from 'react';

const PokemonStat = props => {
    return (
        <React.Fragment>
        <div className="card-body ">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <img
                        src={ props.pokemon.imageUrl }
                        className='card-img-top rounded mx-auto mt-2'
                        onError={ (e)=> e.target.src='https://via.placeholder.com/120x120.png?text='+props.pokemon.name  }
                        alt={props.pokemon.name} />
                </div>
                <div className="col-md-9">
                    <h5 className="card-title mx-auto">
                        { props.pokemon.name.toLowerCase()
                            .split('-')
                            .map(s => s.charAt(0)
                                .toUpperCase() + s.substring(1))
                            .join(" ") }
                    </h5>

                    <div className="row align-item-center">
                        <div className="col-12 col-md-4">HP</div>
                        <div className="col-12 col-md-8">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={ {
                                        width: `${ props.pokemon.stats.hp }%`,
                                        backgroundColor: `#${props.pokemon.themeColor}`
                                    } }
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ props.pokemon.stats.hp }%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col-12 col-md-4">Attk</div>
                        <div className="col-12 col-md-8">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={ {
                                        width: `${ props.pokemon.stats.attack }%`,
                                        backgroundColor: `#${props.pokemon.themeColor}`
                                    } }
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ props.pokemon.stats.attack }%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col-12 col-md-4">Def</div>
                        <div className="col-12 col-md-8">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${ props.pokemon.stats.defence }%`,
                                        backgroundColor: `#${props.pokemon.themeColor}`
                                    }}
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ props.pokemon.stats.defence }%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col-12 col-md-4">SP Atk</div>
                        <div className="col-12 col-md-8">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={ {
                                        width: `${props.pokemon.stats.specialAttack}%`,
                                        backgroundColor: `#${props.pokemon.themeColor}`
                                    } }
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{props.pokemon.stats.specialAttack}%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col-12 col-md-4">Sp Def</div>
                        <div className="col-12 col-md-8">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={ {
                                        width: `${ props.pokemon.stats.specialDefence }%`,
                                        backgroundColor: `#${props.pokemon.themeColor}`
                                    } }
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ props.pokemon.stats.specialDefence }%</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col-12 col-md-4" title="Speed">Spd</div>
                        <div className="col-12 col-md-8">
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={ {
                                        width: `${ props.pokemon.stats.speed }%`,
                                        backgroundColor: `#${props.pokemon.themeColor}`
                                    } }
                                    aria-valuenow="25"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <small>{ props.pokemon.stats.speed }%</small>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </div>
            <hr />
        <div className="card-body">
            <div className="row mt-2">
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
            </React.Fragment>
    )
};

export default PokemonStat;