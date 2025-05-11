// Import necessary modules and components
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import { Link, useLoaderData } from 'react-router-dom';
import Loading from '../../components/Loading';

const AvailableCars = () => {
  // Get initial car data from route loader
  const data = useLoaderData();

  // State for filtered/paginated car list
  const [filteredData, setFilteredData] = useState(data);

  // Layout toggle: 'grid' or 'list'
  const [layoutStyle, setLayoutStyle] = useState('grid');

  // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  // Handle invalid data edge case
  if (!Array.isArray(data)) {
    console.error('Invalid data:', data);
    return <div className="text-red-500 text-base-content">Error: Invalid data format</div>;
  }

  // Calculate pagination details
  const dataCount = data.length;
  const numberOfPages = Math.ceil(dataCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Fetch paginated data from server whenever page or item count changes
  useEffect(() => {
    axios
      .get(`https://car-rental-server-lyart.vercel.app/addCar?page=${currentPage}&size=${itemsPerPage}`)
      .then(res => {
        setFilteredData(res.data);
      })
      .catch(error => {
        console.log('Error fetching paginated data:', error);
      });
  }, [currentPage, itemsPerPage]);

  // Filter cars based on pickup and dropoff locations
  const handleSearch = (filters) => {
    const { pickupLocation, dropoffLocation } = filters;
    const filtered = data.filter(car =>
      car.location.toLowerCase().includes(pickupLocation.toLowerCase()) ||
      car.location.toLowerCase().includes(dropoffLocation.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Show loading screen if no data yet
  if (!data.length) {
    return <Loading />;
  }

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0); // Reset to first page when changing item count
  };

  // Navigate to previous page
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to next page
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {/* Top navigation */}
      <Navbar />

      {/* Page content */}
      <div className="min-h-screen bg-base-200 flex flex-col justify-center sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-extrabold text-center text-base-content mb-8">
            Available Cars: {dataCount}
          </h1>

          {/* Search bar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* View toggle buttons */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setLayoutStyle('grid')}
              className={`px-4 py-2 mr-2 ${layoutStyle === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-base-content'}`}
            >
              Grid View
            </button>
            <button
              onClick={() => setLayoutStyle('list')}
              className={`px-4 py-2 ${layoutStyle === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-base-content'}`}
            >
              List View
            </button>
          </div>

          {/* Car cards list */}
          <div className={`grid gap-8 ${layoutStyle === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredData.length > 0 ? (
              filteredData.map((car, index) => (
                <div
                  key={index}
                  className={`bg-gray-200 shadow-lg rounded-lg overflow-hidden ${layoutStyle === 'list' ? 'flex' : ''}`}
                >
                  {/* Car image */}
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className={`${layoutStyle === 'list' ? 'w-48 h-48' : 'w-full h-48'} object-cover`}
                  />
                  <div className="p-4">
                    {/* Car details */}
                    <h3 className="text-xl font-semibold mb-2 text-base-content">{car.model}</h3>
                    <p className="text-base-content mb-2">Daily Rental Price: ${car.price}</p>
                    <p className="text-base-content mb-2">Availability: {car.availability}</p>
                    <p className="text-base-content mb-2">Booking Count: {car.bookingCount}</p>
                    <p className="text-base-content mb-2">Location: {car.location}</p>

                    {/* View details button */}
                    <Link to={`/viewDetails/${car._id}`}>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-base-content col-span-full">
                No cars found for the selected criteria.
              </p>
            )}
          </div>
        </div>

        {/* Pagination controls */}
        <div className='flex flex-col lg:flex-row justify-center items-center gap-2 p-4'>
          <button 
            className='btn btn-primary'
            onClick={handlePreviousPage}
          >
            Previous
          </button>

          {/* Page number buttons */}
          {pages.map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}  
              className={`btn ${currentPage === page ? 'btn-warning' : ''}`}
            >
              {page + 1}
            </button>
          ))}

          {/* Items per page selector */}
          <select 
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className='btn btn-success text-white'
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <button
            className='btn btn-primary'
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>

      {/* Bottom footer */}
      <Footer />
    </>
  );
};

export default AvailableCars;
