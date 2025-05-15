import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD } from '../Pages/API';
import axios from 'axios';

const Security = ({ setActiveTab }) => {
  const { register, handleSubmit,
    watch,
    reset,
    formState: { errors } } = useForm();
  const newPassword = watch('newPassword')
  const { user, token } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;
  const navigator = useNavigate();
  const [passwordEye, setPasswordEye] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  })

  const handleReset = () => {
    reset(); // Reset all form fields
  }

  const onSubmit = (data) => {
    let URL = "";
    if (user?.loginType === "Employee") {
      URL = `${RESET_PASSWORD}?EmployeeMasterID=${user?.employeeMasterID}&OldPassowrd=${data?.currentPassword}&NewPassword=${data?.newPassword}&LoginType=${user?.loginType}`;
    } else {
      URL = `${RESET_PASSWORD}?CustomerMasterID=${user?.customerMasterID}&OldPassowrd=${data?.currentPassword}&NewPassword=${data?.newPassword}&LoginType=${user?.loginType}`
    }
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
        if (response?.data?.status) {
          toast.remove();
          toast.success("Your Password Change Successfully.");
          reset()
        } else {
          toast.remove();
          toast.error(response?.data?.message);

        }

      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <div className="rounded-xl mt-8 shadow bg-white p-5">
        <h4 className="user-name mb-3">Change Password</h4>
        <div className="-mx-3 flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
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
                <div className="icon mt-3 icon-password">
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
                    required: 'New Password Is Required',
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message:
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
                    },
                  })}
                  placeholder="Enter New Password"
                  className=" border border-black text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <div className="icon mt-3 icon-password">
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
                <div className="icon mt-3 icon-password">
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
                <button
                  className=" px-5 py-2 border border-primary rounded-full text-primary"
                  onClick={() => handleReset()}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <h4 className="user-name mb-3">Password Requirements:</h4>
            <ul>
              <li className="flex items-center">
                <span className="me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M0.0979682 7.2727C-0.0239126 7.16235 -0.0333736 6.97408 0.0768995 6.8522C0.187252 6.73024 0.375519 6.72086 0.49748 6.83113L3.20486 9.28608L9.25509 2.94963C9.3687 2.83029 9.55752 2.82552 9.67686 2.93914C9.79628 3.05267 9.80097 3.24149 9.68743 3.36091L3.43645 9.90765L3.43605 9.90725C3.32507 10.024 3.14062 10.0315 3.02048 9.92283L0.0979682 7.2727Z"
                      fill="#515151"
                    />
                    <path
                      d="M0.0979682 4.41577C-0.0239126 4.30542 -0.0333736 4.11715 0.0768995 3.99527C0.187252 3.87331 0.375519 3.86392 0.49748 3.9742L3.20486 6.42915L9.25509 0.0926969C9.3687 -0.0266397 9.55752 -0.03141 9.67686 0.0822023C9.79628 0.195735 9.80097 0.384559 9.68743 0.503975L3.43645 7.05071L3.43605 7.05032C3.32507 7.16703 3.14062 7.17458 3.02048 7.0659L0.0979682 4.41577Z"
                      fill="#515151"
                    />
                  </svg>
                </span>
                Minimum 8 characters long - the more, the better
              </li>
              <li className="flex items-center">
                <span className="me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M0.0979682 7.2727C-0.0239126 7.16235 -0.0333736 6.97408 0.0768995 6.8522C0.187252 6.73024 0.375519 6.72086 0.49748 6.83113L3.20486 9.28608L9.25509 2.94963C9.3687 2.83029 9.55752 2.82552 9.67686 2.93914C9.79628 3.05267 9.80097 3.24149 9.68743 3.36091L3.43645 9.90765L3.43605 9.90725C3.32507 10.024 3.14062 10.0315 3.02048 9.92283L0.0979682 7.2727Z"
                      fill="#515151"
                    />
                    <path
                      d="M0.0979682 4.41577C-0.0239126 4.30542 -0.0333736 4.11715 0.0768995 3.99527C0.187252 3.87331 0.375519 3.86392 0.49748 3.9742L3.20486 6.42915L9.25509 0.0926969C9.3687 -0.0266397 9.55752 -0.03141 9.67686 0.0822023C9.79628 0.195735 9.80097 0.384559 9.68743 0.503975L3.43645 7.05071L3.43605 7.05032C3.32507 7.16703 3.14062 7.17458 3.02048 7.0659L0.0979682 4.41577Z"
                      fill="#515151"
                    />
                  </svg>
                </span>
                At least one lowercase character
              </li>
              <li className="flex items-center">
                <span className="me-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M0.0979682 7.2727C-0.0239126 7.16235 -0.0333736 6.97408 0.0768995 6.8522C0.187252 6.73024 0.375519 6.72086 0.49748 6.83113L3.20486 9.28608L9.25509 2.94963C9.3687 2.83029 9.55752 2.82552 9.67686 2.93914C9.79628 3.05267 9.80097 3.24149 9.68743 3.36091L3.43645 9.90765L3.43605 9.90725C3.32507 10.024 3.14062 10.0315 3.02048 9.92283L0.0979682 7.2727Z"
                      fill="#515151"
                    />
                    <path
                      d="M0.0979682 4.41577C-0.0239126 4.30542 -0.0333736 4.11715 0.0768995 3.99527C0.187252 3.87331 0.375519 3.86392 0.49748 3.9742L3.20486 6.42915L9.25509 0.0926969C9.3687 -0.0266397 9.55752 -0.03141 9.67686 0.0822023C9.79628 0.195735 9.80097 0.384559 9.68743 0.503975L3.43645 7.05071L3.43605 7.05032C3.32507 7.16703 3.14062 7.17458 3.02048 7.0659L0.0979682 4.41577Z"
                      fill="#515151"
                    />
                  </svg>
                </span>
                At least one number, symbol, or whitespace character
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <div className="rounded-xl mt-8 shadow bg-white my-3 p-5">
        <h4 className="user-name mb-3">Two-steps verification</h4>
        <p className="font-medium lg:text-md my-3">
          Two factor authentication is not enabled yet.
        </p>
        <p className="mb-3">
          Two-factor authentication adds an additional layer of security to your
          account byrequiring more than just a password to log in.
        </p>
        <button className="px-5 bg-primary text-white rounded-full py-2 border border-primary">

          Enable 2FA
        </button>
      </div> */}
    </div>
  )
}

export default Security
