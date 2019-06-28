import React from 'react';
import {TYPE_COLORS} from "../../../../shared/utility";

const PokemonMove = props => {
    return (
        <div className="card-body">
            <div className="row align-items-center">
                <div className=" col-md-3 ">
                    <img
                        alt={props.pokemon.name}
                        src={props.pokemon.imageUrl}
                        className="card-img-top rounded mx-auto mt-2"
                    />
                </div>
                <div className="col-md-9">
                    <h4>Move Lists</h4>
                    <div className="row align-items-center">
                        <div className='col-12 col-md-12'>
                            { props.pokemon.moves.map(move => (
                                <span
                                    key={ move }
                                    className="badge badge-primary badge-pill mr-1"
                                    style={ {
                                        backgroundColor: `#${ TYPE_COLORS[props.pokemon.types[0]] }`,
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
    )
};

export default PokemonMove;