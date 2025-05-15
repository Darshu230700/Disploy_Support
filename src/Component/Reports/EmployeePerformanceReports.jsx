import React from 'react'
import { IoChevronBack } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
const EmployeePerformanceReports = ({ allReportData, debouncedOnChange, exportDataToCSV, loading }) => {
  return (
    <>
      <main className="bg-white flex-1 p-3 overflow-hidden">
        <div className="flex flex-col">
          <section className="flex flex-1 flex-col md:flex-row lg:flex-row sm:flex-row mx-2 pb-5 items-center justify-between">
            <div className="font-bold text-xl flex items-center"><Link to="/reports">
              <div className="fa fa-angle-left mr-3">
                <IoChevronBack />
              </div>
            </Link> Employee Performance Report </div>
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-gray-900">
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-black rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..."
                    onChange={(e) => debouncedOnChange(e)} />
                </div>
              </div>
              <button className={`bg-blue text-white w-10 h-10 rounded-full ${allReportData?.SearchData?.length === 0 && !loading ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={allReportData?.SearchData?.length === 0 && !loading} onClick={() => exportDataToCSV()}>
                <div className='flex justify-center'>
                  <FaDownload />
                </div>
              </button>
            </div>
          </section>
          <section className="w-full p-3">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto ">
              <table className="min-w-full leading-normal">
                <thead className="bg-blue-lighter">
                  <tr>
                    <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">Employee Name</th>
                    <th className="px-5 py-3 text-center text-lg font-semibold text-gray-900 ">Solved ticket</th>
                    <th className="px-5 py-3 text-center text-lg font-semibold text-gray-900 ">Unsolved ticket</th>
                    <th className="px-5 py-3 text-center text-lg font-semibold text-gray-900 ">Assign Cases</th>
                    <th className="px-5 py-3 text-lg font-semibold text-gray-900 text-center">Average Rating </th>
                    <th className="px-5 py-3 text-center text-lg font-semibold text-gray-900 ">Total reviews </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan={6}
                      >
                        <div className="flex justify-center p-5">
                          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {allReportData?.SearchData?.length > 0 && !loading && (
                    allReportData?.SearchData?.map((item, index) => {
                      return (
                        <tr className="border-b border-gray-200 bg-white" key={index}>
                          <td className="px-5 py-3 text-lg">
                            <div className="flex items-center">
                              {/*<img className="rounded-full w-10 h-10 mr-2" src="dist/images/user-photo.jpeg" alt="" />*/}
                              <span className="text-gray-600 whitespace-no-wrap">
                                {item?.employeeName}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-lg">
                            <p className="text-gray-600 whitespace-no-wrap text-center">{item?.solvedticket}</p>
                          </td>
                          <td className="px-5 py-3 text-lg">
                            <p className="text-gray-600 whitespace-no-wrap text-center">{item?.unsolvedticket}</p>
                          </td>
                          <td className="px-5 py-3 text-lg">
                            <p className="text-gray-600 whitespace-no-wrap text-center">{item?.assignCases}</p>
                          </td>
                          <td className="px-5 py-3 text-lg">
                            <p className="text-gray-900 whitespace-no-wrap flex items-center justify-center">
                              <i className="fa fa-star text-yellow-500 mr-1"></i>
                              <i className="fa fa-star text-yellow-500 mr-1"></i>
                              <i className="fa fa-star text-yellow-500 mr-1"></i>
                              <i className="fa fa-star text-yellow-500 mr-1"></i>
                              <i className="fa fa-star text-gray-600"></i>
                            </p>
                            <p className="text-gray-900 whitespace-no-wrap text-center">{item?.averageRating}.0</p>
                          </td>
                          <td className="px-5 py-3 text-lg">
                            <p className="text-gray-600 whitespace-no-wrap text-center">{item?.totalReviews}</p>
                          </td>
                        </tr>
                      )
                    })
                  )}
                  {allReportData?.SearchData?.length === 0 && !loading && (
                    <tr>
                      <td
                        className="font-semibold text-center bg-white text-lg p-3"
                        colSpan={6}
                      >
                        No Data Available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>


        </div>
      </main>
    </>
  )
}

export default EmployeePerformanceReports
