import Gmail_Logo from "../../Images/Email/Gmail-Logo.jpg"
import Microsoft_Logo from "../../Images/Email/microsoft-logo.png"
import Exchange_Logo from "../../Images/Email/microsoft-exchange-icon.webp"
import Other_Logo from "../../Images/Email/Other_email.jpg"
import { AUDITREPORT, EMPLOYEEPERFORMANCEREPORT, EMPLOYEEREPORT, TICKETREPORT } from "../../Pages/API";

export const pageSize = 5;
export const Basic_Plan = [{
    planid: "1",
    planlist: "Lorum ipsum is Simply Dummy Test"
},
{
    planid: "2",
    planlist: "Lorum ipsum is Simply Dummy Test"
},
{
    planid: "3",
    planlist: "Lorum ipsum is Simply Dummy Test"
},
{
    planid: "4",
    planlist: "Lorum ipsum is Simply Dummy Test"
},
{
    planid: "5",
    planlist: "Lorum ipsum is Simply Dummy Test"
}
];

export const EmailList = [{
    name: "Email",
    icon: Gmail_Logo,
    className: "w-14 h-14 border flex border-red rounded-full p-3"
},
{
    name: "Microsoft",
    icon: Microsoft_Logo,
    className: "w-14 h-14 flex border border-blue-600 rounded-full p-3"
},
{
    name: "Exchange",
    icon: Exchange_Logo,
    className: "w-14 h-14 flex border border-blue-500 rounded-full p-3"
},
    // {
    //     name: "Other",
    //     icon: Other_Logo,
    //     className: "w-14 h-14 flex border border-purple-800 rounded-full p-2"
    // }
]

export const RemoteAccessList = [{
    screenName: "Screen 1",
    phoneNumber: "+1 222 333 4444",
    connected: "10 May 2023, 10:25AM",
    screenLocation: "4218 Robinson CourtSagianw MI 48607"
},
{
    screenName: "Screen 2",
    phoneNumber: "+1 333 444 5555",
    connected: "10 May 2023, 10:35AM",
    screenLocation: "4218 Robinson CourtSagianw MI 48607"
},
{
    screenName: "Screen 3",
    phoneNumber: "+1 785 745 7856",
    connected: "10 May 2023, 10:15AM",
    screenLocation: "4218 Robinson CourtSagianw MI 48607"
},
{
    screenName: "Screen 4",
    phoneNumber: "+1 225 227 7845",
    connected: "10 May 2023, 10:55AM",
    screenLocation: "4218 Robinson CourtSagianw MI 48607"
}
]

export const AccordionItem = [{
    id: 1,
    question: "#23HH56DG - Screen isn't changing the media?",
    answer: "Check out this guide to learn how to and start developing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a  text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
},
{
    id: 2,
    question: "#23HH56DG - Screen isn't changing the media?",
    answer: "Check out this guide to learn how to and start developing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a  text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
},
{
    id: 3,
    question: "#23HH56DG - Screen isn't changing the media?",
    answer: "Check out this guide to learn how to and start developing Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a  text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
},
]

export const TicketStatus = [{
    statusid: "1",
    Status: "Pending"
}, {
    statusid: "2",
    Status: "Close"
}, {
    statusid: "3",
    Status: "Assigned"
}, {
    statusid: "4",
    Status: "ReOpen"
}];

export const TicketIssue = [
    {
        issueid: "1",
        Issue: "Screen isn't chnaging the media"
    },
    {
        issueid: "2",
        Issue: "New media isn't reflecting on the screen at the real time"
    },
    {
        issueid: "3",
        Issue: "How to add Media in the TV"
    },
    {
        issueid: "4",
        Issue: "Need to add New TV for xyz store"
    },
    {
        issueid: "5",
        Issue: "How can we check my storage consumption"
    },
    {
        issueid: "6",
        Issue: "How can we increase the storage limit"
    },
    {
        issueid: "7",
        Issue: "How can we change the subscription plan"
    },
    {
        issueid: "8",
        Issue: "How many media I can upload at once?"
    },
    {
        issueid: "9",
        Issue: "Custom"
    }
]

export const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];

export const totalMonths = months.map((month, index) => ({
    id: index + 1,
    name: month
}));

const startYear = 2020;
const endYear = 2023;

const yearArray = [];
for (let year = startYear; year <= endYear; year++) {
    yearArray.push({ year });
}

export default yearArray

export const RepeateEvent = [{
    id: "1",
    name: "Does Not Repeat"
}, {
    id: "2",
    name: "Daily"
},
{
    id: "3",
    name: "Weekly on Monday"
},
{
    id: "4",
    name: "Monthly on the third Monday"
},
{
    id: "5",
    name: "Annualy on July 17"
},
{
    id: "6",
    name: "Every Weekend (Monday to Friday)"
},
{
    id: "7",
    name: "Custom"
}]

export const createImageFromInitials = (size, name, color) => {
    if (name == null) return;
    name = getInitials(name);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = canvas.height = size;

    context.fillStyle = "#000";
    context.fillRect(0, 0, size, size);

    context.fillStyle = color;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.font = `${size / 1.5}px Trirong`;
    context.fillText(name, size / 2, size / 2);

    return canvas.toDataURL();
};

export const getInitials = (name) => {
    let initials;
    const nameSplit = name.split(" ");
    const nameLength = nameSplit.length;
    if (nameLength > 1) {
        initials =
            nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
};


export const GetRoleName = (allUserRoleData, item) => {
    const data = allUserRoleData?.userRoleData?.find(item1 => item1?.usersRoleID === item?.userRoleID)?.userRole;
    return data;
}

export function generateApproverDetails(data, prefix) {
    const listApproverDetails = [];
    for (let i = 0; i < data?.[`${prefix}LevelApprove`]; i++) {
        const newObj = {
            "appoverId": 0,
            "userId": data?.[`${prefix}_${i + 1}`],
            "levelNo": 1
        };
        listApproverDetails.push(newObj);
    }
    return listApproverDetails;
}

export const sectionDetails = [
    {
        prefix: "Screen",
        view: "ScreenView",
        createEdit: "ScreenCreateEdit",
        delete: "ScreenDelete",
        approve: "ScreenApprove",
        levelApprove: "ScreenLevelApprove"
    },
    {
        prefix: "Schdeule",
        view: "SchdeuleView",
        createEdit: "SchdeuleCreateEdit",
        delete: "SchdeuleDelete",
        approve: "SchdeuleApprove",
        levelApprove: "SchdeuleLevelApprove"
    },
    {
        prefix: "App",
        view: "AppView",
        createEdit: "AppCreateEdit",
        delete: "AppDelete",
        approve: "AppApprove",
        levelApprove: "AppLevelApprove"
    }
];

export const generateDetails = (data, index, prefix, list, disabled) => {
    if (data?.useraccess?.[index]?.isApprove) {
        for (let i = 0; i < data?.useraccess?.[index]?.noofApproval; i++) {
            let newObj = {
                [`${prefix}_${i + 1}`]: data?.useraccess?.[index]?.listApproverDetails[i]?.userId
            };
            list?.push(newObj);
            disabled?.push(String(data?.useraccess?.[index]?.listApproverDetails[i]?.userId))
        }
    }
};

export const DynamicDesignComponent = ({
    length,
    name,
    watch,
    setValue,
    register,
    getValues,
    errors,
    roleuserList,
    userRoleData,
    setUserDisable,
    userDisable,
}) => {
    const array = Array.from({ length }, (_, index) => index + 1);
    const handleSelectChange = (index, selectedValue) => {
        setValue(`${name}_${index}`, selectedValue);
        const data = userDisable?.[`${name}`];
        if (data) {
            data.splice((index - 1), 0, Number(selectedValue));
            data.splice(index, 1);
            setUserDisable({
                ...userDisable,
                [`${name}`]: [...data],
            });
        } else {
            setUserDisable({
                ...userDisable,
                [`${name}`]: [Number(selectedValue)],
            });
        }
        // const updatedDisable = name === 'Screen' ? [...screenDisable] :
        //     name === 'Schdeule' ? [...scheduleDisable] :
        //         [...appDisable];
        // updatedDisable[index - 1] = selectedValue;
        // if (name === 'Screen') setScreenDisable(updatedDisable);
        // else if (name === 'Schdeule') setScheduleDisable(updatedDisable);
        // else if (name === 'App') setAppDisable(updatedDisable);
    };

    return (
        <tr>
            <td className="flex items-center text-center">
                {array.map((item, index) => {
                    let disableList = userRoleData?.[`${name}_Approve`];
                    return (
                        <div key={item} className="flex flex-col gap-1">
                            <select
                                className="ml-2 border border-primary rounded-lg px-2 py-1 lg:w-48 md:w-48 sm:w-32 cursor-pointer"
                                {...register(`${name}_${index + 1}`, {
                                    required: `This Field is required`,
                                })}
                                onChange={(e) => handleSelectChange(index + 1, e.target.value)}
                                disabled={disableList}
                                value={getValues(`${name}_${index + 1}`)}
                            >
                                <option value="" label="Select User Role"></option>
                                {roleuserList?.map((item, index) => (
                                    <option
                                        key={index}
                                        disabled={userDisable?.[`${name}`]?.includes(item?.value)}
                                        value={item?.value}
                                    >
                                        {item?.text}
                                    </option>
                                ))}
                            </select>
                            {errors?.[`${name}_${index + 1}`] && (
                                <span className="error">
                                    {errors?.[`${name}_${index + 1}`].message}
                                </span>
                            )}
                        </div>
                    );
                })}
            </td>
        </tr>
    );
};

export function formatDate(inputDate) {
    const dateObject = new Date(inputDate);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();

    return `${day}/${month}/${year}`;
}

export function reportformatDate(inputDate) {
    const dateObject = new Date(inputDate);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();

    return `${day}-${month}-${year}`;
}

export function EditformatDate(inputDate) {
    const dateObject = new Date(inputDate);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();

    return `${year}-${month}-${day}`;
}

export function transformArray(arr) {
    return arr.map(item => {
        return { "solutionChecklistsID": item };
    });
}

export function convertDateFormat(inputDate) {
    // Split the date into day, month, and year
    let [day, month, year] = inputDate.split("-");

    // Create a new Date object using the extracted components
    let formattedDate = new Date(`${year}-${month}-${day}T00:00:00.051Z`);

    // Return the formatted date string
    return formattedDate.toISOString();
}

export function EmployeeLogDate(inputDate) {
    const dateObj = new Date(inputDate);

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);

    return formattedDate;
}

export function reportDateformat(inputDate) {
    const dateObject = new Date(inputDate);

    // Options for formatting the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };

    // Format the date using toLocaleDateString
    const formattedDate = dateObject.toLocaleDateString('en-US', options);

    return formattedDate;
}

export function reportTimeformat(inputDate) {
    const date = new Date(inputDate);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zero for single-digit minutes
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Determine if it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Create the formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTime;
}

export function generateDataObject(daily, date, report) {
    let data;
    const defaultDate = "2024-01-16T07:07:30.051Z";

    if (daily === "daily") {
        data = {
            "dataType": daily,
            "singleDate": convertDateFormat(date),
            "month": 0,
            "year": 0,
            "startDate": defaultDate,
            "endDate": defaultDate
        };
    } else if (daily === "monthly") {
        let separatedValues = date.split("&&");
        const Month = separatedValues[0];
        const Year = separatedValues[1];
        data = {
            "dataType": daily,
            "singleDate": defaultDate,
            "month": Month,
            "year": Year,
            "startDate": defaultDate,
            "endDate": defaultDate
        };
    } else {
        let separatedValues = date.split("&&");
        const start = separatedValues[0];
        const end = separatedValues[1];
        data = {
            "dataType": daily,
            "singleDate": defaultDate,
            "month": 0,
            "year": 0,
            "startDate": convertDateFormat(start),
            "endDate": convertDateFormat(end)
        };
    }

    return { report, data };
}

export const reportURLs = {
    "auditreport": AUDITREPORT,
    "employeelogs": EMPLOYEEREPORT,
    "employeeperformancereport": EMPLOYEEPERFORMANCEREPORT,
    "default": TICKETREPORT
};

export const calendarStartDate = (inputDate) => {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

export function GuestList(arr, user) {
    return arr.map((item) => ({
        eventSubId: 0,
        eventId: 0,
        guestId: item,
        guesttype: "string",
        userID: user?.employeeMasterID,
        mode: "Save",
    }));
}

export function ResponseDateFormateCalendar(dateString, timeString) {
    const formattedDate = new Date(`${dateString}T${timeString}:00.121Z`).toISOString();
    return formattedDate;
}

export function extractTimeFromDate(dateString) {
    const dateObject = new Date(dateString);
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function getTimeFromDate(date) {
    const hours = String(date.getHours()).padStart(2, "0"); // Ensure two digits
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensure two digits
    const time = `${hours}:${minutes}`;
    return time;
}


export function mapModuleTitlesToUserAccess(moduleTitle, watch) {
    const UserAccess = [];

    moduleTitle?.map((item) => {
        let View = watch(`${item?.pageName}_View`) ? watch(`${item?.pageName}_View`) : false;
        let Save = watch(`${item?.pageName}_Edit`) ? watch(`${item?.pageName}_Edit`) : false;
        let Delete = watch(`${item?.pageName}_Delete`) ? watch(`${item?.pageName}_Delete`) : false;
        let Approve = watch(`${item?.pageName}_Approve`);
        let LevelApprove = watch(`${item?.pageName}_LevelApprove`);
        let Total_Approve = LevelApprove ? Number(LevelApprove) : 0;
        const array = Array.from(
            { length: Total_Approve },
            (_, index) => index + 1
        );
        let List_Approve = [];

        if (Approve && array?.length > 0) {
            array?.map((item1, index) => {
                let User_ID = watch(`${item?.pageName}_${index + 1}`);
                let obj1 = {
                    appoverId: 0,
                    userId: Number(User_ID),
                    levelNo: item1,
                };
                List_Approve?.push(obj1);
            });
        }

        let obj = {
            moduleID: item?.moduleID,
            isView: View,
            isSave: Save,
            isDelete: Delete,
            isApprove: Approve ? Approve : false,
            noofApproval: Total_Approve,
            listApproverDetails: List_Approve,
        };

        UserAccess?.push(obj);
    });

    return UserAccess;
}

export function combineUserroleObjects(selectedRole) {
    let arr = [];

    selectedRole?.useraccess?.forEach((item) => {
        let obj1 = {
            [`${item?.moduleName}_View`]: item?.isView,
            [`${item?.moduleName}_Edit`]: item?.isSave,
            [`${item?.moduleName}_Delete`]: item?.isDelete,
            [`${item?.moduleName}_Approve`]: item?.isApprove,
            [`${item?.moduleName}_LevelApprove`]: item?.noofApproval,
        };
        arr.push(obj1);
        if (item?.listApproverDetails?.length > 0) {
            item?.listApproverDetails?.map((user, index) => {
                let userObj = {
                    [`${item?.moduleName}_${index + 1}`]: user?.userId,
                };
                arr?.push(userObj);
            });
        }
    });

    let obj = {
        userRole: selectedRole?.userRole,
        orgUserRoleID: selectedRole?.usersRoleID,
    };
    let mergedObject = {};
    arr.forEach((obj) => {
        mergedObject = { ...mergedObject, ...obj };
    });
    let combinedObj = { ...mergedObject, ...obj };
    return combinedObj;
}

export function createMarkup(svgString) {
    return { __html: svgString };
}

export function capitalizeFirstLetter(str) {
    if (!str) return str; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

