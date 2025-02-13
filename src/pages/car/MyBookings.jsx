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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [carData, setCarData] = useState([]); // State for car data
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useContext(AuthContext);

  // use axios secure
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
      fetchCarData();
    }
  }, [user?.email]);

  const fetchBookings = () => {
    axiosSecure.get('/myBookings',{withCredentials: true})
      .then(res => setBooking(res.data))
      .catch(error => console.error("Error fetching bookings:", error));
  };

  const fetchCarData = () => {
    axiosSecure.get('/addCar',{withCredentials: true})
      .then(res => setCarData(res.data))
      .catch(error => console.error("Error fetching car data:", error));
  };

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
              setBooking((prevBookings) =>
                prevBookings.filter((booking) => booking._id !== _id)
              );
  
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

  const handleUpdate = (car) => {
    setSelectedBooking(car);
    setIsUpdating(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex flex-col justify-center sm:py-12 text-base-content p-4 md:p-6">
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
              <div className="text-center py-10 bg-base-200 text-base-content">
                <h2 className="text-xl font-semibold">No bookings found!</h2>
                <Link to="/availableCar">
                  <button className="mt-4 btn btn-success px-4 py-2 rounded-md">
                    Book Your First Car
                  </button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-base-200 shadow-md rounded-lg text-sm md:text-base">
                  <thead className="bg-base-200 text-base-content uppercase text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-2 md:px-6 text-left text-base-content">Car Image</th>
                      <th className="py-3 px-2 md:px-6 text-left text-base-content">Model</th>
                      <th className="py-3 px-2 md:px-6 text-left text-base-content">Price</th>
                      <th className="py-3 px-2 md:px-6 text-left text-base-content">Date Added</th>
                      <th className="py-3 px-2 md:px-6 text-center text-base-content">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.map((car) => (
                      <tr key={car._id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-2 md:px-6 text-left text-base-content">
                          <img 
                            src={car.imageUrl} 
                            alt={car.model} 
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md" 
                          />
                        </td>
                        <td className="py-3 px-2 md:px-6 text-left text-base-content">{car.model}</td>
                        <td className="py-3 px-2 md:px-6 text-left text-base-content">${car.price}</td>
                        <td className="py-3 px-2 md:px-6 text-left text-base-content">
                          {new Date(car.dateAdded).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2 md:px-6 text-center flex justify-center gap-2 md:gap-3">
                          <button
                            onClick={() => handleUpdate(car)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white p-1 md:p-2 rounded-md"
                          >
                            <CiEdit />
                          </button>
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
