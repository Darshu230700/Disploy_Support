import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { GET_ALL_CITY } from '../../Pages/API';
import axios from 'axios';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const AddEditUser = ({ toggleModal, userData, onSubmit, Countries, setSelectedCountry, selectedCountry, setCities, cities, heading, isActive, setIsActive, handleClick, hiddenFileInput, handleFileChange, file, fileEdit, allUserRoleData }) => {
    const { register, handleSubmit,
        setValue,
        getValues,
        clearErrors,
        formState: { errors } } = useForm({ defaultValues: userData });
    const [showPassword, setShowPassword] = useState(false);
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



    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-3 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {heading} User
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-4xl text-primary cursor-pointer"
                                onClick={() => {
                                    toggleModal();
                                }}
                            />
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='p-4 md:p-5'>
                                <div className="grid gap-3 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input type="text" {...register('name', { required: 'Name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Name" required="" />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                    {heading === "Add" && (
                                        <>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" {...register('email', { required: 'Email is required' })} name="email" id="email" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Email Address" required="" />
                                                {errors.email && (
                                                    <span className="error">{errors.email.message}</span>
                                                )}
                                            </div>
                                            <div className="col-span-2 sm:col-span-1 ">
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <div className='relative border'>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        {...register('password', { required: 'Email is required' })}
                                                        name="password"
                                                        id="password"
                                                        placeholder="Enter Your Password"
                                                        className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    />
                                                    <div className="flex items-center  absolute  bottom-0  top-0 right-4" >
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
                                                {errors.password && (
                                                    <span className="error">{errors.password.message}</span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>

                                        <select id="countryID" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter Country"
                                            {...register("countryID", {
                                                required: "Country is required",
                                            })}
                                            onChange={(e) => {
                                                setValue("countryID", e.target.value); // Set value using setValue from react-hook-form
                                                setSelectedCountry(e.target.value)
                                                clearErrors("countryID");
                                            }}>
                                            <option value="" label="Select Country"></option>
                                            {Countries.map((country) => (
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
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                        <select id="cityID" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter City"
                                            {...register("cityID", {
                                                required: "City is required",
                                            })}
                                            onChange={(e) => {
                                                setValue("cityID", e.target.value); // Set value using setValue from react-hook-form
                                                clearErrors("cityID");
                                            }}>
                                            <option value="" label="Select City"></option>
                                            {cities.map((city) => (
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
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                                        <input type="text" {...register('street', { required: 'Street is required' })} name="street" id="street" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Street" required=""

                                        />
                                        {errors.street && (
                                            <span className="error">{errors.street.message}</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip Code</label>
                                        <input type="text" {...register('zipcode', { required: 'Zip Code is required' })} name="zipcode" id="zipcode" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Zip Code" required=""

                                        />
                                        {errors.zipcode && (
                                            <span className="error">{errors.zipcode.message}</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>

                                        <select id="countryID" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter Role"

                                            {...register("userRoleID", {
                                                required: "Role is required",
                                            })}
                                            onChange={(e) => {
                                                setValue("userRoleID", e.target.value); // Set value using setValue from react-hook-form
                                                clearErrors("userRoleID");
                                            }}>
                                            <option value="" label="Select User Role"></option>
                                            {allUserRoleData?.userRoleData.map((item) => (
                                                <option
                                                    key={item.usersRoleID}
                                                    selected={
                                                        item.usersRoleID === getValues("userRoleID")
                                                    }
                                                    value={item.usersRoleID}
                                                >
                                                    {item?.userRole}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.userRoleID && (
                                            <span className="error">{errors.userRoleID.message}</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <div className="flex items-center">
                                            <div className="layout-img me-5">
                                                {file ? (
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt="Uploaded"
                                                        className="w-10 rounded-lg"
                                                    />
                                                ) : null}

                                                {fileEdit ? (
                                                    <img
                                                        src={fileEdit}
                                                        alt="Uploaded"
                                                        className="w-10 rounded-lg"
                                                    />
                                                ) : null}
                                            </div>

                                            <div className="layout-detaills">
                                                <div className="flex">
                                                    <button
                                                        type='button'
                                                        className="px-5 bg-primary text-white rounded-full py-2 border border-primary me-3 "
                                                        onClick={handleClick}
                                                    >
                                                        Profile photo
                                                        <input
                                                            type="file"
                                                            id="upload-button"
                                                            style={{ display: "none" }}
                                                            ref={hiddenFileInput}
                                                            onChange={(e) => handleFileChange(e)}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 flex items-center">
                                        <div className="relative flex gap-6">
                                            <label className="formLabel">isActive :</label>
                                            <input
                                                className='border border-primary ml-8 rounded h-6 w-6'
                                                type="checkbox"
                                                checked={isActive === 1}
                                                onChange={(e) => setIsActive(e.target.checked ? 1 : 0)}
                                            />
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div className="flex items-center justify-center p-2 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
                                <button
                                    className="bg-white text-primary text-base px-6 py-3 border border-primary  shadow-md rounded-full hover:bg-primary hover:text-white mr-2"
                                    type="button"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-primary text-white text-base px-8 py-3 border border-primary shadow-md rounded-full "
                                    type="submit"
                                >
                                    {heading === "Add" ? "Save" : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div>
        </>
    )
}

export default AddEditUser
