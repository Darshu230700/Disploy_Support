import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import { AiOutlineLink, AiOutlineUser } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { BsSdCard } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import Account from './Account';
import Security from './Security';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetCountries } from '../Redux/SettingUserSlice';
const MyAccount = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
    MyAccount.propTypes = {
        sidebarOpen: PropTypes.bool.isRequired,
        setSidebarOpen: PropTypes.func.isRequired,
        mobileSidebar: PropTypes.bool.isRequired,
        setMobileSidebar: PropTypes.func.isRequired,
    };
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.root.auth);
    const { Countries } = useSelector((s) => s.root.settingUser);

    useEffect(() => {
        dispatch(handleGetCountries());
    }, []);
    const [activeTab, setActiveTab] = useState("account");
    const [cities, setCities] = useState([]);

    const data = [
        {
            label: "Account",
            value: "account",
            desc: <Account userDetails={userDetails} Countries={Countries} cities={cities} setCities={setCities} />,
            icon: <AiOutlineUser />,
        },
        {
            label: "Security",
            value: "security",
            desc: <Security setActiveTab={setActiveTab} />,
            icon: <CiLock />,
        },

        // {
        //   label: "Billing & Plans",
        //   value: "billing_plans",
        //   desc: <BillingsPlans />,
        //   icon: <BsSdCard />,
        // },
        // {
        //   label: "Notifications",
        //   value: "notifications",
        //   desc: <Notifications />,
        //   icon: <IoIosNotificationsOutline />,
        // },
        // {
        //   label: "Connections",
        //   value: "connections",
        //   desc: <Connection />,
        //   icon: <AiOutlineLink />,
        // },
    ];
    return (
        <>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
                <div className="w-full">
                    <div className={`${sidebarOpen ? "ml-5 mt-3" : "m-10"}`}>
                        <div className="lg:flex lg:justify-between sm:block xs:block  items-center">
                            <h1 className="not-italic font-medium lg:text-2xl md:text-2xl sm:text-xl text-[#001737] lg:mb-0 md:mb-0 sm:mb-4 ">
                                Account Settings
                            </h1>
                        </div>
                        <div className="mt-5 page-contain">
                            <Tabs value={activeTab}>
                                <TabsHeader className="p-0 text-primary">
                                    {data.map(({ icon, label, value }) => (
                                        <Tab
                                            key={value}
                                            value={value}
                                            onClick={() => setActiveTab(value)}
                                            className={`${activeTab === value
                                                ? "text-white items-center rounded-full bg-primary "
                                                : ""
                                                } py-3 px-4 w-auto border border-primary  rounded-full mx-2`}
                                        >
                                            <div className="flex items-center">
                                                <span className="mr-2 text-xl">{icon}</span>
                                                {label}
                                            </div>
                                        </Tab>
                                    ))}
                                </TabsHeader>
                                <TabsBody className="p-0">
                                    {data.map(({ value, desc }) => (
                                        <TabPanel key={value} value={value}>
                                            {desc}
                                        </TabPanel>
                                    ))}
                                </TabsBody>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyAccount
