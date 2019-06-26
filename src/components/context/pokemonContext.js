import React from 'react';

const pokemonContext = React.createContext({ status: false, mouseEnter: () => {} });

export default pokemonContext;