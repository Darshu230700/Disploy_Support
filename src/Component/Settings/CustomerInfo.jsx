import React from 'react'

const CustomerInfo = () => {
    return (
        <>
            <div className="flex items-center justify-between mx-2 mb-5">
                <div className="title">
                    <h2 className="font-bold text-xl">Customer Information</h2>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full md:w-1/2 px-3 mb-4">
                    <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 min-h-full">
                        <div className="user-details text-center border-b border-light-blue mb-4">
                            <span className="user-img"><img src="dist/images/3user-img.png" /></span>
                            <span className="user-name my-2">Harry McCall</span>
                            <span className="user-designation">Manager</span>
                            <div className="total-screens-count mt-2 mb-4">
                                <span className="screen-icon mr-3">
                                    <i className="fa fa-tv text-blue text-2xl"></i>
                                </span>
                                <span className="screen-count text-left"><strong>50</strong>
                                    <p>Total Screens</p>
                                </span>
                            </div>
                        </div>
                        <div className="user-pro-details">
                            <h3 className="user-name my-2">Details</h3>
                            <div className="flex">
                                <label>User ID:</label><span>#5036</span></div>
                            <div className="flex">
                                <label>User Name:</label><span>Harry McCall</span></div>
                            <div className="flex">
                                <label>Company Name:</label><span>Schneider-Kuphal</span></div>
                            <div className="flex">
                                <label>Email:</label><span>harrymc.call@gmail.com</span></div>
                            <div className="flex">
                                <label>Status:</label><span className="user-designation">Active</span></div>
                            <div className="flex">
                                <label>Role::</label><span>Manager</span></div>
                            <div className="flex">
                                <label>Tax ID:</label><span>Tax-8894</span></div>
                            <div className="flex">
                                <label>Contact:</label><span>(397) 294-5153</span></div>
                            <div className="flex">
                                <label>Language:</label><span>English</span></div>
                            <div className="flex">
                                <label>Country:</label><span>USA</span></div>
                            <div className="flex justify-center w-full mt-2">
                                <button className="mr-3 hover:bg-white hover:text-blue text-base px-8 py-2 border border-blue  shadow-md rounded-full bg-blue text-white ">Edit</button>
                                <button className="hover:bg-white hover:text-red-900 text-base px-8 py-2 border border-red-900 shadow-md rounded-full text-red-900  bg-red-200 "> Suspend</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                    <div className="bg-white shadow-xl rounded-xl p-5 border border-gray-200 min-h-full">
                        <div className="mb-2">
                            <ul className="flex flex-wrap -mb-px justify-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                                <li className="mr-2" role="presentation">
                                    <button className="inline-block text-blue bg-white hover:bg-blue hover:text-white rounded-full py-2 px-4 text-lg font-medium text-center active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true"><i className="fa fa-lock mr-2"></i> Security</button>
                                </li>
                                <li className="mr-2" role="presentation">
                                    <button className="inline-block text-blue bg-white hover:bg-blue hover:text-white rounded-full py-2 px-4 text-lg font-medium text-center " id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><i className="fa fa-bell mr-2"></i> Notifications</button>
                                </li>
                                <li className="mr-2" role="presentation">
                                    <button className="inline-block text-blue bg-white hover:bg-blue hover:text-white rounded-full py-2 px-4 text-lg font-medium text-center" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false"> <i className="fa fa-link mr-2"></i> Connections</button>
                                </li>
                            </ul>
                        </div>
                        <div className="" id="myTabContent">
                            <div id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                <div className="user-pro-details">
                                    <h3 className="user-name mt-2">Change Password</h3>
                                    <div className="w-full py-8 my-5 bg-light-red text-center">
                                        <p className="mb-3"><b>Ensure that these <br />Requirements are met</b></p>
                                        <p className=""> Minimum 8 characters long,</p><p> uppercase &amp; symbol</p>
                                    </div>
                                    <div className="w-full mb-4">
                                        <form action="" method="post" name="signupForm" id="signupForm">
                                            <div className="inputDiv relative mb-5">
                                                <label className="w-full inputLabel" htmlFor="password">Old Password</label>
                                                <input type="password" className="w-full border border-[#D5E3FF] focus:bg-white focus:border-gray-500 rounded-lg p-2" id="password" name="password" required="" placeholder="12345678" />
                                            </div>
                                            <div className="inputDiv relative mb-5">
                                                <label className="w-full inputLabel" htmlFor="password">New Password</label>
                                                <input type="password" className="w-full border border-[#D5E3FF] focus:bg-white focus:border-gray-500 rounded-lg p-2" id="password" name="password" required="" placeholder="Enter New Password" />
                                            </div>
                                            <div className="inputDiv relative mb-5">
                                                <label className="inputLabel" htmlFor="confirmPassword">Confirm Password</label>
                                                <input type="password" className="w-full border border-[#D5E3FF] focus:bg-white focus:border-gray-500 rounded-lg p-2" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" />
                                            </div>
                                            <div className="buttonWrapper">
                                                <button type="submit" id="submitButton" className="hover:bg-white hover:text-blue text-base px-8 py-2 border border-blue  shadow-md rounded-full bg-blue text-white"><span>Change Password</span><span id="loader"></span></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="user-pro-details mb-4">
                                    <h3 className="user-name mt-2">Notifications</h3>
                                    <p>You will receive notification for the below selected items.</p>
                                </div>
                                <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto ">
                                    <table className="min-w-full leading-normal">
                                        <thead className="bg-blue-lighter">
                                            <tr>
                                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">Type</th>
                                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">Send alerts</th>
                                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">Email</th>
                                                <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-200 bg-white">
                                                <td className="px-5 py-3 text-lg">
                                                    <p className="text-gray-900 whitespace-no-wrap"> Screen Offline </p>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <select className=" w-full border border-[#D5E3FF] rounded-xl p-2 drop-shadow-sm outline-none">
                                                        <option value="1">Select</option>
                                                        <option value="1">Email</option>
                                                        <option value="2">Phone Numbe</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-200 bg-white">
                                                <td className="px-5 py-3 text-lg">
                                                    <p className="text-gray-900 whitespace-no-wrap"> Purchased Plan </p>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <select className=" w-full border border-[#D5E3FF] rounded-xl p-2 drop-shadow-sm outline-none">
                                                        <option value="1">Instant</option>
                                                        <option value="2">Instant 2</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-200 bg-white">
                                                <td className="px-5 py-3 text-lg">
                                                    <p className="text-gray-900 whitespace-no-wrap"> Added Users </p>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <select className=" w-full border border-[#D5E3FF] rounded-xl p-2 drop-shadow-sm outline-none">
                                                        <option value="1">15 Minute</option>
                                                        <option value="2">20 Minute</option>
                                                        <option value="2">25 Minute</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-200 bg-white">
                                                <td className="px-5 py-3 text-lg">
                                                    <p className="text-gray-900 whitespace-no-wrap"> Changing Details </p>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <select className=" w-full border border-[#D5E3FF] rounded-xl p-2 drop-shadow-sm outline-none">
                                                        <option value="1">Enter time (Minute)</option>
                                                        <option value="2">Enter time 2 (Minute)</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-200 bg-white">
                                                <td className="px-5 py-3 text-lg">
                                                    <p className="text-gray-900 whitespace-no-wrap"> Playlist</p>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <select className=" w-full border border-[#D5E3FF] rounded-xl p-2 drop-shadow-sm outline-none">
                                                        <option value="1">Select</option>
                                                        <option value="2">Playlist 1</option>
                                                        <option value="2">Playlist 2</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-200 bg-white">
                                                <td className="px-5 py-3 text-lg">
                                                    <p className="text-gray-900 whitespace-no-wrap"> Assets </p>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <select className=" w-full border border-[#D5E3FF] rounded-xl p-2 drop-shadow-sm outline-none">
                                                        <option value="1">Assets 1</option>
                                                        <option value="2">Assets 2</option>
                                                    </select>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                                    </div>
                                                </td>
                                                <td className="px-5 py-3 text-lg">
                                                    <div className="flex items-center">
                                                        <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center w-full my-5">
                                    <button className="mr-3 hover:bg-white hover:text-blue text-base px-8 py-2 border border-blue  shadow-md rounded-full bg-blue text-white ">Save Changes</button>
                                    <button className="hover:bg-white hover:text-text-red-900 text-base px-8 py-2 border border-red-900 shadow-md rounded-full text-red-900  bg-red-200 "> Discard</button>
                                </div>
                            </div>
                            <div className="hidden" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                                <div className="user-pro-details mb-4">
                                    <h3 className="user-name mt-2">Connected Accounts</h3>
                                    <p>Display content from your connected accounts on your site</p>
                                </div>
                                <div className="flex justify-between p-5 border-b border-t border-b-[#E4E6FF]">
                                    <strong className="user-name">Apps</strong>
                                    <strong className="user-name">Status</strong>
                                </div>
                                <div className="flex justify-between p-5 border-b border-b-[#E4E6FF]">
                                    <div className="flex items-center">
                                        <img src="dist/images/google-icon.svg" alt="Assets" className="w-6" />
                                        <div className="ml-4">
                                            <div className="font-medium text-lg">Google</div>
                                            <div className="font-normal text-lg">Calendar and contacts</div>
                                        </div>
                                    </div>
                                    <button className="bg-green-200 px-3 py-1 text-green-900 leading-tight font-semibold rounded-full text-lg">Connect</button>
                                </div>
                                <div className="flex justify-between p-5 border-b border-b-[#E4E6FF]">
                                    <div className="flex items-center"><img src="dist/images/slack-icon.svg" alt="Assets" className="w-6" />
                                        <div className="ml-4">
                                            <div className="font-medium 
                                                           text-lg">Slack</div>
                                            <div className="font-normal text-xs">Communication</div>
                                        </div>
                                    </div>
                                    <button className="bg-red-200 px-3 py-1 font-semibold text-red-900 leading-tight rounded-full text-lg">Disconnect</button>
                                </div>
                                <div className="border-b border-b-[#E4E6FF] p-5">
                                    <h4 className="user-name">Connected Social  Accounts</h4>
                                    <p>Display content from your Connected Social Accounts on your site</p>
                                </div>
                                <div className="flex justify-between p-5 border-b border-b-[#E4E6FF]">
                                    <div className="flex items-center"><img src="dist/images/facebook-icon.png" alt="Assets" className="w-8" />
                                        <div className="ml-4">
                                            <div className="font-medium text-lg">Facebook</div>
                                            <div className="font-normal text-lg">Not connected</div>
                                        </div>
                                    </div>
                                    <button><i className="fa fa-link bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center"></i></button>
                                </div>
                                <div className="flex justify-between p-5 border-b border-b-[#E4E6FF]">
                                    <div className="flex items-center"><img src="dist/images/twitter-icon.png" alt="Assets" className="w-8" />
                                        <div className="ml-4">
                                            <div className="font-medium text-lg">Twitter</div>
                                            <div className="font-normal text-xs">@Pixinvent</div>
                                        </div>
                                    </div>
                                    <button><i className="fav4 fa-trash-o text-xl bg-red-200 text-red-900 w-10 h-10 rounded-full flex items-center justify-center"></i></button>
                                </div>
                                <div className="flex justify-between p-5 border-b border-b-[#E4E6FF]">
                                    <div className="flex items-center"><img src="dist/images/dribbble-icon.png" alt="Assets" className="w-8" />
                                        <div className="ml-4">
                                            <div className="font-medium text-lg">Dribbble</div>
                                            <div className="font-normal text-xs">Not connected</div>
                                        </div>
                                    </div>
                                    <button><i className="fav4 fa-trash-o text-xl bg-red-200 text-red-900 w-10 h-10 rounded-full flex items-center justify-center"></i></button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default CustomerInfo
