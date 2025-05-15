import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { MdOutlinePhotoCamera } from 'react-icons/md'
import { GET_ALL_CITY } from '../Pages/API';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCustomerDetails, UpdateEmployeeDetails, handleGetCustomerUserDetails, handleGetUserDetails } from '../Redux/AuthSlice';


const Account = ({ userDetails, Countries, cities, setCities }) => {
    const { register, handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors } } = useForm({ defaultValues: userDetails });
    const { user, token, loading } = useSelector((state) => state.root.auth);
    const dispatch = useDispatch()
    const authToken = `Bearer ${token}`;
    const CountryIDs = watch('countryID')
    const hiddenFileInput = useRef(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (CountryIDs) {
            axios
                .get(`${GET_ALL_CITY}?CountryID=${CountryIDs}`)
                .then((response) => {
                    setCities(response.data.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [CountryIDs]);

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files[0] !== undefined && e.target.files[0] !== null) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
        }
    };

    const handleImageReset = () => {
        setFile(null);
    };

    const onSubmit = (data) => {
        let formdata = new FormData();
        if (file !== null && file !== undefined) {
            formdata.append("File", file);
        } else {
            formdata.append("ProfilePic", data?.profilePic);
        }
        if (user?.loginType === "Employee") {
            formdata.append("employeeMasterID", data?.employeeMasterID);
            formdata.append("cityID", data?.cityID);
            formdata.append("countryID", data?.countryID);
            formdata.append("name", data?.name);
            formdata.append("street", data?.street);
            formdata.append("isSuperAdmin", true);
            formdata.append("zipcode", data?.zipcode);
            formdata.append("opretion", "Save");
            formdata.append("userRoleID", data?.userRoleID || '')
        } else {
            formdata.append("customerMasterID", data?.customerMasterID);
            formdata.append("cityID", data?.cityID);
            formdata.append("countryID", data?.countryID);
            formdata.append("name", data?.name);
            formdata.append("street", data?.street);
            formdata.append("isSuperAdmin", true);
            formdata.append("zipcode", data?.zipcode);
            formdata.append("userRoleID", data?.userRoleID)
            formdata.append("opretion", "Save");
        }
        let response = ""
        if (user?.loginType === "Employee") {
            response = dispatch(
                UpdateEmployeeDetails({
                    Params: formdata,
                    user,
                    token,
                })
            );
        } else {
            response = dispatch(
                UpdateCustomerDetails({
                    Params: formdata,
                    user,
                    token,
                })
            );
        }
        if (response) {
            response.then((res) => {
                if (res?.type.includes("fulfilled")) {
                    toast.success("Profile edited successfully.", { duration: 2000 });
                    if (user !== null && user?.loginType === "Employee") {
                        dispatch(handleGetUserDetails({ id: user?.employeeMasterID, token, loginType: user?.loginType }));
                    } else {
                        dispatch(handleGetCustomerUserDetails({ id: user?.employeeMasterID, token, loginType: user?.loginType }));
                    }
                    setFile(null)
                }
            });
        }

    }
    return (
        <>
            {/* {loading ? toast.loading("Fetching details....") : toast.remove()} */}
            <div className="rounded-xl mt-8 shadow bg-white">
                <h4 className="text-xl font-bold p-5">Profile Details</h4>
                <div className="flex items-center border-b border-b-[#E4E6FF] p-5">
                    <div className="layout-img me-5">
                        {file !== undefined && file !== null ? (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Uploaded"
                                className="w-32 rounded-lg"
                            />
                        ) : getValues("profilePic") !== null ? (
                            <img
                                src={getValues("profilePic")}
                                // {...register("profil")}
                                alt="Uploaded"
                                className="w-32 rounded-lg"
                            />
                        ) : (
                            <MdOutlinePhotoCamera className="w-32 h-32 text-gray" />
                        )}
                    </div>
                    <div className="layout-detaills">
                        <div className="flex">
                            <button
                                className="px-5 bg-primary text-white rounded-full py-2 border border-primary me-3"
                                onClick={handleClick}
                            >
                                Upload new photo
                            </button>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                ref={hiddenFileInput}
                                onChange={(e) => handleFileChange(e)}
                            />



                            {file !== undefined && file !== null && (
                                <button
                                    className=" px-5 py-2 border border-primary rounded-full text-primary"
                                    onClick={handleImageReset}
                                >
                                    Remove
                                </button>
                            )}

                        </div>
                        <p className="text-lg block mt-3 ml-2">
                            Display content from your connected accounts on your site
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="label_top text-xs">Name</label>
                                <input
                                    className="w-full text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    type="text"
                                    {...register("name", { required: 'Name is required' })}
                                />
                                {errors.name && (
                                    <span className="error">{errors.name.message}</span>
                                )}
                            </div>
                            <div className="md:w-1/2 px-3">
                                <label className="label_top text-xs">Email</label>
                                <input
                                    readOnly
                                    className="w-full  text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    name="email"
                                    {...register("email")}
                                    disabled

                                />
                            </div>
                            <div className="md:w-1/2 px-3">
                                <label className="label_top text-xs">Role</label>
                                <input
                                    readOnly
                                    className="w-full  text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    name="type"
                                    {...register("email")}
                                    disabled

                                />
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="label_top text-xs">Country</label>
                                <select id="countryID" className="w-full text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    placeholder="Enter Country"
                                    {...register("countryID", {
                                        required: "Country is required",
                                    })}
                                    onChange={(e) => {
                                        setValue("countryID", e.target.value); // Set value using setValue from react-hook-form
                                    }}>
                                    <option value="" label="Select Country"></option>
                                    {Countries?.map((country) => (
                                        <option
                                            key={country.countryID}
                                            selected={
                                                country?.countryID === getValues("countryID")
                                            }
                                            value={country.countryID}
                                        >
                                            {country.countryName}
                                        </option>
                                    ))}
                                </select>
                                {errors.countryID && (
                                    <span className="error">{errors.countryID.message}</span>
                                )}
                            </div>
                            <div className="md:w-1/2 px-3">
                                <label className="label_top text-xs">City</label>
                                <select id="cityID" className="w-full text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    placeholder="Enter City"
                                    {...register("cityID", {
                                        required: "City is required",
                                    })}
                                    onChange={(e) => {
                                        setValue("cityID", e.target.value); // Set value using setValue from react-hook-form
                                    }}>
                                    <option value="" label="Select City"></option>
                                    {cities?.map((city) => (
                                        <option
                                            key={city.cityID}
                                            selected={city?.cityID === getValues("cityID")}
                                            value={city.cityID}
                                        >
                                            {city.cityName}
                                        </option>
                                    ))}
                                </select>
                                {errors.cityID && (
                                    <span className="error">{errors.cityID.message}</span>
                                )}
                            </div>
                            <div className="md:w-1/2 px-3">
                                <label className="label_top text-xs">Street</label>
                                <input
                                    readOnly
                                    className="w-full  text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    name="type"
                                    {...register("street")}
                                />
                                {errors.street && (
                                    <span className="error">{errors.street.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="-mx-3 md:flex mb-6">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="label_top text-xs">Zip Code</label>
                                <input
                                    className="w-full text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    type="text"
                                    {...register("zipcode", {
                                        required: 'zipcode is required',
                                        pattern: {
                                            value: /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/,
                                            message: "Enter valid code",
                                        },
                                    })}
                                />
                                {errors.zipcode && (
                                    <span className="error">{errors.zipcode.message}</span>
                                )}
                            </div>
                            {/*<div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="label_top text-xs">Notification</label>
                                <input
                                    className="w-full text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    type="text"
                                />
                            </div>
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="label_top text-xs">Status</label>
                                <input
                                    className="w-full text-black border border-black rounded-lg py-3 px-4 mb-3"
                                    type="text"
                                />
                            </div>*/}

                        </div>


                        <div className="-mx-3 md:flex mt-2">
                            <div className="md:w-full px-3 flex">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 bg-primary text-white rounded-full py-2 border border-primary me-3"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                                <button
                                    className=" px-5 py-2 border border-primary rounded-full text-primary"
                                    type="reset"
                                    disabled={loading}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/*<div className="rounded-xl mt-8 shadow bg-white p-5">
                <h4 className="text-xl font-bold ">Delete Account</h4>
                <div className="flex items-start space-x-3 py-6">
                    <input type="checkbox" className="border-gray-300 rounded h-5 w-5" />
                    <div className="flex flex-col">
                        <h1 className="text-gray-700 font-medium leading-none">
                            I confirm my account deactivation
                        </h1>
                    </div>
                </div>
                <button className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Deactivate Account
                </button>
            </div>*/}
        </>
    )
}

export default Account
