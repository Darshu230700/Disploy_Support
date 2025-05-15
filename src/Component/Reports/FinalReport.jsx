import React, { useEffect, useState } from 'react'
import AuditReport from './AuditReport';
import PropTypes from "prop-types";
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import EmployeePerformanceReports from './EmployeePerformanceReports';
import EmployeeLogs from './EmployeeLogs';
import TicketLogs from './TicketLogs';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { generateDataObject, reportURLs } from '../Common/Common';
import { debounce } from 'lodash';
import Papa from "papaparse";
const FinalReport = ({ sidebarOpen, setSidebarOpen, mobileSidebar, setMobileSidebar }) => {
    FinalReport.propTypes = {
        sidebarOpen: PropTypes.bool.isRequired,
        setSidebarOpen: PropTypes.func.isRequired,
        mobileSidebar: PropTypes.bool.isRequired,
        setMobileSidebar: PropTypes.func.isRequired,
    };
    const { token } = useSelector((state) => state.root.auth);
    const authToken = `Bearer ${token}`;
    const { report, daily, date } = useParams();
    const [allReportData, setAllReportData] = useState({
        allData: [],
        SearchData: []
    })
    const [loading, setLoading] = useState(false)

    const fetchData = () => {
        setLoading(true)
        let { data } = generateDataObject(daily, date, report);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: reportURLs[report] || reportURLs["default"],
            headers: {
                'Content-Type': 'application/json',
                Authorization: authToken,
            },
            data: JSON.stringify(data)
        };
        axios.request(config)
            .then((response) => {
                setAllReportData({
                    allData: response?.data?.data,
                    SearchData: response?.data?.data
                })
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        if (searchQuery === "") {
            setAllReportData({ ...allReportData, SearchData: allReportData?.allData })
        } else {
            if (report === "auditreport") {
                const filterData = allReportData?.allData?.filter((item) => item?.performedBy?.toLowerCase().includes(searchQuery))
                setAllReportData({ ...allReportData, SearchData: filterData })
            } else if (report === "employeelogs") {
                const filterData = allReportData?.allData?.filter((item) => item?.ticketID?.toLowerCase().includes(searchQuery))
                setAllReportData({ ...allReportData, SearchData: filterData })
            } else if (report === "employeeperformancereport") {
                const filterData = allReportData?.allData?.filter((item) => item?.employeeName?.toLowerCase().includes(searchQuery))
                setAllReportData({ ...allReportData, SearchData: filterData })
            } else {
                const filterData = allReportData?.allData?.filter((item) => item?.ticketID?.toLowerCase().includes(searchQuery))
                setAllReportData({ ...allReportData, SearchData: filterData })
            }
        }
    }

    const debouncedOnChange = debounce(handleChange, 500);

    const exportDataToCSV = () => {
        // Convert the data to CSV format using PapaParse
        const csv = Papa.unparse(allReportData?.allData);

        // Create a Blob containing the CSV data
        const csvBlob = new Blob([csv], { type: "text/csv" });

        // Create a URL for the Blob
        const csvUrl = URL.createObjectURL(csvBlob);

        // Create an invisible link element to trigger the download
        const link = document.createElement("a");
        link.href = csvUrl;
        link.download = `${report}.csv`;

        link.click();

        // Clean up by revoking the URL to release resources
        URL.revokeObjectURL(csvUrl);
    };

    return (
        <>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
            <div className="flex flex-1">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setMobileSidebar={setMobileSidebar} mobileSidebar={mobileSidebar} />
                {report === "auditreport" && (
                    <AuditReport allReportData={allReportData} debouncedOnChange={debouncedOnChange} exportDataToCSV={exportDataToCSV} loading={loading}/>
                )}
                {report === "employeeperformancereport" && (
                    <EmployeePerformanceReports allReportData={allReportData} debouncedOnChange={debouncedOnChange} exportDataToCSV={exportDataToCSV} loading={loading}/>
                )}
                {report === "employeelogs" && (
                    <EmployeeLogs allReportData={allReportData} debouncedOnChange={debouncedOnChange} exportDataToCSV={exportDataToCSV} loading={loading}/>
                )}
                {report === "ticketlogs" && (
                    <TicketLogs allReportData={allReportData} debouncedOnChange={debouncedOnChange} exportDataToCSV={exportDataToCSV} loading={loading}/>
                )}
            </div>
        </>
    )
}

export default FinalReport
