import React, { createContext, useContext, useRef, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MessageContainer from "./MessageContainer";
import Messages from "./Messages";
import ChatLeftSide from "./ChatLeftSide";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import Footer from "../Footer";
import io from 'socket.io-client';
import { allUsers, getByUserMessage, saveUserMessage, userLiveOrOffline } from "../../Redux/ChatSlice";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const Chat = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
   Chat.propTypes = {
      sidebarOpen: PropTypes.bool.isRequired,
      setSidebarOpen: PropTypes.func.isRequired,
      mobileSidebar: PropTypes.bool.isRequired,
      setMobileSidebar: PropTypes.func.isRequired,
   };

   const socket = io('https://supportsocket.disploy.com');

   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.root.auth);
   const { userList } = useSelector((state) => state.root.Chat);

   const hiddenFileInput = useRef(null);
   const [loading, setLoading] = useState(true);
   const [loadingMessage, setLoadingMessage] = useState(true);
   const [selectUser, setSelectUser] = useState()
   const [showMenu, setShowMenu] = useState(false);
   const [activeTab, setActiveTab] = useState('All');

   const [fileType, setfileType] = useState('');
   const [previewUrl, setPreviewUrl] = useState(null);

   const [search, setSearch] = useState('');

   const [loadChat, setLoadChat] = useState(true);  // socket
   const [message, setMessage] = useState('');  // socket
   const [allMessages, setMessages] = useState([]); // socket

   const fetchUserData = (tab) => {
      const payload = { isSearch: search, isType: tab ? tab : 'All' }
      setLoading(true)
      dispatch(allUsers(payload))
      setLoading(false);
   }


   useEffect(() => {
      fetchUserData()
   }, [])

   const getUserMessage = (item) => {
      setLoadingMessage(true)
      setMessages([]);
      const payload = { ReciverID: item?.id, ReciverLoginType: item?.loginType };
      dispatch(getByUserMessage(payload)).then((item) => {
         if (item.payload.status) {
            localStorage.setItem("chatMessages", JSON.stringify(item.payload.data))
            setLoadChat(true)
            setLoadingMessage(false)
            fetchUserData()
         }
      })
   }

   const handleChangeUserMesssage = (item) => {
      setSelectUser(item);
      getUserMessage(item)
   };

   // socket  start 

   useEffect(() => {
      socket.current = io('https://supportsocket.disploy.com');

      socket.current.on('connect', () => {
         console.log('Connected to Socket.IO server online');
         socket.current.emit('user-online');

         socket.current.on('update-user-status', (data) => {
            const isLive = data.status === "offline" ? false : true
            updateStatus(isLive)
            console.log("----------------------", data);

            // setUsers((prevUsers) => ({
            //     ...prevUsers,
            //     [data.userId]: data.status,
            // }));
         });

      });

      socket.current.on('disconnect', () => {
         console.log('Disconnected from Socket.IO server offline');
      });

      return () => {
         socket.current.disconnect();
      };
   }, []);

   const updateStatus = (isOnline) => {
      const payload = {
         LoginUserID: user?.loginType === "Employee" ? user?.employeeMasterID : user?.customerMasterID,
         LoginType: user?.loginType,
         Status: isOnline
      };
      dispatch(userLiveOrOffline(payload)).then(() => {
         fetchUserData(); // Update the user list
      });
   };


   useEffect(() => {
      if (loadChat) {
         const storedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
         setMessages(storedMessages);
         setLoadChat(false)
      }
   }, [loadChat]);

   useEffect(() => {
      socket.on('receive-message', (data) => {
         const params = {
            userChatID: data.userChatID,
            userId: data.userId,
            receiveId: data.receiveId,
            userLoginType: data.userLoginType,
            receiveLoginType: data.receiveLoginType,
            userName: data.userName,
            receiveName: data.receiveName,
            message: data.message,
            file: data.File,
            IsFile: data.previewUrl ? 1 : 0,
            message: data.message,
            isRead: data.isRead,
            unRead_Count: data.unRead_Count,
            roleName: data.roleName,
            roleID: data.roleID,
         };
         const updatedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
         updatedMessages.push(params);
         localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
         setLoadChat(true);  // Update the chat view
      });
      return () => {
         socket.off('receive-message');
      };
   }, []);

   const sendMessage = () => {
      if (selectUser) {
         const params = {
            userChatID: 0,
            userId: user?.loginType === "Employee" ? user?.employeeMasterID : user?.customerMasterID,
            receiveId: selectUser?.id,
            userLoginType: user?.loginType,
            receiveLoginType: selectUser?.loginType,
            userName: user?.name,
            receiveName: selectUser?.name,
            message: message,
            File: previewUrl,
            IsFile: previewUrl ? 1 : 0,
            isRead: false,
            unRead_Count: 0,
            roleName: user?.userRoleName,
            roleID: user?.userRoleID,
         };
         dispatch(saveUserMessage(params)) // api call save chat 
         setMessage('');
         setPreviewUrl('')
         setfileType('')
         socket.emit('send-message', params);
      }
   };

   // socket end

   const handleTabChange = (tab) => {
      setActiveTab(tab);
      fetchUserData(tab)
   };

   const handleChange = (e) => {
      setSearch(e.target.value)
      fetchUserData()
   }

   const handleClick = (e) => {
      hiddenFileInput.current.click();
   };


   const handleFileChange = (e) => {
      const selectedFile = e.target?.files[0];
      const maxSizeInBytes = 20 * 1024 * 1024;
      if (selectedFile?.size > maxSizeInBytes) {
         alert("File size exceeds 20 MB. Please upload a smaller file.");
         return;
      }
      const reader = new FileReader();
      setfileType('image')
      reader.onloadend = () => {
         setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
   };


   return (
      <>
         <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
         <div className="flex flex-1">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
            <main className="bg-white-500 flex-1 p-3 overflow-hidden">
               <div className="flex flex-col">
                  {loading && (
                     <div className="h-[550px] flex items-center justify-center">
                        <div colSpan={4}>
                           <div className="flex justify-center p-5">
                              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                              <span className="sr-only">Loading...</span>
                           </div>
                        </div>
                     </div>
                  )}
                  {!loading && (
                     <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2"> {fileType}
                        {!showMenu && (
                           <ChatLeftSide
                              search={search}
                              setSelectUser={setSelectUser}
                              handleChangeUserMesssage={handleChangeUserMesssage}
                              selectUser={selectUser}
                              allUserData={userList}
                              debouncedOnChange={handleChange}
                              handleTabChange={handleTabChange}
                              activeTab={activeTab}
                           />
                        )}
                        <div className={`md:mx-3 lg:mx-5 border-solid border-grey-light rounded border shadow-sm w-full ${showMenu ? "md:w-3/3 lg:w-3/3 sm:w-3/3" : "md:w-2/3 lg:w-2/3 sm:w-2/3"}`}>
                           <div className="flex-1 justify-between flex flex-col h-screen">
                              {selectUser ? (
                                 <>
                                    <Messages allMessages={allMessages} setShowMenu={setShowMenu} showMenu={showMenu} selectUser={selectUser} loadingMessage={loadingMessage} />
                                    <MessageContainer
                                       handleFileChange={handleFileChange}
                                       hiddenFileInput={hiddenFileInput}
                                       handleClick={handleClick}
                                       setMessage={setMessage}
                                       sendMessage={sendMessage}
                                       message={message}
                                       fileType={fileType}
                                       previewUrl={previewUrl}
                                    />
                                 </>
                              ) : (
                                 <div className="h-full w-full flex items-center justify-center">
                                    <div className="flex flex-col gap-2 items-center">
                                       <MdOutlineChatBubbleOutline size={48} className="text-gray" />
                                       <span className="font-semibold text-xl text-gray-700 mt-1">Chat for Support Panel</span>
                                       <span className="text-lg text-gray-600">Send and receive messages without keep your account login.</span>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            </main>
         </div>
         <Footer />
      </>
   );
};

export default Chat;
