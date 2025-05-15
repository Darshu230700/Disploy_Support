import React, { useRef, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { SEND_MAIL } from '../../Pages/API';
import { handleSendMails } from '../../Redux/EmailSlice';
import toast from 'react-hot-toast';
import { emailPattern } from '../Common/Common';
import { IoMdAttach } from 'react-icons/io';

const SendMail = ({ toggleModal }) => {

    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const dispatch = useDispatch()
    const hiddenFileInput = useRef(null);
    const [ccMail, setCCMail] = useState(false)
    const [BccMail, setBCCMail] = useState(false)
    const [SendTo, setSendTo] = useState("")
    const [SendToError, setSendToError] = useState("")
    const [SendCC, setSendCC] = useState("")
    const [SendBCC, setSendBCC] = useState("")
    const [Subject, setSubject] = useState("")
    const [Body, setBody] = useState("")
    const [file, setFile] = useState();

    const handleSendMail = () => {
        if (SendTo === "") {
            setSendToError("Please specify at least one recipient.")
            return;
        }
        if (!emailPattern.test(SendTo)) {
            setSendToError('Please enter a valid email address');
            return;
        }
        let formdata = new FormData();
        formdata.append("SendMailID", 0)
        formdata.append("SendTo", SendTo)
        formdata.append("SendCC", SendCC)
        formdata.append("SendBCC", SendBCC)
        formdata.append("Subject", Subject)
        formdata.append("Body", Body)
        formdata.append("Files", file)

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${SEND_MAIL}`,
            headers: {
                Authorization: authToken,
                "Content-Type": "multipart/form-data",
            },
            data: formdata
        }

        dispatch(handleSendMails({ config })).then((res) => {
            if (res?.payload?.status) {
                toast.success(res?.payload?.message)
                toggleModal()
            } else {
                toast.error(res?.payload?.message)
            }
        }).catch((err) => {
            console.log('err', err)
            toast.error(err)
            toggleModal()
        })
    }

    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };


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
                                New Message
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-4xl text-primary cursor-pointer"
                                onClick={() => {
                                    toggleModal();
                                }}
                            />
                        </div>
                        <div className='p-4 w-full'>
                            <div className={`w-full flex flex-row gap-2 items-center border-b pb-2 ${SendToError === "" ? "mb-2" : ""}`}>
                                <span>To</span>
                                <input type='email' className='w-full p-1.5' placeholder='Recipients' onChange={(e) => setSendTo(e.target.value)} value={SendTo} />
                                {(!ccMail || !BccMail) && (
                                    <div className='gap-2 flex'>
                                        {!ccMail && (
                                            <span className='hover:underline cursor-pointer' onClick={() => setCCMail(true)}>Cc</span>
                                        )}
                                        {!BccMail && (
                                            <span className='hover:underline cursor-pointer' onClick={() => setBCCMail(true)} >Bcc</span>
                                        )}
                                    </div>
                                )}
                            </div>
                            {SendToError !== "" && (
                                <span className='error pb-2'>{SendToError}</span>
                            )}
                            {ccMail && (
                                <div className='w-full flex flex-row gap-2 items-center border-b pb-2 mb-2'>
                                    <span>Cc</span>
                                    <input type='email' className='w-full p-1.5' onChange={(e) => setSendCC(e.target.value)} value={SendCC} />
                                </div>
                            )}
                            {BccMail && (
                                <div className='w-full flex flex-row gap-2 items-center border-b pb-2 mb-2'>
                                    <span>Bcc</span>
                                    <input type='email' className='w-full p-1.5' onChange={(e) => setSendBCC(e.target.value)} value={SendBCC} />
                                </div>
                            )}

                            <div className='w-full flex flex-row gap-2 items-center border-b pb-2 mb-2'>
                                <input type='text' className='w-full p-1.5' placeholder='Subject' onChange={(e) => setSubject(e.target.value)} value={Subject} />
                            </div>

                            <div className='w-full '>
                                <textarea type='text' className='w-full h-[250px] p-2' placeholder='Your Message' onChange={(e) => setBody(e.target.value)} value={Body} />
                            </div>

                            <div className="flex items-center justify-start p-3 pb-0 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
                                <button
                                    className="bg-primary text-white text-base px-8 py-3 border border-primary shadow-md rounded-full "
                                    type="submit"
                                    onClick={() => handleSendMail()}
                                >
                                    Send
                                </button>
                                <div className="layout-detaills">
                                    <div className="flex">
                                        <button
                                            type='button'
                                            className="rounded-lg p-2 hover:bg-slate-200"
                                            onClick={handleClick}
                                            title="Attachment"
                                        >
                                            <IoMdAttach size={20} />
                                            <input
                                                type="file"
                                                id="upload-button"
                                                style={{ display: "none" }}
                                                ref={hiddenFileInput}
                                                onChange={(e) => handleFileChange(e)}
                                                multiple
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SendMail
