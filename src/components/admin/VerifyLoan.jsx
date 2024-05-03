
import React, { useCallback, useEffect, useState } from 'react';
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
import { useMovieContext } from '../comman/Context';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { log } from 'joi-browser';

function VerifyLoan() {
    const { verifyloan, setVerifyloan, setUserprofileData, setAdminData } = useMovieContext();
    const [showModel, setShowModel] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedLoanId, setSelectedLoanId] = useState(null);
    const [actionType, setActionType] = useState("");
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await backEndCall("/admin/loans_list");
            setVerifyloan(response);
        } catch (ex) {
            console.error("Error fetching loan data:", ex);
        } finally {
            setLoading(false);
        }
    }, [setVerifyloan]);

    useEffect(() => {
        if (verifyloan.length === 0) {
            fetchData();
        }
    }, [fetchData, verifyloan.length]);

    const callLoanStatusAPI = async (transactionId) => {
        console.log("success sms")
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
    // Add this line to define the actionType state

    const handleRejectLoan = async (form_id) => {
        setSelectedLoanId(form_id);
        setActionType("reject"); // Set actionType to 'reject'
        setShowModel(true);
    };

    const handleApproveLoan = async (form_id) => {
        setSelectedLoanId(form_id);
        setActionType("approve"); // Set actionType to 'approve'
        setShowModel(true);
    };



    // const handleRejectLoan = async (form_id, loan_status) => {
    //     setSelectedLoanId(form_id, loan_status);
    //     setShowModel(true);
    // };

    // const handleApproveLoan = async (form_id, loan_status) => {
    //     setSelectedLoanId(form_id, loan_status);
    //     setShowModel(true);
    // };
    const handleConfirm = async () => {
        setShowModel(false);
        setBtnDisabled(true);
        setLoading(true);

        try {
            if (selectedLoanId && actionType) {
                let response;
                const loanStatus = actionType === "approve" ? "Approved" : "Rejected";
                response = await backEndCallObj("/admin/loan_approvel", { form_id: selectedLoanId, loan_status: loanStatus });
                setUserprofileData(null)
                setAdminData(null)
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
            }
        } finally {
            setLoading(false);
            setBtnDisabled(false);
        }
    };

    const formatDateTime = (date) => {
        return moment(date).format("DD-MMM-YYYY hh:mm A");
    };

    return (
        <div className="user-details-container">
            <h5 className="mb-4">Loan Applications</h5>
            <div className='card'>
                <div className='card-body scrolleHidden' style={{ overflowY: "auto", height: "70vh" }}>
                    {loading && (
                        <div className="text-center mt-3">
                            <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {!loading && verifyloan && (
                        <div className="table-responsive">
                            <table className="table border table-bordered table-centered">
                                <thead>
                                    <tr className="table-head text-center align-middle">
                                        <th>Date</th>
                                        <th>Loan ID</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Phone Number</th>
                                        <th>Loan Amount</th>
                                        <th>Months</th>
                                        <th>Loan Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body align-middle text-center">
                                    {verifyloan.map((loan) => (
                                        <tr key={loan.id}>
                                            <td>{formatDateTime(loan.date_of_application)}</td>
                                            <td>{loan.form_id}</td>
                                            <td>{loan.first_name} {loan.last_name}</td>
                                            <td>{loan.gender}</td>
                                            <td>{loan.phone_number}</td>
                                            <td>{loan.loan_amount}</td>
                                            <td>{loan.months}</td>
                                            <td>{loan.loan_status}</td>
                                            <td>
                                                <Button variant="success" onClick={() => handleApproveLoan(loan.form_id, "Approved")} disabled={btnDisabled} className='mb-2 me-2'>Approve</Button>
                                                <Button variant="danger" onClick={() => handleRejectLoan(loan.form_id, "Rejected")} disabled={btnDisabled}>Reject</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {showModel ? (
                <Modal show={showModel} onHide={() => setShowModel(false)}>
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
