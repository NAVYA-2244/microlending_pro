

// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { Button, Collapse } from 'react-bootstrap';
// import { backEndCall } from '../../services/mainServiceFile';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import { useMovieContext } from '../comman/Context';
// import authService from '../../services/authService';

// function LoaneligibilityDetails() {
//     const navigate = useNavigate();
//     const { usereligibility, setUserEligibility, userprofileData } = useMovieContext();
//     // console.log(userprofileData, "hello")
//     const [loading, setLoading] = useState(false);
//     const [openDetails, setOpenDetails] = useState(false);

//     useEffect(() => {
//         if (usereligibility <= 0 || !usereligibility) {
//             fetchData();
//         }
//     }, []);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const response = await backEndCall("/users/matching_eligibility");
//             console.log(response, "responsedata")
//             setUserEligibility(response);
//             setLoading(false);
//         } catch (ex) {
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response.data);
//             }
//         }
//     };

//     const calculateEMI = (loanAmount, interestRate, tenureMonths) => {
//         // const interestRatePerMonth = interestRate / 12 / 100;
//         // const numerator = loanAmount * interestRatePerMonth * Math.pow(1 + interestRatePerMonth, tenureMonths);
//         // const denominator = Math.pow(1 + interestRatePerMonth, tenureMonths) - 1;
//         // const emi = numerator / denominator;
//         const calculateEMI = (loanAmount * (interestRate / 100 * tenureMonths / 12) + loanAmount) / tenureMonths

//         return calculateEMI.toFixed(2);
//     };
//     const handleApplyLoan = (minLoanAmount, maxLoanAmount, tenureItem) => {
//         // The code inside these curly braces does nothing, it's empty
//         {

//         };


//         if (userprofileData?.topwallet_user_id == "0") {
//             navigate("/updateprofile");

//         } else if (userprofileData?.topwallet_user_id !== "0" && userprofileData?.kyc_status !== "verified") {
//             navigate("/kyc");
//         } else {
//             navigate('/applyloan', {
//                 state: {
//                     minAmount: usereligibility.minLoanAmount,
//                     maxAmount: usereligibility.maxLoanAmount
//                 }
//             });
//         }

//     };


//     const toggleDetails = () => {
//         setOpenDetails((prevState) => !prevState);
//     };

//     return (
//         <>
//             <div className="user-details-container">
//                 <h5 className="mb-4">Eligibility Loans</h5>
//                 <div className='card'>
//                     <div className='card-body'>
//                         <div className="table-responsive">
//                             <table className="table table-bordered mb-5">
//                                 <thead className='text-center'>
//                                     <tr>
//                                         <th>user credit score</th>
//                                         {/* <th>Credit Score Range</th> */}

//                                         <th>Min Loan Amount</th>
//                                         <th>Max Loan Amount</th>
//                                         <th>Tenure</th>
//                                         <th>Interest</th>
//                                         {/* <th>EMI</th> */}
//                                         <th>Apply</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className='align-middle text-center'>
//                                     {loading ? (
//                                         <tr>
//                                             <td colSpan="7" className="text-center">
//                                                 <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
//                                                     <span className="sr-only"></span>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ) : (
//                                         <tr>
//                                             <td className='position-relative' >
//                                                 <div className='loan_eligibility'>

//                                                     <span> {userprofileData?.credit_score}</span>
//                                                 </div>
//                                             </td>


//                                             {/* <td> ₱ {usereligibility?.minLoanAmount}</td>
//                                             <td> ₱ {usereligibility?.maxLoanAmount}</td>
//                                             <td >
//                                                 <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
//                                                     {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
//                                                         <div key={tenureIndex} >
//                                                             <td className='border-bottom'>{tenureItem?.months} months </td>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </td>
//                                             <td >
//                                                 <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
//                                                     {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
//                                                         <td className='border-bottom' key={tenureIndex}>{tenureItem?.interest}%</td>
//                                                     ))}
//                                                 </div>
//                                             </td> */}
//                                             {responsedata?.map((dataItem, dataIndex) => (
//                                                 <tr key={dataIndex}>
//                                                     <td>{dataItem.cibilScore}</td>
//                                                     <td>₱ {dataItem.minLoanAmount}</td>
//                                                     <td>₱ {dataItem.maxLoanAmount}</td>
//                                                     <td>
//                                                         <table>
//                                                             <tbody>
//                                                                 {dataItem.tenure?.map((tenureItem, tenureIndex) => (
//                                                                     <tr key={tenureIndex}>
//                                                                         <td className='border-bottom'>{tenureItem?.months} months</td>
//                                                                     </tr>
//                                                                 ))}
//                                                                 <td>

//                                                                     <Button onClick={() => handleApplyLoan(usereligibility.minLoanAmount, usereligibility.maxLoanAmount)}>Apply</Button>
//                                                                 </td>
//                                                             </tr>
//                                     )}
//                                                         </tbody>
//                                                     </table>
//                                                 </div>
//                     </div>
//                 </div>
//                         </div>
//                     </>
//                     );
// }

//                     export default LoaneligibilityDetails;
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import { backEndCall } from '../../services/mainServiceFile';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../comman/Context';

function LoaneligibilityDetails() {
    const navigate = useNavigate();
    const { usereligibility, setUserEligibility, userprofileData } = useMovieContext();
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
            console.log(response, "responsedata")
            setUserEligibility(response);
            setLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        }
    };

    const calculateEMI = (loanAmount, interestRate, tenureMonths) => {
        const calculateEMI = (loanAmount * (interestRate / 100 * tenureMonths / 12) + loanAmount) / tenureMonths;
        return calculateEMI.toFixed(2);
    };

    const handleApplyLoan = (minLoanAmount, maxLoanAmount, tenureItem) => {
        if (userprofileData?.topwallet_user_id == "0") {
            navigate("/updateprofile");
        } else if (userprofileData?.topwallet_user_id !== "0" && userprofileData?.kyc_status !== "verified") {
            navigate("/kyc");
        } else {
            navigate('/applyloan', {
                state: {
                    minAmount: minLoanAmount,
                    maxAmount: maxLoanAmount
                }
            });
        }
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
                                        <th>Apply</th>
                                    </tr>
                                </thead>
                                <tbody className='align-middle text-center'>
                                    {
                                        usereligibility?.map((dataItem, dataIndex) => (
                                            <tr key={dataIndex}>
                                                <td>{dataItem.cibilScore}</td>
                                                <td>₱ {dataItem.minLoanAmount}</td>
                                                <td>₱ {dataItem.maxLoanAmount}</td>
                                                <td>
                                                    <table className="table table-borderless mb-0">
                                                        <tbody>
                                                            {dataItem.tenure?.map((tenureItem, tenureIndex) => (
                                                                <tr key={tenureIndex}>
                                                                    <td className='border-bottom'>{tenureItem?.months} months</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>
                                                    <table className="table table-borderless mb-0">
                                                        <tbody>
                                                            {dataItem.tenure?.map((tenureItem, tenureIndex) => (
                                                                <tr key={tenureIndex}>
                                                                    <td className='border-bottom'>{tenureItem?.interest}%</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                                <td>

                                                    <Button onClick={() => handleApplyLoan(usereligibility.minLoanAmount, usereligibility.maxLoanAmount)}>Apply</Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
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

