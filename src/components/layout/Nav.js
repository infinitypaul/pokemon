import React from 'react';
import {Link} from "react-router-dom";

const Nav = ( ) => (
    <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <Link className="navbar-brand" to="/">Pokemon</Link>
        </nav>
    </React.Fragment>
);
export default Nav;