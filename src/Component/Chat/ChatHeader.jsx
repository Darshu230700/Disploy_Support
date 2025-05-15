import { Tooltip } from '@material-tailwind/react'
import React from 'react'
import { FaArrowLeft, FaBars } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import { createImageFromInitials } from '../Common/Common'

const ChatHeader = ({ selectUser, setShowMenu, showMenu }) => {   
const color = "#e4aa07";

    const accessDetails = localStorage.getItem("role_access");

    return (
        <div className="flex sm:items-center justify-between w-full py-3 px-5 border-b-2 border-gray-200">
            <div className="relative flex items-center">
                <div className="relative sm:hidden lg:flex md:flex cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
                    {!showMenu ? (
                        <FaArrowLeft size={24} />
                    ) : (
                        <FaBars size={20} />
                    )}
                </div>
                <div className="relative mx-3">
                    <span className={`absolute ${selectUser?.islive === false ? "text-grey border border-gray-900 rounded-full" : "text-green-500"} right-0 bottom-0`}>
                        <svg width="12" height="12">
                            <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                        </svg>
                    </span>
                    <img
                        src={createImageFromInitials(
                            500,
                            selectUser?.name,
                            color
                        )}
                        alt="Profile_Pic" className="w-10 sm:w-12 h-10 sm:h-12 rounded-full" />
                </div>
                <div className="flex flex-col leading-tight">
                    <div className="text-xl mt-1 flex items-center">
                        <span className="font-semibold text-gray-700 mr-3">{selectUser?.name}</span>
                    </div>
                    <span className="text-base text-gray-600">{selectUser?.role}</span>
                </div>
            </div>
            {accessDetails === "CUSTOMER" && (
                <div className="flex items-center">
                    <Tooltip
                        placement="bottom"
                        className="border border-blue-gray-50 bg-white text-black p-2 shadow-xl shadow-black/10"
                        content="Clear Chat History"
                        animate={{
                            mount: { scale: 1, y: 0 },
                            unmount: { scale: 0, y: 25 },
                        }}>
                        <button type="button" className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                            <MdDeleteOutline size={24} />
                        </button>
                    </Tooltip>
                </div>
            )}
        </div>
    )
}

export default ChatHeader
