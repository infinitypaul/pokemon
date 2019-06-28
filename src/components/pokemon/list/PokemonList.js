import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios/index';
import pokemonContext from '../../../context/pokemonContext';

import PokemonCard from './card/PokemonCard'
import Filtering from "./filter/filtering";


const PokemonList = ( props ) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
    const typeUrl = 'https://pokeapi.co/api/v2/type/';
    const [pokemons, setPokeMon] = useState('');

    const pokemonCon = useContext(pokemonContext);
    async function fetchPokemon() {
        await axios.get(url).then((result)=>{
            setPokeMon(result.data);
        })
    }
     useEffect(() => {

         fetchPokemon();
    }, []);
    const typeHandler = (event) => {
         let typeProp = event.target.value.toLowerCase();
         if(typeProp === 'all'){
             fetchPokemon();
             return;
         }
        async function fetchPokemonType() {
            await axios.get(typeUrl+typeProp).then((result)=>{
                let pokemons = {
                    count : result.data.pokemon.length,
                    next:null,
                    previous:null,
                    results : []
                };
                 pokemons.results = result.data.pokemon.map(pokemon => ({
                    name: pokemon.pokemon.name,
                    url: pokemon.pokemon.url
                }));
                setPokeMon(pokemons);
            })
        }
        fetchPokemonType()
     };
    return (
        <React.Fragment>
            <Filtering typeHandler={typeHandler} />
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
        </React.Fragment>
    );
};

export default PokemonList;