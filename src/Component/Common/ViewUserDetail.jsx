import React, { useState } from 'react'
import { IoIosLink, IoMdNotificationsOutline } from "react-icons/io";
import { MdLockOutline } from 'react-icons/md';
import deleteImg from "../../Images/Settings/delete.svg";
import google_logo from "../../Images/Settings/Google__G__Logo.svg";
import slack from "../../Images/Settings/Slack_Technologies_Logo.svg";
import facebook from "../../Images/Settings/facebook-logo.svg";
import twitter from "../../Images/Settings/twitter-logo.svg";
import dribble from "../../Images/Settings/dribbble-logo.svg";
import link_icon from "../../Images/Settings/link-icon.svg";
import { IoChevronBack } from 'react-icons/io5';
import { RESET_PASSWORD } from '../../Pages/API';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { GetRoleName, createImageFromInitials } from './Common';
import UserSuspend from "./UserSuspend";

const color = "#e4aa07";
const ViewUserDetail = ({ setShowViewModal, userData, setUserData, setShowModal, setView, allUserRoleData }) => {
  const { register, handleSubmit,
    watch,
    reset,
    formState: { errors } } = useForm();
  const newPassword = watch('newPassword')
  const { user, token } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;
  const [activeTab, setActiveTab] = useState(1);
  const [suspendUser, setSuspendUser] = useState(false);

  const [passwordEye, setPasswordEye] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })
  const handleEdit = () => {
    setShowModal(true)
  }

  const onSubmit = (data) => {
    let URL = "";
    if (user?.loginType === "Employee") {
      URL = `${RESET_PASSWORD}?EmployeeMasterID=${userData?.employeeMasterID}&OldPassowrd=${data?.currentPassword}&NewPassword=${data?.newPassword}&LoginType=${user?.loginType}`;
    }
    // else {
    //   URL = `${RESET_PASSWORD}?CustomerMasterID=${userData?.customerMasterID}&OldPassowrd=${data?.currentPassword}&NewPassword=${data?.newPassword}&LoginType=${user?.loginType}`
    // }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: URL,
      headers: {
        Authorization: authToken,
      },
    };
    axios.request(config)
      .then((response) => {
        toast.dismiss();
        toast.success("Your Password Change Successfully.");
        setShowViewModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const HandleClose = () => {
    setSuspendUser(!suspendUser);
  }

  const handleSuspend = () => {
    setSuspendUser(false);
  }

  return (
    <>
      <div className="lg:p-4 md:p-4 sm:p-2 xs:p-2 ">
        <h1
          onClick={() => {
            setUserData()
            setView(false)
            setShowViewModal(false);
          }}
          className="font-medium flex cursor-pointer w-fit items-center lg:text-2xl md:text-2xl sm:text-xl mb-5 gap-4"
        >
          <IoChevronBack size={30} />
          User Information
        </h1>
        <div className="full flex flex-wrap -mx-3 mb-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="card-shadow pt-6">
              <div className="user-details text-center border-b border-b-[#E4E6FF]">

                <div className="total-screens-count my-4">
                  <span className="screen-icon me-3">
                    {userData?.profilePic ? (
                      <img
                        className="w-full h-full rounded-full"
                        src={
                          userData?.profilePic
                        }
                      />
                    ) : (
                      <img
                        className="w-full h-full rounded-full"
                        src={
                          createImageFromInitials(
                            500,
                            userData?.name,
                            color
                          )}
                        alt=""
                      />
                    )}
                  </span>

                </div>
                <span className="user-name">
                  {userData?.name}
                </span>
                <div className="user-designation my-2">
                  {GetRoleName(allUserRoleData, userData)}
                </div>
              </div>
              <div className="user-pro-details">
                <h3 className="user-name my-2">Details</h3>
                <div className="flex">
                  <label className="font-semibold">User ID :</label>
                  <span className="ml-2">
                    {userData?.employeeMasterID}
                  </span>
                </div>
                <div className="flex">
                  <label className="font-semibold">User Name :</label>
                  <span className="ml-2">
                    {userData?.name}
                  </span>
                </div>

                <div className="flex">
                  <label className="font-semibold">Email :</label>
                  <span className="ml-2">{userData?.email}</span>
                </div>

                <div className="flex">
                  <label className="font-semibold">Status :</label>
                  {userData?.status === "1" && (
                    <span className="bg-green-200 rounded-lg px-3 py-1 font-semibold text-green-900 leading-tight">
                      Active
                    </span>
                  )}
                  {userData?.status === "0" && (
                    <span className="px-3 py-1 rounded-lg font-semibold bg-grey-light text-grey-400 leading-tight">
                      Inactive
                    </span>
                  )}
                </div>

                <div className="flex">
                  <label className="font-semibold">Role :</label>
                  <span className="ml-2">
                    {GetRoleName(allUserRoleData, userData)}
                  </span>
                </div>
                <div className="flex">
                  <label className="font-semibold">Country :</label>
                  <span className="ml-2">{userData?.countryName}</span>
                </div>
                <div className="flex">
                  <label className="font-semibold">City :</label>
                  <span className="ml-2">{userData?.cityName}</span>
                </div>
                <div className="flex">
                  <label className="font-semibold">Street :</label>
                  <span className="ml-2">{userData?.street}</span>
                </div>
                <div className="flex">
                  <label className="font-semibold">Zip Code :</label>
                  <span className="ml-2">{userData?.zipcode}</span>
                </div>
                <div className="flex justify-center w-full mt-5">
                  <button
                    className="me-3 hover:bg-white hover:text-black text-base px-8 py-2 border border-primary  shadow-md rounded-full bg-primary text-white"
                    onClick={() => handleEdit()}
                  >
                    Edit Profile
                  </button>
                  {user?.isSuperAdmin && (
                    <button className="hover:text-#ffbebe px-8 py-3 border border-red shadow-md rounded-full text-red-600 text-1xl font-semibold bg-[#ffbebe]" onClick={() => setSuspendUser(true)}>
                      Suspend
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="card-shadow pt-6">
              <ul className="flex flex-wrap gap-3 items-center xs:mt-2 sm:mt-0 md:mt-0  lg:mt-0  xs:mr-1  mr-3  ">
                <li>
                  <button
                    className={` flex items-center ${activeTab === 1
                      ? "text-white items-center rounded-full bg-primary "
                      : ""
                      } py-3 px-4 w-auto border border-primary  rounded-full mx-2`}
                    onClick={() => setActiveTab(1)}
                  >
                    <MdLockOutline className=" text-lg mr-1" />
                    Security
                  </button>
                </li>
                <li>
                  <button
                    className={` flex items-center ${activeTab === 2
                      ? "text-white items-center rounded-full bg-primary "
                      : ""
                      } py-3 px-4 w-auto border border-primary  rounded-full mx-2`}
                    onClick={() => setActiveTab(2)}
                  >
                    <IoMdNotificationsOutline className=" text-lg mr-1" />
                    Notifications
                  </button>
                </li>
                <li>
                  <button
                    className={`flex items-center ${activeTab === 3
                      ? "text-white items-center rounded-full bg-primary "
                      : ""
                      } py-3 px-4 w-auto border border-primary  rounded-full mx-2`}
                    onClick={() => setActiveTab(3)}
                  >
                    <IoIosLink className=" text-lg mr-1" />
                    Connections
                  </button>
                </li>
              </ul>
              <div className={activeTab === 1 ? "" : "hidden"}>
                <div className="user-pro-details security-tab">
                  <h3 className="user-name my-6">Change Password</h3>
                  <div className="w-full py-9 mb-8 bg-light-red text-center">
                    <p className="mb-3">
                      <b>Ensure that these Requirements are met</b>
                    </p>
                    <p className=""> Minimum 8 characters long,</p>
                    <p> uppercase & symbol</p>
                  </div>
                  <div className="w-full mb-4">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <div className="relative">
                        <label className="label_top text-sm font-medium text-gray-900 dark:text-white">
                          Current Password
                        </label>
                        <input
                          type={passwordEye?.currentPassword ? "text" : "password"}
                          name="currentPassword"
                          id="currentPassword"
                          {...register('currentPassword', {
                            required: 'Current Password Is Required',
                          })}
                          className=" border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Current Password"

                        />
                        <div className="icon mt-3 usericon-password">
                          {passwordEye?.currentPassword ? (
                            <BsFillEyeFill
                              onClick={() =>
                                setPasswordEye({ ...passwordEye, currentPassword: !passwordEye?.currentPassword })
                              }
                            />
                          ) : (
                            <BsFillEyeSlashFill
                              onClick={() =>
                                setPasswordEye({ ...passwordEye, currentPassword: !passwordEye?.currentPassword })
                              }
                            />
                          )}
                        </div>
                      </div>
                      {errors.currentPassword && (
                        <span className="error">{errors.currentPassword.message}</span>
                      )}

                      <div className="relative">
                        <label className="label_top text-sm font-medium text-gray-900 dark:text-white">
                          New Password
                        </label>
                        <input
                          type={passwordEye?.newPassword ? "text" : "password"}
                          name="newPassword"
                          id="newPassword"
                          {...register('newPassword', {
                            required: 'New Password Is Required', pattern: {
                              value:
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                              message:
                                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
                            },
                          })}
                          placeholder="Enter New Password"
                          className=" border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <div className="icon mt-3 usericon-password">
                          {passwordEye?.newPassword ? (
                            <BsFillEyeFill
                              onClick={() =>
                                setPasswordEye({ ...passwordEye, newPassword: !passwordEye?.newPassword })
                              }
                            />
                          ) : (
                            <BsFillEyeSlashFill
                              onClick={() =>
                                setPasswordEye({ ...passwordEye, newPassword: !passwordEye?.newPassword })
                              }
                            />
                          )}
                        </div>
                      </div>
                      {errors.newPassword && (
                        <span className="error">{errors.newPassword.message}</span>
                      )}

                      <div className="relative">
                        <label className="label_top text-sm font-medium text-gray-900 dark:text-white">
                          Confirm password
                        </label>
                        <input
                          type={passwordEye?.confirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          {...register('confirmPassword', { required: 'Confirm New Password Is Required', validate: (value) => value === newPassword || 'Passwords Must Match' })}
                          placeholder="Enter Confirm New Password"
                          className=" border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <div className="icon mt-3 usericon-password">
                          {passwordEye?.confirmPassword ? (
                            <BsFillEyeFill
                              onClick={() =>
                                setPasswordEye({ ...passwordEye, confirmPassword: !passwordEye?.confirmPassword })
                              }
                            />
                          ) : (
                            <BsFillEyeSlashFill
                              onClick={() =>
                                setPasswordEye({ ...passwordEye, confirmPassword: !passwordEye?.confirmPassword })
                              }
                            />
                          )}
                        </div>
                      </div>
                      {errors.confirmPassword && (
                        <span className="error">{errors.confirmPassword.message}</span>
                      )}

                      <div className="md:w-full flex pt-7">
                        <button
                          className="px-5 bg-primary text-white rounded-full py-2 border border-primary me-3"
                        >
                          Save Changes
                        </button>

                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className={activeTab === 2 ? "" : "hidden"}>
                <div className="user-pro-details notifications-tab mt-4">
                  <h3 className="user-name ">Notifications</h3>
                  <p className="mb-3">
                    You will receive notification for the below selected
                    items.
                  </p>

                  <div className="w-full my-6 overflow-x-auto">
                    <table className="min-w-full leading-normal border border-[#E4E6FF] bg-white mb-8">
                      <thead>
                        <tr className="border-b border-b-[#E4E6FF]">
                          <th className="px-5 py-4 text-left text-md font-semibold text-gray-600 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-5 py-4 text-left text-md font-semibold text-gray-600 uppercase tracking-wider">
                            Send alerts
                          </th>
                          <th className="px-5 py-4 text-left text-md font-semibold text-gray-600 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-5 py-4 text-left text-md font-semibold text-gray-600 uppercase tracking-wider">
                            Phone
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-3 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Screen Offline
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <div className="relative ">
                              <select
                                className="appearance-none w-full py-1 px-2 border border-[#E4E6FF] rounded-md bg-white"
                                name="whatever"
                                id="frm-whatever"
                              >
                                <option value="">Select </option>
                                <option value="1">Item 1</option>
                                <option value="2">Item 2</option>
                                <option value="3">Item 3</option>
                              </select>
                              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                                <svg
                                  className="h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label className="checkbox" htmlFor="offline1">
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="offline1" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label className="checkbox" htmlFor="offline2">
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="offline2" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                        </tr>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 p-3 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Purchased Plan
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <div className="relative ">
                              <select
                                className="appearance-none w-full py-1 px-2 border border-[#E4E6FF] rounded-md bg-white"
                                name="whatever"
                                id="frm-whatever"
                              >
                                <option value="">Instant </option>
                                <option value="1">Item 1</option>
                                <option value="2">Item 2</option>
                                <option value="3">Item 3</option>
                              </select>
                              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                                <svg
                                  className="h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label
                              className="checkbox"
                              htmlFor="purchased-plan1"
                            >
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="purchased-plan1" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label
                              className="checkbox"
                              htmlFor="purchased-plan2"
                            >
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="purchased-plan2" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                        </tr>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-3 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Added Users
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <div className="relative ">
                              <select
                                className="appearance-none w-full py-1 px-2 border border-[#E4E6FF] rounded-md bg-white"
                                name="whatever"
                                id="frm-whatever"
                              >
                                <option value="">15 Minute </option>
                                <option value="1">20 Minute</option>
                                <option value="2">25 Minute</option>
                                <option value="3">30 Minute</option>
                              </select>
                              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                                <svg
                                  className="h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label className="checkbox" htmlFor="added-users1">
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="added-users1" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label className="checkbox" htmlFor="added-users2">
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="added-users2" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                        </tr>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-3 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Changing Details
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <div className="relative ">
                              <input
                                type="text"
                                className="appearance-none w-full py-1 px-2 border border-[#E4E6FF] rounded-md bg-white"
                                placeholder="Enter time (Minute)"
                              />
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label
                              className="checkbox"
                              htmlFor="changing-details1"
                            >
                              <span className="checkbox__label"></span>
                              <input
                                type="checkbox"
                                id="changing-details1"
                              />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label
                              className="checkbox"
                              htmlFor="changing-details2"
                            >
                              <span className="checkbox__label"></span>
                              <input
                                type="checkbox"
                                id="changing-details2"
                              />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                        </tr>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-3 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Playlist
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <div className="relative ">
                              <select
                                className="appearance-none w-full py-1 px-2 border border-[#E4E6FF] rounded-md bg-white"
                                name="whatever"
                                id="frm-whatever"
                              >
                                <option value="">Select </option>
                                <option value="1">Playlist 1</option>
                                <option value="2">Playlist 2</option>
                                <option value="3">Playlist 3</option>
                              </select>
                              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                                <svg
                                  className="h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label className="checkbox" htmlFor="Playlist1">
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="Playlist1" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label className="checkbox" htmlFor="Playlist2">
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="Playlist2" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                        </tr>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-3 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Assets
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <div className="relative ">
                              <select
                                className="appearance-none w-full py-1 px-2 border border-[#E4E6FF] rounded-md bg-white"
                                name="whatever"
                                id="frm-whatever"
                              >
                                <option value="">Select </option>
                                <option value="1">Assets 1</option>
                                <option value="2">Assets 2</option>
                                <option value="3">Assets 3</option>
                              </select>
                              <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 ">
                                <svg
                                  className="h-4 w-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label className="checkbox" htmlFor="Assets1">
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="Assets1" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                          <td className="px-5 py-3 text-sm">
                            <label className="checkbox" htmlFor="Assets2">
                              <span className="checkbox__label"></span>
                              <input type="checkbox" id="Assets2" />
                              <div className="checkbox__indicator"></div>
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="buttonWrapper flex justify-center  w-full">
                    <button
                      type="submit"
                      id="submitButton"
                      className="me-3 hover:bg-white hover:text-black text-base px-8 py-3 border border-primary  shadow-md rounded-full bg-primary text-white"
                    >
                      <span>Save Change</span>
                    </button>
                    <button className="hover:bg-white hover:text-black text-base px-8 py-3 border border-red shadow-md rounded-full text-red-900">
                      Discard
                    </button>
                  </div>
                </div>
              </div>
              <div className={activeTab === 3 ? "" : "hidden"}>
                <div className="user-pro-details connections-tab mt-3">
                  <h3 className="user-name ">Connected Accounts</h3>
                  <p className="mb-2">
                    Display content from your connected accounts on your
                    site.
                  </p>

                  <div className="w-full my-6">
                    <table className="min-w-full leading-normal border border-[#E4E6FF] bg-white mb-4">
                      <thead>
                        <tr className="border-b border-b-[#E4E6FF]">
                          <th className="px-5 py-3 text-left text-lg font-semibold text-gray-600 uppercase tracking-wider">
                            Apps
                          </th>
                          <th className="px-5 py-3 text-right text-lg font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-2 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={google_logo}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3 text-left">
                                <strong>Google</strong>
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Calendar and contacts
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-2 text-sm text-right">
                            <span className="bg-green-200 px-3 py-1 font-semibold text-green-900 leading-tight rounded-full">
                              Connect
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-2 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={slack}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3 text-left">
                                <strong>Slack</strong>
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Communication
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-2 text-sm text-right">
                            <span className="bg-red-200 px-3 py-1 font-semibold text-red-900 leading-tight rounded-full">
                              Disconnect
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <h3 className="user-name ">Social Accounts</h3>
                    <p className="mb-3">
                      Display content from social accounts on your site.
                    </p>

                    <table className="min-w-full leading-normal border border-[#E4E6FF] bg-white mb-6">
                      <tbody>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-3 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={facebook}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3 text-left">
                                <strong>Facebook</strong>
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Not connected
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-2 text-sm">
                            <a className="link-icon-bg">
                              <img src={link_icon} />
                            </a>
                          </td>
                        </tr>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-2 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={twitter}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3 text-left">
                                <strong>Twitter</strong>
                                <p className="text-gray-900 whitespace-no-wrap">
                                  @Pixinvent
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-2 text-sm">
                            <a className="delete-icon-bg">
                              <img src={deleteImg} />
                            </a>
                          </td>
                        </tr>
                        <tr className="border-b border-b-[#E4E6FF] bg-white">
                          <td className="px-5 py-2 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-full h-full rounded-full"
                                  src={dribble}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3 text-left">
                                <strong>Dribbble</strong>
                                <p className="text-gray-900 whitespace-no-wrap">
                                  Not connected
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-2 text-sm">
                            <a className="delete-icon-bg">
                              <img src={deleteImg} />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="buttonWrapper flex justify-center  w-full">
                      <button
                        type="submit"
                        id="submitButton"
                        className="me-3 hover:bg-white hover:text-black text-base px-8 py-3 border border-primary  shadow-md rounded-full bg-primary text-white"
                      >
                        <span>Save Change</span>
                      </button>
                      <button className="hover:bg-white hover:text-black text-base px-8 py-3 border border-red shadow-md rounded-full text-red-900  bg-red-200 ">
                        Discard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {suspendUser && (
        <UserSuspend HandleClose={HandleClose} handleSuspend={handleSuspend} />
      )}
    </>
  )
}

export default ViewUserDetail
