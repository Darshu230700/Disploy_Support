import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaRegClock } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import { calendarStartDate, extractTimeFromDate } from '../Common/Common';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { FiAlignRight } from "react-icons/fi";
import { IoVideocamOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import Select from "react-select";


const AddEditEvent = ({ todayDate, selectedEvent, isDisable, timeZoneList, setSelectedEvent, heading, userlist, guest, handleEventDelete, setGuest, activeTab, setActiveTab, repeatList, toggleModal, onSubmit, selectedDate, setSelectedDate }) => {
    const [guestData, setguestData] = useState([]);


    const { register, handleSubmit,
        setValue,
        getValues,
        watch,
        clearErrors,
        formState: { errors } } = useForm({
            defaultValues: {
                eventId: !selectedEvent !== null ? selectedEvent?.eventId : 0,
                eventName: !selectedEvent !== null ? selectedEvent?.eventName : "",
                taskName: selectedEvent !== null ? selectedEvent?.eventName : '',
                startDate: selectedEvent !== null ? calendarStartDate(selectedEvent?.startDate) : calendarStartDate(todayDate) || calendarStartDate(todayDate),
                endDate: selectedEvent !== null ? calendarStartDate(selectedEvent?.endDate) : calendarStartDate(todayDate) || calendarStartDate(todayDate),
                startTime: selectedEvent !== null
                    ? extractTimeFromDate(selectedEvent?.startTime)
                    : selectedDate?.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) === "24:00"
                        ? "00:00"
                        : selectedDate?.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                endTime: selectedEvent !== null
                    ? extractTimeFromDate(selectedEvent?.endTime)
                    : selectedDate?.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) === "24:00"
                        ? "00:00"
                        : selectedDate?.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                allDay: selectedEvent !== null ? selectedEvent?.allDay : false,
                timeZone: selectedEvent !== null ? selectedEvent?.timeZone : "",
                repeatEvent: selectedEvent !== null ? selectedEvent?.repeatEvent : "Does Not Repeat",
                zoomLink: selectedEvent !== null ? selectedEvent?.zoomLink : "",
                description: selectedEvent !== null ? selectedEvent?.description : "",
                notification: selectedEvent !== null ? selectedEvent?.notification : true,
            }
        });
    const RepeatEvent = getValues("repeatEvent")
    const EventID = getValues("eventId")

    useEffect(() => {
        const values = guestData?.length > 0 ? guestData.map(item => item?.value?.toString()) : [];
        setGuest(values);
    }, [guestData]);

    useEffect(() => {
        const guestIds = selectedEvent?.eventSubDetails?.map((item) => item?.guestId) || [];
        const guestDataForSelect = guestIds?.map(guestId => {
            const user = userlist && userlist?.find(user => user?.employeeMasterID === guestId);
            return {
                value: user?.employeeMasterID,
                label: user?.name
            };
        });
        setguestData(guestDataForSelect);
    }, [selectedEvent, userlist]);

    const handleTabClick = (tab) => { setActiveTab(tab); };

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
                                {isDisable ? "View Event" : `${heading} Event`}
                            </h3>
                            <AiOutlineCloseCircle
                                className="text-4xl text-primary cursor-pointer"
                                onClick={() => {
                                    toggleModal();
                                    setSelectedDate();
                                    setSelectedEvent(null)
                                }}
                            />
                        </div>
                        {/* Modal body */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='p-4 md:p-5 max-h-[450px] overflow-y-auto'>
                                {activeTab === 'EventTab' && (
                                    <div className="grid gap-2 mb-2 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-2">
                                            <input type="text" disabled={isDisable} {...register('eventName', { required: 'Event name is required' })} name="eventName" id="eventName" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Event 1" required="" />
                                            {errors.eventName && (
                                                <span className="error">{errors.eventName.message}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'TaskTab' && (
                                    <div className="grid gap-2 mb-2 grid-cols-2">
                                        <div className="col-span-2 sm:col-span-2">
                                            <input type="text" disabled={isDisable} {...register('taskName', { required: 'Task name is required' })} name="taskName" id="taskName" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Add Task" required="" />
                                            {errors.taskName && (
                                                <span className="error">{errors.taskName.message}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className=" flex tab-buttons mb-4 gap-4">
                                    <button
                                        className={activeTab === 'EventTab' ? 'activetab' : ''}
                                        type='button'
                                        onClick={() => handleTabClick('EventTab')}
                                    >
                                        Event
                                    </button>
                                    <button
                                        className={activeTab === 'TaskTab' ? 'activetab' : ''}
                                        type='button'
                                        onClick={() => handleTabClick('TaskTab')}
                                    >
                                        Task
                                    </button>
                                </div>

                                <div className="grid gap-2 mb-2 grid-cols-2">
                                    <div className="col-span-2 sm:col-span-2">
                                        <div className='flex gap-3 items-center mb-2'>
                                            <FaRegClock />
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">Add Date And Time:</label>
                                        </div>

                                        <div className='flex gap-4 mb-2 items-center'>
                                            <input  type="date" disabled={isDisable} {...register('startDate')} name="startDate" id="startDate" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-40 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Sunday, 16 July" required="" />
                                            <input type="time" disabled={isDisable} {...register('startTime')} name="startTime" id="startTime" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="02:00 AM" required="" />
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">To</label>
                                            <input type="date" disabled={isDisable} min='startDate' {...register('endDate')} name="endDate" id="endDate" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-40 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Monday, 17 July" required="" />
                                            <input type="time" disabled={isDisable} {...register('endTime')} name="endTime" id="endTime" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="03:00 AM" required="" />
                                        </div>
                                    </div>
                                    {activeTab === 'EventTab' && (
                                        <div className=' mb-2'>
                                            <div className="col-span-2 sm:col-span-2 flex gap-3 items-center">
                                                <input
                                                    className='border border-primary ml-4 rounded h-5 w-5'
                                                    type="checkbox"
                                                    {...register("allDay")}
                                                    name='allDay'
                                                    id='allDay'
                                                    disabled={isDisable}
                                                />
                                                <label className="w-24">All Day</label>
                                                <div className='border w-full'>
                                                    <select
                                                        id="timeZone"
                                                        className="w-full p-2.5 relative border border-black rounded-lg text-gray-900 text-sm"
                                                        {...register("timeZone", { required: 'This is required' })}
                                                        name='timeZone'
                                                        disabled={isDisable}
                                                        placeholder="Timezone"
                                                        onChange={(e) => {
                                                            setValue("timeZone", e.target.value); // Set value using setValue from react-hook-form
                                                            clearErrors("timeZone")
                                                        }}>
                                                        {timeZoneList.map((time) => (
                                                            <option
                                                                key={time?.value}
                                                                selected={
                                                                    time?.text === getValues("timeZone")
                                                                }
                                                                value={time?.text}
                                                            >
                                                                {time?.text}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            {errors.timeZone && (
                                                <span className="error ml-28">{errors.timeZone.message}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {activeTab === 'EventTab' && (
                                    <>
                                        <div className="grid gap-2 mb-2 grid-cols-2">
                                            <div className="col-span-2 sm:col-span-2">
                                                <div className='flex gap-3 items-center mb-2'>
                                                    <FaRepeat />
                                                    <select
                                                        id="repeatEvent"
                                                        className="w-full p-2.5 relative border border-black rounded-lg text-gray-900 text-sm"
                                                        {...register("repeatEvent")}
                                                        name='repeatEvent'
                                                        disabled={isDisable}
                                                        placeholder="Does Not Repeat"
                                                        onChange={(e) => {
                                                            setValue("repeatEvent", e.target.value); // Set value using setValue from react-hook-form
                                                        }}>
                                                        {repeatList.map((repeat) => (
                                                            <option
                                                                key={repeat?.value}
                                                                selected={
                                                                    repeat?.text === getValues("repeatEvent")
                                                                }
                                                                value={repeat?.text}
                                                            >
                                                                {repeat?.text}
                                                            </option>
                                                        ))}
                                                        <option value="7" label="Custom" className='text-center bg-sky-200' />
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        {(RepeatEvent === "7" || RepeatEvent === 7) && (
                                            <div className="grid gap-2 mb-2 grid-cols-2">
                                                <div className="col-span-2 sm:col-span-2">
                                                    <div className='flex gap-3 items-center mb-2'>
                                                        <input type="text" disabled={isDisable} {...register('custom')} name="custom" id="custom" className="ml-7 bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Custom" required="" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid gap-2 mb-2 grid-cols-2">
                                            <div className="col-span-2 sm:col-span-2">
                                                <div className='flex gap-3 items-center mb-2'>
                                                    <IoVideocamOutline />
                                                    <input type="text" disabled={isDisable} {...register('zoomLink')} name="zoomLink" id="zoomLink" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Zoom Link" required="" />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid gap-2 grid-cols-2">
                                            <div className="col-span-2 sm:col-span-2">
                                                <div className='flex gap-3 items-center mb-2'>
                                                    <BsFillPersonPlusFill />
                                                    <div className='w-full'>
                                                        <Select
                                                            value={guestData}
                                                            isDisabled={isDisable}
                                                            isMulti
                                                            name="Participants"
                                                            options={
                                                                userlist?.length > 0
                                                                    ? userlist.map(
                                                                        (item) => ({
                                                                            value: item?.employeeMasterID,
                                                                            label: item?.name,
                                                                        })
                                                                    )
                                                                    : [{ value: "", label: "Not Found" }]
                                                            }
                                                            className="basic-multi-select"
                                                            classNamePrefix="select"
                                                            onChange={setguestData}
                                                            menuPortalTarget={document.body}
                                                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999, }) }}
                                                            menuPosition={'fixed'}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-span-2 sm:col-span-2">
                                                <div className='flex gap-3 items-center mb-2'>
                                                    <FiAlignRight />
                                                    <input type="text" disabled={isDisable} {...register('description')} name="description" id="description" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Add Description" required="" />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {/*<div className="grid gap-2 mb-2 grid-cols-2">
                                    {activeTab === 'EventTab' && (
                                        <div className="col-span-2 sm:col-span-2">
                                            <div className='flex gap-3 items-center mb-2'>
                                                <FaCalendar />
                                                <input type="text" {...register('name', { required: 'Event name is required' })} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nizami Patel" required="" />
                                            </div>
                                        </div>
                                    )}
                                    </div>*/}
                                {activeTab === "TaskTab" && (
                                    <div className="col-span-2 sm:col-span-2">
                                        <div className='flex gap-3 items-center mb-2'>
                                            <FiAlignRight />
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">Add Description:</label>
                                        </div>
                                        <div className='flex gap-3 items-center mb-2'>
                                            <textarea type="text" disabled={isDisable} {...register('description')} name="name" id="name" className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Description" required="" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="col-span-2 sm:col-span-2 border-t-2 px-5 py-3">
                                <div className='flex gap-3 items-center justify-between'>
                                    <div className='w-96 flex items-center gap-4'>
                                        <input
                                            className='border border-primary rounded h-4 w-4'
                                            type="checkbox"
                                            disabled={isDisable}
                                            {...register("notification")}
                                        />
                                        <label className="w-full">Do You Want To Get The Reminder Notification</label>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        {!isDisable && (
                                            <>
                                                {heading !== "Add New" && (
                                                    <button
                                                        className="text-base bg-red-200 text-red-600 hover:text-white rounded-full p-2 w-10 h-10 flex items-center justify-center"
                                                        onClick={() => handleEventDelete(EventID)}
                                                        disabled={isDisable}
                                                        type='button'
                                                    >
                                                        <MdDeleteOutline
                                                            className="text-2xl text-red cursor-pointer" />
                                                    </button>
                                                )}
                                                <button
                                                    className="bg-primary text-white text-base px-6 py-2 border border-primary shadow-md rounded-full "
                                                    type="submit"
                                                    disabled={isDisable}
                                                >
                                                    Save
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default AddEditEvent
