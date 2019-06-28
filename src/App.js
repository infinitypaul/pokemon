import React, {Suspense} from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
//import PokeBoard from './container/pokemon/PokeBoard';
//import PokemonMovesAndEvolution from './components/pokemon/details/PokemonMovesandEvolution';
import Main from "./container/layout/Main";

const PokeBoard = React.lazy(() => {
    return import('./container/pokemon/PokeBoard');
});

const PokemonMovesAndEvolution = React.lazy(() => {
    return import('./components/pokemon/details/PokemonMovesandEvolution');
});

function App() {
    return <BrowserRouter>
        <Main>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route exact path='/pokemon/details/:pokemonIndex' component={ PokemonMovesAndEvolution }/>
                    <Route path='/' component={ PokeBoard }/>
                    <Redirect to="/" />
                </Switch>
            </Suspense>

        </Main>
    </BrowserRouter>
}

export default App;
