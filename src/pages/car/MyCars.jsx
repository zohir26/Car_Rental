import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaTrashRestore, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const MyCars = () => {
  const [selfCars, setSelfCars] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get("/myCars", { withCredentials: true })
        .then((res) => {
          setSelfCars(res.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user cars:", error.response?.data || error.message);
        });
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cars/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setSelfCars(selfCars.filter((car) => car._id !== _id));
            Swal.fire("Deleted!", "Your car has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex flex-col justify-center sm:py-12 text-base-content">
        <div className="max-w-7xl mx-auto w-full p-4">
          <h1 className="text-3xl font-extrabold text-center mb-10">My Cars</h1>
          {selfCars.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold mb-4">You haven't added any cars yet!</h2>
              <Link to="/addCar">
                <button className="btn btn-success text-white px-4 py-2">Add Your First Car</button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-base-100">
                <thead className="bg-base-300 uppercase text-sm">
                  <tr>
                    <th className="py-3 px-4 text-center">Car Image</th>
                    <th className="py-3 px-4 text-center">Car Model</th>
                    <th className="py-3 px-4 text-center">Daily Rental Price</th>
                    <th className="py-3 px-4 text-center">Availability</th>
                    <th className="py-3 px-4 text-center">Date Added</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selfCars.map((car) => (
                    <tr key={car._id} className="border-b hover:bg-base-300">
                      <td className="py-3 px-4 text-center">
                        <img src={car.imageUrl} alt={car.model} className="w-16 h-16 object-cover rounded-md mx-auto" />
                      </td>
                      <td className="py-3 px-4 text-center">{car.model}</td>
                      <td className="py-3 px-4 text-center">${car.price}</td>
                      <td className="py-3 px-4 text-center">{car.availability}</td>
                      <td className="py-3 px-4 text-center">{new Date(car.dateAdded).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-center flex gap-2 justify-center">
                        <Link to={`/viewDetails/${car._id}`}>
                          <button className="btn btn-sm btn-info">
                            <FaEye />
                          </button>
                        </Link>
                        <Link to={`/updateCarInfo/${car._id}`}>
                          <button className="btn btn-sm btn-warning">
                            <CiEdit />
                          </button>
                        </Link>
                        <button onClick={() => handleDelete(car._id)} className="btn btn-sm btn-error">
                          <FaTrashRestore />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCars;
