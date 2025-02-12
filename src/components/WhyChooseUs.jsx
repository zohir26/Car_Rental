import React from 'react';
import { FaCar, FaDollarSign, FaRegClock, FaHeadset } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <div className="py-16 bg-base-200 text-base-content"> {/* ✅ Changed bg-base-100 to bg-base-200 for better contrast in dark mode */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-8">Why Choose Us?</h2> {/* ✅ Removed hardcoded text-gray-900 */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-base-100 shadow-lg rounded-lg"> {/* ✅ Changed bg-white to bg-base-100 */}
            <FaCar className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Variety of Cars</h3>
            <p className="text-base-content">From budget-friendly options to luxury vehicles.</p> {/* ✅ Ensured text adapts */}
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-base-100 shadow-lg rounded-lg"> {/* ✅ Applied bg-base-100 */}
            <FaDollarSign className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-base-content">Competitive daily rates you can count on.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-base-100 shadow-lg rounded-lg">
            <FaRegClock className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking Process</h3>
            <p className="text-base-content">Seamlessly book your ride in just a few clicks.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-base-100 shadow-lg rounded-lg">
            <FaHeadset className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
            <p className="text-base-content">24/7 assistance for all your queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
