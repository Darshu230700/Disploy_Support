import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import { FaRegStar, FaStar } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import AccordionList from "./Accordion";
import Footer from "../Footer";
const Rating = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  Rating.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };

  const state = {
    series: [{
      data: [50, 40, 30, 20, 10]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 220,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      axisPointer: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      colors: ['#33b2df', '#FFC0CB', '#FFFF00', '#0000FF', '#FF0000'
      ],
      dataLabels: {
        enabled: true,
        offsetX: 15,
        style: {
          fontSize: '10px',
          colors: ['#fff']
        }
      },
      grid: {
        show: false,
      },

      xaxis: {
        categories: ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star'
        ],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: ["transparent"],
          },
        },
      },
      tooltip: {
        enabled: false, // Set to false to disable the tooltip on hover
      },
    },
  };

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
      <div className="flex flex-1">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
        <main className="bg-white-500 flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <section className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-5 items-center justify-between">
              <h1 className="font-bold text-xl">Rating Reviews</h1>
              <div className="calender-input">
                <input
                  type="text"
                  name=""
                  className="py-2 w-64 px-3 border border-gray-200"
                  placeholder="March 2022 - Fabruary 2022"
                />
              </div>
            </section>

            <div className="flex-row mx-2">
              <div className="flex flex-wrap -mx-3 mb-8">
                <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
                  <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 relative">
                    <div className="icon-part">
                      <p className="py-3 text-2xl"> Total Reviews</p>
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold text-4xl mb-0">33.0k</h4>
                      <p className="text-xl text-gray-600 mb-2">
                        Growth in Reviews on this Year
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
                  <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 relative">
                    <div className="icon-part">
                      <p className="py-3 text-2xl">Average Rating </p>
                    </div>
                    <div className="w-full">
                      <h4 className="font-semibold text-4xl mb-0 flex items-center ">
                        <span className="mr-3">4.0</span>
                        <div className="fa fa-star text-orange-400 text-2xl">
                          <FaStar />
                        </div>
                        <div className="fa fa-star text-orange-400 text-2xl">
                          <FaStar />
                        </div>
                        <div className="fa fa-star text-orange-400 text-2xl">
                          <FaStar />
                        </div>
                        <div className="fa fa-star text-orange-400 text-2xl">
                          <FaStar />
                        </div>
                        <div className="fa fa-star text-gray-400 text-2xl">
                          <FaStar />
                        </div>
                      </h4>
                      <p className="text-xl text-gray-600 mb-2">
                        Growth in Reviews on this Year
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-3 md:mb-0">
                  <div className="bg-white shadow-xl rounded-xl px-5 border border-gray-200 relative">
                    <div className="icon-part">
                      <ReactApexChart options={state?.options} series={state?.series} type="bar" height={160} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AccordionList />
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default Rating;
