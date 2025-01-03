import axios from 'axios';
import { useContext, useEffect } from 'react';
import { auth, AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

const useAxiosSecure = () => {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        console.log('error caught in interceptor', error);
        
        // Check the error status code from the response
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          signOutUser(auth)
            .then(() => {
              console.log('logged out');
              navigate('/login');
            })
            .catch(error => {
              console.log(error);
            });
        }

        return Promise.reject(error);
      }
    );

    // Clean up the interceptor on unmount
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [signOutUser, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
