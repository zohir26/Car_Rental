import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCarInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carData, setCarData] = useState({
    model: '',
    price: '',
    availability: '',
    registrationNumber: '',
    features: '',
    description: '',
    imageUrl: '',
    location: '',
  });

  useEffect(() => {
    axios.get(`https://car-rental-server-lyart.vercel.app/carDetails/${id}`)
      .then(res => setCarData(res.data))
      .catch(error => console.error('Error fetching car details:', error));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://car-rental-server-lyart.vercel.app/updateCarInfo/${id}`, carData)
      .then(res => {
        if (res.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'Your car has been updated.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          navigate('/myCars');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Car not found or failed to update.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch(error => {
        console.error('Update Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update the car.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex flex-col justify-center sm:py-12 text-base-content">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary shadow-lg transform skew-y-0 rotate-6 rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-base-100 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="text-center text-2xl font-semibold">Update Car</div>
              <form className="mt-8" onSubmit={handleSubmit}>
                {Object.keys(carData).map((key) => (
                  key !== '_id' && (
                    <div className="mb-4" key={key}>
                      <input
                        type="text"
                        placeholder={key}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        name={key}
                        value={carData[key]}
                        onChange={handleChange}
                      />
                    </div>
                  )
                ))}
                <button className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-focus focus:outline-none">
                  Update Car
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

export default UpdateCarInfo;
