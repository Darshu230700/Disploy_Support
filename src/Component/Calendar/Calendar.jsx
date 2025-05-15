import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GoPlusCircle } from "react-icons/go";
import AddEditEvent from "./AddEditEvent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { REPEATLIST } from "../../Pages/API";
import { handleGetUserList } from "../../Redux/UserSlice";
import { handleCreateEditEvent, handleDeleteEvent, handleGetEventDataById, handleGetEventList } from "../../Redux/EventSlice";
import { GuestList, ResponseDateFormateCalendar, calendarStartDate } from "../Common/Common";
import { handlegetTimeZones } from "../../Redux/CommonSlice";
import Footer from "../Footer";
import moment from "moment/moment";
import { getMenuAll, getMenuPermission } from "../../Redux/SidebarSlice";
const Calendar = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
  Calendar.propTypes = {
    sidebarOpen: PropTypes.bool.isRequired,
    setSidebarOpen: PropTypes.func.isRequired,
    mobileSidebar: PropTypes.bool.isRequired,
    setMobileSidebar: PropTypes.func.isRequired,
  };
  const { token, user } = useSelector((state) => state.root.auth);
  const authToken = `Bearer ${token}`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [repeatList, setRepeatList] = useState([]);
  const [activeTab, setActiveTab] = useState('EventTab');
  const [heading, setHeading] = useState('Add New');
  const [timeZoneList, setTimeZoneList] = useState([])
  const [guest, setGuest] = useState([]);
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [todayDate, setTodayDate] = useState(moment().format("YYYY-MM-DD"));

  // const todayDate = new Date();
  // const oneHourLater = new Date(todayDate.getTime() + 60 * 60 * 1000);
  // console.log('oneHourLater :>> ', oneHourLater);
  const { userlist } = useSelector((s) => s.root.UserList);
  const isDisable = selectedEvent !== null ? (user?.employeeMasterID === selectedEvent?.userID ? false : true) : false;
  const [permissions, setPermissions] = useState({
    isDelete: false,
    isSave: false,
    isView: false,
  });


  useEffect(() => {
    dispatch(getMenuAll()).then((item) => {
      const findData = item?.payload?.data?.modulemaster.find((e) => e?.pageName === "Calender");
      if (findData) {
        const ItemID = findData?.moduleID;
        const payload = { UserRoleID: user?.userRoleID, ModuleID: ItemID };
        dispatch(getMenuPermission(payload)).then((permissionItem) => {
          if (
            Array.isArray(permissionItem?.payload?.data) && permissionItem?.payload?.data?.length > 0
          ) {
            setPermissions(permissionItem?.payload?.data[0]);
          }
        });
      }
    });
  }, []);

  const fetchRepeatList = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: REPEATLIST,
      headers: {
        Authorization: authToken,
      },
    };
    axios.request(config)
      .then((response) => {
        setRepeatList(response?.data?.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }



  useEffect(() => {
    fetchRepeatList()
    dispatch(handleGetUserList({ token }));
    dispatch(handlegetTimeZones({ token })).then((item) => {
      setTimeZoneList(item?.payload)
    })
  }, [])

  useEffect(() => {
    if (loading) {
      dispatch(handleGetEventList({ token })).then((item) => {
        setEvents(item?.payload)
      })
      setLoading(false)
    }
  }, [loading])

  const toggleModal = () => {
    setShowModal(!showModal);
    setTodayDate()
    setGuest([])
  };
  const handleDateSelect = (selectInfo) => {
    setSelectedDate(selectInfo)
    setGuest([])
    setSelectedEvent(null)
    setHeading("Add New")
    setShowModal(true)
  };


  const onSubmit = (item) => {
    const Params = ({
      "eventId": selectedEvent !== null ? selectedEvent?.eventId : 0,
      "eventName": item?.eventName ? item?.eventName : item?.taskName,
      "task": activeTab === "EventTab" ? false : true,
      "startDate": ResponseDateFormateCalendar(item?.startDate, item?.startTime),
      "endDate": ResponseDateFormateCalendar(item?.endDate, item?.endTime),
      "startTime": ResponseDateFormateCalendar(item?.startDate, item?.startTime),
      "endTime": ResponseDateFormateCalendar(item?.endDate, item?.endTime),
      "allDay": item?.allDay,
      "timeZone": item?.timeZone,
      "repeatEvent": item?.repeatEvent,
      "zoomLink": item?.zoomLink,
      "description": item?.description,
      "notification": item?.notification,
      "createdBy": 0,
      "createdDate": "2024-01-19T21:56:21.121Z",
      "updatedBy": 0,
      "updatedDate": "2024-01-19T21:56:21.121Z",
      "userID": user?.employeeMasterID,
      "eventSubDetails": GuestList(guest, user)
    })
    dispatch(handleCreateEditEvent({ token, Params })).then((res) => {
      setLoading(true)
      setShowModal(false)
      setSelectedEvent(null)
      setGuest([])
    })
  }

  const handleEventClick = (clickInfo) => {
    const eventData = clickInfo.event.extendedProps;
    dispatch(handleGetEventDataById({ id: eventData?.eventId, token })).then((item) => {

      setSelectedEvent(item?.payload?.[0])
      const eventSubDetails = item?.payload?.[0]?.eventSubDetails;
      const guestIds = eventSubDetails?.map((item) => item?.guestId) || [];
      setGuest(guestIds);
      setActiveTab(item?.payload?.[0]?.task === true ? "TaskTab" : "EventTab")
    })
    setHeading("Update")
    setShowModal(true)
  };

  const handleEventAdd = (addInfo) => {
    console.log('addInfo', addInfo)
  };

  const handleEventChange = (changeInfo) => {
    console.log('changeInfo', changeInfo)
  };

  const handleEventRemove = (removeInfo) => {
    console.log('removeInfo', removeInfo)
  };

  const handleEventDrop = (eventDropInfo) => {
    console.log('eventDropInfo', eventDropInfo)
  };

  function renderEventContent(eventInfo) {
    const EventData = eventInfo.event.extendedProps;
    return (
      <div
        style={{
          backgroundColor: EventData?.task ? "rgb(65, 81, 176)" : "rgb(214, 62, 99)",
          color: "rgb(255, 255, 255)",
        }}
        className='flex items-center w-full p-1 rounded-md text-white'
      >
        {/*<span className="font-semibold">{eventInfo.timeText}</span>*/}
        <span className="px-3">{EventData.eventName}</span>
      </div>
    );
  }

  const handleEventDelete = (id) => {
    dispatch(handleDeleteEvent({ token, id }))
    setLoading(true)
    setShowModal(false)
  }



  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
      <div className="flex flex-1">
        {/*<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />*/}
        <main className="bg-white-300 flex-1 p-3 overflow-hidden">
          <div className="flex flex-col">
            <section className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 pb-6">
              <h1
                onClick={() => {
                  navigate("/dashboard")
                }}
                className="font-bold flex cursor-pointer w-fit items-center lg:text-xl md:text-xl sm:text-xl mb-5 gap-4"
              >
                <IoChevronBack size={24} />
                Calendar
              </h1>
            </section>
            <div className="flex flex-row gap-4">
              <div className="w-1/5 shadow-lg p-6 flex flex-col gap-8">
                <div className="flex justify-center">
                  {permissions?.isSave && (
                    <button
                      className="flex align-middle gap-1 items-center float-right border rounded-full text-white bg-common px-6 py-2 text-base"
                      onClick={() => {
                        setSelectedEvent(null)
                        setHeading("Add New")
                        setShowModal(true)
                        setSelectedDate({
                          start: new Date(),
                          end: new Date()
                        })
                      }}
                    >
                      <GoPlusCircle className="text-2xl mr-1" />
                      Create
                    </button>
                  )}
                </div>
                <input
                  type="date"
                  placeholder='Enter Create Date'
                  value={todayDate}
                  // defaultValue={todayDate?.toISOString().split('T')[0]}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setTodayDate(selectedDate);
                  }}
                  className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="w-full shadow-xl p-6">
                <FullCalendar
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                  }}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="timeGridDay"
                  nowIndicator={true} // Show a line at current time
                  scrollTime={new Date().toISOString().substr(11, 8)}
                  editable
                  selectable
                  selectMirror
                  dayMaxEvents
                  weekends
                  events={events}
                  select={handleDateSelect}
                  eventClick={handleEventClick}
                  // eventAdd={handleEventAdd}
                  eventContent={renderEventContent}
                // eventChange={handleEventChange}
                // eventRemove={handleEventRemove}
                // eventDrop={handleEventDrop}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      {showModal && ((heading === "Add New" && selectedEvent === null) || (heading === "Update" && selectedEvent !== null)) && (
        <AddEditEvent
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          userlist={userlist}
          todayDate={todayDate}
          // oneHourLater={oneHourLater}
          repeatList={repeatList}
          toggleModal={toggleModal}
          onSubmit={onSubmit}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          guest={guest}
          setGuest={setGuest}
          handleEventDelete={handleEventDelete}
          heading={heading}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          timeZoneList={timeZoneList}
          isDisable={isDisable}
        />
      )}
      <Footer />
    </>
  );
};


export default Calendar;
