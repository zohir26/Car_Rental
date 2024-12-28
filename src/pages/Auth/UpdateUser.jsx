import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const UpdateUser = () => {
  return (
   <>
   <Navbar></Navbar>
   <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform skew-y-0 rotate-6 rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="text-center text-2xl font-semibold">Update Profile</div>
            <form className="mt-8">
              <div className="mb-4">
                <input type="text" placeholder="User Name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <div className="mb-4">
                <input type="text" placeholder="Photo URL" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" />
              </div>
              <button className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
   <Footer></Footer>
   </>
  );
};

export default UpdateUser;
