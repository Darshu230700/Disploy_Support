import React, { useState } from "react";
import video from "../Images/iStock-1137481126-7575efdf.mp4";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import { FORGOT_PASSWORD, UPDATE_PASSWORD } from "./API";
import toast from "react-hot-toast";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const newPassword = watch('newPassword')
  const navigate = useNavigate();
  const [isShowPassword, setShowPassword] = useState(false);
  const [passwordEye, setPasswordEye] = useState({
    temparyPassword: false,
    newPassword: false,
    confirmPassword: false
  })
  const [userId, setUserID] = useState("")
  const Email = watch("email");

  const onSubmit = (data) => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${FORGOT_PASSWORD}?Email=${data?.email}`,
      headers: {
      },
    };
    toast.loading("Verifying Your Email...");
    axios.request(config)
      .then((response) => {
        if (response?.data?.status) {
          toast.remove()
          setUserID(response?.data?.data)
          setShowPassword(true);
        } else {
          toast.remove()
          toast.error(response?.data?.message)
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data?.message)
      });
  };
  const onForgotSubmit = (data) => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${UPDATE_PASSWORD}?EmployeeMasterID=${userId}&Email=${Email}&Password=${data?.newPassword}&OTP=${data?.temparyPassword}`,
      headers: {
      },
    };
    toast.loading("Updating....")
    axios.request(config)
      .then((response) => {
        if (response?.data?.status) {
          toast.remove()
          toast.success(response?.data?.message)
          navigate('/')
        }
        else {
          toast.remove()
          toast.error(response?.data?.message)
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data?.message)

      });
  }
  return (
    <>
      <div className="videobg login relative">
        <video src={video} autoPlay muted loop />
        <div className="bg-cover bg-no-repeat min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center loginbg  lg:px-6 md:px-6 sm:px-2 xs:px-2 lg:mx-auto md:mx-auto sm:mx-auto xs:mx-2  lg:py-2 md:py-3 sm:py-5 xs:py-5 z-10">
            <div className="w-full border-[#ffffff6e] border rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
              <div className="lg:p-6 md:p-6  sm:px-4 xs:p-2 py-6">
                <div className="mb-2 font-inter not-italic font-medium text-[24px] text-white">
                  Forgot Password
                </div>
                <div className="lg:mb-8 md:mb-8 sm:mb-3 xs:mb-2 font-['Poppins'] not-italic font-normal lg:text-base md:text-base sm:text-sm xs:text-[14px] text-white">
                  Enter your email and we'll send you a link to reset your
                  password
                </div>
                {!isShowPassword ? (
                  <form
                    className="space-y-3 md:space-y-5"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                      <span className="text-white">Email</span>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-200 border input-bor-color text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "E-mail must be a valid e-mail address",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="error">{errors.email.message}</span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="w-full text-[#FFFFFF] bg-SlateBlue not-italic font-medium rounded-lg py-3.5 text-center text-base mt-4 hover:bg-primary border border-SlateBlue hover:border-white">
                      Email verify
                    </button>
                    <div className="flex lg:ml-3 lg:text-sm md:text-sm sm:text-sm xs:text-[14px] flex-wrap">
                      <p className="not-italic text-white font-medium">
                        Don’t have an account, yet?
                      </p>
                      <button
                        className="ml-1 not-italic text-white font-medium hover:text-SlateBlue"
                        onClick={() => navigate("/")}>
                        Sign up here
                      </button>
                    </div>
                  </form>
                ) : (
                  <form
                    className="space-y-3 md:space-y-5"
                    onSubmit={handleSubmit(onForgotSubmit)}>
                    <div className="relative">
                      <input
                        type={passwordEye?.temparyPassword ? "text" : "password"}
                        name="temparyPassword"
                        id="temparyPassword"
                        className="bg-gray-200 border input-bor-color text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Temporary password"
                        {...register("temparyPassword", {
                          required: "Temporary Password Is Required",
                        })}
                      />
                      <div className="icon mt-3 forgoticon-password">
                        {passwordEye?.temparyPassword ? (
                          <BsFillEyeFill
                            onClick={() =>
                              setPasswordEye({ ...passwordEye, temparyPassword: !passwordEye?.temparyPassword })
                            }
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            onClick={() =>
                              setPasswordEye({ ...passwordEye, temparyPassword: !passwordEye?.temparyPassword })
                            }
                          />
                        )}
                      </div>

                    </div>
                    {errors.temparyPassword && (
                      <span className="error">
                        {errors.temparyPassword.message}
                      </span>
                    )}

                    <div className="relative">
                      <input
                        type={passwordEye?.newPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        className="bg-gray-200 border input-bor-color text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter New Password"
                        {...register("newPassword", {
                          required: "New Password Is Required",
                          minLength: 8,
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
                          },
                        })}
                      />
                      <div className="icon mt-3 forgoticon-password">
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
                      <span className="error">
                        {errors.newPassword.message}
                      </span>
                    )}
                    {errors.newPassword && errors.newPassword.type === 'minLength' && (
                      <span className="error">
                        Password must be at least 8 characters long
                      </span>
                    )}
                    <div className="relative">
                      <input
                        type={passwordEye?.confirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        className="bg-gray-200 border input-bor-color text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Confirm New Password"
                        {...register("confirmPassword", {
                          required: "Confirm New Password Is Required",
                          validate: (value) => value === newPassword || 'Passwords Must Match'
                        })}
                      />
                      <div className="icon mt-3 forgoticon-password">
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
                      <span className="error">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                    <button
                      type="submit"
                      className="w-full text-[#FFFFFF] bg-SlateBlue not-italic font-medium rounded-lg py-3.5 text-center text-base mt-4 hover:bg-primary border border-SlateBlue hover:border-white">
                      Change Password
                    </button>

                    <div className="flex lg:ml-3 lg:text-sm md:text-sm sm:text-sm xs:text-[14px] flex-wrap">
                      <p className="not-italic text-white font-medium">
                        Don’t have an account, yet?
                      </p>
                      <button
                        className="ml-1 not-italic text-white font-medium hover:text-SlateBlue"
                        onClick={() => navigate("/")}>
                        Sign up here
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
