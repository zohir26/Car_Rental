import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from '../lottie/errorAnimation.json'; // Make sure to import your Lottie animation JSON file

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <Lottie animationData={animationData} loop={true} className="w-1/2 h-1/2" />
            <h1 className="text-4xl font-bold text-gray-800 mt-6">Oops! Page not found</h1>
            <p className="text-lg text-gray-600 mt-4">The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/" className="mt-6">
                <button className="btn btn-primary flex items-center">
                    <FaHome className="mr-2" /> Back to Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;
