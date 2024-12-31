import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import { Link } from 'react-router-dom';

const AvailableCars = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [layoutStyle, setLayoutStyle] = useState('grid');

  useEffect(() => {
    axios.get('http://localhost:4000/addCar')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data); // Initial load shows all cars
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (filters) => {
    const { pickupLocation, dropoffLocation } = filters;

    const filtered = data.filter(car => 
      car.location.toLowerCase().includes(pickupLocation.toLowerCase()) || 
      car.location.toLowerCase().includes(dropoffLocation.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Available Cars</h1>
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setLayoutStyle('grid')} 
              className={`px-4 py-2 mr-2 ${layoutStyle === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Grid View
            </button>
            <button 
              onClick={() => setLayoutStyle('list')} 
              className={`px-4 py-2 ${layoutStyle === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              List View
            </button>
          </div>
          <div className={`grid gap-8 ${layoutStyle === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredData.length > 0 ? (
              filteredData.map((car, index) => (
                <div key={index} className={`bg-white shadow-lg rounded-lg overflow-hidden ${layoutStyle === 'list' ? 'flex' : ''}`}>
                  <img src={car.imageUrl} alt={car.model} className={`${layoutStyle === 'list' ? 'w-48 h-48' : 'w-full h-48'} object-cover`} />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{car.model}</h3>
                    <p className="text-gray-600 mb-2">Daily Rental Price: ${car.price}</p>
                    <p className="text-gray-600 mb-2">Availability: {car.availability}</p>
                    <p className="text-gray-600 mb-2">Location: {car.location}</p>
                    <Link to={`/viewDetails/${car._id}`}>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No cars found for the selected criteria.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AvailableCars;
