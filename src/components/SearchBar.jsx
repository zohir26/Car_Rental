// import React, { useState } from 'react';
// import Swal from 'sweetalert2';

// const SearchBar = ({ onSearch }) => {
//   const [pickupLocation, setPickupLocation] = useState('');
//   const [dropoffLocation, setDropoffLocation] = useState('');
//   const [pickupDate, setPickupDate] = useState('');
//   const [dropoffDate, setDropoffDate] = useState('');
//   const [pickupTime, setPickupTime] = useState('');
//   const [dropoffTime, setDropoffTime] = useState('');

//   const handleSearch = () => {
//     if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate || !pickupTime || !dropoffTime) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Please fill in all fields',
//       });
//       return;
//     }
//     onSearch({
//       pickupLocation,
//       dropoffLocation,
//       pickupDate,
//       dropoffDate,
//       pickupTime,
//       dropoffTime
//     });
//   };

//   return (
//     <div className="bg-gray-900 p-6 rounded-lg shadow-md text-white">
//       <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
//         {/* Pickup Location */}
//         <input 
//           type="text" 
//           placeholder="Pick-up Location" 
//           value={pickupLocation} 
//           onChange={(e) => setPickupLocation(e.target.value)}
//           className="p-2 rounded-md text-gray-800 flex-grow"
//         />
        
//         {/* Pickup Date and Time */}
//         <div className="flex flex-col gap-2 md:flex-row md:flex-grow">
//           <input 
//             type="date" 
//             value={pickupDate} 
//             onChange={(e) => setPickupDate(e.target.value)}
//             className="p-2 rounded-md text-gray-800 flex-grow"
//           />
//           <input 
//             type="time" 
//             value={pickupTime} 
//             onChange={(e) => setPickupTime(e.target.value)}
//             className="p-2 rounded-md text-gray-800 flex-grow mt-1 md:mt-0"
//           />
//         </div>
        
//         {/* Drop-off Location */}
//         <input 
//           type="text" 
//           placeholder="Drop-off Location" 
//           value={dropoffLocation} 
//           onChange={(e) => setDropoffLocation(e.target.value)}
//           className="p-2 rounded-md text-gray-800 flex-grow"
//         />
        
//         {/* Drop-off Date and Time */}
//         <div className="flex flex-col gap-2 md:flex-row md:flex-grow">
//           <input 
//             type="date" 
//             value={dropoffDate} 
//             onChange={(e) => setDropoffDate(e.target.value)}
//             className="p-2 rounded-md text-gray-800 flex-grow"
//           />
//           <input 
//             type="time" 
//             value={dropoffTime} 
//             onChange={(e) => setDropoffTime(e.target.value)}
//             className="p-2 rounded-md text-gray-800 flex-grow mt-1 md:mt-0"
//           />
//         </div>
        
//         {/* Search Button */}
//         <button 
//           onClick={handleSearch}
//           className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full md:w-auto"
//         >
//           Show Cars
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const SearchBar = ({ booking, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    dropoffDate: '',
    pickupTime: '',
    dropoffTime: ''
  });

  useEffect(() => {
    if (booking) {
      setFormData(booking);
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

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

    axios.put(`http://localhost:4000/updateBooking/${formData._id}`, formData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", "Your booking has been updated.", "success");
          onUpdate(); // Refresh the bookings list
          onClose(); // Close the update form
        } else {
          Swal.fire("Error!", "Failed to update booking.", "error");
        }
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
        Swal.fire("Error!", "Failed to update booking.", "error");
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
      </div>
    </div>
  );
};

export default SearchBar;
