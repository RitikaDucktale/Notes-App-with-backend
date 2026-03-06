
//not needed anymore for now ........



import { createContext,useContext, useEffect, useState, type PropsWithChildren } from "react"

import type {AuthStates,User} from '../types/authTypes';
import Login from "../pages/loginPage/Login";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
const AuthContext = createContext<AuthStates | null>(null);
export const AuthContextProvider = ({children}:PropsWithChildren) => {
  
    const [loggedInUsers,setLoggedInUsers] = useState<User | null>(null);


 console.log("loggedInusers from useEffect==",loggedInUsers)
  const [signedUpUsers,setsignedUpUsers] = useState<User[]>([]);

  return (
    <AuthContext.Provider value={{signedUpUsers,setsignedUpUsers,loggedInUsers,setLoggedInUsers}}>
        {children}
    </AuthContext.Provider>
  )

}

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context) throw new Error('useAuth must be inside AuthProvider');
    return context;
}

