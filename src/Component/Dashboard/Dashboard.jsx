import React from "react";
import PropTypes from "prop-types";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Abandoned_Call from "../../Images/abandoned-calls-icon.svg"
import Incoming_Call from "../../Images/incomeingcalls-icon.svg"
import Outgoing_Call from "../../Images/outgoingcalls-icon.svg"
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";
import Rating_IMG_1 from "../../Images/Rating/reviewer1.png"
import Rating_IMG_2 from "../../Images/Rating/reviewer2.png"
import Rating_IMG_3 from "../../Images/Rating/reviewer3.png"
import ChartVolume from "../Charts/ChartVolume";
import Satisfaction from "../Charts/Satisfaction";
import line from "../../Images/Rating/line.svg"
import ReactApexChart from "react-apexcharts";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const Dashboard = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  Dashboard.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };

  // Helper function to display thousands in K format
  const formatThousands = (value) => Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

  const data = {
    labels: [
      '12-01-2020', '01-01-2021', '02-01-2021',
      '03-01-2021', '04-01-2021', '05-01-2021',
      '06-01-2021', '07-01-2021', '08-01-2021',
      '09-01-2021', '10-01-2021', '11-01-2021',
      '12-01-2021', '01-01-2022', '02-01-2022',
      '03-01-2022', '04-01-2022', '05-01-2022',
      '06-01-2022', '07-01-2022', '08-01-2022',
      '09-01-2022', '10-01-2022', '11-01-2022',
      '12-01-2022', '01-01-2023',
    ],
    datasets: [
      // Indigo line
      {
        label: 'Current',
        data: [
          5000, 8700, 7500, 12000, 11000, 9500, 10500,
          10000, 15000, 9000, 10000, 7000, 22000, 7200,
          9800, 9000, 10000, 8000, 15000, 12000, 11000,
          13000, 11000, 15000, 17000, 18000,
        ],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: 'rgb(99, 102, 241)',
      },
      // Gray line
      {
        label: 'Previous',
        data: [
          8000, 5000, 6500, 5000, 6500, 12000, 8000,
          9000, 8000, 8000, 12500, 10000, 10000, 12000,
          11000, 16000, 12000, 10000, 10000, 14000, 9000,
          10000, 15000, 12500, 14000, 11000,
        ],
        borderColor: 'rgb(203, 213, 225)',
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: 'rgb(203, 213, 225)',
      },
    ],
  }
  const options = {
    layout: {
      padding: 20,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          callback: (value) => formatThousands(value),
        },
      },
      x: {
        // type: 'time',
        time: {
          parser: 'MM-DD-YYYY',
          unit: 'month',
          displayFormats: {
            month: 'MMM YY',
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          autoSkipPadding: 48,
          maxRotation: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: () => false, // Disable tooltip title
          label: (context) => formatThousands(context.parsed.y),
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
    maintainAspectRatio: false,
  }

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
        offsetX: 2,
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
        <main className="bg-white-300 flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <section className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-5">
              <div className="font-bold text-xl">Support Portal</div>
            </section>
            <section className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 px-4">
              <div className="shadow bg-info border-l-8 hover:bg-info-dark border-info-dark mb-2 p-2 w-full mx-2">
                <div className="p-4 flex flex-col">
                  <a className="flex items-center">
                    <i className="fa mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" fill="none">
                      <circle cx="37.5" cy="37.5" r="37.5" fill="#E6F2FE" />
                      <path d="M35.8859 16.0421C32.6988 16.3446 30.3273 17.0168 27.6448 18.378C24.4661 19.9997 21.6153 22.5541 19.5298 25.6463C18.6552 26.9571 17.5788 29.167 17.0575 30.7298C16.6454 31.9902 16.309 33.4271 16.1072 34.8471C15.9643 35.8386 15.9643 39.1493 16.1072 40.1408C16.4604 42.6195 17.1163 44.7874 18.1423 46.8628C19.2943 49.2156 20.4296 50.7952 22.2965 52.669C24.1549 54.5176 25.7611 55.6688 28.0232 56.7779C29.6041 57.5509 30.6217 57.9291 32.2278 58.3324C36.4325 59.3911 40.654 59.1894 44.7577 57.7358C46.0107 57.2905 48.1803 56.2065 49.2987 55.4587C52.3681 53.4169 54.9077 50.602 56.5812 47.367C58.1032 44.4429 58.8601 41.5356 58.9862 38.2082C59.1124 34.6287 58.3723 31.2172 56.7746 28.0074C55.7318 25.9068 54.5629 24.2514 52.9231 22.5625C51.1067 20.6803 49.3239 19.3863 46.9441 18.21C44.455 16.9832 42.134 16.3194 39.3757 16.0673C38.518 15.9917 36.5754 15.9749 35.8859 16.0421ZM39.2076 18.5881C45.8089 19.1931 51.6533 23.2347 54.5545 29.209C55.4459 31.0323 55.9505 32.6456 56.2868 34.7631C56.4971 36.0571 56.4971 38.9308 56.2868 40.2248C55.9505 42.3422 55.4459 43.9555 54.5545 45.7789C52.6792 49.6273 49.6351 52.669 45.7668 54.5596C43.9504 55.4419 42.3358 55.946 40.2167 56.2821C38.9216 56.4922 36.0457 56.4922 34.7506 56.2821C31.1094 55.694 27.9559 54.2655 25.2061 51.9632C21.0182 48.4593 18.4786 42.9976 18.4786 37.4939C18.4786 31.9902 21.0098 26.5538 25.2061 23.0163C29.108 19.7393 34.1956 18.126 39.2076 18.5881Z" fill="#1975D1" />
                      <path d="M28.3594 29.0576C26.7868 29.4021 25.332 30.528 24.6256 31.9481C24.3061 32.5867 24.2724 32.7127 24.2977 33.1412C24.3229 33.5109 24.3818 33.679 24.5415 33.847C24.8191 34.1495 25.147 34.3008 25.5002 34.3008C26.0889 34.3008 26.442 33.9983 26.8457 33.158C27.51 31.7884 28.9396 31.1582 30.4028 31.6035C31.2101 31.8472 31.824 32.4018 32.2697 33.2925C32.6313 34.0067 32.8752 34.2168 33.4049 34.284C34.1113 34.3596 34.7 33.8638 34.7673 33.1328C34.8009 32.8051 34.7504 32.6371 34.4225 31.9901C33.4974 30.1415 31.8072 29.0492 29.7469 28.9567C29.2171 28.9399 28.7462 28.9735 28.3594 29.0576Z" fill="#1975D1" />
                      <path d="M44.3354 29.0408C43.1665 29.3096 42.0817 29.9314 41.3501 30.7549C41.1146 31.0238 40.753 31.5783 40.5344 32.0153C40.2064 32.6791 40.1559 32.8555 40.1896 33.1664C40.2737 33.8891 40.8623 34.3596 41.5855 34.2756C42.1069 34.2168 42.3508 34.0067 42.6956 33.3093C43.1665 32.3514 43.7635 31.8304 44.6801 31.5615C45.3613 31.3683 46.0845 31.4355 46.7572 31.7632C47.4216 32.0909 47.7327 32.4186 48.1784 33.2505C48.5905 34.0151 48.9352 34.3008 49.4398 34.3008C50.2639 34.3008 50.8442 33.5698 50.6676 32.7547C50.5162 32.0909 50.0032 31.259 49.2968 30.5616C48.5821 29.839 47.8589 29.4021 46.9843 29.1416C46.3368 28.9483 44.9661 28.8979 44.3354 29.0408Z" fill="#1975D1" />
                      <path d="M29.236 42.8135C28.8912 43.0403 28.6558 43.4773 28.6558 43.889C28.6558 44.4436 29.7153 45.9224 30.7749 46.8299C34.1554 49.7372 38.6712 50.2161 42.447 48.0735C43.8682 47.2668 45.2305 45.9812 46.0041 44.704C46.4751 43.9226 46.4162 43.3512 45.8107 42.8387C45.6005 42.6706 45.4575 42.6202 45.1296 42.6202C44.5493 42.6202 44.2718 42.7883 43.8682 43.4016C42.7582 45.0401 41.0258 46.2417 39.1169 46.7039C38.3433 46.8887 36.7287 46.8971 35.9046 46.7039C34.0293 46.2837 32.3306 45.1326 31.2038 43.5193C30.9431 43.158 30.6319 42.8135 30.4974 42.7462C30.1358 42.553 29.5724 42.5866 29.236 42.8135Z" fill="#1975D1" />
                    </svg></i>
                    <span>
                      <p className="no-underline text-white text-lg">Response Received</p>
                      <h3 className="no-underline text-white text-2xl"> 3,250</h3>
                    </span>
                  </a>
                </div>
              </div>
              <div className="shadow bg-success border-l-8 hover:bg-success-dark border-success-dark mb-2 p-2 w-full mx-2">
                <div className="p-4 flex flex-col">
                  <a className="flex items-center">
                    <i className="fa mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" fill="none">
                      <circle cx="37.5" cy="37.5" r="37.5" fill="#E9FFF4" />
                      <path d="M35.9007 16.0314C35.741 16.0482 35.2536 16.107 34.825 16.1574C31.6903 16.5186 28.3288 17.7618 25.6479 19.5594C24.4041 20.391 23.631 21.0126 22.5048 22.1046C20.6812 23.8854 19.3366 25.7334 18.202 28.035C17.1431 30.2022 16.4876 32.3358 16.1347 34.839C15.9666 36.015 15.9918 39.0726 16.1767 40.383C16.4624 42.3402 17.1011 44.5746 17.8827 46.2966C18.0424 46.641 18.16 46.9266 18.1516 46.9434C18.1348 46.9518 17.8995 47.1282 17.6138 47.3382C17.0423 47.7582 16.5129 48.4806 16.2355 49.2282C15.5128 51.1518 16.454 53.4114 19.0508 56.007C19.908 56.8638 21.5384 58.2414 22.3284 58.7622C22.6813 59.0058 23.32 59.073 23.7318 58.9134C23.9923 58.8126 25.5218 57.6282 26.3454 56.8722L27.0009 56.2758L28.1523 56.8302C31.0516 58.2162 33.6232 58.8462 36.7831 58.9638C40.2707 59.0814 43.5566 58.401 46.6997 56.8974C49.0696 55.755 50.7672 54.5538 52.6749 52.6554C54.4985 50.8242 55.6583 49.2282 56.776 46.9686C58.3727 43.7598 59.1123 40.3578 58.9862 36.771C58.8686 33.6126 58.2383 31.0422 56.8516 28.1442L56.3054 27.0018L56.8684 26.355C57.9105 25.1622 58.6417 23.8854 58.8854 22.8354C59.4064 20.643 58.087 18.543 55.7843 17.871C55.4146 17.7618 55.0784 17.7366 54.4397 17.7618C53.5069 17.8038 52.8598 17.9886 52.2295 18.4002L51.8513 18.6438L51.3891 18.3666C50.5907 17.8878 50.1789 17.787 49.0528 17.787C48.204 17.787 47.9603 17.8206 47.5065 17.9802L46.977 18.1818L46.3299 17.8878C44.6239 17.115 42.607 16.5186 40.6657 16.2246C39.6068 16.065 36.657 15.939 35.9007 16.0314ZM40.4808 18.9126C41.7246 19.1226 43.1028 19.4922 44.1449 19.887C44.5735 20.055 44.9433 20.2062 44.9601 20.2146C44.9769 20.2314 44.9349 20.4498 44.8593 20.6934C44.5651 21.7686 44.6239 22.6086 45.0778 23.6838C45.7669 25.3554 47.5653 27.4302 49.8764 29.2362C51.221 30.2862 51.3303 30.345 51.8177 30.345C52.3135 30.345 52.6497 30.1686 53.6497 29.3622C53.9691 29.1102 54.2464 28.917 54.2632 28.9338C54.3557 29.0262 55.07 30.723 55.2969 31.395C56.0196 33.495 56.2802 35.1162 56.2718 37.485C56.2718 39.5262 56.1625 40.425 55.6835 42.273C53.9775 48.8166 48.6998 54.0666 42.1616 55.6962C40.38 56.1498 39.4807 56.2506 37.4974 56.2506C35.1527 56.259 33.556 56.007 31.4466 55.293C30.5138 54.9822 28.9254 54.285 28.9254 54.1842C28.9254 54.1422 29.0347 53.949 29.1691 53.7558C29.9087 52.6638 30.3037 51.5382 30.2953 50.505C30.2785 49.3374 29.8667 48.4218 28.9759 47.5818C27.5892 46.2714 25.4966 46.0278 23.7402 46.977L23.1267 47.3046L22.7233 47.061C22.2947 46.7922 21.4712 46.473 21.2022 46.473C20.6224 46.473 19.3366 43.0038 18.8744 40.215C18.6558 38.9382 18.6558 36.0654 18.8659 34.755C19.7484 29.2866 22.6309 24.7926 27.1942 21.7686C29.749 20.0718 32.8164 19.005 35.9847 18.7194C36.9176 18.6354 39.4976 18.7446 40.4808 18.9126ZM50.0361 20.685C50.2041 20.7942 50.4563 21.0714 50.5991 21.2898C50.9269 21.7854 51.1706 21.9534 51.6496 22.0038C52.3303 22.0878 52.5909 21.9282 53.2884 21.021C53.6161 20.5926 54.0699 20.4078 54.7254 20.4498C55.4566 20.4918 55.9272 20.7774 56.1709 21.3318C56.5827 22.2642 55.9104 23.5578 54.0195 25.4394C53.1287 26.3214 51.969 27.321 51.8261 27.321C51.658 27.321 49.8596 25.6746 48.994 24.7254C47.851 23.4738 47.2628 22.3566 47.372 21.6678C47.4393 21.2898 47.9015 20.727 48.2965 20.5422C48.7082 20.3574 49.6747 20.433 50.0361 20.685ZM21.3199 49.329C21.4964 49.4382 21.7569 49.7154 21.9082 49.959C22.2443 50.4714 22.5973 50.673 23.1856 50.673C23.6394 50.673 24.026 50.4798 24.2697 50.127C24.8327 49.329 25.2277 49.077 25.942 49.077C26.732 49.077 27.3959 49.5558 27.5808 50.2614C27.8918 51.3954 26.3454 53.4366 23.2864 55.9398C23.1688 56.0322 23.0595 55.9734 22.488 55.4946C20.4459 53.7726 18.8996 51.891 18.7063 50.883C18.5802 50.211 18.9584 49.5474 19.6391 49.2282C20.0929 49.0182 20.8913 49.0602 21.3199 49.329Z" fill="#4CA47A" />
                      <path d="M28.2615 30.4793C26.3874 30.9833 24.9756 32.7894 24.9756 34.6794C24.9756 35.0742 25.0176 35.259 25.1689 35.469C25.5975 36.099 26.2614 36.3006 26.8833 35.9814C27.3371 35.7546 27.5556 35.3766 27.6564 34.6794C27.7489 34.0242 27.9926 33.6126 28.48 33.285C28.7405 33.1086 28.8834 33.075 29.4297 33.075C29.9759 33.075 30.1188 33.1086 30.3793 33.285C30.8667 33.6126 31.1104 34.0242 31.2029 34.6794C31.3037 35.3766 31.5222 35.7546 31.976 35.9814C32.5979 36.3006 33.2618 36.099 33.6904 35.469C33.8417 35.259 33.8837 35.0742 33.8837 34.6794C33.8837 32.7726 32.4551 30.9665 30.5642 30.4709C29.9507 30.3113 28.8666 30.3197 28.2615 30.4793Z" fill="#4CA47A" />
                      <path d="M44.3963 30.4793C42.5222 30.9833 41.1104 32.7894 41.1104 34.6794C41.1104 35.0742 41.1524 35.259 41.3036 35.469C41.7322 36.099 42.3962 36.3006 43.018 35.9814C43.4719 35.7546 43.6904 35.3766 43.7912 34.6794C43.8836 34.0242 44.1274 33.6126 44.6148 33.285C44.8753 33.1086 45.0182 33.075 45.5644 33.075C46.1107 33.075 46.2535 33.1086 46.5141 33.285C47.0015 33.6126 47.2452 34.0242 47.3377 34.6794C47.4385 35.3766 47.657 35.7546 48.1108 35.9814C48.7327 36.3006 49.3966 36.099 49.8336 35.469C49.9765 35.259 50.0185 35.0742 50.0185 34.6794C50.0185 32.7726 48.5898 30.9665 46.699 30.4709C46.0855 30.3113 45.0014 30.3197 44.3963 30.4793Z" fill="#4CA47A" />
                      <path d="M27.5386 41.7722C27.1268 41.9402 26.7402 42.5282 26.7402 42.9818C26.7402 43.5866 27.2781 44.225 28.7152 45.317C30.2951 46.5182 32.4465 47.4926 34.4046 47.9042C39.1108 48.887 43.7077 47.6438 47.3634 44.4266C48.2374 43.6538 48.4307 43.1078 48.0862 42.4106C47.8761 41.9906 47.5819 41.7638 47.1617 41.7134C46.5567 41.6294 46.3045 41.7386 45.565 42.4106C43.9178 43.8974 42.1026 44.8298 39.8671 45.317C38.6906 45.5774 36.3039 45.5774 35.1273 45.317C32.9087 44.8298 31.0598 43.889 29.4631 42.4358C29.1017 42.1082 28.7152 41.8058 28.6059 41.7638C28.3622 41.6714 27.7655 41.6714 27.5386 41.7722Z" fill="#4CA47A" />
                    </svg></i>
                    <span>
                      <p className="no-underline text-white text-lg">Positive</p>
                      <h3 className="no-underline text-white text-2xl"> 90%</h3>
                    </span>
                  </a>
                </div>
              </div>
              <div className="shadow-lg bg-red-vibrant border-l-8 hover:bg-red-vibrant-dark border-red-vibrant-dark mb-2 p-2 w-full mx-2">
                <div className="p-4 flex flex-col">
                  <a className="flex items-center">
                    <i className="fa mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" fill="none">
                      <circle cx="37.5" cy="37.5" r="37.5" fill="#FFEBEB"></circle>
                      <path d="M35.5734 16.0522C31.415 16.456 27.5765 17.987 24.2094 20.5781C22.568 21.84 20.4383 24.2123 19.2093 26.1472C18.679 26.98 17.6436 29.0999 17.2732 30.1094C16.8607 31.2367 16.4146 32.9697 16.1957 34.3073C15.9348 35.9477 15.9348 39.0603 16.1957 40.7007C16.5745 43.0226 17.1722 44.8902 18.1907 46.968C19.3019 49.231 20.4551 50.8378 22.307 52.6969C24.1673 54.5477 25.7751 55.7002 28.0395 56.8107C30.1187 57.8286 31.9874 58.4258 34.3107 58.8044C35.9522 59.0652 39.0668 59.0652 40.7082 58.8044C43.0315 58.4258 44.9003 57.8286 46.9794 56.8107C49.2438 55.7002 50.8516 54.5477 52.7119 52.6969C54.5638 50.8378 55.7171 49.231 56.8282 46.968C57.569 45.4622 57.9394 44.478 58.3434 42.9637C58.8737 40.9447 59 39.8427 59 37.504C59 35.1653 58.8737 34.0633 58.3434 32.0443C57.9394 30.5301 57.569 29.5458 56.8282 28.04C55.7171 25.777 54.5638 24.1702 52.7119 22.3111C50.8516 20.4603 49.2438 19.3078 46.9794 18.1974C44.9087 17.1794 42.9894 16.5737 40.7503 16.2204C39.5129 16.0269 36.7519 15.9344 35.5734 16.0522ZM39.5297 18.4077C43.5197 18.8788 47.0131 20.393 50.0267 22.9672C56.6767 28.6457 58.6128 38.2275 54.7069 46.0343C52.2826 50.8799 47.9812 54.4552 42.7874 55.961C39.4371 56.9284 35.5818 56.9284 32.2315 55.961C26.9957 54.4467 22.7195 50.863 20.2952 45.9585C18.9988 43.3507 18.4348 41.0709 18.3422 38.1265C18.2917 36.402 18.3759 35.2326 18.6621 33.7857C20.2699 25.7013 26.8863 19.5265 35.1104 18.4497C36.1374 18.3151 38.5617 18.2899 39.5297 18.4077Z" fill="#E46050"></path>
                      <path d="M29.8261 30.4488C29.1358 30.6086 28.5971 31.0208 28.2688 31.6518C28.0836 32.0051 28.0415 32.1902 28.0415 32.7117C28.0415 33.2586 28.0752 33.4016 28.2856 33.7885C28.7233 34.5709 29.4304 34.9915 30.3143 34.9999C31.5854 35.0084 32.5197 34.1335 32.6123 32.8548C32.6965 31.6686 31.9642 30.7012 30.7941 30.4488C30.289 30.3478 30.2722 30.3478 29.8261 30.4488Z" fill="#E46050"></path>
                      <path d="M44.1433 30.4738C42.485 30.9281 41.8621 33.0228 43.0238 34.251C44.1517 35.4372 46.0794 35.1764 46.8033 33.7379C47.6956 31.9797 46.0373 29.9523 44.1433 30.4738Z" fill="#E46050"></path>
                      <path d="M36.1394 40.7866C32.9069 41.1904 30.2385 42.4859 28.0246 44.7068C27.4522 45.2704 26.9893 45.792 26.9893 45.8509C26.9977 45.9434 27.8479 46.6416 28.5886 47.1632C28.7233 47.2642 28.8327 47.18 29.6493 46.3556C31.9136 44.0927 34.742 42.9738 37.8903 43.0832C40.8617 43.1841 43.2271 44.2273 45.3736 46.364C46.1902 47.18 46.2996 47.2642 46.4343 47.1632C47.1329 46.6753 48.0252 45.9434 48.0336 45.8593C48.0336 45.8088 47.6717 45.3798 47.2171 44.9087C45.2895 42.8813 42.781 41.5016 40.0368 40.9548C39.0351 40.7529 37.0485 40.6688 36.1394 40.7866Z" fill="#E46050"></path>
                    </svg></i>
                    <span>
                      <p className="no-underline text-white text-lg">Negative</p>
                      <h3 className="no-underline text-white text-2xl"> 8.2%</h3>
                    </span>
                  </a>
                </div>
              </div>
              <div className="shadow bg-warning border-l-8 hover:bg-warning-dark border-warning-dark mb-2 p-2 w-full mx-2">
                <div className="p-4 flex flex-col">
                  <a className="flex items-center">
                    <i className="fa mr-3"><svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" fill="none">
                      <circle cx="37.5" cy="37.5" r="37.5" fill="#FFE8C6" />
                      <path d="M37.5 56.3125C32.5106 56.3125 27.7256 54.3305 24.1976 50.8024C20.6695 47.2744 18.6875 42.4894 18.6875 37.5C18.6875 32.5106 20.6695 27.7256 24.1976 24.1976C27.7256 20.6695 32.5106 18.6875 37.5 18.6875C42.4894 18.6875 47.2744 20.6695 50.8024 24.1976C54.3305 27.7256 56.3125 32.5106 56.3125 37.5C56.3125 42.4894 54.3305 47.2744 50.8024 50.8024C47.2744 54.3305 42.4894 56.3125 37.5 56.3125ZM37.5 59C43.2022 59 48.6708 56.7348 52.7028 52.7028C56.7348 48.6708 59 43.2022 59 37.5C59 31.7978 56.7348 26.3292 52.7028 22.2972C48.6708 18.2652 43.2022 16 37.5 16C31.7978 16 26.3292 18.2652 22.2972 22.2972C18.2652 26.3292 16 31.7978 16 37.5C16 43.2022 18.2652 48.6708 22.2972 52.7028C26.3292 56.7348 31.7978 59 37.5 59Z" fill="#FF9A00" />
                      <path d="M26.75 44.2188C26.75 44.5751 26.8916 44.9169 27.1436 45.1689C27.3956 45.4209 27.7374 45.5625 28.0938 45.5625H46.9062C47.2626 45.5625 47.6044 45.4209 47.8564 45.1689C48.1084 44.9169 48.25 44.5751 48.25 44.2188C48.25 43.8624 48.1084 43.5206 47.8564 43.2686C47.6044 43.0166 47.2626 42.875 46.9062 42.875H28.0938C27.7374 42.875 27.3956 43.0166 27.1436 43.2686C26.8916 43.5206 26.75 43.8624 26.75 44.2188ZM34.8125 33.4688C34.8125 31.2435 33.6085 29.4375 32.125 29.4375C30.6415 29.4375 29.4375 31.2435 29.4375 33.4688C29.4375 35.694 30.6415 37.5 32.125 37.5C33.6085 37.5 34.8125 35.694 34.8125 33.4688ZM45.5625 33.4688C45.5625 31.2435 44.3585 29.4375 42.875 29.4375C41.3915 29.4375 40.1875 31.2435 40.1875 33.4688C40.1875 35.694 41.3915 37.5 42.875 37.5C44.3585 37.5 45.5625 35.694 45.5625 33.4688Z" fill="#FF9A00" />
                    </svg></i>
                    <span>
                      <p className="no-underline text-white text-lg">Neutral</p>
                      <h3 className="no-underline text-white text-2xl"> 2.8%</h3>
                    </span>
                  </a>
                </div>
              </div>
            </section>
            <section className="flex flex-1  flex-col md:flex-row lg:flex-row mb-5">
              <div className="w-full h-full p-2">
                <div className="flex flex-col col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200">
                  <header className="px-5 py-4 border-b border-gray-100 flex items-center">
                    <h2 className="font-semibold text-2xl text-gray-800">Tickets Status</h2>
                  </header>
                  <div className="px-5 py-1">
                    <div className="flex flex-wrap justify-between">
                      <div className="flex items-center py-2">
                        <div className="mr-5">
                          <div className="flex items-center">
                            <div className="text-3xl font-bold text-gray-800 mr-2">24.7K</div>
                            <div className="text-sm font-medium text-green-500">+49%</div>
                          </div>
                          <div className="text-sm text-gray-500">Unique Visitors</div>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-gray-200 mr-5" aria-hidden="true"></div>
                      </div>
                      <div className="flex items-center py-2">
                        <div className="mr-5">
                          <div className="flex items-center">
                            <div className="text-3xl font-bold text-gray-800 mr-2">56.9K</div>
                            <div className="text-sm font-medium text-green-500">+7%</div>
                          </div>
                          <div className="text-sm text-gray-500">Total Pageviews</div>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-gray-200 mr-5" aria-hidden="true"></div>
                      </div>
                      <div className="flex items-center py-2">
                        <div className="mr-5">
                          <div className="flex items-center">
                            <div className="text-3xl font-bold text-gray-800 mr-2">54%</div>
                            <div className="text-sm font-medium text-yellow-500">-7%</div>
                          </div>
                          <div className="text-sm text-gray-500">Bounce Rate</div>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-gray-200 mr-5" aria-hidden="true"></div>
                      </div>
                      <div className="flex items-center">
                        <div>
                          <div className="flex items-center">
                            <div className="text-3xl font-bold text-gray-800 mr-2">2m 56s</div>
                            <div className="text-sm font-medium text-yellow-500">+7%</div>
                          </div>
                          <div className="text-sm text-gray-500">Visit Duration</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <Line data={data} options={options} width={800} height={300}>
                    </Line>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full p-3">
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-3/4 px-3 mb-5 md:mb-0">
                  <div className="flex flex-wrap -mx-3 mb-8">
                    <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-3 md:mb-0">
                      <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200">
                        <div className="icon-part">
                          <div className="flex bg-green-dark w-12 h-12 p-3 rounded-full"><img src={Incoming_Call} alt="Incoming Calls" /></div>
                        </div>
                        <div className="w-full">
                          <h4 className="font-bold text-2xl mb-0">Incomeing Calls</h4>
                          <p className="text-xl mb-2">Last 7 Days</p>
                        </div>
                        <div className="w-full flex items-start">
                          <strong className="font-bold leading-none text-5xl mb-0 mr-3">217</strong><button className="bg-green-dark hover:bg-green-800 text-white py-2 px-4 rounded-full">+10%</button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-3 md:mb-0">
                      <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200">
                        <div className="icon-part">
                          <i className="flex bg-blue-dark w-12 h-12 p-3 rounded-full"><img src={Outgoing_Call} alt="Outgoing Calls" /> </i>
                        </div>
                        <div className="w-full">
                          <h4 className="font-bold text-2xl mb-0">Outgoing Calls</h4>
                          <p className="text-xl mb-2">Last 7 Days</p>
                        </div>
                        <div className="w-full flex items-start">
                          <strong className="font-bold leading-none text-5xl mb-0 mr-3">117</strong><button className="bg-green-dark hover:bg-green-800 text-white py-2 px-4 rounded-full">+05%</button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 px-3 mb-3 md:mb-0">
                      <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200">
                        <div className="icon-part">
                          <i className="flex bg-red-dark w-12 h-12 p-3 rounded-full"><img src={Abandoned_Call} alt="Abandoned Calls" /> </i>
                        </div>
                        <div className="w-full">
                          <h4 className="font-bold text-2xl mb-0">Abandoned Calls</h4>
                          <p className="text-xl mb-2">Last 7 Days</p>
                        </div>
                        <div className="w-full flex items-start">
                          <strong className="font-bold leading-none text-5xl mb-0 mr-3">214</strong><button className="bg-green-dark hover:bg-green-800 text-white py-2 px-4 rounded-full">+10%</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow-xl rounded-lg p-3 border border-gray-200 mb-8">
                    <div className="flex flex-wrap -mx-3">
                      <div className="w-full md:w-3/5 px-3 mb-3 md:mb-0">
                        <h1> This Weekend</h1>
                        <h3> Chat Volume</h3>
                        <ChartVolume />
                      </div>
                      <div className="w-full md:w-2/5 px-3 mb-3 md:mb-0">
                        <h1>Today</h1>
                        <h3> Satisfaction</h3>
                        <Satisfaction label="satisfaction" percentage="75" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full sm:w-1/2 md:w-1/2 px-3 mb-3 md:mb-0">
                      <div className="bg-white shadow-xl rounded-lg p-3 border border-gray-200">
                        <h1>Email</h1>
                        <h3> CSAT Today</h3>
                        <Satisfaction label="Email" percentage="94.55" />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/2 px-3 mb-3 md:mb-0">
                      <div className="bg-white shadow-xl rounded-lg p-3 border border-gray-200">
                        <h1>Chat</h1>
                        <h3> CSAT past 7d</h3>
                        <Satisfaction label="Chat" percentage="63" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/4 px-3 mb-5 md:mb-0">
                  <div className="bg-white shadow-xl rounded-lg border border-gray-200">
                    <h2 className="font-semibold text-2xl text-center mb-4">Customer Feedback</h2>
                    <div className="w-full mb-3 p-5">
                      <div className="flex flex-col items-center gap-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow " style={{backgroundColor:"#41479b"}}>
                        <h5 className="mb-2 text-5xl font-bold tracking-tight text-white dark:text-white">4.9</h5>
                        <div className="flex gap-1 justify-center">
                          <FaStar className="text-amber-400"  />
                          <FaStar className="text-amber-400"/>
                          <FaStar className="text-amber-400"/>
                          <FaStar className="text-amber-400"/>
                          <FaStarHalfAlt className="text-amber-400" />
                        </div>
                        <p className="font-normal text-white dark:text-gray-400">1580 Ratings</p>
                      </div>
                    </div>
                    <div className="w-full px-5">
                      <ReactApexChart options={state?.options} series={state?.series} type="bar" height={160} />
                    </div>
                    <div className="w-full mb-5 px-5">
                      <img src={line} alt="Ratings-img" className="w-full" />
                    </div>
                    <div className="w-full flex items-center mb-1 bg-blue-lighter px-5 py-3">
                      <div className="reviewer-img relative w-10 h-10 mr-3">
                        <img src={Rating_IMG_3} alt="Ratings 5" className="w-full" />
                        <span className="absolute top-5 right_-8 w-3 h-3 bg-grey border border-gray-900 rounded-full"></span>
                      </div>
                      <div className="reviewer-details w-full">
                        <h4 className="font-semibold text-xl leading-none">Danny Corwin</h4>
                        <p className="font-light text-sm leading-none py-2">5 Months Ago</p>
                        <h4 className="text-lg leading-none">Thanks Guys!</h4>
                      </div>
                      <div className="reviewer-hum">
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="w-full flex items-center mb-1 bg-blue-lighter px-5 py-3">
                      <div className="reviewer-img relative w-10 h-10 mr-3">
                        <img src={Rating_IMG_1} alt="Ratings 5" className="w-full" />
                        <span className="absolute top-5 right_-8 w-3 h-3 bg-grey border border-gray-900 rounded-full"></span>
                      </div>
                      <div className="reviewer-details w-full">
                        <h4 className="font-semibold text-xl leading-none">Danny Corwin</h4>
                        <p className="font-light text-sm leading-none py-2">5 Months Ago</p>
                        <h4 className="text-lg leading-none">Thanks Guys!</h4>
                      </div>
                      <div className="reviewer-hum">
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="w-full flex items-center mb-1 bg-blue-lighter px-5 py-3">
                      <div className="reviewer-img relative w-10 h-10 mr-3">
                        <img src={Rating_IMG_2} alt="Ratings 5" className="w-full" />
                        <span className="absolute top-5 right_-8 w-3 h-3 bg-green-dark border border-gray-900 rounded-full"></span>
                      </div>
                      <div className="reviewer-details w-full">
                        <h4 className="font-semibold text-xl leading-none">Danny Corwin</h4>
                        <p className="font-light text-sm leading-none py-2">5 Months Ago</p>
                        <h4 className="text-lg leading-none">Thanks Guys!</h4>
                      </div>
                      <div className="reviewer-hum">
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="w-full flex items-center mb-1 bg-blue-lighter px-5 py-3"><div className="reviewer-img relative w-10 h-10 mr-3">
                      <img src={Rating_IMG_3} alt="Ratings 5" className="w-full" />
                      <span className="absolute top-5 right_-8 w-3 h-3 bg-grey border border-gray-900 rounded-full"></span>
                    </div>
                      <div className="reviewer-details w-full">
                        <h4 className="font-semibold text-xl leading-none">Danny Corwin</h4>
                        <p className="font-light text-sm leading-none py-2">5 Months Ago</p>
                        <h4 className="text-lg leading-none">Thanks Guys!</h4>
                      </div>
                      <div className="reviewer-hum">
                        <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
