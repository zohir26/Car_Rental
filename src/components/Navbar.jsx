import { Link } from "react-router-dom";
import logo from '../assets/logo 2.png';
import { useContext, useEffect, useState } from "react";
import { auth, AuthContext } from "../Provider/AuthProvider";

const Navbar = ({theme,setTheme}) => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu
//  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : "light");

//  useEffect(() => {
//   localStorage.setItem("theme", theme);
//   document.documentElement.setAttribute("data-theme", theme); // Apply to <html>
// }, [theme]);

  const handleSignOut = () => {
    signOutUser(auth)
      .then(() => { })
      .catch((error) => { console.log(error) });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark'); // Update theme state in HomeLayout
    } else {
      setTheme('light');
    }
  }

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
            <li className="text-green-500 ">
              {user.email}
            </li>
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

        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Car Rental Logo" className="h-10 w-auto" />
          <Link to='/' className="text-xl font-bold">Car Rental</Link>
          <label className="swap swap-rotate ml-4 flex justify-center items-center">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onChange={handleToggle} 
            checked={theme==='light' ? false : true}
            />

            {/* sun icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 font-bold">
          {list}
        </ul>

        {/* Sign In/Out Button */}
        <div className="hidden lg:block">
          {user && user.email ? (
            <button onClick={handleSignOut} className="btn btn-primary text-white">Sign Out</button>
          ) : (
            <Link to='/login' className="btn btn-primary text-white">Sign In</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
