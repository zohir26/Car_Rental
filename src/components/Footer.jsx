import React from 'react';
import logo from '../assets/logo 2.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-base-200'>
      {/* Main Footer Section */}
      <footer className="footer text-base-content p-10 flex flex-col md:flex-row flex-wrap justify-between gap-6 md:gap-12">
        {/* Company Branding */}
        <aside className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={logo} alt="Company Logo" className="w-28 h-auto mb-2" />
          <p className='font-bold'>
            Car Rental
            <br />
            Providing reliable service since 1992
          </p>
        </aside>

        {/* Services Section */}
        <nav className="flex-1 text-center md:text-left">
          <h6 className="footer-title font-semibold">Cars</h6>
          <Link to='/availableCar' className="link link-hover">Available Car</Link>
          <Link to='/addCar' className="link link-hover">Add Cars</Link>
          <Link to='/myCars' className="link link-hover">My Cars</Link>
        </nav>

        {/* Company Section */}
        <nav className="flex-1 text-center md:text-left">
          <h6 className="footer-title font-semibold">Authentication</h6>
         <Link to='/updateUser' className="link link-hover"> Update User </Link>
        </nav>

        {/* Legal Section */}
        <nav className="flex-1 text-center md:text-left">
          <h6 className="footer-title font-semibold">Car Upgrade</h6>
          <Link to='/myBookings' className="link link-hover">My Bookings </Link>
        </nav>
      </footer>

      {/* Copyright Section */}
      <aside className="flex justify-center items-center text-center p-3 border-t border-gray-300">
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
    </div>
  );
};

export default Footer;
