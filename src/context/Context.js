import React, {useState, createContext} from 'react';

export const Context = createContext();

const ContextProvider = ({children}) => {
    const [allUserId, setAllUserId] = useState([]);

    return <Context.Provider value ={{allUserId, setAllUserId}}> {children}</Context.Provider>
}

export default ContextProvider;