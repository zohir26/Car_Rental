import React from 'react';
import logo from '../assets/logo 2.png'
const Footer = () => {
  return (
    <div className='bg-base-200'>
      <footer className="footer  text-base-content p-10 ">
        <aside>
          <img src={logo} alt="" />
          <p className='font-bold'>
            Car Rental
            <br />
            Providing reliable service since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>

      </footer>
      <aside className="flex justify-center items-center p-3">
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </div>
  );
};

export default Footer;