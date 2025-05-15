import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaRegLifeRing } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { IoMdFootball } from "react-icons/io";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../Redux/AuthSlice";
import { getMenuAll, getMenuPermission } from "../Redux/SidebarSlice";
import { createMarkup } from "./Common/Common";

const Sidebar = ({ sidebarOpen, mobileSidebar }) => {
  Sidebar.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
  };
  const { user } = useSelector((state) => state.root.auth);
  const store = useSelector((state) => state.root.Sidebar);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [MenuData, setMenuData] = useState([]);



  let Menus = []
  if (user?.loginType === "Employee") {
    Menus = [
      {
        title: "Dashboard",
        cName: "nav-text link-items",
        path: "/dashboard",
        icon: <FaRegLifeRing />,
      },
      {
        title: "Chat",
        cName: "nav-text link-items",
        path: "/chats",
        icon: <IoIosChatboxes />,
      },
      {
        title: "Email",
        cName: "nav-text link-items",
        path: "/email",
        icon: <MdEmail />,
      },
      {
        title: "Tickets",
        cName: "nav-text link-items",
        path: "/tickets",
        icon: <FaNewspaper />,
      },
      {
        title: "Setting",
        cName: "nav-text link-items",
        path: "/setting",
        icon: <IoMdSettings />,
      },
      {
        title: "Calendar",
        cName: "nav-text link-items",
        path: "/calendar",
        icon: <FaCalendarAlt />,
      },
      {
        title: "Call management",
        cName: "nav-text link-items",
        path: "/call",
        icon: <IoMdFootball />,
      },
      {
        title: "Rating & Reviews",
        cName: "nav-text link-items",
        path: "/rating",
        icon: <FaStarHalfAlt />,
      },
      {
        title: "Remote Access",
        cName: "nav-text link-items",
        path: "/remote",
        icon: <FaDesktop />,
      },
      {
        title: "Reports",
        cName: "nav-text link-items",
        path: "/reports",
        icon: <FaFlagCheckered />,
      },
      {
        title: "Log Out",
        cName: "nav-text link-items",
        icon: <FaSignOutAlt />,
      },
    ];
  } else {
    Menus = [
      {
        title: "Dashboard",
        cName: "nav-text link-items",
        path: "/dashboard",
        icon: <FaRegLifeRing />,
      },
      {
        title: "Chat",
        cName: "nav-text link-items",
        path: "/chats",
        icon: <IoIosChatboxes />,
      },
      {
        title: "Email",
        cName: "nav-text link-items",
        path: "/email",
        icon: <MdEmail />,
      },
      {
        title: "Tickets",
        cName: "nav-text link-items",
        path: "/tickets",
        icon: <FaNewspaper />,
      },
      {
        title: "Calendar",
        cName: "nav-text link-items",
        path: "/calendar",
        icon: <FaCalendarAlt />,
      },
      {
        title: "Call management",
        cName: "nav-text link-items",
        path: "/call",
        icon: <IoMdFootball />,
      },
      {
        title: "Rating & Reviews",
        cName: "nav-text link-items",
        path: "/rating",
        icon: <FaStarHalfAlt />,
      },
      {
        title: "Log Out",
        cName: "nav-text link-items",
        icon: <FaSignOutAlt />,
      },
    ];
  }

  useEffect(() => {
    dispatch(getMenuAll({}))
  }, [dispatch,]);

  useEffect(() => {
    if (store.data.modulemaster) {
      const currentPath = window.location.pathname;

      // Format and sort menu data
      const formattedMenuData = store.data.modulemaster.map((item) => ({
        title: item.pageName,
        path: item.path,
        isView: item.isView,
        icon: <img src={item.icon} alt={item.alt} className="" />,
        sortBy: item.sortBy || 0, // Assuming sortBy is a numeric property
        isActive: item.path === currentPath, // Set isActive based on current path
      }))
        .sort((a, b) => a.sortBy - b.sortBy || a.title.localeCompare(b.title)); // Sort by sortBy, then by title

      setMenuData(formattedMenuData);
    }
  }, [store.data.modulemaster]);


  const handleChangeRoute = (title, path) => {
    if (title === "Log Out") {
      toast.loading("Logout...");
      setTimeout(() => {
        dispatch(handleLogout());
        toast.remove();
        navigation("/");
      }, 1000);
    } else {
      navigation(path);
    }
  };
  return (
    <>
      {sidebarOpen && (
        <aside
          id="sidebar"
          className="bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav md:block lg:block vh-100-90">
          <ul className="list-reset flex flex-col">
            {MenuData?.length > 0 &&
              MenuData
                ?.filter((item) => item?.isView)
                ?.map((item, index) => {
                  const isActive = window.location.pathname === item.path; // Check if the item is active
                  return (
                    <li
                      key={index}
                      className={`w-full h-full py-3 px-2 border-b border-light-border cursor-pointer ${isActive ? "bg-white" : ""}`}>
                      <div
                        onClick={() => { handleChangeRoute(item.title, item.path); }}>
                        <div className="font-sans font-semibold hover:font-bold text-sm text-nav-item no-underline flex items-center">

                          <div className="mx-2 ">{item.icon}</div>
                          <span>{item?.title}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </aside>
      )}
      {mobileSidebar && (
        <aside
          id="sidebar"
          className="bg-side-nav w-1/3 border-r border-side-nav md:block lg:block">
          <ul className="list-reset flex flex-col">
            {MenuData?.length > 0 &&
              MenuData
                ?.filter((item) => item.isView)
                ?.map((item, index) => {
                  const isActive = window?.location?.pathname === item?.path; // Check if the item is active
                  return (
                    <li
                      key={index}
                      className={`w-full h-full py-3 px-2 border-b border-light-border cursor-pointer ${isActive ? "bg-white" : ""
                        }`}>
                      <div
                        onClick={() => {
                          handleChangeRoute(item.pageName, item.path);
                        }}>
                        <div className="font-sans font-semibold hover:font-bold text-sm text-nav-item no-underline flex items-center">
                          <div className="mx-2 ">{item?.icon}</div>
                          <span>{item.title}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
