import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Sprite = styled.img`
    width: 5em;
    height: 5em;
    
`;

const Card = styled.div`
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    -moz-user-select: none;
    -website-user-select: none;
    -o-user-select: none;
     user-select: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:visited {
        text-decoration: none;
    }
`;
const PokemonCard = ( props ) => {
    //console.log(props.pokemon);
    const [imageLoading, setImageLoading] = useState(true);
    const [pokemonIndex, setPokemonIndex] = useState('');

    useEffect(() => {
        console.log('component did mount');
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