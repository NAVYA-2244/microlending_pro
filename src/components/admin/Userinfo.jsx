import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { backEndCallObj } from "../../services/mainServiceFile";
import { useMovieContext } from "../comman/Context";
import { toast } from "react-hot-toast";
import moment from 'moment';
import PenaltyModal from './PenaltyModal ';

// import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Loans from './../landingpage/Loans';
import { Button, Modal } from "react-bootstrap";
import { Input_text, Number_Input } from './../comman/All-Inputs';
// import Form from './../comman/Form';
import Joi from 'joi'
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";


const Userinfo = () => {


    const { adminprofileData, setAdminprofileData, setTransactionHistory, transactionHistory, errorOccur, EmiHistory, checkErrors, setErrorOccur, setEmiHistory, setError, loanList, setLoanList } = useMovieContext();
    const location = useLocation(); // Use the useLocation hook to access location state

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [tabclicked, setTabClicked] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [btndisabled, setBtnDisabled] = useState(false)
    const [isFetching, setIsFetching] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        delayedAmount: "",
        note: "",

    })

    const schema = {
        delayedAmount: Joi.number()
            .required()
            .min(50)
            .messages({
                "number.base": "Delayed amount must be a number",
                "any.required": "Delayed amount is required",
                "number.min": "Delayed amount must be at least {#limit}"
            }),
        note: Joi.string()
            .min(10)
            .max(100)
            .required()
            .pattern(/^[A-Za-z]/)
            .messages({
                "string.base": "Note must be a string",
                "string.empty": "Note is required",
                "string.min": "Note must be at least {#limit} characters long",
                "string.max": "Note cannot be longer than {#limit} characters",
                "string.pattern.base": "Note must contain only letters"
            })

    }
    const fetchData = async () => {
        try {

            setLoading(true)

            const user_id = location.state.user_id;

            const response = await backEndCallObj("/admin/users_profile", { user_id });
            // console.log(response, "gffg")
            setAdminprofileData(response);
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

            </div>
        </div></div>
    }

    const handleTabEMI = async (index) => {
        setActiveTab(index);
        try {
            if (isFetching) return;
            setBtnDisabled(true); // Disable buttons while fetching data
            setIsFetching(true);
            const user_id = location.state.user_id;
            const response = await backEndCallObj('/admin/emi_history', { user_id });
            // console.log(response, "EMI history data");
            setEmiHistory(Array.isArray(response) ? response : []); // Set EMI history
        } catch (ex) {
            toast.error("An error occurred while fetching EMI history.");
        } finally {
            setIsFetching(false); // Reset isFetching when the call is completed
            setBtnDisabled(false);
        }
    };

    const handleTabLOAN = async (index) => {
        setActiveTab(index);
        try {
            if (isFetching) return; // If a call is already in progress, return early
            setBtnDisabled(true);
            setIsFetching(true); // Set isFetching to true when a backend call starts
            const user_id = location.state.user_id;
            const response = await backEndCallObj("/admin/user_loan_details", { user_id });
            // console.log(response, "loan details data");
            setLoanList(response); // Set loan details
        } catch (ex) {
            toast.error("An error occurred while fetching loan details.");
        } finally {
            setBtnDisabled(false); // Enable buttons after fetching data
            setIsFetching(false)
        }
    };

    const handleTabTransection = async (index) => {
        setActiveTab(index);
        setTabClicked(true);
        try {
            if (isFetching) return; // If a call is already in progress, return early
            setBtnDisabled(true);
            setIsFetching(true); // Set isFetching to true when a backend call starts

            const user_id = location.state.user_id;
            const response = await backEndCallObj('/admin/transaction_history', { user_id });
            // console.log(response, "transaction history data");
            setTransactionHistory(response || []); // Set transaction history
        } catch (ex) {
            toast.error("An error occurred while fetching transaction history.");
        } finally {
            setBtnDisabled(false); // Enable buttons after fetching data
            setIsFetching(false)
        }
    };
    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    const formattedDate = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };




    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    // const isEMIDatePast = (nextEMIDate) => {
    //     const today = new Date();


    //     const nextDate = new Date(nextEMIDate);
    //     return today > nextDate;
    // };




    // const handleShowModal = ({ loan_id }) => {
    //     console.log(loan_id, "loanid")
    //     setFormData(loan_id)
    //     setShowModal(true);
    // };

    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setBtnDisabled(true);
    //     try {
    //         // await checkErrors(schema, formData);
    //         // console.log(errorOccur, "errors")
    //         // setLoading(true);
    //         const response = await backEndCallObj("/admin/add_penalty", { ...formData });
    //         setLoading(false);
    //         setErrorOccur(false);
    //         setFormData({
    //             delayedAmount: "",
    //             note: ""
    //         });
    //         handleCloseModal();
    //         toast.success("Penalty added successfully!");
    //     } catch (ex) {
    //         if (ex.response && ex.response.status === 400) {
    //             toast.error(ex.response.data);
    //         } else {
    //             toast.error("An unexpected error occurred.");
    //         }
    //     } finally {
    //         setLoading(false);
    //         setBtnDisabled(false);
    //     }
    // };

    return (
        <div className="user-details-container ">
            <h5 className="mb-4">User Profile</h5>
            <div className="row">
                <div className="col-xl-4">
                    <div className="card overflow-hidden">
                        <div className="px-3 profile_page d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="position-relative">
                                    {adminprofileData?.photo && <img
                                        src={adminprofileData?.photo}

                                        alt="img"
                                        width={60}
                                        height={60}
                                        className="rounded-circle object-fit-cover"
                                    />}

                                </div>
                                <h5 className="mb-0 ms-3 text-white text-capitalize">
                                    {adminprofileData?.first_name === 0 ? "" : adminprofileData?.first_name} {adminprofileData?.last_name === 0 ? "" : adminprofileData?.last_name}
                                </h5>
                            </div>
                            <span className="badge bg-success fs-12 ms-auto">
                                {adminprofileData?.user_status == null ? "NA" : adminprofileData?.user_status}
                            </span>
                        </div>
                        <div className="card-body">

                            <div className="my-3">
                                KYC Status :{" "}
                                <span className="fa-12 text-warning">
                                    {adminprofileData?.kyc_status === null ? "NA" : adminprofileData?.kyc_status}
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="f-12 mb-0">Phone</p>
                                <div className="d-flex">
                                    <span className="text-muted">
                                        {adminprofileData?.phone_number === null ? "NA" : adminprofileData?.phone_number}
                                    </span>

                                </div>
                            </div>
                            <div className="mt-3">
                                <>
                                    <label className="form-label me-1">Amount :</label>
                                    <span className="text-primary">
                                        {adminprofileData?.amount === null ? "NA" : adminprofileData?.amount}
                                    </span>
                                </>
                            </div>
                            <div className="mt-3">
                                <>
                                    <label className="form-label me-1">Credit Score :</label>
                                    <span className="text-primary">
                                        {adminprofileData?.credit_score === null ? "NA" : adminprofileData?.credit_score}
                                    </span>
                                </>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <h6 className="fs-18">Documents</h6>
                        <div className="card-body">

                            <div style={{ overflow: "hidden" }}>
                                <span>
                                    <img
                                        src={adminprofileData?.income_proof || "NA"}
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
                                        src={adminprofileData?.photo || "NA"}
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

                            </div>
                            <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            First Name :
                                        </label>
                                        <span className="text-capitalize">
                                            {adminprofileData?.first_name == 0 ? "NA" : adminprofileData?.first_name}

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
                                            {adminprofileData?.last_name == 0 ? "NA" : adminprofileData?.last_name}
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
                                            {adminprofileData?.dob == 0 ? "NA" : adminprofileData?.dob}
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
                                            {adminprofileData?.gender == null ? "NA" : adminprofileData?.gender}
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
                                        <span>{adminprofileData?.tin_number == 0 ? "NA" : adminprofileData?.tin_number}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-5 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Passport Number :
                                        </label>
                                        <span>{adminprofileData?.passport_number == 0 ? "NA" : adminprofileData?.passport_number}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                                {/* <h6 className="mb-2 fs-17">Loan Types</h6> */}
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
                                        <span> {adminprofileData?.employment == null ? "NA" : adminprofileData?.employment}</span>
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
                                        <span>{adminprofileData?.residence?.permanentAddress == 0 ? "NA" : adminprofileData?.residence?.permanentAddress}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Current Address :
                                        </label>
                                        <span>{adminprofileData?.residence?.currentAddress == 0 ? "NA" : adminprofileData?.residence?.currentAddress}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row border rounded-3 p-2 py-3 row-sm mb-3">

                                <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            State :
                                        </label>
                                        <span>{adminprofileData?.residence?.state == 0 ? "NA" : adminprofileData?.residence?.state}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            City :
                                        </label>
                                        <span>{adminprofileData?.residence?.city == 0 ? "NA" : adminprofileData?.residence?.city}</span>
                                    </div>
                                    <div>
                                        <label className="text-muted fw-normal form-label me-2">
                                            Pincode :
                                        </label>
                                        <span>{adminprofileData?.residence?.pin_code == 0 ? "NA" : adminprofileData?.residence?.pin_code}</span>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </div>
            {/* <div>
                <div className="tabs d-flex">
                    <div className={activeTab === 0 ? "tab active" : "tab"} onClick={() => handleTabTransection(0)} ><button className="btn btn-primary me-3 mb-2" disabled={btndisabled}>Transaction history</button></div>
                    <div className={activeTab === 1 ? "tab active" : "tab"} onClick={() => handleTabEMI(1)} ><button className="btn btn-primary me-2 mb-3" disabled={btndisabled} >EMI History</button></div>
                    <div className={activeTab === 2 ? "tab active" : "tab"} onClick={() => handleTabLOAN(2)}><button className="btn btn-primary me-2 mb-3" disabled={btndisabled}>Loan Details</button></div>
                </div> */}
            <div className="container">
                <div className="row mb-3">


                    <div className="col-12 col-md-6 d-block d-sm-flex justify-content-md-start  gap-md-2 mt-2 mt-md-0
">
                        <div className={activeTab === 0 ? "tab active" : "tab"} onClick={() => handleTabTransection(0)}>
                            <button class="btn btn-primary w-100 mb-2 mb-md-0" disabled={btndisabled}>Transaction History</button>
                        </div>
                        <div className={activeTab === 1 ? "tab active" : "tab"} onClick={() => handleTabEMI(1)}>
                            <button class="btn btn-primary w-100 mb-2 mb-md-0" disabled={btndisabled}>EMI History</button>
                        </div>
                        <div className={activeTab === 2 ? "tab active" : "tab"} onClick={() => handleTabLOAN(2)}>
                            <button class="btn btn-primary w-100" disabled={btndisabled}>Loan Details</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                        {/* <h4 className="mb-2 mb-sm-0">Dashboard</h4> */}
                    </div>
                </div>
            </div>


            <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>


                <TabPanel>
                    {/* <div className="table-responsive">
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
                                    transactionHistory?.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="text-center">No transactions found.</td>
                                        </tr>)
                                }
                            </table>}
                        </div> */}
                    <Tab1></Tab1>
                </TabPanel>
                <TabPanel>
                    {/* <div className="table-responsive">
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

                                {EmiHistory?.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="text-center">No transactions found.</td>
                                    </tr>)
                                }
                            </table>

                        </div> */}
                    <Tab2></Tab2>
                </TabPanel>
                <TabPanel>

                    {/* 
                        <diV className="table-responsive">
                            <table className="table border table-bordered table-centered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Documents</th>
                                        <th scope="col">Date </th>
                                        <th scope="col"> Next EMI Date </th>
                                        <th scope="col">user id</th>
                                        <th scope="col">lone id</th>
                                        <th scope="col">loan amount</th>
                                        <th scope="col">Months</th>
                                        <th scope="col">loan type</th>

                                        <th scope="col">loan status</th>
                                      
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
                                                        src={loan?.pay_slip}
                                                        alt="User"
                                                        className="object-fit-cover rounded-circle"
                                                        style={{
                                                            width: "45px",
                                                            height: "45px",
                                                        }}
                                                    />
                                                  
                                                </div>
                                            </td>
                                            <td>{formattedDate(loan?.date_of_applycation)}</td>
                                            <td>{formattedDate(loan?.emi_detals.nextEMIDate)}</td>


                                            <td className="text-primary">
                                                {loan.user_id}
                                            </td>
                                            <td>{loan?.form_id}</td>
                                            <td>{loan?.loan_amount}</td>
                                            <td>{loan?.months}</td>
                                            <td>{loan?.loan_type}</td>
                                            <td>
                                                <div
                                                    className={`loan_status ${loan.loan_status === "completed"
                                                        ? "bg-success  fw-bold"
                                                        : loan?.loan_status === "Processing"
                                                            ? "bg-warning fw-bold"
                                                            : loan?.loan_status === "Rejected"
                                                                ? "bg-danger fw-bold"
                                                                : loan?.loan_status === "Approved"
                                                                    ? "bg-info fw-bold"
                                                                    : "bg-dark fw-bold"
                                                        }`}
                                                >
                                                    {loan?.loan_status}

                                                </div>{" "}

                                                {isEMIDatePast(loan?.emi_detals.nextEMIDate) && (
                                                    <button className="btn btn-primary" onClick={() => handleShowModal(loan.form_id)}>
                                                        Add PenaltyModal
                                                    </button>


                                                )}
                                            </td>




                                        </tr>
                                    ))}
                                </tbody>
                            </table> */}
                    {/* {showModal &&
                                <Modal show={showModal} onHide={handleCloseModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title> Add Penalty </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={(e) => handleSubmit(e)} className="addAdmin_form">
                                            <div className="mb-3">
                                                <label htmlFor="delayedAmount" className="form-label">Delayed Amount</label>
                                                <Number_Input
                                                    type="text"

                                                    placeholder="Enter delayed amount here"


                                                    value={formData["delayedAmount"]}
                                                    name="delayedAmount"

                                                    SetForm={setFormData}
                                                    schema={schema["delayedAmount"]}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="note" className="form-label">Note</label>
                                                <Input_text
                                                    type="text"
                                                    placeholder="Enter note here"
                                                    name="note"
                                                    value={formData["note"]}
                                                    SetForm={setFormData}
                                                    schema={schema["note"]}
                                                />
                                            </div>
                                            <Button variant="primary" type="submit">Submit</Button>
                                            <Button variant="secondary" onClick={handleCloseModal}>
                                                Close
                                            </Button>
                                        </form>

                                    </Modal.Body>

                                </Modal>}
                            {loanList === 0 && (
                                <tr>
                                    <td colSpan="7" className="text-center">No transactions found.</td>
                                </tr>)
                            }
                        </diV> */}
                    <Tab3></Tab3>
                </TabPanel>
            </Tabs>

        </div>
        // </div >
    );
};

export default Userinfo;
