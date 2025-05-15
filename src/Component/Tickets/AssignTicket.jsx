import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GetRoleName, createImageFromInitials } from '../Common/Common';


const color = "#e4aa07";
const AssignTicket = ({ toggleModal, setSelectedUser, allUserRoleData, onsubmit, selectedUser, allUserData, debouncedOnChange }) => {

  const handleCheckboxChange = (index, item) => {
    if (selectedUser === item) {
      setSelectedUser(null);
    } else {
      setSelectedUser(item);
    }
  };
  return (
    <>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed h-full top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Assign User
              </h3>
              <AiOutlineCloseCircle
                className="text-4xl text-primary cursor-pointer"
                onClick={() => {
                  toggleModal();
                }}
              />
            </div>
            <div >
              <div className='p-4 md:p-5'>
                <div className='flex justify-end mb-4'>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-black rounded-full w-56 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by User Name"
                      onChange={(e) => debouncedOnChange(e)} />
                  </div>
                </div>
                <div className="inline-block w-full shadow-md rounded-lg overflow-auto overflow-x-auto overflow-y-auto min-h-[320px] max-h-[320px] ">
                  <table className="w-full leading-normal">
                    <thead className="bg-blue-lighter">
                      <tr>
                        <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                          User Name
                        </th>
                        <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUserData?.SearchData?.length > 0 ? allUserData?.SearchData?.map((item, index) => {
                        return (
                          <tr className="border-b border-gray-200 bg-white" key={index}>
                            <td className="px-5 py-3 text-lg">
                              <div className="flex items-center">
                                <input type="checkbox" className="mr-2 leading-tight" onChange={() => handleCheckboxChange(index, item)} checked={selectedUser === item} />
                                <div className="ml-3">
                                  <p className="text-gray-900 text-base whitespace-no-wrap">
                                    {item?.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-lg">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {GetRoleName(allUserRoleData, item)}
                              </p>
                            </td>
                          </tr>
                        )
                      }) : (
                        <tr>
                          <td
                            className="font-semibold text-center bg-white text-lg p-3"
                            colSpan={2}
                          >
                            No Data Available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-center p-2 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
                  <button
                    className="bg-white text-primary text-base px-6 py-3 border border-primary  shadow-md rounded-full hover:bg-primary hover:text-white mr-2"
                    type="button"
                    onClick={toggleModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-primary text-white text-base px-8 py-3 border border-primary shadow-md rounded-full "
                    type="submit"
                    onClick={() => onsubmit()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>
    </>
  )
}

export default AssignTicket
