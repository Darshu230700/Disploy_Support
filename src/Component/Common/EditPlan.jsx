import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Basic_Plan } from './Common';

const EditPlan = ({ heading, CloseModel }) => {
    return (
        <>
            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed h-full top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50"
            >
                <div className="relative p-4 w-full max-w-lg max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-xl shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-3 md:p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {heading}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-4xl text-primary cursor-pointer"
                                onClick={() => {
                                    CloseModel();
                                }}
                            />
                        </div>
                        {/* Modal body */}
                        <div className='p-4 md:p-5'>
                            {
                                Basic_Plan?.map((item, index) => {
                                    return (

                                        <div className="grid gap-4 mb-4 grid-cols-2" key={index}>
                                            <div className="col-span-2 sm:col-span-2 flex justify-between">
                                                <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">{item?.planlist}</label>
                                                <input
                                                    className='border border-primary ml-8 rounded h-6 w-6'
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="flex items-center justify-center p-2 md:p-2 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
                            <button
                                className="bg-primary text-white text-base px-8 py-3 border border-primary shadow-md rounded-full "
                                type="submit"
                            >
                                Save
                            </button>
                            <button
                                className="bg-white text-primary text-base px-6 py-3 border border-primary  shadow-md rounded-full hover:bg-primary hover:text-white mr-2"
                                type="button"
                                onClick={CloseModel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default EditPlan
