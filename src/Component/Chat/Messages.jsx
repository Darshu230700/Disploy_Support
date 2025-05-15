import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import { createImageFromInitials } from '../Common/Common';

const Messages = ({ selectUser, setShowMenu, showMenu, allMessages, loadingMessage }) => {
    const messagesEndRef = useRef(null);

    const color = "#e4aa07";
    const currentUser = JSON.parse(localStorage.getItem('userID'));
    const currentUserId = currentUser?.loginType === "Employee" ? currentUser?.employeeMasterID : currentUser?.customerMasterID;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [allMessages]);


    return (
        <>

            <ChatHeader setShowMenu={setShowMenu} showMenu={showMenu} selectUser={selectUser} />
            <div id="messages" className="flex flex-col space-y-4 p-5 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                {loadingMessage &&
                    <div className="flex justify-center items-center h-full">
                        <div className="loader">Loading...</div>
                    </div>
                }

                {!loadingMessage && allMessages.length === 0 &&
                    <div className="text-center text-gray-500 mt-10">
                        No messages
                    </div>
                }

                {!loadingMessage && allMessages && allMessages?.map((item, i) => (
                    <div key={i} className="chat-message mb-5">
                        {item.userId !== currentUserId ? (
                            <div className="flex items-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                                    <div className="mb-3">

                                        {item.file &&
                                            <img src={item.file} alt='' width={100} />
                                        }

                                        {item.message &&
                                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{item?.message} </span>
                                        }

                                    </div>
                                </div>
                                <img
                                    src={createImageFromInitials(500, selectUser?.name, color)}
                                    alt="Profile" className="w-6 h-6 rounded-full order-1" />
                            </div>
                        ) : (
                            <div className="flex items-end justify-end">
                                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                                    <div className="mb-3">
                                        {item.file &&
                                            <img src={item.file} alt='' width={100} />
                                        }

                                        {item.file && item.fileType === 'video' &&
                                            <video width="200" controls>
                                                <source src={item.file} type="video/mp4" />
                                                Your browser does not support HTML video.
                                            </video>
                                        }

                                        {item.message &&
                                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{item?.message}</span>
                                        }
                                    </div>
                                </div>
                                <img
                                    src={createImageFromInitials(500, selectUser?.name, color)}
                                    alt="Profile" className="w-6 h-6 rounded-full order-2" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
        </>
    );
}

export default Messages;
