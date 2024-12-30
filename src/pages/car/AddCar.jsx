import React, { useContext, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { useReducedMotion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const navigate= useNavigate()
    const {user}= useContext(AuthContext)
    const [carData, setCarData] = useState({
    model: '',
    price: '',
    availability: '',
    registrationNumber: '',
    features: '',
    description: '',
    bookingCount: 0,
    imageUrl: '',
    location: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(carData);
    // Save user details, date, and default booking status into the database.
    // Include user to car data
    const userCarData = {...carData,
         userEmail: user.email,
         dateAdded:new Date().toISOString() //add current time
        };
    // send data to database
    axios.post('http://localhost:4000/addCar',userCarData)
    .then(res=>{
       console.log(res.data)
       if(res.data.insertedId){
        Swal.fire({
            title: 'Success!',
            text: 'Your car has been added to database.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
       }

       navigate('/myCars')
    })
    .catch(error=>{
        console.log(error)
    })
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform skew-y-0 rotate-6 rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="text-center text-2xl font-semibold">Add New Car</div>
              <form className="mt-8" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Car Model"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    name="model"
                    value={carData.model}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="number"
                    placeholder="Daily Rental Price"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    name="price"
                    value={carData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Availability"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    name="availability"
                    value={carData.availability}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Vehicle Registration Number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    name="registrationNumber"
                    value={carData.registrationNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Features (e.g., GPS, AC, etc.)"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    name="features"
                    value={carData.features}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Description"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    name="description"
                    value={carData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    name="imageUrl"
                    value={carData.imageUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    name="location"
                    value={carData.location}
                    onChange={handleChange}
                  />
                </div>
                <button className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">
                  Add Car
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddCar;
