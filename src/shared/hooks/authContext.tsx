
import React, { createContext, useContext, useReducer } from "react";



export type User = {
    id: number;
    name: string;
    email: string;
    lastLoginAt: string;
    role: string;
    status: boolean;
    updatedAt: string;
};

type State = {
    user: User | null;
};

type Action =
    | { type: "LOGIN"; payload: User }
    | { type: "LOGOUT" };



const initialState: State = {
    user: null,
};



const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;
    }
};



interface AuthContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const AuthContext = createContext<AuthContextType>({
    state: initialState,
    dispatch: () => null,
});



export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
