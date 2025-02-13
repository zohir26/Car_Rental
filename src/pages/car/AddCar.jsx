import React, { useContext, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
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
    const userCarData = {
      ...carData,
      userEmail: user.email,
      dateAdded: new Date().toISOString(), // Add current time
    };
    // Send data to database
    axios.post('https://car-rental-server-lyart.vercel.app/addCar', userCarData)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Your car has been added to the database.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
        navigate('/myCars');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex flex-col justify-center sm:py-12">
        <div className="relative py-5 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform skew-y-0 rotate-6 rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-base-100 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="text-center text-2xl font-semibold text-base-content">Add New Car</div>
              <form className="mt-8" onSubmit={handleSubmit}>
                {[
                  { name: 'model', placeholder: 'Car Model' },
                  { name: 'price', placeholder: 'Daily Rental Price', type: 'number' },
                  { name: 'availability', placeholder: 'Availability' },
                  { name: 'registrationNumber', placeholder: 'Vehicle Registration Number' },
                  { name: 'features', placeholder: 'Features (e.g., GPS, AC, etc.)' },
                  { name: 'imageUrl', placeholder: 'Image URL' },
                  { name: 'location', placeholder: 'Location' },
                ].map(({ name, placeholder, type = 'text' }) => (
                  <div className="mb-4" key={name}>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-base-300 text-base-content"
                      name={name}
                      value={carData[name]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div className="mb-4">
                  <textarea
                    placeholder="Description"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-base-300 text-base-content"
                    name="description"
                    value={carData.description}
                    onChange={handleChange}
                  ></textarea>
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
