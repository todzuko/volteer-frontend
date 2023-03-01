import React from 'react';

const VContext = React.createContext({
    loggedIn: false,
    setLoggedIn: (value: React.SetStateAction<boolean>) => {},
});

export default VContext;
