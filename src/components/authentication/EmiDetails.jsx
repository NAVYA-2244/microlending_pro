import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { backEndCallObj } from '../../services/mainServiceFile';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { useMovieContext } from '../comman/Context';

function EmiDetails() {
    // const [emis, setEmis] = useState({});
    const { emis, setEmis, userprofileData, setUserprofileData, userData, setUserData } = useMovieContext()
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const location = useLocation();
    const formId = location.state.formId;

    useEffect(() => {

        fetchEMIDetails();
    }, [formId]);
    const fetchEMIDetails = async () => {
        // setBtnDisabled(true)
        try {
            const response = await backEndCallObj("/emi/get_emi_details", { form_id: formId });
            console.log(response, "emaisdata")
            setEmis(response);
            setLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
            setLoading(false);
            // setBtnDisabled(false)
        }
    };

    const showModel = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const callLoanStatusAPI = async (paymentid) => {
        // setBtnDisabled(true)
        console.log(paymentid, "transaction id")
        try {
            const response = await backEndCallObj("/emi/emi_status", { payment_id: paymentid });
            console.log(response, "loan status"); // Log the response from the API

            toast.success(response, "emi successfully");
            fetchEMIDetails();
            setBtnDisabled(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);

            }

        }
        // finally {
        //     setBtnDisabled(false);
        // }
    };

    const handlePayEMI = async () => {
        setBtnDisabled(true)
        try {
            const payload = {
                emi_id: emis.emi_id,
                loan_id: emis.loan_id,
                paymentAmount: emis.installmentAmount,
                instalmentNumber: emis.installmentNumber,
                delayDays: emis.delayDays,
                delayedAmount: emis.delayedAmount
            };
            const response = await backEndCallObj("/emi/pay_emi", payload);
            setUserprofileData(null)
            setUserData(null)
            toast.success(response.message, "EMI payment successful!");

            setShowModal(false);
            setTimeout(() => {
                callLoanStatusAPI(response.payment_id);
            }, 9000);

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
                setBtnDisabled(false)
                setShowModal(false);
            }
        }
        finally {
            // setBtnDisabled(false);
        }
    };


    const formatDateTime = (date) => {
        if (!date) return ""; // handle case when date is not available
        return moment(date).format("DD-MMM-YYYY hh:mm A");
    };
    return (
        <div className='container'>


            <div className='card'>
                <div className='card-body  shadow-sm'>
                    <div className='row '>
                        <h4>EMI Details</h4>



                        <div className='col-xl-4 col-lg-4 col-sm-12 '>


                            <div className="my-4">
                                <strong className='px-2'>Emi Id :</strong>
                                <span>{emis.emi_id}</span>
                            </div>

                            <div className='my-4'>
                                <strong className='px-2'>Loan Id :</strong>
                                <span>{emis.loan_id}</span>
                            </div>

                            {/* <div className='my-4'>
                                <strong className='px-2'>Total Amount :</strong>
                                <span>{emis.loanTotalAmount}</span>
                            </div> */}
                            <div className='my-4'>
                                <strong className='px-2'>Loan Amount:</strong>
                                <span>{emis.loanAmount}</span>
                            </div>
                            <div className='my-4'>
                                <strong className='px-2'>Interest Rate:</strong>
                                <span>{emis.interestRate}</span>
                            </div>
                            <div className='my-4'>
                                <strong className='px-2'>Duration Time:</strong>
                                <span>{emis.tenureMonths}</span>
                            </div>
                        </div>
                        <div className='col-xl-4 col-lg-4 col-sm-12 '>
                            <div className='my-4'>
                                <strong className='px-2'>Delay Days:</strong>
                                <span>{emis.delayDays}</span>
                            </div>

                            <div className='my-4'>
                                <strong className='px-2'>Delayed Amount:</strong>
                                <span>{emis.delayedAmount}</span>
                            </div>



                            <div className='my-4'>
                                <strong className='px-2'>Emi Status:</strong>
                                <span>{emis.emiStatus}</span>
                            </div>

                            <div className='my-4'>
                                <strong className='px-2'> Installment Amount:</strong>
                                <span>{emis.totalInstallmentAmount}</span>
                            </div>
                            <div className='my-4'>
                                <strong className='px-2'>Installment Number:</strong>
                                {/* <span>{formatDateTime(emis.nextEMIDate)}</span> */}
                                <span className='px-2'>{emis.installmentNumber}</span>
                            </div>
                            {/* <div className='my-4'>
                                <strong className='px-2'>Emi Amount:</strong>
                                <span>{emis.installmentAmount}</span>
                            </div> */}

                            <div className='my-4'>
                                <strong className='px-2'> Remaining EMI Amount:</strong>
                                <span>{emis.remainingLoanAmount}</span>
                            </div>



                        </div>

                        <div className='col-xl-4 col-lg-4 col-sm-12 '>

                            <div className='my-4'>
                                <strong className='px-2'>Emi Start Date:</strong>

                                <span>{formatDateTime(emis.startDate)}</span>
                            </div>

                            <div className='my-4'>
                                <strong className='px-2'>Emi End Date</strong>
                                <span>{formatDateTime(emis.endDate)}</span>
                            </div>



                            <div className='my-4'>
                                <strong className='px-2'>Next Emi Date:</strong>
                                {/* <span>{formatDateTime(emis.nextEMIDate)}</span> */}
                                <span className='px-2'>{formatDateTime(emis.nextEMIDate)}</span>
                            </div>


                        </div>
                        <div className='my-4'>
                            <button className='btn-primary btn' onClick={showModel} disabled={btnDisabled}>PAY EMI</button>
                        </div>

                    </div>

                </div>

            </div>
            {showModal ? (<Modal show={true} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>PAY EMI</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to proceed with the EMI payment?</p>
                    <h5><span>₱ </span>{emis.totalInstallmentAmount}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-secondary' onClick={handleClose} disabled={btnDisabled}>Cancel</button>
                    <button className='btn btn-primary' onClick={handlePayEMI} disabled={btnDisabled}>Proceed to Pay</button>
                </Modal.Footer>
            </Modal>) : null}
        </div>

    );
}

export default EmiDetails;
