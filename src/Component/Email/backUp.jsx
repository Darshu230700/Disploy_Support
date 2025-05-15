import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import { EmailList } from "../Common/Common";
import EmailModal from "./EmailModal";
import { Link } from "react-router-dom";

const backUp = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
    backUp.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };
  const [showModal, setShowModal] = useState(false);
  const [selectItem, setSelectedItem] = useState()


  const toggleModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
        <main className="bg-white-300 flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <section className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-10">
              <div className="font-bold text-xl">Emails</div>
            </section>
            <section className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 px-2">
              {EmailList?.map((item, index) => {
                return (
                  <div className="shadow-md mb-2 p-2 w-full mx-2" key={index}>
                    <div className="p-4 flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <div className={item?.className}>
                          <img src={item?.icon} alt={item?.name} />
                        </div>
                        <div className="font-bold text-xl">
                          {item?.name}
                        </div>
                      </div>
                      <div className="flex justify-end">
                        {/*{item?.name === "Email" && (
                          <Link to="https://mail.google.com/" target="_blank" >
                            <button className="w-20 p-2 rounded-full bg-blue-200 text-blue">
                              Connect
                            </button>
                          </Link>
                        )}
                        {item?.name !== "Email" && (
                          <Link to="https://msft.sts.microsoft.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2fmail.exchange.microsoft.com%2fowa%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fowa%252f&wct=2024-02-14T12%3a59%3a58Z&client-request-id=627d97e8-d74b-40d0-a24e-0080011800f3&pullStatus=0" target="_blank" >
                            <button className="w-20 p-2 rounded-full bg-blue-200 text-blue">
                              Connect
                            </button>
                          </Link>
                        )}*/}

                        <button className="w-20 p-2 rounded-full bg-blue-200 text-blue"
                        
                        onClick={()=>{
                          setSelectedItem(item)
                          setShowModal(true)

                        }}>
                              Connect
                            </button>
                      </div>
                    </div>
                  </div>
                )
              })}

            </section>
          </div>
        </main >
      </div >
      {showModal && (
        <EmailModal selectItem={selectItem} toggleModal={toggleModal} />
      )}
    </>
  );
};

export default backUp;
