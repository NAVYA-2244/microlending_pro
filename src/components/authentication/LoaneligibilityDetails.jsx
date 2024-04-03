
// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { Modal, Button } from 'react-bootstrap';
// import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';

// function LoaneligibilityDetails() {
//     const [eligibility, setEligibility] = useState([]);



//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await backEndCall("/admin/get_admin_contrls");
//             console.log(response, "get response");
//             setEligibility(response?.eligibility || []);
//         } catch (error) {
//             console.error("Error fetching admin controls:", error);
//             toast.error("Failed to fetch admin controls. Please try again later.");
//         }
//     };

//     const calculateEMI = (loanAmount, interestRate, tenureMonths) => {
//         const interestRatePerMonth = interestRate / 12 / 100;
//         const numerator = loanAmount * interestRatePerMonth * Math.pow(1 + interestRatePerMonth, tenureMonths);
//         const denominator = Math.pow(1 + interestRatePerMonth, tenureMonths) - 1;
//         const emi = numerator / denominator;
//         return emi.toFixed(2);
//     };

//     const handleApplyLoan = (tenureItem) => {
//         console.log("Apply Loan for", tenureItem.months, "months at", tenureItem.interest, "% interest");
//     };

//     return (
//         <>
//             {eligibility && eligibility.length > 0 ? (
//                 eligibility.map((eligibilityItem, index) => (
//                     <table className="table table-bordered mb-5">
//                         <thead>
//                             <tr className="align-middle">
//                             <th className="align-middle">Bank Details</th>
//                                 <th className="align-middle">Max Loan Amount</th>
//                                 <th className="align-middle">Tenure</th>
//                                 <th className="align-middle">Interest</th>
//                                 <th className="align-middle">EMI</th>
//                                 <th className="align-middle">Apply</th>
//                             </tr>
//                         </thead>
//                         <tbody >
//                             <tr key={index} className="align-middle">
//                                 <td className='position-relative'>
//                                     <div className='loan_eligibility'>
//                                         <img src='' />
//                                         <span>jgaisugf</span>
//                                     </div>

//                                     <div className='more_details'>details</div>
//                                 </td>
//                                 <td> {eligibilityItem.maxLoanAmount}</td>
//                                 <td>
//                                     <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
//                                         {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
//                                             <div key={tenureIndex}>{tenureItem.months} months at</div>
//                                         ))}

//                                     </div>
//                                 </td>
//                                 <td>
//                                     <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
//                                         {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
//                                             <div key={tenureIndex}>{tenureItem.interest}%</div>
//                                         ))}
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
//                                         {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
//                                             <div key={tenureIndex}>
//                                                 {calculateEMI(eligibilityItem.maxLoanAmount, tenureItem.interest, tenureItem.months)}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </td>
//                                 <td>
//                                     <div className="d-flex flex-column gap-1 justify-content-between align-items-center">
//                                         {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
//                                             <div key={tenureIndex}>
//                                                 <Button onClick={() => handleApplyLoan(tenureItem)}>Apply</Button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 ))
//             ) : (
//                 <p>No eligibility data available</p>
//             )}
//         </>
//     );
// }

// export default LoaneligibilityDetails;
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Collapse } from 'react-bootstrap';
import { backEndCall } from '../../services/mainServiceFile';
import { Navigate, useNavigate } from 'react-router-dom';

function LoaneligibilityDetails() {
    const Navigate = useNavigate()
    const [eligibility, setEligibility] = useState([]);
    const [openDetails, setOpenDetails] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await backEndCall("/admin/get_admin_contrls");
            console.log(response, "get response");
            setEligibility(response?.eligibility || []);
            setOpenDetails(new Array(response?.eligibility.length).fill(false)); // Initialize openDetails array
        } catch (error) {
            console.error("Error fetching admin controls:", error);
            toast.error("Failed to fetch admin controls. Please try again later.");
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
        Navigate('/aplyloanLogin')
    };

    const toggleDetails = (index) => {
        setOpenDetails((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <>
            <div className='table-responsive'>
                {eligibility && eligibility.length > 0 ? (
                    eligibility.map((eligibilityItem, index) => (
                        <div >
                            <table key={index} className="table table-bordered mb-5">
                                <thead>
                                    <tr className="align-middle">
                                        <th className="align-middle">Bank Details</th>
                                        <th className="align-middle">Max Loan Amount</th>
                                        <th className="align-middle">Tenure</th>
                                        <th className="align-middle">Interest</th>
                                        <th className="align-middle">EMI</th>
                                        <th className="align-middle">Apply</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="align-middle">
                                        <td className='position-relative'>
                                            <div className='loan_eligibility'>
                                                <img src='' alt="logo" />
                                                <span>jgaisugf</span>
                                            </div>
                                            <div className='more_details'>
                                                <span

                                                    onClick={() => toggleDetails(index)}
                                                    aria-controls={`details-${index}`}
                                                    aria-expanded={openDetails[index]}
                                                >
                                                    Details
                                                </span>
                                            </div>
                                        </td>
                                        <td>{eligibilityItem.maxLoanAmount}</td>
                                        <td>
                                            <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
                                                {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
                                                    <div key={tenureIndex}>{tenureItem.months} months at</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
                                                {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
                                                    <div key={tenureIndex}>{tenureItem.interest}%</div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column gap-3 justify-content-between align-items-center">
                                                {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
                                                    <div key={tenureIndex}>
                                                        {calculateEMI(eligibilityItem.maxLoanAmount, tenureItem.interest, tenureItem.months)}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex flex-column gap-1 justify-content-between align-items-center">
                                                {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
                                                    <div key={tenureIndex}>
                                                        <Button onClick={() => handleApplyLoan(tenureItem)}>Apply</Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        {/* <td colSpan="6"> */}
                                        <Collapse in={openDetails[index]}>
                                            <div id={`details-${index}`} className="collapse">
                                                {/* Your detailed content goes here */}
                                                {/* For example: */}
                                                <p>Details for this eligibility item</p>
                                            </div>
                                        </Collapse>
                                        {/* </td> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <p>No eligibility data available</p>
                )}
            </div>
        </>
    );
}

export default LoaneligibilityDetails;
