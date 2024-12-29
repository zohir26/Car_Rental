import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { auth, AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { IoLogoGoogle } from 'react-icons/io';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Register = () => {
 const {createNewUser}=useContext(AuthContext);
 const navigate= useNavigate()
    const handleSignUp= (event)=>{
      
        event.preventDefault();
        const form= event.target;
        const email= form.email.value;
        const password= form.password.value;
        const newUser= {email,password}
        console.log(newUser)

        // create new user
        createNewUser( email,password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            console.log(user)
            if(user.uid){
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Registered Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/')
            }
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
          });
    }
    const handleGoogleSignIn=()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(result=>{
          const user= result.user;
          navigate('/')
        })
        .catch(error=>{
          console.log(error)
        })
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform skew-y-0 rotate-6 rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div className="text-center text-2xl font-semibold">Register</div>
                            <form className="mt-8" onSubmit={handleSignUp}>
                                <div className="mb-4">
                                    <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" name='email'/>
                                </div>
                                <div className="mb-4">
                                    <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" name='password'/>
                                </div>
                                <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Register</button>
                                <div className="mt-4 flex justify-between items-center">
                <button onClick={handleGoogleSignIn} className="px-4 py-2 bg-red-500 text-white flex gap-2 justify-center items-center rounded-md hover:bg-red-600"> <IoLogoGoogle />Login with Google</button>
                                    <Link to="/login" className="text-blue-600 hover:underline">Already have an account? Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>

        </>

    );
};

export default Register;
