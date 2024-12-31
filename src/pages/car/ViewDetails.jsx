import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const ViewDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL parameters
  const [data, setData] = useState(null);
  const {user}= useContext(AuthContext);
  const navigate= useNavigate()
  useEffect(() => {
    axios.get(`http://localhost:4000/viewDetails/${id}`)
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleBookings= ()=>{
    const bookingData = {...data,
      userEmail: user.email,
      dateAdded:new Date().toISOString() //add current time
     };

     axios.post('http://localhost:4000/myBookings',bookingData)
    .then(res=>{
       console.log(res.data)
       if(res.data.insertedId){
        Swal.fire({
            title: 'Success!',
            text: 'Your Booking has been successful.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
       }

       navigate('/myBookings')
    })
    .catch(error=>{
        console.log(error)
    })
  }
  return (
        <>
        <Navbar></Navbar>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={data.imageUrl} alt={data.model} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{data.model}</h2>
          <p className="text-gray-700 mb-2"><strong>Price:</strong> ${data.price} per day</p>
          <p className="text-gray-700 mb-2"><strong>Availability:</strong> {data.availability}</p>
          <p className="text-gray-700 mb-2"><strong>Registration Number:</strong> {data.registrationNumber}</p>
          <p className="text-gray-700 mb-2"><strong>Features:</strong> {data.features}</p>
          <p className="text-gray-700 mb-2"><strong>Description:</strong> {data.description}</p>
          <p className="text-gray-700 mb-2"><strong>Location:</strong> {data.location}</p>
          <p className="text-gray-700 mb-2"><strong>Booking Count:</strong> {data.bookingCount}</p>

            <Link to = '/myBookings'>
            <button
            onClick={handleBookings}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Book Now</button>
            </Link>
        </div>
      </div>
    </div>

        <Footer></Footer>
        </>
  );
};

export default ViewDetails;
