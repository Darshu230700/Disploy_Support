import React, { useEffect, useState } from "react";
import video from "../Images/iStock-1137481126-7575efdf.mp4";
import logo from "../Images/logo.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { handleRegisterUser } from "../Redux/AuthSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { ADD_CUSTOMER_REGISTER, GET_ALL_CITY, GET_ALL_COUNTRY } from "./API";

const Register = () => {
  const {
    getValues,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios
      .get(GET_ALL_COUNTRY)
      .then((response) => {
        setCountries(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(`${GET_ALL_CITY}?CountryID=${selectedCountry}`)
        .then((response) => {
          setCities(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCountry]);

  const onSubmit = (data) => {

    let formdata = new FormData();
    formdata.append("cityID", data?.City);
    formdata.append("countryID", data?.country);
    formdata.append("email", data?.Email);
    formdata.append("name", data?.Name);
    formdata.append("password", data?.Password);
    formdata.append("street", data?.Street);
    formdata.append("zipcode", data?.ZipCode);
    formdata.append("opretion", "Save");
    setLoading(true);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: ADD_CUSTOMER_REGISTER,
      headers: {
        "Content-Type": "multipart/formdata"
      },
      data: formdata,
    };
    const response = dispatch(handleRegisterUser({ config }));
    if (response) {
      response
        .then((res) => {
          const response = res?.payload;
          if (response?.status) {
            window.localStorage.setItem("timer", JSON.stringify(18_00));
            toast.success("Registration successfully.");
            navigate("/");
            setLoading(false);
          } else {
            toast.error(response?.message);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.remove()
          setLoading(false);
        });
    }
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
            <div className="w-full border-[#ffffff6e] border rounded-lg shadow-md md:mt-0  xl:p-0 lg:min-w-[600px] md:min-w-[600px] sm:min-w-auto xs:min-w-auto">
              <div className="p-3 sm:px-8 py-1">
                <div className="my-1 font-inter not-italic font-medium text-[24px] text-white mt-4">
                  Create account
                </div>
                <div className="mb-8 font-['Poppins'] not-italic font-normal text-[16px] text-white">
                  Fill in the fields below to sign up for an account.
                </div>
                <form
                  className="space-y-3 md:space-y-5"
                  onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 lg:gap-4 md:gap-4 sm:gap-2 xs:gap-2">
                    <div className="relative lg:max-w-[534px] md:max-w-[534px] col-span-2">
                      <span className="text-white">Name</span>
                      <input
                        type="text"
                        name="Name"
                        id="Name"
                        placeholder="Enter Your Name"
                        className="formInput"
                        {...register("Name", {
                          required: "Name is required",
                        })}
                      />
                      {errors.Name && (
                        <span className="error">{errors.Name.message}</span>
                      )}
                    </div>
                    <div className="relative lg:max-w-[534px] md:max-w-[534px] col-span-2">
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
                    </div>
                    <div className="relative lg:max-w-[534px] md:max-w-[534px] col-span-2">
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
                            pattern: {
                              value:
                                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                              message:
                                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
                            },
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
                      </div>
                      {errors.Password && (
                        <span className="error">{errors.Password.message}</span>
                      )}
                    </div>
                    <div className="relative lg:max-w-[534px] md:max-w-[534px] col-span-2">
                      <span className="text-white">Address</span>
                      <select
                        id="country"
                        className="formInput"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        onChange={(e) => {
                          setValue("country", e.target.value); // Set value using setValue from react-hook-form
                          setSelectedCountry(e.target.value);
                        }}>
                        <option value="" label="Select Country"></option>
                        {countries.map((country) => (
                          <option
                            key={country.countryID}
                            selected={
                              country?.countryID === getValues("country")
                            }
                            value={country.countryID}
                          // onChange={(e) => {}}
                          >
                            {country.countryName}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <span className="error">{errors.country.message}</span>
                      )}
                    </div>
                    <div className="relative lg:max-w-[534px] md:max-w-[534px] col-span-2">
                      <select
                        type="tel"
                        name="City"
                        id="City"
                        placeholder="Enter City"
                        className="formInput"
                        {...register("City", {
                          required: "City is required",
                        })}
                        onChange={(e) => {
                          setValue("City", e.target.value); // Set value using setValue from react-hook-form
                        }}>
                        <option value="" label="Select City"></option>
                        {cities.map((city) => (
                          <option
                            key={city.cityID}
                            selected={city?.cityID === getValues("City")}
                            value={city.cityID}
                          // onChange={(e) => {}}
                          >
                            {city.cityName}
                          </option>
                        ))}
                      </select>
                      {errors.City && (
                        <span className="error">{errors.City.message}</span>
                      )}
                    </div>
                    <div className="relative lg:w-64 md:w-64 sm:max-w-[376px] sm:col-span-2 md:col-span-1 lg:col-span-1 xs:col-span-2">
                      <input
                        type="text"
                        name="street"
                        id="Street"
                        placeholder="Enter Street"
                        className="formInput"
                        {...register("Street", {
                          required: "Street is required",
                        })}
                      />
                      {errors.Street && (
                        <span className="error">{errors.Street.message}</span>
                      )}
                    </div>

                    <div className="relative lg:w-64 md:w-64 sm:max-w-[376px] sm:col-span-2 md:col-span-1 lg:col-span-1 xs:col-span-2">
                      <input
                        type="text"
                        name="ZipCode"
                        id="ZipCode"
                        className="formInput"
                        placeholder="Enter Zip Code"
                        {...register("ZipCode", {
                          required: "Zip Code is required",
                        })}
                      />
                      {errors.ZipCode && (
                        <span className="error">{errors.ZipCode.message}</span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-[#FFFFFF] bg-SlateBlue not-italic font-medium rounded-lg py-3.5 text-center text-base mt-4 hover:bg-primary border border-SlateBlue hover:border-white"
                    disabled={loading}>
                    {loading ? "Signing up..." : "Create Your Account"}
                  </button>
                  <div className="flex lg:ml-3 text-sm flex-wrap gap-2">
                    <label className="not-italic text-white font-medium mb-3">
                      Already have an account ?
                    </label>
                    <Link to="/">
                      <p className="lg:ml-1 not-italic text-white font-medium mb-3 hover:text-SlateBlue">
                        Sign in here
                      </p>
                    </Link>
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

export default Register;
