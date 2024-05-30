

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Collapse } from 'react-bootstrap';
import { backEndCall } from '../../services/mainServiceFile';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../comman/Context';
import authService from '../../services/authService';

function LoaneligibilityDetails() {
    const navigate = useNavigate();
    const { usereligibility, setUserEligibility, userprofileData } = useMovieContext();
    console.log(userprofileData, "hello")
    const [loading, setLoading] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    useEffect(() => {
        if (usereligibility <= 0 || !usereligibility) {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await backEndCall("/users/matching_eligibility");
            console.log(response, "response")
            setUserEligibility(response);
            setLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        }
    };

    const calculateEMI = (loanAmount, interestRate, tenureMonths) => {
        // const interestRatePerMonth = interestRate / 12 / 100;
        // const numerator = loanAmount * interestRatePerMonth * Math.pow(1 + interestRatePerMonth, tenureMonths);
        // const denominator = Math.pow(1 + interestRatePerMonth, tenureMonths) - 1;
        // const emi = numerator / denominator;
        const calculateEMI = (loanAmount * (interestRate / 100 * tenureMonths / 12) + loanAmount) / tenureMonths

        return calculateEMI.toFixed(2);
    };
    const handleApplyLoan = (minLoanAmount, maxLoanAmount, tenureItem) => {


        if (userprofileData?.kyc_status !== "verified") {

            // navigate('/updateprofile');
            navigate('/kyc');

        } else if (userprofileData?.kyc_status === "verified") {
            // navigate(`/applyloan?minAmount=${minLoanAmount}&maxAmount=${maxLoanAmount}`);
            navigate('/applyloan', { state: { minAmount: usereligibility.minLoanAmount, maxAmount: usereligibility.maxLoanAmount } });


        } else {
            toast.error("KYC status is not available. Please try again later.");
        }
    };

    const toggleDetails = () => {
        setOpenDetails((prevState) => !prevState);
    };

    return (
        <>
            <div className="user-details-container">
                <h5 className="mb-4">Eligibility Loans</h5>
                <div className='card'>
                    <div className='card-body'>
                        <div className="table-responsive">
                            <table className="table table-bordered mb-5">
                                <thead className='text-center'>
                                    <tr>
                                        <th>user credit score</th>
                                        {/* <th>Credit Score Range</th> */}

                                        <th>Min Loan Amount</th>
                                        <th>Max Loan Amount</th>
                                        <th>Tenure</th>
                                        <th>Interest</th>
                                        {/* <th>EMI</th> */}
                                        <th>Apply</th>
                                    </tr>
                                </thead>
                                <tbody className='align-middle text-center'>
                                    {loading ? (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                                                    <span className="sr-only"></span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td className='position-relative' >
                                                <div className='loan_eligibility'>
                                                    {/* <span className='text-success'>Your Credit Score : {userprofileData?.credit_score}</span> */}
                                                    <span> {userprofileData?.credit_score}</span>
                                                </div>
                                            </td>
                                            {/* <td className='position-relative' >
                                                <div className='loan_eligibility'>
                                                    <span>{usereligibility?.cibilScore}</span>
                                                </div>
                                            </td> */}

                                            <td> ₱ {usereligibility?.minLoanAmount}</td>
                                            <td> ₱ {usereligibility?.maxLoanAmount}</td>
                                            <td >
                                                <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
                                                    {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
                                                        <div key={tenureIndex} >
                                                            <td className='border-bottom'>{tenureItem?.months} months </td>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td >
                                                <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
                                                    {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
                                                        <td className='border-bottom' key={tenureIndex}>{tenureItem?.interest}%</td>
                                                    ))}
                                                </div>
                                            </td>
                                            {/* <td>
                                                <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
                                                    {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
                                                        <td className='border-bottom' key={tenureIndex}>
                                                            ₱ {calculateEMI(usereligibility?.maxLoanAmount, tenureItem?.interest, tenureItem?.months)}
                                                        </td>
                                                    ))}
                                                </div>
                                            </td> */}
                                            <td>
                                                {/* <div className="d-flex flex-column gap-1 justify-content-between align-items-center">
                                                    {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
                                                        <td key={tenureIndex}>
                                                            <Button onClick={() => handleApplyLoan(usereligibility.minLoanAmount, usereligibility.maxLoanAmount, tenureItem)}>Apply</Button>
                                                        </td>
                                                    ))}
                                                </div> */}
                                                <Button onClick={() => handleApplyLoan(usereligibility.minLoanAmount, usereligibility.maxLoanAmount)}>Apply</Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoaneligibilityDetails;
