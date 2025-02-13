import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from '../lottie/errorAnimation.json'; 

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6 text-base-content">
            <Lottie animationData={animationData} loop={true} className="w-1/2 h-1/2" />
            <h1 className="text-4xl font-bold text-base-content mt-6">Oops! Page not found</h1>
            <p className="text-lg mt-4 text-base-content">The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="mt-6">
                <button className="btn btn-primary flex items-center">
                    <FaHome className="mr-2" /> Back to Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;
