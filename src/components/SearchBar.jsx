import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBar = ({ booking, onClose, onUpdate }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '',
    dropoffTime: ''
  });

  // State to manage active cars
  const [activeCars, setActiveCars] = useState([]);

  // Set initial form data if booking is provided
  // useEffect(() => {
  //   if (booking) {
  //     setFormData(booking);
  //   }
  // }, [booking]);

  useEffect(() => {
    if (booking) {
      setFormData({
        pickupLocation: booking.pickupLocation || '',
        dropoffLocation: booking.dropoffLocation || '',
        pickupDate: booking.pickupDate || '',
        dropoffDate: booking.dropoffDate || '',
        pickupTime: booking.pickupTime || '',
        dropoffTime: booking.dropoffTime || '',
        _id: booking._id || ''
      });
    }
  }, [booking]);
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle update booking
  // const handleUpdate = () => {
  //   const { pickupLocation, dropoffLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = formData;
  //   if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate || !pickupTime || !dropoffTime) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Missing Information',
  //       text: 'Please fill in all fields',
  //     });
  //     return;
  //   }

  //   axios.put(`http://localhost:4000/updateBooking/${formData._id}`, formData, { withCredentials: true })
  //     .then((res) => {
  //       if (res.data.matchedCount > 0) {
  //         Swal.fire("Updated!", "Your booking has been updated.", "success");
  //         onUpdate(); // Refresh the bookings list
  //         onClose(); // Close the update form
  //       } else {
  //         Swal.fire("Error!", "Failed to update booking.", "error");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating booking:", error);
  //       Swal.fire("Error!", "Failed to update booking.", "error");
  //     });
  // };
  const handleUpdate = () => {
    const { pickupLocation, dropoffLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = formData;
    if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate || !pickupTime || !dropoffTime) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please fill in all fields',
      });
      return;
    }
  
    // Send update request with the booking ID and new form data
    axios.put(`http://localhost:4000/updateBooking/${formData._id}`, formData, { withCredentials: true })
    .then((res) => {
      if (res.data.result.matchedCount > 0) {
        Swal.fire("Updated!", "Your booking has been updated.", "success");
        onUpdate();  // Refresh the bookings list
        onClose();   // Close the update form
      } else {
        Swal.fire("Error!", "Failed to update booking.", "error");
      }
    })
    .catch((error) => {
      console.error("Error updating booking:", error);
      Swal.fire("Error!", "Failed to update booking.", "error");
    });
  
  };
  
  // Handle fetching active cars based on location
  const handleActiveCars = () => {
    const { pickupLocation, dropoffLocation } = formData;
    axios.get('http://localhost:4000/addCar')
      .then((res) => {
        const cars = res.data;
        const filteredCars = cars.filter(car => 
          car.location.toLowerCase().includes(pickupLocation.toLowerCase()) || 
          car.location.toLowerCase().includes(dropoffLocation.toLowerCase())
        );
        setActiveCars(filteredCars);
        if (filteredCars.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Active Cars',
            text: 'No active cars found for the entered location.'
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching active cars:", error);
        Swal.fire("Error!", "Failed to fetch active cars.", "error");
      });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md text-white">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
        {/* Pickup Location */}
        <input 
          type="text" 
          name="pickupLocation"
          placeholder="Pick-up Location" 
          value={formData.pickupLocation} 
          onChange={handleChange}
          className="p-2 rounded-md text-gray-800 flex-grow"
        />
        
        {/* Pickup Date and Time */}
        <div className="flex flex-col gap-2 md:flex-row md:flex-grow">
          <input 
            type="date" 
            name="pickupDate"
            value={formData.pickupDate} 
            onChange={handleChange}
            className="p-2 rounded-md text-gray-800 flex-grow"
          />
          <input 
            type="time" 
            name="pickupTime"
            value={formData.pickupTime} 
            onChange={handleChange}
            className="p-2 rounded-md text-gray-800 flex-grow mt-1 md:mt-0"
          />
        </div>
        
        {/* Drop-off Location */}
        <input 
          type="text" 
          name="dropoffLocation"
          placeholder="Drop-off Location" 
          value={formData.dropoffLocation} 
          onChange={handleChange}
          className="p-2 rounded-md text-gray-800 flex-grow"
        />
        
        {/* Drop-off Date and Time */}
        <div className="flex flex-col gap-2 md:flex-row md:flex-grow">
          <input 
            type="date" 
            name="dropoffDate"
            value={formData.dropoffDate} 
            onChange={handleChange}
            className="p-2 rounded-md text-gray-800 flex-grow"
          />
          <input 
            type="time" 
            name="dropoffTime"
            value={formData.dropoffTime} 
            onChange={handleChange}
            className="p-2 rounded-md text-gray-800 flex-grow mt-1 md:mt-0"
          />
        </div>
        
        {/* Update Button */}
        {booking && (
          <>
            <button 
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full md:w-auto"
            >
              Update Booking
            </button>
            <button 
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full md:w-auto"
            >
              Cancel
            </button>
          </>
        )}
        
        {/* Active Cars Button */}
        <button 
          onClick={handleActiveCars}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full md:w-auto"
        >
          Active Cars
        </button>
      </div>

      {/* Display Active Cars */}
      <h2 className="text-2xl font-semibold text-center mt-8">Active Cars</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeCars.map((car, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={car.imageUrl} alt={car.model} className="w-full h-48 object-cover" />
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
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
