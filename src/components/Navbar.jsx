import { Link } from "react-router-dom";
import logo from '../assets/logo 2.png';
import { useContext } from "react";
import { auth, AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser(auth)
      .then(() => { })
      .catch((error) => { console.log(error) });
  };

  const list = (
    <ul className="lg:flex font-bold ">
      {user && user.email ? (
        <>
          <li className="p-2">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/availableCar">Available Car</Link>
          </li>

          <li className="p-2">
            <Link to="/addCar">Add Car</Link>
          </li>

          <li className="p-2">
            <Link to="/myCars">My Cars</Link>
          </li>
          <li className="p-2">
            <Link to="/my-bookings">My Bookings</Link>
          </li>
          <li className="p-2">
            <Link to="/updateUser">Update User</Link>
          </li>
          <li className="p-2 text-green-500 flex items-center justify-center">
            {user.email}
          </li>
          <li className="flex justify-center items-center space-x-2 ">

            {user.photoURL && (
              <>

                <div className="flex justify-center items-center space-x-2">
                  <p className="text-white"> {user.displayName} </p>

                  <img
                    key={user.photoURL}
                    src={user.photoURL}
                    alt={user.displayName || "User Photo"}

                    className="w-8 h-8 rounded-full  bg-white "

                  />
                </div>
              </>
            )}

          </li>
        </>
      ) : (
        <>
          <li className="p-2">
            <Link to="/">Home</Link>
          </li>
          <li className="p-2">
            <Link to="/availableCar">Available Car</Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <div className="navbar bg-[#2C3E50] text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black z-50"
          >
            {list}
          </ul>
        </div>
        {/* Logo with brand */}
        <div className="flex gap-3 justify-center items-center">
          <div>
            <img src={logo} alt="Car Rental Logo" className="h-10 w-auto" />
          </div>
          <div>
            <Link to='/' className="btn btn-ghost text-xl font-bold">Car Rental</Link>
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {list}
        </ul>
      </div>
      <div className="navbar-end">
        {user && user.email ? (
          <Link onClick={handleSignOut} className="btn btn-primary text-white">Sign Out</Link>
        ) : (
          <Link to='/login' className="btn btn-primary text-white">Sign In</Link>
        )}
      </div>

    </div>
  );
};

export default Navbar;
