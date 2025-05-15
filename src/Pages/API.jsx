import axios from "axios";
// export const Url = "https://disploysupportapi.thedestinysolutions.com/api/"

// stage URl:- disploysupportstage.disploy.com
export const Url = "https://backsupport.disploy.com/api/"
export const baseUrl = `${Url}EmployeeMaster/`;
export const getUrl = axios.create({
  baseURL: `${Url}EmployeeMaster/`,
  method: "get",
});
export const SIGNAL_R = `${Url}chatHub`;

export const getcustomerUrl = axios.create({
  baseURL: `${Url}CustomerMaster/`,
  method: "get",
});

export const postUrl = axios.create({
  baseURL: `${Url}EmployeeMaster/`,
  method: "post",
});

export const eventpostUrl = axios.create({
  baseURL: `${Url}Event/`,
  method: "post"
})

export const eventgetUrl = axios.create({
  baseURL: `${Url}Event/`,
  method: "get"
})

export const commongetUrl = axios.create({
  baseURL: `${Url}Common/`,
  method: "get"
})


export const customerURL = `${Url}CustomerMaster/`;
export const userRoleURL = `${Url}UsersRole/`

export const ADD_CUSTOMER_REGISTER = `${customerURL}registorcustomermaster`
export const GET_ALL_COUNTRY = `${baseUrl}GetCountryMasters`
export const GET_ALL_CITY = `${baseUrl}GetCityMasters`
export const ADD_REGISTER_URL = `${baseUrl}RegistorEmployeeMaster`
export const LOGIN_URL = `${baseUrl}Login`
export const DELETE_USER = `${baseUrl}DeleteEmployee`
export const RESET_PASSWORD = `${baseUrl}ResetPassword`
export const FORGOT_PASSWORD = `${baseUrl}ForgotPassword`
export const UPDATE_PASSWORD = `${baseUrl}UpdatePassword`
export const ADDUPDATE_USERROLE = `${userRoleURL}AddUpdateUsersRole`
export const GetAllIssueReason = `${Url}Common/GetAllIssueReason`
export const ADD_EDIT_TICKET = `${Url}TicketMaster/CreateAndUpdateTicket`
export const GET_ALL_TICKET = `${Url}TicketMaster/GetAllTicket`
export const SOLUTION_CHECKLIST = `${Url}Common/GetAllSolutionChecklists`;
export const SAVETICKET = `${Url}TicketMaster/SaveCheckList`
export const AUDITREPORT = `${Url}Report/GetAudiLogsReport`
export const EMPLOYEEREPORT = `${Url}Report/GetEmployeeLogs`
export const TICKETREPORT = `${Url}Report/GetTicketLogs`
export const EMPLOYEEPERFORMANCEREPORT = `${Url}Report/GetEmployeePerformanceReport`
export const GET_SCEDULE_TIMEZONE = `${baseUrl}NewScreen/GetAllTimeZone`;
export const CHATUSERLIST = `${Url}Common/GetUserListForChat`
export const USER_ROLE_GET = `${Url}UsersRole/ListOfModule`;
export const USER_ROLE_COMBINE = `${Url}UsersRole/GetUserRolesCombine`;
export const REPEATLIST = `${Url}Common/GetAllRepeatEvent`

// Plan

export const GET_TRIAL_PERIOD_DETAILS = `${Url}Common/GetAllRepeatEvent`
export const ADD_EDIT_TRIAL_PLAN = `${Url}Common/GetAllRepeatEvent`


// Invoice

// export const GET_ALL_INVOICE = `${baseUrl}Invoice/GetAllInvoiceMaster`
export const GET_ALL_INVOICE = `${baseUrl}common/GetBillingDetails`
export const GET_INVOICE_BY_ID = `${baseUrl}Invoice/GetInvoiceById`
export const SEND_INVOICE = `${baseUrl}Invoice/GetInvoiceById`


// Discount

export const GET_ALL_DISCOUNT = `${baseUrl}DiscountMaster/GetAllDiscountMaster`
export const GET_DISCOUNT_BY_ID = `${baseUrl}DiscountMaster/GetDiscountMaster`
export const ADD_EDIT_DISCOUNT = `${baseUrl}DiscountMaster/AddorUpdateDiscountMaster`
export const GET_ALL_FEATURE_LIST = `${baseUrl}Common/GetAllPlansFeatures`
export const DELETE_DISCOUNT = `${baseUrl}DiscountMaster/DeleteDiscount`
export const GET_ALL_SEGMENT = `${baseUrl}common/GetAllSegment`
export const VERIFY_COUPON = `${baseUrl}common/VerfiyDiscountCoupon`

// sidebar

export const GET_SIDEBAR_MENU = `${baseUrl}SideBarMenu`;
export const MENU_ACCESS = `${baseUrl}GetAllLevelData`;


// Email

export const CREATE_GMAIL_CRED = `${Url}Gmail/CreateGmailCred`
export const CHECK_CRED_EXIST = `${Url}Gmail/CheckCredExists`
export const GET_ALL_CATEGORY = `${Url}Gmail/GetAllCategory`
export const ALL_GMAIL_DETAILS = `${Url}Gmail/GetAllMailDetails`
export const ALL_GMAIL_DETAILS_BY_ID = `${Url}Gmail/GetAllMailDetailsByID`
export const SEND_MAIL = `${Url}Gmail/SendMail`



// Billing

export const GET_ALL_BILLING = `${Url}Gmail/GetGmailTrash`


// Chat
export const GET_BY_USER_CHAT = `${Url}Chat/GetAllRepeatEvent`
export const SAVE_USER_CHAT = `${Url}Chat/chat_create_user`
export const USER_LIVE_OFFLINE = `${Url}Chat/UpdateSocketStatus`
