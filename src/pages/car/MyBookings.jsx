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

const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [carData, setCarData] = useState([]); // State for car data
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
      fetchCarData(); // Fetch car data for the chart
    }
  }, [user?.email]);

  const fetchBookings = () => {
    axios.get(`http://localhost:4000/myBookings?userEmail=${user.email}`, {
      withCredentials:true
    })
      .then(res => setBooking(res.data))
      .catch(error => console.error("Error fetching bookings:", error));
  };

  const fetchCarData = () => {
    axios.get('http://localhost:4000/addCar')
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
            
            <div className="my-8">
              <h2 className="text-2xl font-semibold text-center mb-6">Car Rental Prices</h2>
              <ResponsiveContainer width="100%" height={400}>
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
