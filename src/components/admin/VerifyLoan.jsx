/* eslint-disable react/jsx-pascal-case */
// import React, { useCallback, useEffect, useState } from 'react';
// import Joi from 'joi-browser';
// import moment from 'moment';
// import { toast } from 'react-hot-toast';
// import { Button, Modal } from 'react-bootstrap';
// import { useMovieContext } from '../comman/Context';
// import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
// import { Date_Input, SearchInput } from '../comman/All-Inputs';
// // import React, { useState } from 'react';
// import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

// function VerifyLoan() {
//     const { verifyloan, setVerifyloan, setUserprofileData, setAdminData, setError } = useMovieContext();
//     const [showModel, setShowModel] = useState(false);
//     const [btnDisabled, setBtnDisabled] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [selectedLoanId, setSelectedLoanId] = useState(null);
//     const [actionType, setActionType] = useState("");
//     const [filterDisabled, setFilterDisabled] = useState(false);

//     const [formData, setFormData] = useState({
//         start_date: "",
//         end_date: "",
//         id: ""
//     });
//     const [activeTab, setActiveTab] = useState(0);


//     const schema = {
//         start_date: Joi.date().required().label('Start Date'),
//         end_date: Joi.date().required().label('End Date'),
//         id: Joi.string().min(12).max(12).label('Transaction ID').allow('').optional().length(12)
//     };

//     const fetchData = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await backEndCall("/admin/loans_list");
//             setVerifyloan(response);
//         } catch (ex) {
//             console.error("Error fetching loan data:", ex);
//         } finally {
//             setLoading(false);
//         }
//     }, [setVerifyloan]);

//     useEffect(() => {
//         if (verifyloan.length === 0) {
//             fetchData();
//         }
//     }, [fetchData, verifyloan.length]);

//     const callLoanStatusAPI = async (transactionId) => {
//         setBtnDisabled(true);
//         setLoading(true);
//         try {
//             const response = await backEndCallObj("/admin/loan_status", { transaction_id: transactionId });
//             toast.success(response, "Loan status updated");
//             fetchData();
//         } catch (ex) {
//             console.error("Error updating loan status:", ex);
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response.data);
//             }
//         } finally {
//             setLoading(false);
//             setBtnDisabled(false);
//         }
//     };

//     const handleRejectLoan = async (form_id) => {
//         setSelectedLoanId(form_id);
//         setActionType("reject");
//         setShowModel(true);
//     };

//     const handleApproveLoan = async (form_id) => {
//         setSelectedLoanId(form_id);
//         setActionType("approve");
//         setShowModel(true);
//     };

//     const handleConfirm = async () => {
//         setShowModel(false);
//         setBtnDisabled(true);
//         setLoading(true);

//         try {
//             if (selectedLoanId && actionType) {
//                 let response;
//                 const loanStatus = actionType === "approve" ? "Approved" : "Rejected";
//                 response = await backEndCallObj("/admin/loan_approvel", { form_id: selectedLoanId, loan_status: loanStatus });
//                 setTimeout(() => {
//                     callLoanStatusAPI(response.transaction_id);
//                 }, 3000);
//             } else {
//                 console.error("Error: selectedLoanId or actionType is not set.");
//                 toast.error("Loan ID or action type is not set.");
//             }
//         } catch (ex) {
//             console.error("Error confirming action:", ex);
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response.data);
//             }
//         } finally {
//             setLoading(false);
//             setBtnDisabled(false);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { error } = Joi.validate(formData, schema, { abortEarly: false });
//         if (error) {
//             const errorMessage = error.details.map(err => err.message).join("\n");
//             toast.error(errorMessage);
//             return;
//         }

//         try {
//             setFilterDisabled(true);
//             setLoading(true);

//             const response = await backEndCallObj("/admin/loan_search_filters", formData);
//             setVerifyloan(response || []);
//             setFormData({
//                 start_date: "",
//                 end_date: "",
//                 id: ""
//             });
//         } catch (ex) {
//             console.error("Error filtering transactions:", ex);
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response.data);
//             }
//         } finally {
//             setFilterDisabled(false);
//             setLoading(false);
//         }
//     };
//     const handleRefresh = async () => {
//         setLoading(true);
//         try {
//             const response = await backEndCall("/admin/loans_list");
//             setVerifyloan(response);
//         } catch (ex) {
//             console.error("Error fetching loan data:", ex);
//         } finally {
//             setLoading(false);
//         }
//     }
//     const handleTabClick = async (index, loan_status) => {
//         console.log("loans status", loan_status)
//         setActiveTab(index);

//         try {

//             const response = await backEndCallObj("/admin/loan_filters", { loan_status });
//             setVerifyloan(response);
//         } catch (ex) {
//             console.error("Error fetching loan data:", ex);
//         } finally {
//             setLoading(false);
//         }
//     };


//     const formattedDate = (date) => {
//         return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
//     };



//     return (
//         <div className="user-details-container">
//             <h5 className="mb-4">Loan Applications</h5>
//             <div className='card'>
//                 <div className='card-body scrolleHidden' style={{ overflowY: "auto", height: "70vh" }}>
//                     <div onClick={handleRefresh}>
//                         <i className="ri-loop-right-line text-primary fs-22 cursor-pointer"

//                         ></i></div>

//                     <div>
//                         <div className="tabs">
//                             <div className={activeTab === 0 ? "tab active" : "tab"} onClick={() => handleTabClick(0, "Processing")}>Tab 1</div>
//                             <div className={activeTab === 1 ? "tab active" : "tab"} onClick={() => handleTabClick(1, "Rejected")}>Tab 2</div>
//                             <div className={activeTab === 2 ? "tab active" : "tab"} onClick={() => handleTabClick(2, "Approved")}>Tab 3</div>
//                         </div>
//                         <Tabs>
//                             {/* <TabList>
//                                 <Tab>Title 1</Tab>
//                                 <Tab>Title 2</Tab>
//                             </TabList> */}

//                             <TabPanel>
//                                 <h2>Any content 1</h2>
//                             </TabPanel>
//                             <TabPanel>
//                                 <h2>Any content 2</h2>
//                             </TabPanel>
//                         </Tabs>
//                     </div>
//                     <form onSubmit={handleSubmit} className='flex-fill'>
//                         <div className="row mb-3 d-flex justify-content-end">
//                             <div className="col-12 col-xl-2 col-md-2 col-sm-12">

//                                 <label htmlFor="startDate" className="form-label">Start Date</label>
//                                 <Date_Input
//                                     type={"date"}
//                                     value={formData["start_date"]}
//                                     name={"start_date"}
//                                     SetForm={setFormData}
//                                     schema={schema["start_date"]}
//                                     max={moment().format("YYYY-MM-DD")}

//                                     required
//                                 />
//                             </div>
//                             <div className="col-12 col-xl-2 col-md-2 col-sm-12">

//                                 <label htmlFor="endtDate" className="form-label">End Date</label>
//                                 <Date_Input
//                                     type={"date"}
//                                     value={formData["end_date"]}
//                                     name={"end_date"}
//                                     SetForm={setFormData}
//                                     schema={schema["end_date"]}
//                                     max={moment().format("YYYY-MM-DD")}


//                                     required
//                                 />
//                             </div>
//                             <div className="col-12 col-xl-2 col-md-2 col-sm-12 mt-auto">
//                                 {/* <label htmlFor="serch" className="form-label">Serch<span className="text-danger">*</span></label> */}
//                                 <SearchInput

//                                     type="text"
//                                     name="id"
//                                     value={formData["id"]}
//                                     placeholder="transaction id "
//                                     SetForm={setFormData}
//                                     schema={schema["id"]}
//                                 />
//                             </div>
//                             <div className='col-12 col-xl-2 col-md-2 col-sm-12 my-auto'>

//                                 {/* <button type="submit" className="btn btn-primary mt-2" disabled={filterDisabled}>
//                                         Search
//                                     </button> */}
//                                 <button
//                                     type="submit"
//                                     className="btn btn-primary mt-2"
//                                     disabled={filterDisabled || !(formData.start_date && formData.end_date || formData.id)}
//                                 >
//                                     Search
//                                 </button>

//                             </div>
//                         </div>
//                     </form>
//                     {/* {!loading && verifyloan && ( */}

//                     <div className="table-responsive">
//                         <table className="table border table-bordered table-centered">
//                             <thead>
//                                 <tr className="table-head text-center align-middle">
//                                     <th>Date</th>
//                                     <th>Loan ID</th>
//                                     <th>Name</th>
//                                     <th>Gender</th>
//                                     <th>Phone Number</th>
//                                     <th>Loan Amount</th>
//                                     <th>Months</th>
//                                     <th>Loan Status</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>

//                             <tbody className="table-body align-middle text-center">
//                                 {verifyloan && verifyloan.map((loan) => (
//                                     <tr key={loan.id}>
//                                         <td>{loan.date_of_applycation ? formattedDate(loan.date_of_applycation) : ''}</td>
//                                         <td>{loan.form_id}</td>
//                                         <td>{loan.first_name} {loan.last_name}</td>
//                                         <td>{loan.gender}</td>
//                                         <td>{loan.phone_number}</td>
//                                         <td>{loan.loan_amount}</td>
//                                         <td>{loan.months}</td>
//                                         <td>
//                                             <div
//                                                 className={`loan_status ${loan.loan_status === "completed"
//                                                     ? "bg-success  fw-bold"
//                                                     : loan.loan_status === "Processing"
//                                                         ? "bg-warning fw-bold"
//                                                         : loan.loan_status === "Rejected"
//                                                             ? "bg-danger fw-bold"
//                                                             : loan.loan_status === "Approved"
//                                                                 ? "bg-info fw-bold"
//                                                                 : "bg-dark fw-bold"
//                                                     }`}
//                                             >
//                                                 {loan.loan_status}
//                                             </div>
//                                         </td>
//                                         <td>
//                                             {loan.loan_status === "Processing" && (
//                                                 <>
//                                                     <Button variant="success" onClick={() => handleApproveLoan(loan.form_id)} disabled={btnDisabled} className='mb-2 me-2'>Approve</Button>
//                                                     <Button variant="danger" onClick={() => handleRejectLoan(loan.form_id)} disabled={btnDisabled}>Reject</Button>
//                                                 </>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>

//                         </table>
//                     </div>
//                     {loading && (
//                         <div className="text-center mt-3">
//                             <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
//                                 <span className="sr-only"></span>
//                             </div>
//                         </div>
//                     )}
//                     {/* )} */}
//                 </div>
//             </div>
//             {showModel ? (
//                 <Modal show={showModel} onHide={() => setShowModel(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Confirm Action</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>Are you sure you want to perform this action?</Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowModel(false)}>Cancel</Button>
//                         <Button variant="primary" onClick={handleConfirm} disabled={btnDisabled}>Confirm</Button>
//                     </Modal.Footer>
//                 </Modal>
//             ) : null}
//         </div>
//     );
// }

// export default VerifyLoan;


import React, { useCallback, useEffect, useState } from 'react';
import Joi from 'joi-browser';
import moment from 'moment';
import { toast } from 'react-hot-toast';
import { Button, Modal } from 'react-bootstrap';
import { useMovieContext } from '../comman/Context';
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
import { Date_Input, SearchInput } from '../comman/All-Inputs';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { Navigate, useNavigate } from 'react-router-dom';

function VerifyLoan() {
    const navigate = useNavigate();
    const { verifyloan, setVerifyloan, setUserprofileData, setAdminData, setError } = useMovieContext();

    // const { setVerifyloan } = useMovieContext();
    const [showModel, setShowModel] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedLoanId, setSelectedLoanId] = useState(null);
    const [actionType, setActionType] = useState("");
    const [filterDisabled, setFilterDisabled] = useState(false);
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        id: ""
    });
    const [activeTab, setActiveTab] = useState(0);
    // const [tabData, setTabData] = useState({
    //     0: [],
    //     1: [],
    //     2: []
    // });

    const schema = {

        start_date: Joi.date().required().allow(""),
        end_date: Joi.date().required().allow(""),
        id: Joi.string().min(4).max(12).allow('').optional()
    };

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (verifyloan?.length === 0) {
                const response = await backEndCall("/admin/loans_list");
                setVerifyloan(prevTabData => ({ ...prevTabData, [activeTab]: response }));
            }
            else (
                setVerifyloan(verifyloan)
            )
        } catch (ex) {
            console.error("Error fetching loan data:", ex);
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {


        fetchData();


    }, []);

    const callLoanStatusAPI = async (transactionId) => {
        setBtnDisabled(true);
        setLoading(true);
        try {
            const response = await backEndCallObj("/admin/loan_status", { transaction_id: transactionId });
            toast.success(response, "Loan status updated");
            fetchData();
        } catch (ex) {
            console.error("Error updating loan status:", ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        } finally {
            setLoading(false);
            setBtnDisabled(false);
        }
    };

    const handleRejectLoan = async (form_id) => {
        setSelectedLoanId(form_id);
        setActionType("reject");
        setShowModel(true);
    };

    const handleApproveLoan = async (form_id) => {
        setSelectedLoanId(form_id);
        setActionType("approve");
        setShowModel(true);
    };

    const handleConfirm = async () => {
        setShowModel(false);
        setBtnDisabled(true);
        setLoading(true);

        try {
            if (selectedLoanId && actionType) {
                let response;
                const loanStatus = actionType === "approve" ? "Approved" : "Rejected";
                response = await backEndCallObj("/admin/loan_approvel", { form_id: selectedLoanId, loan_status: loanStatus });
                setTimeout(() => {
                    callLoanStatusAPI(response.transaction_id);
                }, 3000);
            } else {
                console.error("Error: selectedLoanId or actionType is not set.");
                toast.error("Loan ID or action type is not set.");

            }
        } catch (ex) {
            console.error("Error confirming action:", ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
                fetchData()
            }
        } finally {
            // setLoading(false);
            setBtnDisabled(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = Joi.validate(formData, schema, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map(err => err.message).join("\n");
            toast.error(errorMessage);
            return;
        }

        try {
            setFilterDisabled(true);
            setLoading(true);
            const formDataToSend = {
                ...formData,
                id: formData.id.toUpperCase()
            };

            const response = await backEndCallObj("/admin/loan_search_filters", formDataToSend);
            setVerifyloan(prevTabData => ({ ...prevTabData, [0]: response }));
            // setVerifyloan(response)

            console.log(response, "serach data")
            setFormData({
                start_date: "",
                end_date: "",
                id: ""
            });
        } catch (ex) {
            console.error("Error filtering transactions:", ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        } finally {
            setFilterDisabled(false);
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const response = await backEndCall("/admin/loans_list");
            setVerifyloan(prevTabData => ({ ...prevTabData, [activeTab]: response }));

            console.log(response, "response")
        } catch (ex) {
            console.error("Error fetching loan data:", ex);
        } finally {
            setLoading(false);
        }
    };

    const handleTabClick = async (index, loan_status) => {
        console.log("loans status", loan_status)
        setActiveTab(index);

        try {
            setLoading(true)

            const response = await backEndCallObj("/admin/loan_filters", { loan_status });

            setVerifyloan(response);

            setVerifyloan(prevTabData => ({ ...prevTabData, [0]: response || [] }));


        } catch (ex) {
            console.error("Error filtering transactions:", ex);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        } finally {

            setLoading(false);
        }
    };
    const formattedDate = (date) => {
        return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '';
    };

    console.log(verifyloan[0], "verifyloan")

    const userprofile = async (user_id) => {

        try {
            // Navigate to the UserInfo page with the user ID as state
            navigate("/userinfo", { state: { user_id } });
        } catch (error) {
            console.error("Error navigating to user info page:", error);
        }
    };

    console.log(activeTab)
    return (
        <div className="user-details-container">
            <h5 className="mb-4">Loan Applications</h5>
            <div className='card'>
                <div className='card-body scrolleHidden' style={{ overflowY: "auto", height: "70vh" }}>
                    <span onClick={handleRefresh}>
                        <i className="ri-loop-right-line text-primary fs-22 cursor-pointer"></i>
                    </span>

                    <form onSubmit={handleSubmit} className='flex-fill'>
                        <div className="row mb-3 d-flex justify-content-end">
                            <div className="col-12 col-xl-2 col-md-2 col-sm-12">
                                <label htmlFor="startDate" className="form-label">Start Date</label>
                                <Date_Input
                                    type={"date"}
                                    value={formData["start_date"]}
                                    name={"start_date"}
                                    SetForm={setFormData}
                                    schema={schema["start_date"]}
                                    max={moment().format("YYYY-MM-DD")}

                                    required
                                />
                            </div>
                            <div className="col-12 col-xl-2 col-md-2 col-sm-12">

                                <label htmlFor="endtDate" className="form-label">End Date</label>
                                <Date_Input
                                    type={"date"}
                                    value={formData["end_date"]}
                                    name={"end_date"}
                                    SetForm={setFormData}
                                    schema={schema["end_date"]}
                                    max={moment().format("YYYY-MM-DD")}


                                    required
                                />
                            </div>
                            <div className="col-12 col-xl-2 col-md-2 col-sm-12 mt-auto">
                                {/* <label htmlFor="serch" className="form-label">Serch<span className="text-danger">*</span></label> */}
                                <SearchInput

                                    type="text"
                                    name="id"
                                    value={formData["id"]}
                                    placeholder="Loan id "
                                    SetForm={setFormData}
                                    schema={schema["id"]}

                                />
                            </div>
                            <div className='col-12 col-xl-2 col-md-2 col-sm-12 my-auto'>

                                {/* <button type="submit" className="btn btn-primary mt-2" disabled={filterDisabled}>
                                        Search
                                    </button> */}
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-2"
                                    disabled={filterDisabled || !(formData.start_date && formData.end_date || formData.id)}
                                >
                                    Search
                                </button>

                            </div>
                        </div>
                    </form>
                    <span className="tabs d-flex ">
                        <div className={activeTab === 0 ? "tab active" : "tab"} onClick={() => handleTabClick(0, "Processing")} ><button className='btn btn-primary me-2 mb-3'  >Processing</button></div>
                        <div className={activeTab === 1 ? "tab active" : "tab"} onClick={() => handleTabClick(1, "Approved")}><button className='btn btn-success  me-2 mb-3'>Approved</button></div>
                        <div className={activeTab === 2 ? "tab active" : "tab"} onClick={() => handleTabClick(2, "Rejected")}><button className='btn btn-danger  me-2 mb-3'>Rejected</button></div>
                    </span>

                    <div className="table-responsive">
                        <table className="table border table-bordered table-centered">
                            <thead>
                                <tr className="table-head text-center align-middle">

                                    <th>Date</th>
                                    <th>Loan ID</th>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Phone Number</th>
                                    <th>Loan Amount</th>
                                    <th>Months</th>
                                    <th>Loan Status</th>
                                    {verifyloan.loan_status === "Processing" && <th>Action</th>}

                                </tr>
                            </thead>
                            <tbody className="table-body align-middle text-center">
                                {verifyloan[0]?.map((loan) => (
                                    <tr key={loan.id}>
                                        <td>{loan.date_of_applycation ? formattedDate(loan.date_of_applycation) : ''}</td>
                                        <td>{loan.form_id}</td>

                                        <td className="text-uppercase font-weight-bold underline-style text-primary cursor" onClick={() => userprofile(loan.user_id)}>
                                            {loan.user_id}
                                        </td>

                                        <td>{loan.first_name} {loan.last_name}</td>
                                        <td>{loan.gender}</td>
                                        <td>{loan.phone_number}</td>
                                        <td>{loan.loan_amount}</td>
                                        <td>{loan.months}</td>
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
                                            </div>
                                        </td>
                                        {loan.loan_status === "Processing" && <td>
                                            {loan.loan_status === "Processing" && (
                                                <>
                                                    <Button variant="success" onClick={() => handleApproveLoan(loan.form_id)} disabled={btnDisabled} className='mb-2 me-2'>Approve</Button>
                                                    <Button variant="danger" onClick={() => handleRejectLoan(loan.form_id)} disabled={btnDisabled}>Reject</Button>
                                                </>
                                            )}
                                        </td>}

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {loading && (
                        <div className="text-center mt-3">
                            <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {verifyloan[0] == 0 && <p className='text-center'>there is no data found</p>}
                </div>
            </div>
            {showModel ? (
                <Modal show={showModel} onHide={() => setShowModel(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Action</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to perform this action?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModel(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleConfirm} disabled={btnDisabled}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </div>
    );
}

export default VerifyLoan;
