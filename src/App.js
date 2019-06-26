import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import PokeBoard from './components/layout/PokeBoard';
import PokemonDetails from './components/pokemon/PokemonDetails';
import Main from "./components/layout/Main";

function App() {
    return <BrowserRouter>
        <Main>
                <Switch>
                    <Route path='/' component={ PokeBoard }/>
                    {/*<Route exact path='/pokemon/:pokemonIndex' component={ PokeBoard }/>*/}
                    <Route exact path='/pokemon/details/:pokemonIndex' component={ PokemonDetails }/>
                    <Redirect to="/" />
                </Switch>
        </Main>
    </BrowserRouter>
}

export default App;
