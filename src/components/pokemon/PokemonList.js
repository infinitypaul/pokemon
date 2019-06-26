import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import pokemonContext from '../context/pokemonContext';

import PokemonCard from './PokemonCard'


const PokemonList = ( props ) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
    const [pokemons, setPokeMon] = useState('');

    const pokemonCon = useContext(pokemonContext);

     useEffect(() => {
         async function fetchPokemon() {
             await axios.get(url).then((result)=>{
                 console.log(result.data);
                 setPokeMon(result.data);
             })
         }
        console.log('me');
         fetchPokemon();
    }, []);
    return (
        <div className="row">
            {useMemo(
                () => (
                    pokemons ? pokemons.results.map(pokemon => (
                        <PokemonCard key={pokemon.name} pokemon={pokemon} onMouseEnter={pokemonCon.mouseEnter}/>
                    )): (<h1>Loading Pokemon</h1>)
                ),
                [pokemons, pokemonCon]
            )}
        </div>
    );
};

export default PokemonList;