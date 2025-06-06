import { Link } from "react-router-dom";
import logo from '../assets/logo 2.png';
import { useContext, useState } from "react";
import { auth, AuthContext } from "../Provider/AuthProvider";

const Navbar = ({ theme, setTheme }) => {
  // Get user and signOut function from AuthContext
  const { user, signOutUser } = useContext(AuthContext);

  // State to control visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle user sign out
  const handleSignOut = () => {
    signOutUser(auth)
      .then(() => { /* Successfully signed out */ })
      .catch((error) => { console.log(error) });
  };

  // Function to toggle the mobile menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to toggle between light and dark theme
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // Reusable list of nav links depending on user's auth state
  const list = (
    <>
      {user && user.email ? (
        <>
          <div className="flex justify-center items-center gap-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/availableCar">Available Car</Link></li>
            <li><Link to="/addCar">Add Car</Link></li>
            <li><Link to="/myCars">My Cars</Link></li>
            <li><Link to="/myBookings">My Bookings</Link></li>
            <li><Link to="/updateUser">Update User</Link></li>
            <li className="text-green-500 ">{user.email}</li>
            {user.photoURL && (
              <li className="flex items-center gap-2">
                <p>{user.displayName}</p>
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User Photo"}
                  className="w-8 h-8 rounded-full"
                />
              </li>
            )}
          </div>
        </>
      ) : (
        <>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/availableCar">Available Car</Link></li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-[#2C3E50] text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">

        {/* Logo and Theme Toggle Section */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Car Rental Logo" className="h-10 w-auto" />
          <Link to='/' className="text-xl font-bold">Car Rental</Link>

          {/* Theme toggle (light/dark mode) */}
          <label className="swap swap-rotate ml-4 flex justify-center items-center">
            <input
              type="checkbox"
              onChange={handleToggle}
              checked={theme === 'light' ? false : true}
            />

            {/* Sun icon (for light mode) */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="..." />
            </svg>

            {/* Moon icon (for dark mode) */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="..." />
            </svg>
          </label>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex gap-6 font-bold">
          {list}
        </ul>

        {/* Sign In/Out Button for Desktop */}
        <div className="hidden lg:block">
          {user && user.email ? (
            <button onClick={handleSignOut} className="btn btn-primary text-white">Sign Out</button>
          ) : (
            <Link to='/login' className="btn btn-primary text-white">Sign In</Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#2C3E50] text-white">
          <ul className="flex flex-col gap-4 p-4">
            {list}
            {user && user.email ? (
              <button onClick={handleSignOut} className="btn btn-primary text-white">Sign Out</button>
            ) : (
              <Link to='/login' className="btn btn-primary text-white">Sign In</Link>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
