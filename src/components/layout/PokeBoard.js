import React from 'react';
import { Route } from 'react-router-dom';
import PokemonList from '../pokemon/PokemonList'
import PokemonDetails from '../pokemon/PokemonDetails'
import PokemonContext from '../context/pokemonContext'
import PokemonWaiting from "../pokemon/PokemonWaiting";

const PokeBoard = (props) => {
    const mouseEnterHandler = (pokemonIndex) => {
        const formalUrl = props.location.pathname.split('/')[props.location.pathname.split('/').length - 1];
        if(formalUrl !== pokemonIndex){
            props.history.replace('/pokemon/'+pokemonIndex);
        }
    };
    return <div className="row">
        <PokemonContext.Provider value={{status: false, mouseEnter: mouseEnterHandler}}>
            <div className="col-md-7">
                <PokemonList/>
            </div>
            <div className="col-md-5">
                    <PokemonWaiting  />
                <Route
                    exact
                    path={props.match.path + 'pokemon/:pokemonIndex'}
                    render={(props) => <PokemonDetails {...props} />}
                />


            </div>
        </PokemonContext.Provider>
    </div>;
};
export default PokeBoard;