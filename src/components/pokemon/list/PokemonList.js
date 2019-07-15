import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from '../../../axios-pokemon';
import pokemonContext from '../../../context/pokemonContext';

import PokemonCard from './card/PokemonCard'
import Filtering from "./filter/filtering";
import Pagination from "../../../container/layout/Pagination";

const PokemonList = ( props ) => {
    const [pokemons, setPokeMon] = useState('');

    const pokemonCon = useContext(pokemonContext);
    async function fetchPokemon(url='pokemon?offset=0&limit=12') {
        await axios.get(url).then((result)=>{
            let pokemons = {
                count : result.data.count,
                next:result.data.next === null ? result.data.next : result.data.next.split('/')[5],
                previous:result.data.previous === null ? result.data.previous : result.data.previous.split('/')[5],
                results : result.data.results
            };
            setPokeMon(pokemons);
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
            await axios.get('type/'+typeProp).then((result)=>{
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
                <Pagination next={pokemons.next} previous={pokemons.previous} onClick={fetchPokemon} {...props}/>
            </div>
        </React.Fragment>
    );
};

export default PokemonList;