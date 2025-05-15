import React from 'react'

const CreateAPI = () => {
    return (
        <>
            <div className="flex items-center justify-between mx-2 mb-5">
                <div className="title">
                    <h2 className="font-bold text-xl">Create New API</h2>
                </div>
            </div>
            <div className="lg:p-5 md:p-5 sm:p-2 xs:p-2 border border-light-blue rounded-xl py-5">
                <h2 className="font-medium text-lg mb-5">Create an API key</h2>
                <div className="full flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <div className="relative w-full border-none">
                            <label className="input-box-label" htmlFor="grid-first-name"> Choose the API key type you want to create </label>
                            <select className="input-box-border w-full py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Select API Key</option>
                                <option >Screen </option>
                                <option>Assets</option>
                                <option>Play list</option>
                                <option>Disploy Studio </option>
                                <option>App </option>
                                <option>Report </option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <div className="relative w-full border-none">
                            <label className="input-box-label" htmlFor="grid-last-name" >
                                Name the API key
                            </label>
                            <input className="input-box-border w-full py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Enter API key" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 lg:px-5 md:px-5 sm:px-2 xs:px-2">
                    <div className="w-full md:w-1/2">
                        <h2 className="font-medium text-lg mb-5">Permission types</h2>
                        <div className="text-center flex flex-wrap">
                            <div className="flex items-center mr-4 mb-4">
                                <input id="full-access" type="radio" name="radio" className="hidden" defaultChecked />
                                <label htmlFor="full-access" className="flex items-center cursor-pointer">
                                    <span className="w-4 h-4 inline-block mr-1 border border-blue-600 rounded-full"></span>
                                    Full Access</label>
                            </div>
                            <div className="flex items-center mr-4 mb-4">
                                <input id="read-only" type="radio" name="radio" className="hidden" />
                                <label htmlFor="read-only" className="flex items-center cursor-pointer">
                                    <span className="w-4 h-4 inline-block mr-1 border border-blue-600 rounded-full"></span>
                                    Read Only</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <h2 className="font-medium text-lg mb-5">API types</h2>
                        <div className="text-center flex flex-wrap">
                            <div className="flex items-center mr-4 mb-4">
                                <input id="get" type="radio" name="radio" className="hidden" defaultChecked />
                                <label htmlFor="get" className="flex items-center cursor-pointer">
                                    <span className="w-4 h-4 inline-block mr-1 border border-blue-600 rounded-full"></span>
                                    Get</label>
                            </div>
                            <div className="flex items-center mr-4 mb-4">
                                <input id="post" type="radio" name="radio" className="hidden" />
                                <label htmlFor="post" className="flex items-center cursor-pointer">
                                    <span className="w-4 h-4 inline-block mr-1 border border-blue-600 rounded-full"></span>
                                    Post</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-12 my-4'>
                    <button className='hover:bg-blue-dark text-base px-8 py-3 shadow-md rounded-full bg-blue text-white '>Create Key</button>
                </div>
            </div>
            <div className='pt-5'>
                <h2 className="font-medium text-lg mb-5">API Key List & Access</h2>
                <p>An API key is a simple encrypted string that identifies an application without any principal.
                    They are useful for accessing public data anonymously, and are used to associate API requests with your project for quota and billing.</p>
                <div className='rounded-xl p-6 bg-blue-lighter my-4 relative'>
                    <p className='flex items-center'>
                        <strong>Server Key 1</strong>
                        <a href='#'><i className="fa fa-pencil"></i></a>
                        <a href='#' className='bg-blue-300 px-3 py-1 mx-2 rounded-full'>Full Access</a> <a href='#' className='bg-red-300 px-3 py-1 mx-2 rounded-full'>Get</a></p>
                    <p className='flex items-center my-4 '>
                        <strong className='mr-3'>bb98e571-a2e2-4de8-90a9-2e231b5e99</strong>
                        <a href='#'><i className="fa fa-clone"></i></a>
                    </p>
                    <p>Created on 28 Apr 2023, 08:20 PM</p>

                    <span className="absolute top-10 right-10 bg-red-200 p-2 flex w-10 h-10 items-center justify-center rounded-full"><i className="fav4 fa-trash-o text-white" ></i></span>
                </div>

                <div className='rounded-xl p-6 bg-blue-lighter mt-4 relative'>
                    <p className='flex items-center'>
                        <strong>Server Key 2</strong>
                        <a href='#'><i className="fa fa-pencil"></i></a>
                        <a href='#' className='bg-blue-300 px-3 py-1 mx-2 rounded-full'>Read Only</a> <a href='#' className='bg-red-300 px-3 py-1 mx-2 rounded-full'>Post</a></p>
                    <p className='flex items-center my-4 '>
                        <strong className='mr-3'>bb98e571-a2e2-4de8-90a9-2e231b5e99</strong>
                        <a href='#'><i className="fa fa-clone"></i></a>
                    </p>
                    <p>Created on 28 Apr 2023, 08:20 PM</p>

                    <span className="absolute top-10 right-10 bg-red-200 p-2 flex w-10 h-10 items-center justify-center rounded-full"><i className="fav4 fa-trash-o text-white" ></i></span>
                </div>
            </div>
        </>
    )
}

export default CreateAPI
