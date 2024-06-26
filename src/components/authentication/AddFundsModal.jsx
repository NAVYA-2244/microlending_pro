
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Joi from 'joi';
import { backEndCallObj } from '../../services/mainServiceFile';
import BankDetails from './BankDetails';

const AddFundsModal = ({ show, onHide, actionType }) => {
    const [formData, setFormData] = useState({
        accountNumber: "",
        amount: "",
        paymentMethod: "INSTAPAY"
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [copied, setCopied] = useState(false);

    const schema = {
        accountNumber: Joi.string().required().label("Account Number").min(2).max(12),
        amount: Joi.number().required().label("Amount").positive().min(2).max(9999999),
        paymentMethod: Joi.string().required().label("Payment Method")
    };

    const validateField = (name, value) => {
        const fieldSchema = Joi.object({ [name]: schema[name] });
        const { error } = fieldSchema.validate({ [name]: value });
        return error ? error.details[0].message : null;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error } = Joi.object(schema).validate(formData, { abortEarly: false });
        if (error) {
            setErrors(error.details.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {}));
            return;
        }
        setErrors({});
        setLoading(true);
        try {
            const response = await backEndCallObj("/admin/esjdhfj", formData);
            console.log('API Response:', response);
            onHide();
        } catch (error) {
            console.error('API Error:', error);
            // Handle API error
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        const errorMessage = validateField(name, value);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: errorMessage
        }));
    };

    const handleModalHide = () => {
        setFormData({
            accountNumber: "",
            amount: "",
            paymentMethod: "INSTAPAY"
        });
        setErrors({});
        onHide();
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText('876568749733')
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };


    return (
        <Modal show={show} onHide={handleModalHide} dialogClassName="modal-dialog">
            <Modal.Header closeButton>
                <Modal.Title>{actionType === 'add' ? 'Add Funds' : 'Withdraw Funds'}</Modal.Title>
            </Modal.Header>
            <div className="container py-3 px-4">
                <div className="row">
                    <div className="col-xl-12">
                        {actionType === 'add' &&


                            <div className="container py-3">
                                <div className="row">
                                    <div className='card text-center mb-1' style={{ maxWidth: '300px', margin: 'auto', padding: '10px', backgroundColor: "greenyellow" }}>
                                        <div>
                                            <div className="text-dark mb-2">
                                                <strong>Account Number</strong>
                                            </div>
                                            <div className="text-dark mb-3">
                                                876568749733
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={() => { handleCopyToClipboard() }}>
                                            {copied ? 'copied' : 'copy'}
                                        </button>

                                    </div>
                                    <div style={{ color: "green", marginLeft: "300px" }} className='mb-3'>{copied ? 'Text copied' : ''}</div>
                                    <div style={{ color: "red", marginLeft: "350px" }} className='mb-3'>*fee 15 ₱ </div>
                                    <div className='card'>
                                        <p>To withdraw funds, please enter the amount you wish to withdraw and select your preferred withdrawal method.</p>
                                        <p>Withdrawal methods available: Bank Transfer, PayPal, Cheque.</p>
                                        <p>Kindly ensure that the withdrawal details provided are correct to avoid any issues with the transaction.</p>
                                        <p>Once your withdrawal request is processed, it may take up to 3-5 business days for the funds to reflect in your account, depending on the withdrawal method selected.</p>
                                        <p>If you encounter any issues or have questions regarding the withdrawal process, please contact our support team for assistance.</p>
                                    </div>
                                </div>
                            </div>


                            // <form onSubmit={handleSubmit}>
                            //     <div className='text-center'>
                            //         <h5 className="card-title mt-3">State Bank of India</h5>
                            //         <img src="./assets/images/SBI-Logo.png" alt="SBI Logo" className="sbi-logo" height="40%" width="40%" />
                            //     </div>
                            //     <div className="mb-3">
                            //         <label htmlFor="accountNumber" className="form-label">Account Number</label>
                            //         <input
                            //             type="text"
                            //             name="accountNumber"
                            //             value={formData.accountNumber}
                            //             onChange={(e) => handleChange(e.target.name, e.target.value)}
                            //             className="form-control"
                            //         />
                            //         {errors.accountNumber && <div className="text-danger">{errors.accountNumber}</div>}
                            //     </div>
                            //     <div className="mb-3">
                            //         <label htmlFor="amount" className="form-label">Amount</label>
                            //         <input
                            //             type="number"
                            //             name="amount"
                            //             value={formData.amount}
                            //             onChange={(e) => handleChange(e.target.name, e.target.value)}
                            //             className="form-control"
                            //         />
                            //         {errors.amount && <div className="text-danger">{errors.amount}</div>}
                            //     </div>
                            //     <div className="mb-3">
                            //         <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                            //         <div className="mb-3">
                            //             <div className="form-check">
                            //                 <input
                            //                     type="radio"
                            //                     id="instapay"
                            //                     name="paymentMethod"
                            //                     value="INSTAPAY"
                            //                     checked={formData.paymentMethod === "INSTAPAY"}
                            //                     onChange={(e) => handleChange("paymentMethod", e.target.value)}
                            //                     className="form-check-input"
                            //                 />
                            //                 <label htmlFor="instapay" className="form-check-label">INSTAPAY</label>
                            //             </div>
                            //             <div className="form-check">
                            //                 <input
                            //                     type="radio"
                            //                     id="pesonet"
                            //                     name="paymentMethod"
                            //                     value="PESONET"
                            //                     checked={formData.paymentMethod === "PESONET"}
                            //                     onChange={(e) => handleChange("paymentMethod", e.target.value)}
                            //                     className="form-check-input"
                            //                 />
                            //                 <label htmlFor="pesonet" className="form-check-label">PESONET</label>
                            //             </div>
                            //             {errors.paymentMethod && <div className="text-danger">{errors.paymentMethod}</div>}
                            //         </div>
                            //     </div>
                            //     <button className='btn btn-primary' type="submit" disabled={loading}>
                            //         {loading ? 'Submitting...' : 'Submit'}
                            //     </button>
                            // </form>
                            // <BankDetails></BankDetails>

                        }
                    </div>
                </div>
            </div>
        </Modal>);
}

export default AddFundsModal;

