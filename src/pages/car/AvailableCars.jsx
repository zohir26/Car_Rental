import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AvailableCars = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/addCar')
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Available Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((car, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={car.imageUrl} alt={car.model} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{car.model}</h3>
                <p className="text-gray-600 mb-2">Daily Rental Price: ${car.price}</p>
                <p className="text-gray-600 mb-2">Availability: {car.availability}</p>
                <p className="text-gray-600 mb-2">Location: {car.location}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
            <Footer></Footer>
        </>
    );
};

export default AvailableCars;
