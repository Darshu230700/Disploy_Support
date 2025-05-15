import React from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const AddEditTicket = ({ toggleModal, ticketData, onSubmit, heading, TicketStatus, TicketIssue, issueList }) => {
    const { register, handleSubmit,
        setValue,
        getValues,
        watch,clearErrors,
        formState: { errors } } = useForm({ defaultValues: ticketData });
    const IssueID = watch("IssueID");
    const currentDate = new Date().toISOString().split('T')[0];

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
                                {heading} Ticket
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
                                <div className="grid gap-4 mb-2 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client Phone Number</label>
                                        <div className='flex flex-col'>
                                            <div className='flex gap-2'>
                                                <input type="number"
                                                    {...register('phoneNumber', {
                                                        required: 'Client Phone Number is required', pattern: {
                                                            value: /^[0-9]{10}$/, // Adjust the regex pattern as needed
                                                            message: 'Please enter a valid 10-digit phone number',
                                                        },
                                                    })}
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Client Phone Number" required="" />
                                                {/*<button className='w-28 bg-blue-200 rounded-lg text-blue-800 font-bold'>Send</button>*/}
                                            </div>
                                            {errors.phoneNumber && (
                                                <span className="error">{errors.phoneNumber.message}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-4 mb-2 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Client Name</label>
                                        <input type="text" {...register('clientName', { required: 'Client Name is required' })} name="clientName" id="clientName" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Client Name" required="" />
                                        {errors.clientName && (
                                            <span className="error">{errors.clientName.message}</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Caller Name</label>
                                        <input type="text" {...register('callerName', { required: 'Caller Name is required' })} name="callerName" id="callerName" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Caller Name" required="" />
                                        {errors.callerName && (
                                            <span className="error">{errors.callerName.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-4 mb-2 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create Date</label>
                                        <input
                                            type="date"
                                            placeholder='Enter Create Date'
                                            defaultValue={currentDate}
                                            min={currentDate}
                                            {...register('createDate', { required: 'Create Date is required' })}
                                            className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                        {errors.createDate && (<span className="error">{errors.createDate.message}</span>)}
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                        <select id="ticketStatus" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Select Status"
                                            {...register("ticketStatus")}
                                            disabled
                                            value={getValues("ticketStatus") || "Pending"}>
                                            {TicketStatus.map((ticket) => (
                                                <option
                                                    key={ticket.statusid}
                                                    selected={
                                                        ticket?.statusid === getValues("ticketStatus")
                                                    }
                                                    value={ticket.Status}
                                                >
                                                    {ticket.Status}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.ticketStatus && (
                                            <span className="error">{errors.ticketStatus.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-4 mb-2 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                        <input type="text" {...register('location', { required: 'Location is required' })} name="location" id="location" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Location" required="" />
                                        {errors.location && (
                                            <span className="error">{errors.location.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid gap-4 mb-2 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Issue</label>
                                        <select id="IssueID" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Select Issue"
                                            {...register("IssueID", {
                                                required: "Issue is required",
                                            })}
                                            onChange={(e) => {
                                                setValue("IssueID", e.target.value); // Set value using setValue from react-hook-form
                                                clearErrors("IssueID")
                                            }}>
                                            <option value="" label="Select Issue"></option>
                                            {issueList.map((ticket) => (
                                                <option
                                                    key={ticket.issueReasonID}
                                                    selected={
                                                        ticket?.issueReasonID === getValues("IssueID")
                                                    }
                                                    value={ticket.issueReasonID}
                                                >
                                                    {ticket.message}
                                                </option>
                                            ))}
                                            <option value="9" label="Custom" className='text-center bg-sky-200' />
                                        </select>
                                        {errors.IssueID && (
                                            <span className="error">{errors.IssueID.message}</span>
                                        )}
                                    </div>
                                </div>
                                {(IssueID === "9" || IssueID === 9) && (
                                    <div className="grid gap-4 mb-2 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-2">
                                            <input type="text" {...register('custom', { required: 'Issue is required' })} name="custom" id="custom" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Custom Message" required="" />
                                            {errors.custom && (
                                                <span className="error">{errors.custom.message}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center justify-center p-3 md:p-3 border-t border-gray-200 rounded-b dark:border-gray-600 gap-2">
                                    <button
                                        className="bg-white text-primary text-base px-6 py-3 border border-primary  shadow-md rounded-full hover:bg-primary hover:text-white mr-2"
                                        type="button"
                                        onClick={toggleModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-primary text-white text-base px-8 py-3 border border-primary shadow-md rounded-full "
                                        type="submit"
                                    >
                                        {heading === "Add" ? "Save" : "Update"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div>
        </>
    )
}

export default AddEditTicket
