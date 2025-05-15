import React, { useState } from 'react'
import { PiNewspaperClipping } from "react-icons/pi";
import AddPlan from '../Common/AddPlan';
import EditPlan from '../Common/EditPlan';
import AddEditTrialDays from '../Common/AddEditTrialDays';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_EDIT_TRIAL_PLAN, GET_TRIAL_PERIOD_DETAILS } from '../../Pages/API';
import { handleEditTrialPlan, handleGetTrialPlan } from '../../Redux/PlanSlice';

const MyPlan = () => {

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const [showModal, setShowModal] = useState(false);
    const [trialPlanModel, setTrialPlanModal] = useState(false);
    const [trialData, setTrialData] = useState({
        trialDays: 14,
        isActive: true
    })
    const [trialDetails, setTrialDetails] = useState({
        trialDays: 14,
        isActive: true
    })
    const [editshowModal, setEditShowModal] = useState(false);
    const [heading, setHeading] = useState("")

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const fetchTrialDetails = ({ add }) => {
        if (add === "add") {
            toast.loading("Fetching data..")
        }
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: GET_TRIAL_PERIOD_DETAILS,
            headers: {
                Authorization: authToken
            },
        }
        dispatch(handleGetTrialPlan({ config })).then((res) => {
            if (res?.payload?.status) {
                setTrialDetails(res?.payload?.data)
                setTrialData(res?.payload?.data)
                if (add === "add") {
                    setTrialPlanModal(!trialPlanModel)
                }
                toast.remove()
            }
        }).catch((err) => {
            console.log('err', err)
            toast.remove()
        })
    }

    const CloseModel = () => {
        setEditShowModal(!editshowModal);
    }

    const onSubmit = (data) => {
    }

    const handleSaveTrialPlan = () => {
        if (trialData?.trialDays < 0) {
            toast.error("Please Enter Proper Trial Days")
            return;
        }
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${ADD_EDIT_TRIAL_PLAN}?TrialDays=${trialData?.trialDays}&IsActive=${trialData?.isActive}`,
            headers: {
                Authorization: authToken,
            },
        }
        dispatch(handleEditTrialPlan({ config })).then((res) => {
            if (res?.payload?.status) {
                fetchTrialDetails({ add: "" })
                setTrialPlanModal(!trialPlanModel);
            }
        }).catch((error) => {
            console.log('error', error)
            setTrialPlanModal(!trialPlanModel);
        })
    }
    return (
        <>
            <div className="flex items-center justify-between mx-2 mb-5">
                <div className="title">
                    <h2 className="font-bold text-xl">Pricing Plans</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="flex align-middle border-primary items-center float-right border rounded-full lg:px-6 sm:px-5 py-2 text-base sm:text-sm  hover:bg-primary hover:text-white hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/50 gap-1"
                        onClick={() => {
                            fetchTrialDetails({ add: "add" })
                        }}
                    >
                        <PiNewspaperClipping className="text-2xl mr-1" />
                        Trial Plan
                    </button>
                    <button
                        className="flex align-middle border-primary items-center float-right border rounded-full lg:px-6 sm:px-5 py-2 text-base sm:text-sm  hover:bg-primary hover:text-white hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/50 gap-1"
                        onClick={() => setShowModal(true)}
                    >
                        <PiNewspaperClipping className="text-2xl mr-1" />
                        Add New Plan
                    </button>

                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-8">
                <div className="w-full md:w-1/3 px-3 mb-4">
                    <div className="bg-blue-lighter p-4 rounded-lg h-full">
                        <div className="flex justify-between">
                            <div className="role-name">
                                <p>Total 5 Users</p>
                                <h3 className="text-2xl font-semibold my-2">
                                    Basic Plan
                                </h3>
                                <p>A simple start for Everyone</p>
                            </div>
                            <div className="role-user ">
                                <div className="role-user flex justify-center">
                                    <span>
                                        <img src="./dist/images/1user-img.png" />
                                    </span>
                                    <span>
                                        <img src="./dist/images/2user-img.png" />
                                    </span>
                                    <span className="pulus-user text-2xl text-white">
                                        +3
                                    </span>
                                </div>
                                <div className="role-user flex justify-center mt-6">
                                    <button
                                        className="text-white items-center justify-center rounded-full lg:px-4 sm:px-3 py-2 text-base sm:text-lg  text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                        onClick={() => { setEditShowModal(true); setHeading("Basic Plan") }}>
                                        Edit Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-4">
                    <div className="bg-blue-lighter p-4 rounded-lg h-full">
                        <div className="flex justify-between">
                            <div className="role-name">
                                <p>Total 5 Users</p>
                                <h3 className="text-2xl font-semibold my-2">
                                    Standard Plan
                                </h3>
                                <p>For small to medium Businesses </p>
                            </div>
                            <div className="role-user ">
                                <div className="role-user flex justify-center">
                                    <span>
                                        <img src="./dist/images/1user-img.png" />
                                    </span>
                                    <span>
                                        <img src="./dist/images/2user-img.png" />
                                    </span>
                                    <span className="pulus-user text-2xl text-white">
                                        +3
                                    </span>
                                </div>
                                <div className="role-user flex justify-center mt-6">
                                    <button
                                        className="text-white items-center justify-center rounded-full lg:px-4 sm:px-3 py-2 text-base sm:text-lg  text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                    >
                                        Edit Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-4">
                    <div className="bg-blue-lighter p-4 rounded-lg h-full">
                        <div className="flex justify-between">
                            <div className="role-name">
                                <p>Total 2 Users</p>
                                <h3 className="text-2xl font-semibold my-2">
                                    Enterprise Plan
                                </h3>
                                <p>A simple start for everyone </p>
                            </div>
                            <div className="role-user ">
                                <div className="role-user flex justify-center">
                                    <span>
                                        <img src="./dist/images/1user-img.png" />
                                    </span>
                                    <span>
                                        <img src="./dist/images/2user-img.png" />
                                    </span>
                                    <span className="pulus-user text-2xl text-white">
                                        +
                                    </span>
                                </div>
                                <div className="role-user flex justify-center mt-6">
                                    <button
                                        className="text-white items-center  rounded-full lg:px-4 sm:px-3 py-2 text-base sm:text-lg  text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                    >
                                        Edit Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-4">
                    <div className="bg-blue-lighter p-4 rounded-lg h-full">
                        <div className="flex justify-between">
                            <div className="role-name">
                                <p>Total 5 Users</p>
                                <h3 className="text-2xl font-semibold my-2">
                                    Supplier Plan
                                </h3>
                                <p>A simple start for Everyone </p>
                            </div>
                            <div className="role-user ">
                                <div className="role-user flex justify-center">
                                    <span>
                                        <img src="./dist/images/1user-img.png" />
                                    </span>
                                    <span>
                                        <img src="./dist/images/2user-img.png" />
                                    </span>
                                    <span className="pulus-user text-2xl text-white">
                                        +3
                                    </span>
                                </div>
                                <div className="role-user flex justify-center mt-6">
                                    <button
                                        className="text-white items-center  rounded-full lg:px-4 sm:px-3 py-2 text-base sm:text-lg  text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                                    >
                                        Edit Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full mt-12">
                <div
                    htmlFor="toogleA"
                    className="flex items-center cursor-pointer border border-blue-500 bg-blue-lighter p-4 rounded-full">
                    <div className="text-2xl font-semibold mr-5">
                        Start with a {trialDetails?.trialDays}-days FREE trial!
                    </div>

                    <div className="relative flex">
                        <label className="relative inline-flex items-center cursor-not-allowed">
                            <input
                                type="checkbox"
                                checked={trialDetails?.isActive}
                                className="sr-only peer"
                                disabled
                                id="toggle"
                            />
                            <div className="flex items-center relative bg-[#e8eced] border border-blue-700 w-12 h-7 rounded-full before:absolute before:bg-rose-700 before:w-5 before:h-5 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-6 peer-checked:before:bg-green"></div>
                        </label>
                    </div>
                </div>
            </div>
            {showModal && (
                <AddPlan toggleModal={toggleModal} onSubmit={onSubmit} />
            )}
            {editshowModal && (
                <EditPlan heading={heading} CloseModel={CloseModel} />
            )}

            {trialPlanModel && (
                <AddEditTrialDays setTrialPlanModal={setTrialPlanModal} trialPlanModel={trialPlanModel} handleSaveTrialPlan={handleSaveTrialPlan} setTrialData={setTrialData} trialData={trialData} />
            )}
        </>
    )
}

export default MyPlan
