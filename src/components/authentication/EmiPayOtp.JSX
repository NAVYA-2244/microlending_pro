import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
import { Number_Input } from '../comman/All-Inputs';
import { useFunctionContext } from '../comman/FunctionsContext';
import { useMovieContext } from '../comman/Context';

function EmiPayOtp() {
    const { checkErrors } = useFunctionContext();
    const { emis, setEmis, userprofileData, setUserprofileData, userData, setUserData, setEmiHistory, setLoanList } = useMovieContext()
    const navigate = useNavigate();
    const location = useLocation();
    const { transaction_id, loan_id, instalmentNumber } = location.state || {};
    console.log(transaction_id, loan_id, instalmentNumber, "ids")
    const [formData, setFormData] = useState({
        otp: "",
        transaction_id: transaction_id || "",
        loan_id: loan_id || "",
        instalmentNumber: instalmentNumber || ""
    });

    const [errors, setErrors] = useState({});
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const schema = {
        otp: Joi.string().required().label("OTP").min(6).max(6),
        transaction_id: Joi.string().required().label("Transaction ID"),
        loan_id: Joi.string().required().label("Loan ID"),
        instalmentNumber: Joi.number().required().label("instalmentNumber"),
    };
    const fetchData = async () => {
        try {

            const response = await backEndCall("/users/user_profile");
            setUserprofileData(response);

            console.log(response, "profile");

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        }
    };


    useEffect(() => {
        if (!transaction_id || !loan_id) {
            navigate(-1);
        }
    }, [transaction_id, loan_id, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await checkErrors(schema, formData);
            setBtnDisabled(true);
            setLoading(true);

            // Send request to verify OTP
            const otpResponse = await backEndCallObj("/emi/p2ptransfer_verify_otp", formData);
            console.log(otpResponse, "otp");
            setUserprofileData(userprofileData);

            fetchData()

            setEmiHistory([]);

            setUserData(null)
            navigate('/emihistory')
            // Success Handling
            toast.success(otpResponse);
            setFormData({
                otp: "",
                transaction_id: transaction_id,
                loan_id: loan_id,
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
                console.log(ex.response.data, "error");

            }

            setBtnDisabled(false);
            setLoading(false);
        } finally {
            setBtnDisabled(false);
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center text-wraper">
                <div className="col-xl-6 col-lg-7 col-md-8 col-sm-10">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="card-title fs-16 mt-4">
                                <div className="text-center mb-4">
                                    <h5>Enter OTP for Withdrawal</h5>
                                    <p>Please enter the OTP sent to your registered mobile number.</p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="otp" className="form-label">
                                        OTP <span className="text-danger">*</span>
                                    </label>
                                    <Number_Input
                                        type="text"
                                        value={formData.otp}
                                        name="otp"
                                        placeholder="Enter Your OTP"
                                        maxLength={6}
                                        SetForm={setFormData}
                                        schema={schema.otp}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary py-2 mb-3 mt-4"
                                    style={{ height: "38px", width: "100px" }}
                                    disabled={btnDisabled}
                                >
                                    {btnDisabled ? "Submitting..." : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmiPayOtp;
