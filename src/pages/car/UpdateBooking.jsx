// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import SearchBar from '../../components/SearchBar';
// import { useParams, useNavigate } from 'react-router-dom';

// const UpdateBooking = () => {
//   const { bookingId } = useParams(); // Get booking ID from URL params
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [selectedCar, setSelectedCar] = useState(null);

//   useEffect(() => {
//     axios.get('https://car-rental-server-lyart.vercel.app/addCar')
//       .then(res => {
//         setData(res.data);
//         setFilteredData(res.data);
//       })
//       .catch(error => {
//         console.error('Error fetching cars:', error);
//       });
//   }, []);

//   const handleSearch = (filters) => {
//     const { pickupLocation, dropoffLocation, pickupDate, dropoffDate, pickupTime, dropoffTime } = filters;
  
//     // Filter cars based on location and dates/times
//     const filtered = data.filter(car => 
//       car.location.toLowerCase().includes(pickupLocation.toLowerCase()) || 
//       car.location.toLowerCase().includes(dropoffLocation.toLowerCase())
//     );
  
//     setFilteredData(filtered);
//   };
  

//   const handleCarSelect = (car) => {
//     setSelectedCar(car);
//   };

//   const handleUpdateBooking = () => {
//     if (!selectedCar) {
//       alert('Please select a car to update your booking.');
//       return;
//     }

//     axios.put(`https://car-rental-server-lyart.vercel.app/updateBooking/${bookingId}`, {
//       carId: selectedCar._id,
//       model: selectedCar.model,
//       price: selectedCar.price,
//       location: selectedCar.location
//     })
//     .then(() => {
//       alert('Booking updated successfully!');
//       navigate('/myBookings');
//     })
//     .catch(error => {
//       console.error('Error updating booking:', error);
//     });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 p-4">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Update Booking</h1>
//           <div className="mb-8">
//             <SearchBar onSearch={handleSearch} />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredData.length > 0 ? (
//               filteredData.map((car, index) => (
//                 <div key={index} className={`bg-white shadow-lg rounded-lg overflow-hidden ${selectedCar?._id === car._id ? 'border-2 border-blue-500' : ''}`}>
//                   <img src={car.imageUrl} alt={car.model} className="w-full h-48 object-cover" />
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold mb-2">{car.model}</h3>
//                     <p className="text-gray-600 mb-2">Daily Rental Price: ${car.price}</p>
//                     <p className="text-gray-600 mb-2">Location: {car.location}</p>
//                     <button 
//                       onClick={() => handleCarSelect(car)}
//                       className={`mt-4 px-4 py-2 rounded-md transition duration-300 ${selectedCar?._id === car._id ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
//                     >
//                       {selectedCar?._id === car._id ? 'Selected' : 'Select Car'}
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-500 col-span-full">No cars found for the selected criteria.</p>
//             )}
//           </div>
//           <div className="text-center mt-8">
//             <button
//               onClick={handleUpdateBooking}
//               className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300"
//             >
//               Update Booking
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UpdateBooking;
