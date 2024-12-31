import React, { useState } from 'react';
import Swal from 'sweetalert2';

const SearchBar = ({ onSearch }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');

  const handleSearch = () => {
    if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate || !pickupTime || !dropoffTime) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all fields',
      });
      return;
    }
    onSearch({
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime
    });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md text-white">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
        {/* Pickup Location */}
        <input 
          type="text" 
          placeholder="Pick-up Location" 
          value={pickupLocation} 
          onChange={(e) => setPickupLocation(e.target.value)}
          className="p-2 rounded-md text-gray-800 flex-grow"
        />
        
        {/* Pickup Date and Time */}
        <div className="flex flex-col gap-2 md:flex-row md:flex-grow">
          <input 
            type="date" 
            value={pickupDate} 
            onChange={(e) => setPickupDate(e.target.value)}
            className="p-2 rounded-md text-gray-800 flex-grow"
          />
          <input 
            type="time" 
            value={pickupTime} 
            onChange={(e) => setPickupTime(e.target.value)}
            className="p-2 rounded-md text-gray-800 flex-grow mt-1 md:mt-0"
          />
        </div>
        
        {/* Drop-off Location */}
        <input 
          type="text" 
          placeholder="Drop-off Location" 
          value={dropoffLocation} 
          onChange={(e) => setDropoffLocation(e.target.value)}
          className="p-2 rounded-md text-gray-800 flex-grow"
        />
        
        {/* Drop-off Date and Time */}
        <div className="flex flex-col gap-2 md:flex-row md:flex-grow">
          <input 
            type="date" 
            value={dropoffDate} 
            onChange={(e) => setDropoffDate(e.target.value)}
            className="p-2 rounded-md text-gray-800 flex-grow"
          />
          <input 
            type="time" 
            value={dropoffTime} 
            onChange={(e) => setDropoffTime(e.target.value)}
            className="p-2 rounded-md text-gray-800 flex-grow mt-1 md:mt-0"
          />
        </div>
        
        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full md:w-auto"
        >
          Show Cars
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
