import React from 'react'
import { createImageFromInitials } from '../Common/Common'
const color = "#e4aa07";
const ChatLeftSide = ({ search, selectUser, setSelectUser, allUserData, debouncedOnChange, handleTabChange, activeTab, handleChangeUserMesssage }) => {


    return (
        <>
            <div className="border-solid border-grey-light rounded border shadow-sm w-full md:w-1/3 lg:w-1/3 sm:w-1/3">
                <div className="flex justify-center mt-4">
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-black rounded-full lg:w-64 md:w-52 w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => debouncedOnChange(e)} />
                    </div>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 py-5">
                    <ul className="flex flex-wrap -mb-px justify-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li className="mr-2" role="presentation">
                            <button className={`bg-blue-lighter hover:bg-blue text-blue hover:text-white font-bold py-2 px-4 rounded-full ${activeTab === 'All' ? 'active' : ''}`}
                                id="all"
                                onClick={() => handleTabChange('All')}
                                role="tab"
                                aria-controls="All"
                                aria-selected={activeTab === 'All'}
                            >
                                All
                            </button>
                        </li>
                        <li className="mr-2" role="presentation">
                            <button className={`bg-blue-lighter hover:bg-blue text-blue hover:text-white font-bold py-2 px-4 rounded-full ${activeTab === 'Read' ? 'active' : ''}`}
                                id="read"
                                onClick={() => handleTabChange('Read')}
                                role="tab"
                                aria-controls="Read"
                                aria-selected={activeTab === 'Read'}
                            >
                                Read
                            </button>
                        </li>
                        <li className="mr-2" role="presentation">
                            <button className={`bg-blue-lighter hover:bg-blue text-blue hover:text-white font-bold py-2 px-4 rounded-full ${activeTab === 'Unread' ? 'active' : ''}`}
                                id="unread"
                                onClick={() => handleTabChange('Unread')}
                                role="tab"
                                aria-controls="Unread"
                                aria-selected={activeTab === 'Unread'}
                            >
                                Unread
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="myTabContent" className='h-leftchat overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                    <div className='bg-gray-50 px-4 rounded-lg dark:bg-gray-800' id="screen" role="tabpanel" aria-labelledby="screen-tab">
                        {allUserData?.length > 0 && (
                            allUserData?.map((item, index) => {
                                return (
                                    <div className={`w-full flex items-center mb-1 rounded-lg hover:bg-[#d4d5d8e1] p-3 gap-4 ${selectUser?.id === item?.id ? "bg-[#bfc2c5e1]" : "bg-blue-lighter"}`}
                                        key={index}
                                        onClick={() => { handleChangeUserMesssage(item) }}>
                                        <div className="relative">
                                            <span className={`absolute ${item?.islive === false ? "text-grey border border-gray-900 rounded-full" : "text-green-500"} top-5 right_-5`}>
                                                <svg width="12" height="12">
                                                    <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                                                </svg>
                                            </span>

                                            <img
                                                className="w-10 sm:w-16 md:w-20 lg:w-img h-10 sm:h-12 rounded-full"
                                                src={item && item.profilePic ? item.profilePic : createImageFromInitials(500, item?.name, color)}
                                                alt="profile"
                                            />

                                        </div>
                                        <div className="reviewer-details w-full">
                                            <span className="font-semibold text-xl text-gray-700 leading-none">{item?.name}</span>
                                            <p className="text-lg text-gray-600 leading-none py-2">{item?.role}</p>
                                        </div>
                                        <div className="block text-center">
                                            <p className="text-sm text-gray-600">{item.lastSeen}</p>
                                            {item.unRead_Count &&
                                                <span className="bg-green-dark text-g text-white rounded-full flex items-center justify-center w-8 h-8">{item.unRead_Count}</span>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        )}
                        {allUserData?.length === 0 && (
                            <div className='empty-chat'>
                                <span className='text-xl text-gray-700'>No results</span>
                            </div>
                        )}
                    </div>


                    {/* <div className={`bg-gray-50 px-4 rounded-lg dark:bg-gray-800 ${activeTab === 'Read' ? '' : 'hidden'}`} id="myschedule" role="tabpanel" aria-labelledby="myschedule-tab">
                        {allUserData?.SearchData?.length > 0 && (
                            allUserData?.SearchData?.map((item, index) => {
                                return (
                                    <div className={`w-full flex items-center mb-1 rounded-lg hover:bg-[#d4d5d8e1] p-3 gap-4 ${selectUser?.id === item?.id ? "bg-[#bfc2c5e1]" : "bg-blue-lighter"}`}
                                        key={index}
                                        onClick={() => {
                                            setSelectUser(item)
                                        }}>
                                        <div className="relative">
                                            <span className={`absolute ${item?.islive === false ? "text-grey border border-gray-900 rounded-full" : "text-green-500"} top-5 right_-5`}>
                                                <svg width="12" height="12">
                                                    <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                                                </svg>
                                            </span>
                                            <img
                                                className="w-10 sm:w-16 md:w-20 lg:w-img h-10 sm:h-12 rounded-full"
                                                src={item && item.profilePic ? item.profilePic : createImageFromInitials(500, item?.name, color)}
                                                alt="profile"
                                            />
                                        </div>
                                        <div className="reviewer-details w-full">
                                            <span className="font-semibold text-xl text-gray-700 leading-none">{item?.name}</span>
                                            <p className="text-lg text-gray-600 leading-none py-2">{item?.role}</p>
                                        </div>
                                        <div className="block text-center">
                                            <p className="text-lg text-gray-600">1m</p>
                                            <span className="bg-green-dark text-lg text-white rounded-full flex items-center justify-center w-8 h-8">1</span>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                        {allUserData?.SearchData?.length === 0 && (
                            <div className='empty-chat'>
                                <span className='text-xl text-gray-700'>No results</span>
                            </div>
                        )}
                    </div>
                    <div className={`bg-gray-50 px-4 rounded-lg dark:bg-gray-800 ${activeTab === 'Unread' ? '' : 'hidden'}`} id="playlist" role="tabpanel" aria-labelledby="playlist-tab">
                        {allUserData?.SearchData?.length > 0 && (
                            allUserData?.SearchData?.map((item, index) => {
                                return (
                                    <div className={`w-full flex items-center mb-1 rounded-lg hover:bg-[#d4d5d8e1] p-3 gap-4 ${selectUser?.id === item?.id ? "bg-[#bfc2c5e1]" : "bg-blue-lighter"}`}
                                        key={index}
                                        onClick={() => {
                                            setSelectUser(item)
                                        }}>
                                        <div className="relative">
                                            <span className={`absolute ${item?.islive === false ? "text-grey border border-gray-900 rounded-full" : "text-green-500"} top-5 right_-5`}>
                                                <svg width="12" height="12">
                                                    <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                                                </svg>
                                            </span>
                                            {item?.profilePic !== "" ? (

                                                <img src={item?.profilePic} alt="Profile_Pic" className="w-10 sm:w-16 md:w-20 lg:w-img h-10 sm:h-12 rounded-full" />
                                            ) : (
                                                <img
                                                    className="w-10 sm:w-16 md:w-20 lg:w-img h-10 sm:h-12 rounded-full"
                                                    src={createImageFromInitials(
                                                        500,
                                                        item?.name,
                                                        color
                                                    )}
                                                    alt="profile"
                                                />
                                            )}
                                        </div>
                                        <div className="reviewer-details w-full">
                                            <span className="font-semibold text-xl text-gray-700 leading-none">{item?.name}</span>
                                            <p className="text-lg text-gray-600 leading-none py-2">{item?.role}</p>
                                        </div>
                                        <div className="block text-center">
                                            <p className="text-lg text-gray-600">1m</p>
                                            <span className="bg-green-dark text-lg text-white rounded-full flex items-center justify-center w-8 h-8">1</span>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                        {allUserData?.SearchData?.length === 0 && (
                            <div className='empty-chat'>
                                <span className='text-xl text-gray-700'>No results</span>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ChatLeftSide
