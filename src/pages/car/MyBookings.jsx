// Import necessary dependencies and components
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
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyBookings = () => {
  // State variables for bookings, car data, selected booking for update, and update mode
  const [booking, setBooking] = useState([]);
  const [carData, setCarData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { user } = useContext(AuthContext);

  // Secure Axios instance with authentication
  const axiosSecure = useAxiosSecure();

  // Fetch bookings and car data when user email is available
  useEffect(() => {
    if (user?.email) {
      fetchBookings();
      fetchCarData();
    }
  }, [user?.email]);

  // Fetch user's booking data from the backend
  const fetchBookings = () => {
    axiosSecure.get('/myBookings', { withCredentials: true })
      .then(res => setBooking(res.data))
      .catch(error => console.error("Error fetching bookings:", error));
  };

  // Fetch all car data for use in chart display
  const fetchCarData = () => {
    axiosSecure.get('/addCar', { withCredentials: true })
      .then(res => setCarData(res.data))
      .catch(error => console.error("Error fetching car data:", error));
  };

  // Handle deletion of a booking with confirmation prompt
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/myBookings/${_id}`, { withCredentials: true })
          .then((res) => {
            if (res.data?.hasOwnProperty.length > 0) {
              // Remove the deleted booking from UI
              setBooking(prev => prev.filter(b => b._id !== _id));
              Swal.fire("Deleted!", "Your booking has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete booking.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting booking:", error);
            Swal.fire("Error!", "Failed to delete booking.", "error");
          });
      }
    });
  };

  // Set selected booking and enable update mode
  const handleUpdate = (car) => {
    setSelectedBooking(car);
    setIsUpdating(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex flex-col justify-center sm:py-12 text-base-content p-4 md:p-6">
        <h1 className="text-3xl font-extrabold text-center mb-6">My Bookings</h1>

        {/* Conditional rendering of SearchBar for updating booking */}
        {isUpdating ? (
          <SearchBar 
            booking={selectedBooking} 
            onClose={() => setIsUpdating(false)} 
            onUpdate={fetchBookings} 
          />
        ) : (
          <>
            {/* Show message if no bookings are available */}
            {booking.length === 0 ? (
              <div className="text-center py-10 bg-base-200 text-base-content">
                <h2 className="text-xl font-semibold">No bookings found!</h2>
                <Link to="/availableCar">
                  <button className="mt-4 btn btn-success px-4 py-2 rounded-md">
                    Book Your First Car
                  </button>
                </Link>
              </div>
            ) : (
              // Display bookings in a table format
              <div className="overflow-x-auto">
                <table className="w-full bg-base-200 shadow-md rounded-lg text-sm md:text-base">
                  <thead className="bg-base-200 text-base-content uppercase text-sm leading-normal">
                    <tr>
                      <th>Car Image</th>
                      <th>Model</th>
                      <th>Price</th>
                      <th>Date Added</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.map((car) => (
                      <tr key={car._id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td>
                          <img 
                            src={car.imageUrl} 
                            alt={car.model} 
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md" 
                          />
                        </td>
                        <td>{car.model}</td>
                        <td>${car.price}</td>
                        <td>{new Date(car.dateAdded).toLocaleDateString()}</td>
                        <td className="flex justify-center gap-2 md:gap-3">
                          {/* Edit button */}
                          <button
                            onClick={() => handleUpdate(car)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 md:p-2 rounded-md"
                          >
                            <CiEdit />
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={() => handleDelete(car._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-1 md:p-2 rounded-md"
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

            {/* Bar chart displaying car prices */}
            <div className="my-8">
              <h2 className="text-2xl font-semibold text-center mb-6 text-base-content">Car Rental Prices</h2>
              <div className="w-full h-64 md:h-96 text-base-content">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={carData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="price" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
