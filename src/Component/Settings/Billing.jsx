import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import ConfirmationDialog from '../Common/ConfirmationDialog';
import UserInfo from './UserInfo';

const Billing = ({ billingData, searchValue, fetchBillingData, setBillingData, permissions }) => {
    const [showDeleteModal, setDeleteShowModal] = useState(false);
    const [showBilling, setShowBilling] = useState(false);

    const [selectedData, setSelectedData] = useState("");

    useEffect(() => {
        fetchBillingData()
    }, []);

    const HandleClose = () => {
        setDeleteShowModal(!showDeleteModal);
    }

    const handleDelete = () => {
        setDeleteShowModal(false);
    }

    useEffect(() => {
        if (searchValue) {
            const searchQuery = searchValue.toLowerCase();
            if (searchQuery === "") {
                setBillingData({ ...billingData, SearchData: billingData?.billData })
            } else {
                const filterData = billingData?.billData?.filter((item) => item?.name?.toLowerCase().includes(searchQuery))
                setBillingData({ ...billingData, SearchData: filterData })
            }
        } else {
            setBillingData({ ...billingData, SearchData: billingData?.billData })
        }
    }, [searchValue])


    return (
        <>
            {!showBilling ? (
                <>
                    <div className="flex items-center justify-between mx-2 mb-5">
                        <div className="title">
                            <h2 className="font-bold text-xl">Billing Information</h2>
                        </div>
                    </div>
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-auto ">
                        <table className="min-w-full leading-normal">
                            <thead className="bg-blue-lighter">
                                <tr className=" bg-blue-lighter border-b border-light-blue">
                                    <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                        Customer Name
                                    </th>
                                    <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                        Plan
                                    </th>
                                    <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                        Billing
                                    </th>
                                    <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 text-left text-lg font-semibold text-gray-900 ">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-light-blue">
                                    <td className="p-3 bg-white text-lg">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-10">
                                                <img
                                                    className="w-full h-full rounded-full"
                                                    src="./dist/images/1user-img.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    Vera Carpenter
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 bg-white text-lg">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Basic
                                        </p>
                                    </td>
                                    <td className="p-3 bg-white text-lg">
                                        <p className="text-gray-900 whitespace-no-wrap flex-center-middle">
                                            <img
                                                className="middle rounded-fullmiddle rounded-full m-2"
                                                src="./dist/images/logos_mastercard.svg"
                                                alt=""
                                            />
                                            Axis Bank **** **** **** 8395
                                        </p>
                                    </td>
                                    <td className="p-3 bg-white text-lg">
                                        <span className="bg-green-200 px-3 py-1 font-semibold text-green-900 leading-tight">
                                            Active
                                        </span>
                                    </td>
                                    <td className="px-3 py-6 bg-white text-lg flex ">
                                        {permissions?.isView && (
                                            <button
                                                type="button"
                                                className="inline-block bg-blue-300 text-blue hover:text-white rounded-full p-2 w-10 h-10 mr-2" onClick={() => setShowBilling(true)}>
                                                <div className="flex justify-center">
                                                    <FaEye />
                                                </div>
                                            </button>
                                        )}
                                        {permissions?.isDelete && (
                                            <button
                                                type="button"
                                                className="inline-block bg-red-200 text-red-600 hover:text-white rounded-full p-2 w-10 h-10"
                                                onClick={() => { setDeleteShowModal(true); setSelectedData() }}>
                                                <div className="flex justify-center">
                                                    <MdDelete />
                                                </div>
                                            </button>
                                        )}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <UserInfo setShowBilling={setShowBilling} />
            )}
            {
                showDeleteModal && (
                    <ConfirmationDialog
                        HandleClose={HandleClose}
                        handleDelete={handleDelete}
                    />
                )
            }
        </>
    )
}

export default Billing
