import React from "react";
import { NavLink } from "react-router-dom";
import {  useAuth } from "../Provider/AuthProvider";

const Navbar: React.FC = () => {

  
  const {user} = useAuth();
  console.log(user?.role)
  console.log(user?.displayName)
  console.log(user?.photoURL)



  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/registration" className="nav-link">
          Registration
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar bg-white shadow-md">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            className="menu menu-sm dropdown-content mt-3 w-52 bg-white text-black rounded-lg shadow-lg border border-gray-200"
          >
            {navLinks}
          </ul>
        </div>
        <a className="text-2xl font-bold tracking-wide text-gray-800">
          🚀 MyBrand
        </a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </nav>
  );
};

export default Navbar;
