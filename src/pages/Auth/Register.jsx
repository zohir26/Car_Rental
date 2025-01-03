import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { auth, AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { IoLogoGoogle } from 'react-icons/io';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Register = () => {
  const { createNewUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Input Validation
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Email and Password are required!',
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters long!',
      });
      return;
    }

    createNewUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.uid) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/login');
        }
      })
      .catch((error) => {
        let errorMessage = 'Failed to register. Please try again.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email format.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
        });
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Registered with Google",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-Up Failed',
          text: error.message,
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="text-center text-2xl font-semibold mb-6">Register</div>
            <form onSubmit={handleSignUp}>
              <input type="email" placeholder="Email" name="email" className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              <input type="password" placeholder="Password" name="password" className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
              <div className="flex gap-3 mb-4">
                <button 
                  onClick={handleGoogleSignIn}
                  type="button"
                  className="w-full bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-700">
                  <IoLogoGoogle size={24} /> Register with Google
                </button>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  Register
                </button>
              </div>
              <div className="text-center">
                <Link to="/login" className="text-blue-500 hover:underline">
                  Already have an account? Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
