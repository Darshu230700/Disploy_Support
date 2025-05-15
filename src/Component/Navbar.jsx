import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";
import { handleLogout } from "../Redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createImageFromInitials } from "./Common/Common";

const color = "#e4aa07";
const Navbar = ({ sidebarOpen, mobileSidebar, setMobileSidebar }) => {
  Navbar.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
  };
  const { user, userDetails } = useSelector((state) => state.root.auth);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [Open, setOpen] = useState(false)

  const handleSidebarToggle = () => {
    setMobileSidebar(!mobileSidebar);
  };

  return (
    <div className="bg-nav p-1">
      <div className="flex justify-between">
        <div className="mx-3 inline-flex items-center gap-1">
          {!sidebarOpen && (
            <FaBars className="text-white cursor-pointer" onClick={handleSidebarToggle} />
          )}
          <h1 className="text-white p-2 cursor-pointer">Support Company Logo</h1>
        </div>
        <div className=" flex flex-row items-center">
          {/*  <div className="relative mt-1">
            <div className="absolute	inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-white border border-white rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
          </div>
          <a className="text-white p-2 mr-2 no-underline hidden md:block lg:block">
            <FaMoon />
          </a>
          <a className="text-white p-2 no-underline hidden md:block lg:block">
            <FaBell />
          </a>*/}
          <div className="flex items-center" onClick={() => setOpen(!Open)}>
              {(userDetails?.profilePic == "" || userDetails?.profilePic === null) ? (
                <img
                  className="inline-block h-8 w-8 rounded-full cursor-pointer"
                  src={createImageFromInitials(
                    500,
                    userDetails?.name,
                    color
                  )}
                  alt="profile"
                />
              ) : (
                <img
                  className="inline-block h-8 w-8 rounded-full cursor-pointer"
                  src={userDetails?.profilePic}
                  alt="profile"
                />
              )}

            <div
              className="text-white p-2 no-underline hidden md:block lg:block cursor-pointer"
            >
              {userDetails?.name}
            </div>
          </div>
          <div
            id="ProfileDropDown"
            className={`rounded ${Open ? "none" : "hidden"} top-10 right-0 shadow-md bg-white absolute pin-t mt-12 pin-r z-[9999] w-40`}>
            <ul className="list-reset">
              <li>
                <Link to="/userprofile">
                  <div
                    className="no-underline px-4 py-2 block text-black hover:bg-grey-light cursor-pointer">
                    My account
                  </div>
                </Link>
              </li>
              <li>
                <div
                  className="no-underline px-4 py-2 block text-black hover:bg-grey-light cursor-pointer">
                  Notifications
                </div>
              </li>
              <li>
                <hr className="border-t mx-2 border-grey-ligght" />
              </li>
              <li>
                <div
                  className="no-underline px-4 py-2 block text-black hover:bg-grey-light cursor-pointer"
                  onClick={() => {
                    toast.loading("Logout...");
                    setTimeout(() => {
                      dispatch(handleLogout());
                      toast.remove();
                      navigation("/");
                    }, 1000);
                  }}>
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
