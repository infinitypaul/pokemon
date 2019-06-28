import React  from 'react';
import Nav from "./Nav";

const Main = props => {
    return (
        <div className="App">
            <Nav/>
            <div className="container">
                {props.children}
            </div>
        </div>
    )
};
export default Main;