import React, { createContext, useContext, useState } from 'react';
import app from './../Firebase/Firebase.init';
export const auth = getAuth(app)
export const AuthContext= createContext()
const AuthProvider = ({children}) => {
const [user,setUser] = useState(null)
const [loading,setLoading]= useState(true)   

const authInfo= {
    user,
    loading,
    setLoading,

}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;