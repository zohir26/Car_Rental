import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../../components/Loading';

const ViewDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL parameters
  const [data, setData] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://car-rental-server-lyart.vercel.app/viewDetails/${id}`)
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!data) {
    return <Loading></Loading>;
  }

  const handleBookings = () => {
    if (!user?.email) {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to book a car.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      navigate('/login');
      return;
    }

    const bookingData = {
      ...data,
      userEmail: user.email,
      carId: data._id, 
      dateAdded: new Date().toISOString()
    };

    axios.post('https://car-rental-server-lyart.vercel.app/myBookings', bookingData)
      .then(res => {
        console.log(res.data);
        if (res.data.bookingId) {
          Swal.fire({
            title: 'Success!',
            text: 'Your Booking has been successful.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          navigate('/myBookings');
        }
      })
      .catch(error => {
        console.error('Booking Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to complete the booking.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 flex flex-col justify-center sm:py-12">
        <div className="max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={data.imageUrl} alt={data.model} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-base-content">{data.model}</h2>
            <p className="text-base-content mb-2"><strong>Price:</strong> ${data.price} per day</p>
            <p className="text-base-content mb-2"><strong>Availability:</strong> {data.availability}</p>
            <p className="text-base-content mb-2"><strong>Registration Number:</strong> {data.registrationNumber}</p>
            <p className="text-base-content mb-2"><strong>Features:</strong> {data.features}</p>
            <p className="text-base-content mb-2"><strong>Description:</strong> {data.description}</p>
            <p className="text-base-content mb-2"><strong>Location:</strong> {data.location}</p>
            <p className="text-base-content mb-2"><strong>Booking Count:</strong> {data.bookingCount}</p>

            <Link to='/myBookings'>
              <button
                onClick={handleBookings}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewDetails;
