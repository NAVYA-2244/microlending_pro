import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Number_Input, Radio_input, Select_input } from '../comman/All-Inputs';
import Joi from 'joi';

const AddFundsModal = ({ show, onHide, actionType }) => {

    const [formData, setFormData] = useState({
        Acount_Number: "",
        Amount: "",
        paymentMethod: ""
    });

    const schema = {
        Acount_Number: Joi.string().required().label("Acount_Number").min(2).max(50),
        Amount: Joi.string().required().label("Amount"),
        paymentMethod: Joi.string().required().label("Amount")
    };


    const handleSubmit = () => {

    }
    return (

        <Modal show={show} onHide={onHide} dialogClassName="modal-dialog ">
            {/* <Modal.Header closeButton>
                <Modal.Title>Add Funds</Modal.Title>
            </Modal.Header> */}
            <div className="container py-3">
                {/* <h5 className="mb-4">Add Funds</h5> */}
                <div className="row ">

                    <div className="col-xl-12">
                        {actionType === 'add' ? (
                            <div className='card '>

                                <div className='text-center'>
                                    <h5 className="card-title mt-3">State Bank of India</h5>
                                    <img src="./assets/images/SBI-Logo.png" alt="SBI Logo" className="sbi-logo" height="40%" width="40%" />
                                    {/* <img src="./assets/images/dark-logo.png" alt="SBI Logo" className="sbi-logo" height="40%" width="40%" /> */}
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={handleSubmit} className="addAdmin_form">
                                        <div className="mb-3">
                                            <label htmlFor="Acount_number" className="form-label ">Acount Number</label>
                                            <div className="position-relative applyloan">

                                                <Number_Input
                                                    type="number"
                                                    name="Acount_Number"
                                                    placeholder="Enter Acount Number "
                                                    maxLength={12}

                                                    value={formData["Acount_Number"]}


                                                    SetForm={setFormData}
                                                    schema={schema["Acount_Number"]}

                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="Amount" className="form-label ">Amount</label>
                                            <div className="position-relative applyloan">

                                                <Number_Input
                                                    type="number"
                                                    name="Amount"
                                                    placeholder="Enter Amount "
                                                    maxLength={12}

                                                    value={formData["Amount"]}


                                                    SetForm={setFormData}
                                                    schema={schema["Amount"]}

                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="paymentMethod" className="form-label ">payment Method</label>
                                            <div className="position-relative applyloan">

                                                <Radio_input
                                                    name="paymentMethod"
                                                    options={[
                                                        { value: "creditCard", label: "Credit Card" },
                                                        { value: "debitCard", label: "Debit Card" },
                                                        { value: "bankTransfer", label: "Bank Transfer" }
                                                    ]}
                                                    value={formData.paymentMethod}
                                                    SetForm={setFormData}
                                                    schema={schema.paymentMethod}
                                                />
                                            </div>
                                        </div>
                                        <Button variant="primary" type="submit" >Send</Button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="container py-3">
                                {/* <h5 className="mb-4">Add Funds</h5> */}
                                <div className="row">
                                    <h5 className='text-center mb-3'>Withdra Funds</h5>


                                    <div className='card '>

                                        <p>To withdraw funds, please enter the amount you wish to withdraw and select your preferred withdrawal method.</p>
                                        <p>Withdrawal methods available: Bank Transfer, PayPal, Cheque.</p>
                                        <p>Kindly ensure that the withdrawal details provided are correct to avoid any issues with the transaction.</p>
                                        <p>Once your withdrawal request is processed, it may take up to 3-5 business days for the funds to reflect in your account, depending on the withdrawal method selected.</p>
                                        <p>If you encounter any issues or have questions regarding the withdrawal process, please contact our support team for assistance.</p>
                                    </div>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AddFundsModal;
