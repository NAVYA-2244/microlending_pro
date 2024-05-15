import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { backEndCallObj } from "../../services/mainServiceFile";
import { useMovieContext } from "../comman/Context";
import { toast } from "react-hot-toast";
import moment from 'moment';

// import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Loans from './../landingpage/Loans';

const Userinfo = () => {
    const { userprofileData, setUserprofileData, setTransactionHistory, transactionHistory, EmiHistory, setEmiHistory, setError, loanList, setLoanList } = useMovieContext();
    const location = useLocation(); // Use the useLocation hook to access location state

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [tabclicked, setTabClicked] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const fetchData = async () => {
        try {

            setLoading(true)
            // Access user_id from location state
            const user_id = location.state.user_id;
            console.log(user_id, "jjjjjjj")
            const response = await backEndCallObj("/admin/users_profile", { user_id });
            console.log(response, "gffg")
            setUserprofileData(response);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching user profile:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div><div className="text-center mt-3">
            <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                <span className="sr-only"></span>
            </div>
        </div></div>;
    }


    const handleTabEMI = async (index) => {
        setActiveTab(index);
        try {
            // setLoading(true);
            const user_id = location.state.user_id;
            const response = await backEndCallObj('/admin/emi_history', { user_id });
            console.log(response, "emi history")
            if (Array.isArray(response)) {
                setEmiHistory(response);
            } else {
                setEmiHistory([]);
            }
            setLoading(false);

        } catch (ex) {
            toast.error("An error occurred while fetching data.");
            // setLoading(false);
        }
    };



    const handleTabLOAN = async (index) => {
        setActiveTab(index);
        try {
            const user_id = location.state.user_id;
            // setLoading(true);
            const response = await backEndCallObj("/admin/user_loan_details", { user_id });
            console.log(response, "lans details");
            setLoanList(response);
            // setLoading(false);
        }
        // console.log(response, "loan status");
        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
                setLoading(false);
            }
        } finally {

        }
    }
    const handleTabClick = (index) => {
        setActiveTab(index);
    };


    console.log(userprofileData)


    const handleTabTransection = async (index) => {
        setActiveTab(index);
        setTabClicked(true)
        try {
            const user_id = location.state.user_id;
            console.log("yes")

            const response = await backEndCallObj('/users/transaction_history', { user_id });
            // if (Array.isArray(response)) {
            setLoading(false);
            setTransactionHistory(response || []);
            console.log(response, "transections history")
        }
        // else {
        //     setTransactionHistory([]);
        // }

        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
            setError(ex.message);

        }
    };

    const formattedDate = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };
    console.log(activeTab)




    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };
    return (
        <div className="user-details-container ">
            <h5 className="mb-4">User Profile</h5>
            <div className="row">
                <div className="col-xl-4">
                    <div className="card overflow-hidden">
                        <div className="px-3 profile_page d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="position-relative">
                                    {userprofileData?.photo && <img
                                        src={userprofileData?.photo}

                                        alt="img"
                                        width={60}
                                        height={60}
                                        className="rounded-circle object-fit-cover"
                                    />}

                                </div>
                                <h5 className="mb-0 ms-3 text-white text-capitalize">
                                    {userprofileData?.first_name === 0 ? "" : userprofileData?.first_name} {userprofileData?.last_name === 0 ? "" : userprofileData?.last_name}
                                </h5>
                            </div>
                            <span className="badge bg-success fs-12 ms-auto">
                                {userprofileData?.user_status == null ? "NA" : userprofileData?.user_status}
                            </span>
                        </div>
                        <div className="card-body">

                            <div className="my-3">
                                KYC Status :{" "}
                                <span className="fa-12 text-warning">
                                    {userprofileData?.kyc_status === null ? "NA" : userprofileData?.kyc_status}
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="f-12 mb-0">Phone</p>
                                <div className="d-flex">
                                    <span className="text-muted">
                                        {userprofileData?.phone_number === null ? "NA" : userprofileData?.phone_number}
                                    </span>
                                    {/* <span className="text-success float-end">
                                        {userprofileData?.kyc_status === null ? "NA" : userprofileData?.kyc_status}
                                    </span> */}
                                </div>
                            </div>
                            <div className="mt-3">
                                <>
                                    <label className="form-label me-1">Amount :</label>
                                    <span className="text-primary">
                                        {userprofileData?.amount === null ? "NA" : userprofileData?.amount}
                                    </span>
                                </>
                            </div>
                            <div className="mt-3">
                                <>
                                    <label className="form-label me-1">Amount :</label>
                                    <span className="text-primary">
                                        {userprofileData?.cibil_score === null ? "NA" : userprofileData?.cibil_score}
                                    </span>
                                </>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <h6 className="fs-18">Documents</h6>
                        <div className="card-body">
                            {/* <div style={{
                                // height: "20%",
                                // width: " 20%",
                                // overflow: "hidden",

                            }}>
                                <span>  <img src={userprofileData?.income_proof == 0 ? "NA" : userprofileData?.income_proof} className="me-3 justify-content-center" style={{
                                    height: "20%",
                                    width: " 40%",
                                    overflow: "hidden",

                                }}></img> <img src={userprofileData?.photo == 0 ? "NA" : userprofileData?.photo} className="me-3  justify-content-center" style={{
                                    height: "20%",
                                    width: " 40%",
                                    overflow: "hidden",


                                }}></img></span>

                            </div> */}
                            <div style={{ overflow: "hidden" }}>
                                <span>
                                    <img
                                        src={userprofileData?.income_proof || "NA"}
                                        alt="Income Proof"
                                        className={`me-3 ${isZoomed ? "zoomed" : ""}`}
                                        style={{
                                            height: isZoomed ? "100%" : "20%",
                                            width: isZoomed ? "100%" : "40%",
                                            cursor: "pointer"
                                        }}
                                        onClick={toggleZoom}
                                    />
                                    <img
                                        src={userprofileData?.photo || "NA"}
                                        alt="Photo"
                                        className={`me-3 ${isZoomed ? "zoomed" : ""}`}
                                        style={{
                                            height: isZoomed ? "100%" : "20%",
                                            width: isZoomed ? "100%" : "40%",
                                            cursor: "pointer"
                                        }}
                                        onClick={toggleZoom}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-sm-flex justify-content-between align-items-center mb-3">
                                <h6 className="fs-18">Personal Information</h6>
                                {/* <button
                                    className="btn btn-primary"
                                    onClick={() => Navigate("/updateprofile")}
                                >
                                    <i class="ri-edit-line"></i> Update Profile
                                </button> */}
                            </div>
                            <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            First Name :
                                        </label>
                                        <span className="text-capitalize">
                                            {userprofileData?.first_name == 0 ? "NA" : userprofileData?.first_name}

                                        </span>
                                    </div>
                                </div>

                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Last Name :{" "}
                                        </label>
                                        <span className="text-capitalize">
                                            {" "}
                                            {userprofileData?.last_name == 0 ? "NA" : userprofileData?.last_name}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            DOB :{" "}
                                        </label>
                                        <span className="text-capitalize">
                                            {" "}
                                            {userprofileData?.dob == 0 ? "NA" : userprofileData?.dob}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Gender :{" "}
                                        </label>
                                        <span className="text-capitalize">
                                            {" "}
                                            {userprofileData?.gender == null ? "NA" : userprofileData?.gender}
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                                <h6 className="mb-2 fs-17">Documents Details</h6>
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Tin Number :
                                        </label>
                                        <span>{userprofileData?.tin_number == 0 ? "NA" : userprofileData?.tin_number}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-5 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Passport Number :
                                        </label>
                                        <span>{userprofileData?.passport_number == 0 ? "NA" : userprofileData?.passport_number}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                                <h6 className="mb-2 fs-17">Loan Types</h6>
                                {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Purpose of loan:</strong> {userData.purpose_of_loan}
                  </p>
                </div> */}
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Employement :
                                        </label>
                                        <span> {userprofileData?.employment == null ? "NA" : userprofileData?.employment}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                                <h6 className="mb-2 fs-17">Adrress Details</h6>
                                <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Permanent Address :
                                        </label>
                                        <span>{userprofileData?.residence?.permanentAddress == 0 ? "NA" : userprofileData?.residence?.permanentAddress}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Current Address :
                                        </label>
                                        <span>{userprofileData?.residence?.currentAddress == 0 ? "NA" : userprofileData?.residence?.currentAddress}</span>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
            <div>
                <div className="tabs d-flex">
                    <div className={activeTab === 0 ? "tab active" : "tab"} onClick={() => handleTabTransection(0)}><button className="btn btn-primary me-3 mb-2">Transection histry</button></div>
                    <div className={activeTab === 1 ? "tab active" : "tab"} onClick={() => handleTabEMI(1)}><button className="btn btn-primary me-2 mb-3">EMI History</button></div>
                    <div className={activeTab === 2 ? "tab active" : "tab"} onClick={() => handleTabLOAN(2)}><button className="btn btn-primary me-2 mb-3">Loan Details</button></div>
                </div>
                <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>


                    <TabPanel>
                        <div className="table-responsive">
                            {tabclicked && <table className="table border table-bordered table-centered">
                                <thead>
                                    <tr className="table-head">
                                        <th scope="col">Transaction Id</th>
                                        <th scope="col">Receiver Id</th>
                                        <th scope="col">Sender Id</th>
                                        <th scope="col">Transaction Type</th>
                                        <th scope="col">Transaction Status</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Comment</th>
                                        <th scope="col">Transaction Date</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body text-center">



                                    {transactionHistory?.map(history => (
                                        <tr key={history.transaction_id}>
                                            <td>{history.transaction_id}</td>
                                            <td>{history.receiver_id}</td>
                                            <td>{history.sender_id}</td>
                                            <td>{history.transactionType}</td>
                                            <td>{history.transaction_status}</td>
                                            <td>{history.amount}</td>
                                            <td>{history.comment}</td>
                                            <td>{formattedDate(history.transactionDate)}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                                {
                                    transactionHistory.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center">No transactions found.</td>
                                        </tr>)
                                }
                            </table>}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="table-responsive">
                            <table className="table border table-bordered table-centered text-center">
                                <thead>
                                    <tr className="table-head">
                                        <th scope="col">Payment Id</th>
                                        <th scope="col">Receiver Id</th>
                                        <th scope="col">Sender Id</th>
                                        <th scope="col">Instalment Number</th>
                                        <th scope="col">Transaction Type</th>
                                        <th scope="col">Emi Status</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">

                                    {
                                        EmiHistory.map(history => (
                                            <tr key={history.emi_id}>
                                                <td>{history.payment_id}</td>
                                                <td>{history.receved_id}</td>
                                                <td>{history.sender_id}</td>
                                                <td>{history.instalmentNumber}</td>
                                                <td>{history.transactionType}</td>
                                                <td>{history.emi_status}</td>
                                                <td>{history.paymentAmount}</td>
                                                <td>{formattedDate(history.paymentDate)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                                {EmiHistory.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">No transactions found.</td>
                                    </tr>)
                                }
                            </table>

                        </div>
                    </TabPanel>
                    <TabPanel>

                        {/* <div className="row">
                            <div className="col-xl-10">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-sm-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fs-18">Loans Details</h6>
                                        </div>
                                        {loanList?.map((Loans) => (
                                            <div key={Loans.id} className="row border rounded-3 p-2 py-3 row-sm mb-3">
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            User Id :
                                                        </label>
                                                        <span className="text-capitalize">
                                                            {Loans.user_id === "0" ? "NA" : Loans.user_id}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            Form Id :
                                                        </label>
                                                        <span className="text-capitalize">
                                                            {Loans.form_id === "0" ? "NA" : Loans.form_id}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            Loan Amount :
                                                        </label>
                                                        <span className="text-capitalize">
                                                            {Loans.loan_amount === "0" ? "NA" : Loans.loan_amount}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            Loan Status :
                                                        </label>
                                                        <span className="text-capitalize">
                                                            {Loans?.loan_status === null ? "NA" : Loans?.loan_status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            Loan Type :
                                                        </label>
                                                        <span className="text-capitalize">
                                                            {Loans?.loan_type === null ? "NA" : Loans?.loan_type}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            Months:
                                                        </label>
                                                        <span className="text-capitalize">
                                                            {Loans?.months === null ? "NA" : Loans?.months}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            city
                                                        </label>
                                                        <span className="text-capitalize">
                                                            {Loans?.city === null ? "NA" : Loans?.city}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            Months:
                                                        </label>
                                                        <span className="text-capitalize">
                                                            {Loans?.pin_code === null ? "NA" : Loans?.pin_code}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            Pay Slip
                                                        </label>
                                                        <span className="text-capitalize">
                                                            <img src={Loans?.pay_slip === null ? "NA" : Loans?.pay_slip} style={{ width: "100%", height: "200px" }}></img>

                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                    <div>
                                                        <label className="text-muted fw-normal form-label me-2">
                                                            Photo
                                                        </label>
                                                        <span className="text-capitalize">
                                                            <img src={Loans?.photo === null ? "NA" : Loans?.photo} style={{ width: "100%", height: "200px" }}></img>

                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>


                        </div> */}

                        <diV className="table-responsive">
                            <table className="table border table-bordered table-centered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Documents</th>
                                        <th scope="col">Date </th>
                                        <th scope="col">user id</th>
                                        <th scope="col">form id</th>
                                        <th scope="col">loan amount</th>
                                        <th scope="col">loan status</th>
                                        {/* <th scope="col">Address</th> */}
                                        <th scope="col">loan type</th>
                                        <th scope="col">Months</th>
                                        <th scope="col">city</th>
                                        <th scope="col">pin code</th>
                                        {/* <th scope="col">pay_slip</th> */}

                                    </tr>
                                </thead>
                                <tbody>

                                    {loanList?.map((loan) => (
                                        <tr key={loan?.user_id}>
                                            <td>
                                                <div className="d-flex">
                                                    <img
                                                        src={loan.photo}
                                                        alt="User"
                                                        className="object-fit-cover rounded-circle"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                        }}
                                                    />
                                                    <img
                                                        src={loan.pay_slip}
                                                        alt="User"
                                                        className="object-fit-cover rounded-circle"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                        }}
                                                    />
                                                    {/* <h6>{loan.name}</h6> */}
                                                </div>
                                            </td>
                                            <td>{formattedDate(loan.date_of_applycation)}</td>


                                            <td className="text-primary">
                                                {loan.user_id}
                                            </td>
                                            <td>{loan.form_id}</td>
                                            <td>{loan.loan_amount}</td>
                                            <td>
                                                <div
                                                    className={`loan_status ${loan.loan_status === "completed"
                                                        ? "bg-success  fw-bold"
                                                        : loan.loan_status === "Processing"
                                                            ? "bg-warning fw-bold"
                                                            : loan.loan_status === "Rejected"
                                                                ? "bg-danger fw-bold"
                                                                : loan.loan_status === "Approved"
                                                                    ? "bg-info fw-bold"
                                                                    : "bg-dark fw-bold"
                                                        }`}
                                                >
                                                    {loan.loan_status}

                                                </div>{" "}


                                            </td>
                                            <td>{loan.loan_type}</td>
                                            <td>{loan.city}</td>
                                            <td>{loan.state}</td>
                                            <td>{loan.city}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </diV>
                    </TabPanel>
                </Tabs>

            </div>
        </div >
    );
};

export default Userinfo;
