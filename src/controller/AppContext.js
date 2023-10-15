import React,{ createContext, useReducer}  from "react";
export const MainContext = createContext();

const initialState = {} 

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
        return {
            ...state,
            [action.payload.key]: action.payload.value,
        };
        case "GET":
          return {
            ...state,
            [action.payload.key]: action.payload.value,
          };

        case "REMOVE":
        const newState = { ...state };
        delete newState[action.payload];
        return newState;
        default:
        return state;
    }
    }

const AppContext = ({ children }) => {
    const [mainState, mainDispatch] = useReducer(reducer, initialState);
    return (
    <MainContext.Provider value={{mainState, mainDispatch}}>
      {children}
    </MainContext.Provider>
  );
};

export default AppContext;
