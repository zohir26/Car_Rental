// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../Provider/AuthProvider';
// import axios from 'axios';
// import { CiEdit } from "react-icons/ci";
// import { FaTrashRestore, FaEye } from "react-icons/fa";
// import { Link } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import Swal from 'sweetalert2';
// import SearchBar from '../../components/SearchBar';

// const MyBookings = () => {
//   const [booking, setBooking] = useState([]); // State to store user bookings
//   const [selectedBooking, setSelectedBooking] = useState(null); // State to store booking selected for updating
//   const [isUpdating, setIsUpdating] = useState(false); // Toggle update view
//   const { user } = useContext(AuthContext); // Fetch user data from context

//   // 🟢 Fetch bookings for the logged-in user
//   useEffect(() => {
//     if (user?.email) {
//       axios.get(`http://localhost:4000/myBookings?userEmail=${user.email}`)
//         .then(res => setBooking(res.data))
//         .catch(error => console.error("Error fetching bookings:", error));
//     }
//   }, [user?.email]);

//   // 🟢 Handle delete booking with confirmation
//   const handleDelete = (_id) => {
//     console.log("Attempting to delete booking with ID:", _id); // Debugging

//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axios.delete(`http://localhost:4000/myBookings/${_id}`)
//           .then(res => {
//             console.log("Delete Response:", res.data); // Debugging
//             if (res.data.deletedCount > 0) {
//               setBooking(booking.filter(car => car._id !== _id));
//               Swal.fire("Deleted!", "Your booking has been deleted.", "success");
//             } else {
//               Swal.fire("Error!", "No booking found with this ID.", "error");
//             }
//           })
//           .catch((error) => {
//             console.error("Error deleting booking:", error);
//             Swal.fire("Error!", "Failed to delete booking.", "error");
//           });
//       }
//     });
//   };

//   // 🟢 Handle update booking
//   const handleUpdate = (car) => {
//     setSelectedBooking(car);
//     setIsUpdating(true);
//   };

//   // 🟢 Handle view booking details
//   const handleViewDetails = (carId) => {
//     axios.get(`http://localhost:4000/viewDetails/${carId}`)
//       .then(res => {
//         Swal.fire({
//           title: res.data.model,
//           text: res.data.description || 'No description available',
//           imageUrl: res.data.imageUrl,
//           imageAlt: res.data.model,
//           confirmButtonText: "Close"
//         });
//       })
//       .catch(() => Swal.fire("Error!", "Failed to load details.", "error"));
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gray-100 p-6">
//         <h1 className="text-3xl font-extrabold text-center mb-6">My Bookings</h1>
        
//         {/* 🟡 Update Booking Section */}
//         {isUpdating ? (
//           <SearchBar booking={selectedBooking} onClose={() => setIsUpdating(false)} />
//         ) : (
//           <>
//             {/* 🟡 Show No Bookings Message */}
//             {booking.length === 0 ? (
//               <div className="text-center py-10">
//                 <h2 className="text-xl font-semibold text-gray-700">No bookings found!</h2>
//                 <Link to="/availableCar">
//                   <button className="mt-4 btn btn-success px-4 py-2 rounded-md">
//                     Book Your First Car
//                   </button>
//                 </Link>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 {/* 🟡 Bookings Table */}
//                 <table className="min-w-full bg-white shadow-md rounded-lg">
//                   <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
//                     <tr>
//                       <th className="py-3 px-6 text-left">Car Image</th>
//                       <th className="py-3 px-6 text-left">Model</th>
//                       <th className="py-3 px-6 text-left">Price</th>
//                       <th className="py-3 px-6 text-left">Date Added</th>
//                       <th className="py-3 px-6 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="text-gray-600 text-sm">
//                     {booking.map((car) => (
//                       <tr key={car._id} className="border-b border-gray-200 hover:bg-gray-100">
//                         <td className="py-3 px-6 text-left">
//                           <img 
//                             src={car.imageUrl} 
//                             alt={car.model} 
//                             className="w-20 h-20 object-cover rounded-md" 
//                           />
//                         </td>
//                         <td className="py-3 px-6 text-left">{car.model}</td>
//                         <td className="py-3 px-6 text-left">${car.price}</td>
//                         <td className="py-3 px-6 text-left">
//                           {new Date(car.dateAdded).toLocaleDateString()}
//                         </td>
//                         <td className="py-3 px-6 text-center flex justify-center gap-3">
//                           {/* View Details */}
//                           <button
//                             onClick={() => handleViewDetails(car._id)}
//                             className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
//                           >
//                             <FaEye />
//                           </button>

//                           {/* Update Booking */}
//                           <button
//                             onClick={() => handleUpdate(car)}
//                             className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
//                           >
//                             <CiEdit />
//                           </button>

//                           {/* Delete Booking */}
//                           <button
//                             onClick={() => handleDelete(car._id)}
//                             className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
//                           >
//                             <FaTrashRestore />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyBookings;

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { FaTrashRestore, FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';
import SearchBar from '../../components/SearchBar';

const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email]);

  const fetchBookings = () => {
    axios.get(`http://localhost:4000/myBookings?userEmail=${user.email}`)
      .then(res => setBooking(res.data))
      .catch(error => console.error("Error fetching bookings:", error));
  };

  const handleDelete = (_id) => {
    console.log("Attempting to delete booking with ID:", _id); // Debugging Swal.fire({
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/myBookings/${_id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              setBooking(booking.filter(car => car._id !== _id));
              Swal.fire("Deleted!", "Your booking has been deleted.", "success");
            } else {
              Swal.fire("Error!", "No booking found with this ID.", "error");
            }
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete booking.", error);
          });
      }
    });
  };
  

  const handleUpdate = (car) => {
    setSelectedBooking(car);
    setIsUpdating(true);
  };

  // const handleViewDetails = (carId) => {
  //   axios.get(`http://localhost:4000/viewDetails/${carId}`)
  //     .then(res => {
  //       Swal.fire({
  //         title: res.data.model,
  //         text: res.data.description || 'No description available',
  //         imageUrl: res.data.imageUrl,
  //         imageAlt: res.data.model,
  //         confirmButtonText: "Close"
  //       });
  //     })
  //     .catch((error) => Swal.fire("Error!", "Failed to load details.", error));
  // };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-extrabold text-center mb-6">My Bookings</h1>
        
        {isUpdating ? (
          <SearchBar 
            booking={selectedBooking} 
            onClose={() => setIsUpdating(false)} 
            onUpdate={fetchBookings} 
          />
        ) : (
          <>
            {booking.length === 0 ? (
              <div className="text-center py-10">
                <h2 className="text-xl font-semibold text-gray-700">No bookings found!</h2>
                <Link to="/availableCar">
                  <button className="mt-4 btn btn-success px-4 py-2 rounded-md">
                    Book Your First Car
                  </button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-6 text-left">Car Image</th>
                      <th className="py-3 px-6 text-left">Model</th>
                      <th className="py-3 px-6 text-left">Price</th>
                      <th className="py-3 px-6 text-left">Date Added</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm">
                    {booking.map((car) => (
                      <tr key={car._id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">
                          <img 
                            src={car.imageUrl} 
                            alt={car.model} 
                            className="w-20 h-20 object-cover rounded-md" 
                          />
                        </td>
                        <td className="py-3 px-6 text-left">{car.model}</td>
                        <td className="py-3 px-6 text-left">${car.price}</td>
                        <td className="py-3 px-6 text-left">
                          {new Date(car.dateAdded).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6 text-center flex justify-center gap-3">
                          <button
                            onClick={() => handleViewDetails(car._id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
                          >
                            <FaEye />
                          </button>

                          <button
                            onClick={() => handleUpdate(car)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md"
                          >
                            <CiEdit />
                          </button>

                          <button
                           onClick={() => handleDelete(car._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                          >
                            <FaTrashRestore />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
