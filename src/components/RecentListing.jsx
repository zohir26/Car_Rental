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
    <div className="py-16 bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-base-content mb-8">Recent Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 bg-base-100">
          {carsData.map((car, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-base-100 shadow-lg rounded-lg text-base-content"
              whileHover={{ scale: 1.05 }} // Zoom effect on hover
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={car.image} alt={car.model} className="w-full h-48 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold mb-2 text-base-content">{car.model}</h3>
              <p className="text-base-content">{car.daily_price}</p>
              <span
                className={`mt-2 px-4 py-1 rounded-full text-sm ${
                  car.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {car.availability}
              </span>
              <p className="text-base-content mt-2">Bookings: {car.booking_count}</p>
              <p className="text-base-content">{car.date_posted}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListings;
