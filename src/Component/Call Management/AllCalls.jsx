import React from 'react'
import { IoCall } from "react-icons/io5";
const AllCalls = () => {
    return (
        <>
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto ">
                <table className="min-w-full leading-normal">
                    <thead className="bg-blue-lighter">
                        <tr>
                            <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                Name
                            </th>
                            <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                States
                            </th>
                            <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                Duration
                            </th>
                            <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                Date&Time
                            </th>
                            <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                Make a Call
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 bg-white">
                            <td className="px-5 py-3 text-lg">
                                <div className="flex">
                                    <div className="flex-shrink-0 w-10 h-10">
                                        <img
                                            className="w-full h-full rounded-full"
                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.2&amp;w=160&amp;h=160&amp;q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-blue-900 whitespace-no-wrap">
                                           Jack molly
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-3 text-lg">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    inbound
                                </p>
                            </td>
                            <td className="px-5 py-3 text-lg">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    1min 15 s
                                </p>
                            </td>
                            <td className="px-5 py-3 text-lg">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    8 Jul, 10:25 AM
                                </p>
                            </td>
                            <td className="px-5 py-3 text-lg">
                                <span className="text-gray-900 whitespace-no-wrap">
                                    <IoCall />
                                </span>
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllCalls
