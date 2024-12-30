import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { FaTrashRestore } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Swal from 'sweetalert2';
const MyCars = () => {
  const [selfCars, setSelfCars] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:4000/myCars?userEmail=${user.email}`)
      .then(res => {
        setSelfCars(res.data);
        if(!res){
            return <Loading></Loading>
          }
      })
     
      .catch(error => {
        console.log(error);
      });
  }, [user.email]);

   const handleDelete = (_id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {

            axios.delete(`http://localhost:4000/cars/${_id}`)
            .then(res=>{
                if(res.deletedCount>0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                }
            })

                //deleted from ui
                setSelfCars(selfCars.filter(cars=>cars._id !== _id))

        }
        else{
            Swal.fire({
                title: "Error!",
                text: "Review not found or already deleted.",
                icon: "error"
            });
        }
      });

   }
  return (
        <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-gray-100 p-4 text-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">My Cars</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Car Image</th>
                <th className="py-3 px-6 text-left">Car Model</th>
                <th className="py-3 px-6 text-left">Daily Rental Price</th>
                <th className="py-3 px-6 text-left">Booking Count</th>
                <th className="py-3 px-6 text-left">Availability</th>
                <th className="py-3 px-6 text-left">Date Added</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {selfCars.map((car) => (
                <tr key={car._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <img src={car.imageUrl} alt={car.model} className="w-20 h-20 object-cover rounded" />
                  </td>
                  <td className="py-3 px-6 text-left">{car.model}</td>
                  <td className="py-3 px-6 text-left">${car.price}</td>
                  <td className="py-3 px-6 text-left">{car.bookingCount}</td>
                  <td className="py-3 px-6 text-left">{car.availability}</td>
                  <td className="py-3 px-6 text-left">{new Date(car.dateAdded).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-center flex flex-col lg:flex-row  gap-2 justify-center items-center align-center">
                    
                    <Link to= {`/viewDetails/${car._id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ">
                    <FaEye />
                    </button>
                    </Link>


                    <Link to={`/updateCarInfo/${car._id}`}>
                    <button className="bg-green-600 text-white px-4 py-2 ml-2 rounded-md hover:bg-green-700 transition duration-300 ">
                    <CiEdit />
                    </button>
                    </Link>


                    <Link>
                    <button 
                    onClick={()=>{handleDelete(car._id)}}
                    className="bg-red-600 text-white px-4 py-2 ml-2 rounded-md hover:bg-red-700 transition duration-300 ">
                    <FaTrashRestore />
                    </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

        <Footer></Footer>
        
        </>
  );
};

export default MyCars;
