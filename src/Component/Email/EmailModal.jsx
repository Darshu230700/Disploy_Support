import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_GMAIL_CRED } from '../../Pages/API';
import { handleCreateGmailCred } from '../../Redux/EmailSlice';
import toast from 'react-hot-toast';

const EmailModal = ({ toggleModal, showModal, setShowModal }) => {

    const { user, token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailerror, setEmailError] = useState(false)
    const [passerror, setPassError] = useState(false)

    const handleLogin = () => {
        let hasError = false;
        if (email === "") {
            setEmailError(true)
            hasError = true
        }

        if (password === "") {
            setPassError(true)
            hasError = true
        }

        if (hasError) {
            return;
        }

        let Params = JSON.stringify({
            "gmailCredentialID": 0,
            "email": email,
            "appPassword": password,
            "identityID": 0,
            "identityType": "string"
        })

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: CREATE_GMAIL_CRED,
            headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
            },
            data: Params
        }
        dispatch(handleCreateGmailCred({ config })).then((res) => {
            if (res?.payload?.status) {
                setShowModal(!showModal)
                toast.success(res?.payload?.message)
            } else {
                toast.error(res?.payload?.message);
            }
        }).catch((err) => {
            console.log('err', err)
        })

    }

    return (
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
                            Email Login
                        </h3>
                        <AiOutlineCloseCircle
                            className="text-4xl text-primary cursor-pointer"
                            onClick={() => {
                                toggleModal();
                            }}
                        />
                    </div>
                    <div className='p-4 md:p-5'>
                        <div className="grid gap-3 mb-4 grid-cols-2">
                            <div className="col-span-2 sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Email" required="" onChange={(e) => setEmail(e.target.value)} value={email} />
                                {emailerror && (
                                    <span className='error'>Invalid Email Address</span>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-3 mb-4 grid-cols-2">
                            <div className="col-span-2 sm:col-span-2">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="password" name="password" id="password" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Your Password" required="" onChange={(e) => setPassword(e.target.value)} value={password} />
                                {passerror && (
                                    <span className='error'>Enter Correct Password</span>
                                )}
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
                            type="button"
                            onClick={() => handleLogin()}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;
