import React, { useState } from "react";
import video from "../Images/iStock-1137481126-7575efdf.mp4";
import logo from "../Images/logo.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { handleLoginUser } from "../Redux/AuthSlice";
import toast from "react-hot-toast";
import { LOGIN_URL } from "./API";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root.auth);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${LOGIN_URL}?Email=${data?.Email}&Password=${data?.Password}`,
      headers: {
      },
    };
    const response = dispatch(handleLoginUser({ config }));
    if (response) {
      response
        .then((res) => {
          const response = res?.payload;
          if (response.status === 200) {
            localStorage.setItem("userID", JSON.stringify(response));
            window.localStorage.setItem("timer", JSON.stringify(18_00));
            if (response?.isSuperAdmin) {
              localStorage.setItem("role_access", "SUPER_ADMIN");
            } else {
              if (response?.loginType === "Employee") {
                localStorage.setItem("role_access", "EMPLOYEE")
              }else{
                localStorage.setItem("role_access", "CUSTOMER")
              }
            }
            // window.location.href = "/dashboard";
          } else {
            toast.remove();
            toast.error(response?.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  return (
    <>
      <div className="videobg login relative">
        <video src={video} autoPlay muted loop />
        <div className="bg-cover bg-no-repeat min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center loginbg  lg:px-6 md:px-6 sm:px-2 xs:px-2 lg:mx-auto md:mx-auto sm:mx-auto xs:mx-2  lg:py-2 md:py-3 sm:py-5 xs:py-5 z-10">
            <div className="flex items-center pb-5">
              <img className="w-fit h-fit" alt="logo" src={logo} />
            </div>
            <div className="w-full border-[#ffffff6e] border rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
              <div className="lg:p-6 md:p-6  sm:px-4 xs:p-2 py-6">
                <div className="mb-2 font-inter not-italic font-medium text-[24px] text-white">
                  Sign in
                </div>
                <div className="lg:mb-8 md:mb-8 sm:mb-3 xs:mb-2 font-['Poppins'] not-italic font-normal lg:text-base md:text-base sm:text-sm xs:text-[14px] text-white">
                  Fill in the fields below to sign into your account.
                </div>
                <form
                  className="space-y-3 md:space-y-5"
                  onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative">
                    <span className="text-white">Email</span>
                    <input
                      type="email"
                      name="emailID"
                      id="Email"
                      className="formInput"
                      placeholder="Enter Your Email Address"
                      {...register("Email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "E-mail must be a valid e-mail address",
                        },
                      })}
                    />
                    {errors.Email && (
                      <span className="error">{errors.Email.message}</span>
                    )}
                    {/*<label >Email address</label> */}
                  </div>
                  <div className="relative">
                    <div className="relative">
                      <span className="text-white">Password</span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="Password"
                        placeholder="Enter Your Password"
                        className="formInput"
                        {...register("Password", {
                          required: "Password is required",
                        })}
                      />
                      <div className="icon">
                        {showPassword ? (
                          <BsFillEyeFill
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        )}
                      </div>
                      {errors.Password && (
                        <span className="error">{errors.Password.message}</span>
                      )}
                    </div>
                  </div>

                  <p
                    className="ml-1 mt-2 not-italic text-white font-medium  text-right hover:text-SlateBlue"
                    onClick={handleForgotPassword}>
                    Forgot Password?
                  </p>

                  <button
                    type="submit"
                    className="w-full text-[#FFFFFF] bg-SlateBlue not-italic font-medium rounded-lg py-3.5 text-center text-base mt-4 hover:bg-primary border border-SlateBlue hover:border-white"
                    disabled={loading}>
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                  <div className="flex lg:ml-3 lg:text-sm md:text-sm sm:text-sm xs:text-[14px] flex-wrap">
                    <p className="not-italic text-white font-medium">
                      Don’t have an account, yet?
                    </p>
                    <button
                      className="ml-1 not-italic text-white font-medium hover:text-SlateBlue"
                      onClick={() => {
                        navigate("/register");
                      }}>
                      Sign up here
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
