

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Collapse } from 'react-bootstrap';
import { backEndCall } from '../../services/mainServiceFile';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../comman/Context';

function LoaneligibilityDetails() {
    const Navigate = useNavigate();
    // const [eligibility, setEligibility] = useState({});

    const { usereligibility, setUserEligibility, } = useMovieContext()
    const [loading, setLoading] = useState(false)
    const [openDetails, setOpenDetails] = useState(false); // Since it's an object, there's no need for an array to track open details
    // const[btnDisabled,setBtnDisabled]=useState(false)
    useEffect(() => {
        if (usereligibility <= 0 || !usereligibility) {
            fetchData();
        }
    }, []);

    const fetchData = async () => {

        try {
            setLoading(true)
            const response = await backEndCall("/users/matching_eligibility");

            setUserEligibility(response);
            setLoading(false)
        }

        catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);

            }

        }
    };

    const calculateEMI = (loanAmount, interestRate, tenureMonths) => {
        const interestRatePerMonth = interestRate / 12 / 100;
        const numerator = loanAmount * interestRatePerMonth * Math.pow(1 + interestRatePerMonth, tenureMonths);
        const denominator = Math.pow(1 + interestRatePerMonth, tenureMonths) - 1;
        const emi = numerator / denominator;
        return emi.toFixed(2);
    };


    const handleApplyLoan = (tenureItem) => {
        console.log("Apply Loan for", tenureItem.months, "months at", tenureItem.interest, "% interest");
        console.log(usereligibility.kyc_status, "user limt");
        if (usereligibility.kyc_status !== "Verified") {
            Navigate('/updateprofile');
        } else if (usereligibility.kyc_status === "Verified") {
            Navigate('/applyloan ');
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
                                        <th>Credit Score</th>
                                        <th>Min Loan Amount</th>
                                        <th>Max Loan Amount</th>

                                        <th>Tenure</th>
                                        <th>Interest</th>
                                        <th>EMI</th>
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
                                                    {/* <img src='' alt="logo" /> */}
                                                    <span>{usereligibility?.cibilScore}</span>
                                                </div>
                                                {/* <div className='more_details'>
                                                <span
                                                    onClick={toggleDetails}
                                                    aria-controls={`details`}
                                                    aria-expanded={openDetails}
                                                >
                                                    Details
                                                </span>
                                            </div> */}
                                            </td>
                                            <td>{usereligibility?.minLoanAmount}</td>
                                            <td>{usereligibility?.maxLoanAmount}</td>


                                            <td >
                                                <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
                                                    {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
                                                        <div key={tenureIndex} >
                                                            <td className='border-bottom'>{tenureItem?.months} months at {tenureItem?.interest}% interest</td>
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
                                            <td>
                                                <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
                                                    {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
                                                        <td className='border-bottom' key={tenureIndex}>
                                                            {calculateEMI(usereligibility?.maxLoanAmount, tenureItem?.interest, tenureItem?.months)}
                                                        </td>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column gap-1 justify-content-between align-items-center">
                                                    {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
                                                        <td key={tenureIndex}>
                                                            <Button onClick={() => handleApplyLoan(tenureItem)}>Apply</Button>
                                                        </td>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>)}
                                    {/* <tr>
                                        <Collapse in={openDetails}>
                                            <div id={`details`} className="collapse">
                                                <p>Details for this eligibility item</p>
                                            </div>
                                        </Collapse>
                                    </tr> */}
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
