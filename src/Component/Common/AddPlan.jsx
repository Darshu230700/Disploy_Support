import React from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const AddPlan = ({ toggleModal,  onSubmit }) => {
    const { register, handleSubmit,
        setValue,
        getValues,
        formState: { errors } } = useForm();
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
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Add New Plan
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
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Plan Name</label>
                                        <input type="text" {...register('name', { required: 'Name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Plan Name" required="" />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Screen</label>
                                        <input type="text" {...register('name', { required: 'Name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="1" required="" />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type</label>
                                        <input type="text" {...register('name', { required: 'Name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Plan Name" required="" />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Storage</label>
                                        <input type="text" {...register('name', { required: 'Name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Storage" required="" />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cost</label>
                                        <input type="text" {...register('name', { required: 'Name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Plan Name" required="" />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                        <input type="text" {...register('name', { required: 'Name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Activate/Deactivate" required="" />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                                        <input type="text" {...register('name', { required: 'Name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Plan Name" required="" />
                                        {errors.name && (
                                            <span className="error">{errors.name.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-2 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
                                <button
                                    className="bg-primary text-white text-base px-8 py-3 border border-primary shadow-md rounded-full "
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            </div>
        </>
    )
}

export default AddPlan
