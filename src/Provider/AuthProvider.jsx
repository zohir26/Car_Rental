import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from './../Firebase/Firebase.init';
import axios from 'axios';
export const auth = getAuth(app)
export const AuthContext= createContext()
const AuthProvider = ({children}) => {
const [user,setUser] = useState(null)
const [loading,setLoading]= useState(true)   


// create new user
const createNewUser= (email,password)=>{
    return createUserWithEmailAndPassword(auth, email,password)
}
//sign in user
const signInUser= (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

// set observer
useEffect(()=>{
    const observer= onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        if(currentUser ?. email){
            const user= {email:currentUser.email}

            axios.post('http://localhost:4000/jwt',user, {
                withCredentials:true
            })
            .then(res =>{
                console.log(res.data)
                setLoading(false)
            })
        }
        else{
            axios.post('http://localhost:4000/logoutToken',{},{
                withCredentials:true
            })
            .then(res=>{
                console.log('logout',res.data)
                setLoading(false)
            })
        }
        
    })
    return ()=>{
        observer()
    }
},[])

// sign Out user

const signOutUser = (auth)=>{
return signOut (auth)
}

// update a user


const authInfo= {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    signInUser,
    signOutUser,
   

}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;