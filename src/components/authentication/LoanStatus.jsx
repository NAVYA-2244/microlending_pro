// import React, { useEffect, useState } from 'react';
// import { toast } from "react-hot-toast";
// import { backEndCall } from '../../services/mainServiceFile';
// import EmiDetails from './EmiDetails';
// import { useNavigate } from 'react-router-dom';
// import { useMovieContext } from '../comman/Context';

// function LoanStatus() {
//     // const [loanList, setLoanList] = useState([]);
//     const { loanList, setLoanList } = useMovieContext()
//     const [btnDisabled, setBtnDisabled] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const fetchData = async () => {
//         console.log("jjjjjjjjjjjjj")
//         setBtnDisabled(true)
//         try {
//             if (!loanList) {
//                 setLoading(true)
//                 const response = await backEndCall("/users/user_loan_details");
//                 console.log(response, "lans details")
//                 setLoanList(response)
//                 setLoading(false);
//             }
//             else {
//                 setLoanList(loanList);
//             }
//             // console.log(response, "loan status");

//         } catch (ex) {
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response.data);
//                 navigate('/loaneligibilitydetails');
//                 setLoading(false);
//             }
//         }
//         finally {
//             setBtnDisabled(false)
//         }
//     };

//     useEffect(() => {
//         if (loanList <= 0 || !loanList) {
//             fetchData();
//         }
//     }, []);



//     return (
//         <>

//             <div className="user-details-container">
//                 <h5 className="mb-4">Loan Status</h5>
//                 <div>
//                     {loading ? (
//                         <div className="text-center mt-3">
//                             <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
//                                 <span className="sr-only"></span>
//                             </div>
//                         </div>
//                     ) : loanList?.length === 0 ? (
//                         <div className="text-center mt-3">
//                             <p>No data found.</p>
//                         </div>
//                     ) : (
//                         <div className="container">
//                             {loanList?.map((loan, index) => (
//                                 <div key={index} className="card shadow-sm mb-4">
//                                     <div className="card-body">

//                                         <div className='row'>
//                                             <div className="col-md-6 col-xl-6 col-sm-12">
//                                                 <div className="my-4">
//                                                     <img src={loan.photo} alt="User" style={{ width: '100px', height: '100px' }} />
//                                                 </div>

//                                                 <div className="my-4">
//                                                     <strong className="px-2">Name:</strong>
//                                                     <span>{loan.first_name} {loan.last_name}</span>
//                                                 </div>

//                                                 <div className="my-4">
//                                                     <strong className="px-2">Date oF Application:</strong>
//                                                     <span>{loan.date_of_applycation}</span>
//                                                 </div>

//                                                 <div className="my-4">
//                                                     <strong className="px-2">Passport Number:</strong>
//                                                     <span>{loan.passport_number}</span>
//                                                 </div>
//                                                 <div className="my-4">
//                                                     <strong className="px-2">Tin Number:</strong>
//                                                     <span>{loan.tin_number}</span>
//                                                 </div>

//                                                 <div className="my-4">
//                                                     <strong className="px-2">City:</strong>
//                                                     <span>{loan.city}</span>
//                                                 </div>

//                                                 <div className="my-4">
//                                                     <strong className="px-2">State:</strong>
//                                                     <span>{loan.state}</span>
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-6 col-xl-6 col-sm-12">
//                                                 <div className="my-4">
//                                                     <strong className="px-2">Current Address:</strong>
//                                                     <span>{loan.current_address}</span>
//                                                 </div>

//                                                 <div className="my-4">
//                                                     <strong className="px-2">Permanent Address:</strong>
//                                                     <span>{loan.permanent_address}</span>
//                                                 </div>

//                                                 <div className="my-4">
//                                                     <strong className="px-2">Loan Amount:</strong>
//                                                     <span>{loan.loan_amount}</span>
//                                                 </div>

//                                                 <div className="my-4">
//                                                     <strong className="px-2">Months:</strong>
//                                                     <span>{loan.months}</span>
//                                                 </div>
//                                                 <div className="my-4">
//                                                     <strong className="px-2">Loan Type:</strong>
//                                                     <span>{loan.loan_type}</span>
//                                                 </div>


//                                                 <div className="my-4">
//                                                     <strong className="px-2">Loan Status:</strong>
//                                                     <span>{loan.loan_status}</span>
//                                                 </div>


//                                                 {loan.loan_status == "Approved" &&
//                                                     <button
//                                                         className="btn btn-primary"
//                                                         onClick={() => navigate("/emaidetails", { state: { formId: loan.form_id } })}
//                                                     >
//                                                         Go to Emi Details
//                                                     </button>
//                                                 }

//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default LoanStatus;

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { backEndCall } from "../../services/mainServiceFile";
import EmiDetails from "./EmiDetails";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../comman/Context";
import moment from "moment";

function LoanStatus() {
  // const [loanList, setLoanList] = useState([]);
  const { loanList, setLoanList, userprofileData } = useMovieContext();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    console.log("jjjjjjjjjjjjj");
    setBtnDisabled(true);
    try {
      if (!loanList) {
        setLoading(true);
        const response = await backEndCall("/users/user_loan_details");
        console.log(response, "lans details");
        setLoanList(response);
        setLoading(false);
      } else {
        setLoanList(loanList);
      }
      // console.log(response, "loan status");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
        navigate("/loaneligibilitydetails");
        setLoading(false);
      }
    } finally {
      setBtnDisabled(false);
    }
  };

  useEffect(() => {
    if (loanList <= 0 || !loanList) {
      fetchData();
    }
    console.log(loanList);
  }, []);

  const formattedDate = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  };

  return (
    <>
      <div className="user-details-container">
        <h5 className="mb-4">Loan Status</h5>
        <>

          <>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="Loan_Status">
                      <div className="table-responsive">
                        <table className="table border table-bordered table-centered text-center">
                          <thead>
                            <tr>
                              <th scope="col">Customer</th>
                              <th scope="col">Applied Date</th>
                              <th scope="col">Passport NO</th>
                              <th scope="col">Tin No</th>
                              {/* <th scope="col">Address</th> */}
                              <th scope="col">Loan Amount</th>
                              <th scope="col">Months</th>
                              <th scope="col">Loan Type</th>
                              <th scope="col">Loan Status</th>
                              <th scope="col">Action</th>

                            </tr>
                          </thead>
                          <tbody>

                            {loanList?.map((loan, index) => (
                              <tr key={index}>
                                <td>
                                  <div className="d-flex">
                                    <img
                                      src={loan.photo}
                                      alt="User"
                                      className="object-fit-cover rounded-circle"
                                      style={{
                                        width: "45px",
                                        height: "45px",
                                      }}
                                    />
                                    <h6>{loan.name}</h6>
                                  </div>
                                </td>
                                <td>{formattedDate(loan.date_of_applycation)}</td>
                                <td>{userprofileData.passport_number}</td>
                                <td>{userprofileData.tin_number}</td>
                                {/* <td>
                                  <h6 className="mb-0 fw-light">
                                    {loan.current_address}
                                  </h6>
                                  <span className="text-muted fs-12 fw-semibold">
                                    {loan.permanent_address}
                                  </span>
                                </td> */}
                                <td className="text-primary">
                                  {loan.loan_amount}
                                </td>
                                <td>{loan.months}</td>
                                <td>{loan.loan_type}</td>
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

                                  </div>{" "}


                                </td>
                                <td> {loan.loan_status == "Approved" ? (
                                  <button
                                    className="btn btn-primary mt-2"
                                    onClick={() =>
                                      navigate("/emaidetails", {
                                        state: { formId: loan.form_id },
                                      })
                                    }
                                  >
                                    Go to Emi Details
                                  </button>
                                ) : (loan.loan_status)}



                                  {/* <div
                                    className={`loan_status ${loan.loan_status === "completed"
                                      ? "bg-success  fw-bold"

                                      : loan.loan_status === "Rejected"
                                        ? "bg-danger fw-bold"
                                        : loan.loan_status === "Approved"
                                          ? "bg-info fw-bold"
                                          : "bg-dark fw-bold"
                                      }`

                                    }
                                  >

                                  </div> */}


                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>
                      {loading && (
                        <div className="text-center mt-3">
                          <div
                            className="spinner-border spiner-border-sm"
                            style={{ color: "blue" }}
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        </div>
                      )}
                      {loanList?.length == 0 &&
                        <div className="text-center mt-3">
                          <p>No data found.</p>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </>

        </>
      </div>
    </>
  );
}

export default LoanStatus;

