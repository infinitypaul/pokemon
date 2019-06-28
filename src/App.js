import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import PokeBoard from './container/pokemon/PokeBoard';
import PokemonMovesAndEvolution from './components/pokemon/details/PokemonMovesandEvolution';
import Main from "./container/layout/Main";

function App() {
    return <BrowserRouter>
        <Main>
                <Switch>
                    <Route exact path='/pokemon/details/:pokemonIndex' component={ PokemonMovesAndEvolution }/>
                    <Route path='/' component={ PokeBoard }/>
                    <Redirect to="/" />
                </Switch>
        </Main>
    </BrowserRouter>
}

export default App;
