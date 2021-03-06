import React from 'react';
import { Route } from 'react-router-dom';
import PokemonList from '../../components/pokemon/list/PokemonList'
import PokemonDetails from '../../components/pokemon/details/PokemonDetails'
import PokemonContext from '../../context/pokemonContext'
import PokemonWaiting from "../../components/pokemon/PokemonWaiting";

const PokeBoard = (props) => {
    const mouseEnterHandler = (pokemonIndex) => {
        const formalUrl = props.location.pathname.split('/')[props.location.pathname.split('/').length - 1];
        if(formalUrl !== pokemonIndex){
            props.history.push();
            props.history.push({
                pathname: '/pokemon/'+pokemonIndex,
                search: props.location.search ?  props.location.search : null
            })
        }
    };
    return <div className="row">
        <PokemonContext.Provider value={{mouseEnter: mouseEnterHandler}}>
            <div className="col-md-7">
                <PokemonList {...props}/>
            </div>
            <div className="col-md-5" >

                    <PokemonWaiting {...props}  />
                <Route
                    exact
                    path={props.match.path + 'pokemon/:pokemonIndex'}
                    render={(props) => <PokemonDetails {...props}  />}
                />
            </div>
        </PokemonContext.Provider>
    </div>;
};
export default PokeBoard;