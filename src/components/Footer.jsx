import React from 'react';
import logo from '../assets/logo 2.png';

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
          <h6 className="footer-title font-semibold">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>

        {/* Company Section */}
        <nav className="flex-1 text-center md:text-left">
          <h6 className="footer-title font-semibold">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>

        {/* Legal Section */}
        <nav className="flex-1 text-center md:text-left">
          <h6 className="footer-title font-semibold">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
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
