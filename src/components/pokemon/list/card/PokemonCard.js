import React, { useState, useEffect } from 'react';
import { Sprite, Card, StyledLink } from '../../../../shared/styles'

const PokemonCard = ( props ) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [pokemonIndex, setPokemonIndex] = useState('');

    useEffect(() => {
        setPokemonIndex(props.pokemon.url.split('/')[props.pokemon.url.split('/').length - 2]);
    }, [props.pokemon.url]);

    return <React.Fragment>
        <div key={ props.pokemon.name } className='col-md-3 col-sm-3 mb-5'>
            <StyledLink to={`/pokemon/details/${pokemonIndex}`}>
                <Card className="card" onMouseEnter={props.onMouseEnter.bind(this, pokemonIndex)}>
                    <h5 className="card-header">{ pokemonIndex }
                    </h5>
                    { imageLoading ? (
                        <div className="spinner-border card-img-top rounded mx-auto d-block mt-2" role="status"
                             style={ {"width": '5em', "height": "5em"} }>
                            <span className="sr-only">Loading...</span>
                        </div>) : null }
                    <Sprite
                        className="card-img-top rounded mx-auto mt-2"
                        onLoad={ () => setImageLoading(false) }
                        onError={ (e)=> e.target.src='https://via.placeholder.com/120x120.png?text=No+Image'  }
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`}/>

                    <div className='card-body mx-auto'>
                        <h6 className="card-title">
                            { props.pokemon.name
                                .toLowerCase()
                                .split('-')
                                .map(s => s.charAt(0)
                                    .toUpperCase()+ s.substring(1))
                                .join(" ")
                            }
                        </h6>
                    </div>
                </Card>
            </StyledLink>
        </div>
    </React.Fragment>;
};

export default PokemonCard;