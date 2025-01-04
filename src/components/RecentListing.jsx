import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RecentListings = () => {
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    fetch('/DemoCar.json')
      .then((response) => response.json())
      .then((data) => setCarsData(data))
      .catch((error) => console.log('Error fetching data:', error));
  }, []);

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Recent Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {carsData.map((car, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg"
              whileHover={{ scale: 1.05 }} // Zoom effect on hover
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={car.image} alt={car.model} className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold mb-2">{car.model}</h3>
              <p className="text-gray-600">{car.daily_price}</p>
              <span
                className={`mt-2 px-4 py-1 rounded-full text-sm ${
                  car.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {car.availability}
              </span>
              <p className="text-gray-600 mt-2">Bookings: {car.booking_count}</p>
              <p className="text-gray-500">{car.date_posted}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListings;
