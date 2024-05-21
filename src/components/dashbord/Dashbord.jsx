import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { backEndCall } from "../../services/mainServiceFile";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Recenttransections from "../authentication/Resenttransections";
import { useMovieContext } from "../comman/Context";
import { useFunctionContext } from "../comman/FunctionsContext";
import ApplyLoan from "../authentication/ApplyLoan";
import CreditScorePieChart from '../comman/CreditScorePieChart';

// import numeral from "numeral";
import Updateprofile from './../authentication/Updateprofile';
import TabComponent from "../authentication/forgot_password";
import AddFundsModal from "../authentication/AddFundsModal";


const Dashboard = () => {
  const { userData, setUserData, adminData, setAdminData, userprofileData, setUserprofileData } = useMovieContext();
  const [bkcall, setbkcall] = useState(false)
  const { usereligibility, setUserEligibility, } = useMovieContext()
  const [loading, setLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [actionType, setActionType] = useState('');

  const navigate = useNavigate();

  const handleApplyLoan = () => {

    navigate("/loaneligibilitydetails");
  };

  const fetchData = async () => {
    try {
      // if (userprofileData <= 0 || !userprofileData) {
      setbkcall(true)
      const response = await backEndCall("/users/user_profile");
      console.log(response, "userdateails")
      setUserprofileData(response);
      setbkcall(false)
      // }
      // else {
      //   setUserprofileData(userprofileData)
      // }

    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };


  const fetchAdminData = async () => {
    console.log("entered into admindata", adminData)

    try {

      // if (adminData <= 0 || !adminData) {
      const response = await backEndCall("/admin/admin_stats");
      console.log(response, "admindata")
      setAdminData(response);

      // }
      // else {
      //   setAdminData(adminData)
      // }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);

      }
    }
  };

  const fetchUserData = async () => {
    console.log("user")
    try {

      // if (userData <= 0 || !userData) {
      const response = await backEndCall("/users/user_stats");
      console.log(response, "userdeta")
      setUserData(response);

      // console.log(response, "total amount")
      // }
      // else {
      //   setUserData(userData)
      // }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);


      }
    }
  };

  useEffect(() => {

    if (userData <= 0 || !userData) {

      !authService.IsAdmin() &&
        fetchUserData()

    }

    if (adminData <= 0 || !adminData) {

      authService.IsAdmin() &&
        fetchAdminData()

    }
    if (userprofileData <= 0 || !userprofileData) {
      fetchData();
    }
  }, []);





  useEffect(() => {
    if (!authService.getCurrentUser()) {
      Navigate("/landing");
    }
  });



  const handlerefresh = async () => {
    console.log("reload");
    if (isFetching) return; // Prevent multiple calls if already fetching

    setIsFetching(true); // Set fetching state to true

    try {
      if (!authService.IsAdmin()) {

        setUserData(null);
        await fetchUserData();
      }

      if (authService.IsAdmin()) {

        setAdminData(null);
        await fetchAdminData();
      }
      // setUserprofileData(null)
      // await fetchData();

    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      setIsFetching(false); // Reset fetching state regardless of success or failure
    }
  };
  useEffect(() => {
    if (usereligibility <= 0 || !usereligibility) {
      fetchDatadashbord();
    }
  }, []);

  const fetchDatadashbord = async () => {

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


  const currentDate = new Date();


  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
  }

  const navigateuser = () => {
    navigate("/userlist")
  }
  const navigateloans = () => {
    navigate("/verifyloan")
  }

  const handleAddFundsClick = (type) => {
    setActionType(type);
    setShowAddFundsModal(true);
  };
  return (
    <>
      {/* <TabComponent></TabComponent> */}
      <div className="d-sm-flex d-block align-items-center justify-content-between mb-4">
        <div>
          <h4 className="mb-2 mb-sm-0">Dashboard  </h4>

        </div>




        <div style={{
          display: "flex",
          gap: "10px"
        }}

        >
          {!authService.IsAdmin() && (
            <div>




              <div className="btn  btn-warning text-dark fs-6"> User Credit Score: {userprofileData?.cibil_score}</div>

            </div>
          )}

          {!authService.IsAdmin() && (
            <button
              className="btn btn-primary text-capitalize apply-loan-buttton"

              onClick={handleApplyLoan}
              style={{ height: "38px" }}>
              Apply Loan
              {/* <i className="ri-building-2-fill fs-20 align-middle"></i> Browse Investments */}
            </button>)}

          {authService.IsAdmin() && (
            <button
              className="btn btn-primary text-capitalize"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-custom-className="custom-tooltip"
              data-bs-title="This top tooltip is themed via CSS variables."
            >
              <i className="ri-building-2-fill fs-20 align-middle"></i> Browse
              Investments
            </button>)}
        </div>
      </div >




      {!authService.IsAdmin() && (
        <>
          <div className="row">
            <div className="col-xl-8">
              <div className="card">

                <div className="card-header border-bottom-0 justify-content-between">
                  <div className="card-title">
                    Your Micro lending Portfolio{" "}
                    <i className="ri-information-fill fs-13 text-muted"></i>{" "}
                    <span className="text-muted fs-12 fw-medium">
                      {/* As on Feb 2024 */}
                      As on {month} {year}
                    </span>
                  </div>
                  <div onClick={handlerefresh} disabled={isFetching} className="cursor-pointer">
                    {isFetching ? (
                      <div className="spinner-border text-primary" role="status" style={{ height: "20px", width: "20px" }}>

                      </div>
                    ) : (
                      <i className="ri-loop-right-line text-primary fs-22 cursor-pointer me-2"></i>
                    )}
                  </div>
                </div>
                <div className="card-body">

                  <div className="row overflow-auto">
                    <div className="col-xl-3 col-12 col-sm-12 col-lg-3 col-md-3">
                      <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0 fs-12">
                            Total  Loans  Amount
                          </p>
                          <span className="dashboard-icons">
                            <i className="ri-luggage-deposit-line p-2 rounded-circle bg-white-light fs-24"></i>
                          </span>
                        </div>
                        <p className="mb-0 fw-semibold mt-3 fs-18">
                          <span>₱</span>  {userData?.loansTotalAmount || "0"}
                        </p>
                        <p className="text-muted mb-0 mt-3 fw-normal fs-14">
                          Limit{" "}
                          <span className="text-white fw-semibold">
                            <span>₱ </span>{userData?.userLimit || "0"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-12 col-lg-3 col-md-3 d-flex">
                      <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                        <div className="d-flex justify-content-between mt-2 align-items-center">
                          <p className="mb-0 fs-12">Active Loans Amount</p>
                          <span className="dashboard-icons">
                            <i className="ri-wallet-3-line p-2 rounded-circle bg-white-light fs-24"></i>
                          </span>
                        </div>
                        <p className="mb-0 fw-semibold mt-3 fs-18">
                          <span>₱ </span>{userData?.remainingLoanAmount || "0"}
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-12 col-lg-3 col-md-3 d-flex">
                      <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                        <div className="d-flex justify-content-between mt-2 align-items-center">
                          <p className="mb-0 fs-12">Completed Loans Amount</p>
                          <span className="dashboard-icons">
                            <i className="ri-database-2-line p-2 rounded-circle bg-white-light fs-24"></i>
                          </span>
                        </div>
                        <p className="mb-0 fw-semibold mt-3 fs-18">
                          <span>₱ </span>{userData?.paidAmount || "0"}
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-12 col-lg-3 col-md-3 d-flex">
                      <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                        <div className="d-flex justify-content-between mt-2 align-items-center">
                          <p className="mb-0 fs-12">Next Emi</p>
                          <span className="dashboard-icons">
                            <i className="ri-database-2-line p-2 rounded-circle bg-white-light fs-24"></i>
                          </span>
                        </div>
                        <p className="mb-0 fw-semibold mt-3 fs-18">

                          <span>₱ </span>{userData?.totalInstallmentAmount || "0"}

                        </p>
                        <p className="text-muted mb-0 mt-3 fw-normal fs-14">
                          {userData?.nextEMIDate ? "Date" : ""}   <span className="text-white fw-semibold">
                            {formatDate(userData?.nextEMIDate)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {loading ? (
                  <div className="text-center mt-3">
                    <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                      <span className="sr-only"></span>
                    </div>
                  </div>
                ) : ""} */}
              </div>
              <div className="row">
                <div className="col-xl-6">
                  <div className="card micro-balance">
                    <div className="card-header border-bottom-0 justify-content-between">
                      <div className="card-title">
                        Micro Wallet Balance{" "}
                        <i className="ri-information-fill fs-13"></i>
                      </div>
                      <Link to="/" className="text-white">
                        <i className="ri-arrow-right-s-line fs-22"></i>
                      </Link>
                    </div>
                    <div className="card-body">
                      <h4 className="fw-semibold mb-4">
                        <span>₱ </span>{userprofileData?.amount}
                      </h4>
                      {/* <div className="availabel-balance">
                        <span className="fs-12">Available Balance</span>
                        <p className="mb-0 fw-semibold mt-2 fs-16">
                          <span>₱ </span> {userprofileData?.amount}
                        </p>
                      </div> */}
                      <div className="d-grid mt-4 mb-3"
                      //  d-flex  justify-content-center"
                      >
                        <button type="button" className="btn btn-primary me-3 mb-3" onClick={() => handleAddFundsClick('add')}>
                          Add Funds
                        </button>


                        <button type="button" className="btn btn-primary me-3 mb-2" onClick={() => handleAddFundsClick('withdraw')}>
                          Withdraw Funds
                        </button>
                      </div>
                      {showAddFundsModal &&
                        <AddFundsModal show={showAddFundsModal} onHide={() => setShowAddFundsModal(false)} actionType={actionType} />}
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header pb-0 border-bottom-0 justify-content-between">
                      <p className=" fs-13 mb-0">
                        Extended Internal Rate of Return{" "}
                        <i className="ri-information-fill fs-13 text-muted"></i>
                      </p>
                      <Link to="/">
                        <i className="ri-loop-right-line text-primary fs-16"></i>
                      </Link>
                    </div>
                    <div className="card-body">
                      <span className="text-muted fs-11 fw-medium">
                        As on Feb 2024 - 10:00AM
                      </span>
                      <h2 className="mb-0 fw-semibold mt-3">&#8377; 0</h2>
                      <div className="d-flex justify-content-between mb-4">
                        <Link to="/" className="text-primary fs-11 mt-auto">
                          <i className="ri-mail-send-line"></i> Requet XIRR Report
                        </Link>
                        <div className="dashboard-icons">
                          <i className="ri-line-chart-line p-3 rounded-circle bg-primary-light fs-22"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-xl-6">

                  <div className="card">
                    <div className="card-header border-bottom-0 justify-content-between">
                      <div className="card-title">Months</div>
                      <Link to="/" className="text-primary">
                        <i className="ri-arrow-right-s-line fs-22"></i>
                      </Link>
                    </div>
                    <div className="card-body">


                      {usereligibility?.tenure ? (
                        <ul className="list-group list-unstled">
                          {usereligibility?.tenure && usereligibility?.tenure.map((tenureItem, tenureIndex) => (
                            <li key={tenureIndex} className="list-group-item mb-2 p-0">
                              <div className="p-3 card-item border rounded-2">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                  <div className="fs-16">
                                    <i className="ri-shield-check-line p-2 bg-success rounded-circle me-2"></i>
                                    <span>{tenureItem?.months} months</span>
                                  </div>
                                  <div className="dropdown">
                                    <span
                                      data-bs-auto-close="outside"
                                      role="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ri-more-2-line"></i>
                                    </span>
                                    <ul className="dropdown-menu">
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          Edit
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          View all
                                        </Link>
                                      </li>
                                      <li>
                                        <Link className="dropdown-item" href="#">
                                          Cancel
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="fs-14">
                                    <i className="ri-bar-chart-2-line text-success"></i>{" "}
                                    <span>{tenureItem?.interest}%</span>
                                  </div>
                                  <div className="fs-14">
                                    <i className="ri-calendar-check-line text-info"></i>{" "}
                                    <span>{tenureItem?.months} months</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (<div className="text-center">
                        <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">

                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>)}
                    </div>
                  </div>

                </div>

              </div>
            </div>
            <div className="col-xl-4">
              <div className="card ">
                <div className="card-header pb-0 border-bottom-0 justify-content-between">
                  {/* <div className="fs-15">
                    <i className="ri-discount-percent-fill"></i> Introducing{" "}
                    <Link to="/" className="text-warning fw-bold">
                      Per Annum
                    </Link>{" "}
                    by Micro Lending
                  </div> */}
                  {/* <Link to="/" className="text-white">
                    <i className="ri-arrow-right-s-line fs-22"></i>
                  </Link> */}
                  {/* <h5>Credit Score</h5> */}
                </div>
                <div className="card-body">
                  {/* <span className="mb-0">
                    Micro lending newly launched flagship investment platform. Now
                    with instant, no questions asked withdrawal options!
                    </span>
                    <div className="row mt-3">
                    <div className="col-4">
                    <div className="p-2 bg-white-light">
                    <span className="fs-11 fw-500">
                    <i className="ri-check-double-line text-success"></i> Earn
                    upto 23% p.a.
                    </span>
                    </div>
                    </div>
                    <div className="col-4">
                    <div className="p-2 bg-white-light">
                        <span className="fs-11 fw-500">
                          <i className="ri-check-double-line text-success"></i> No
                          investment fee
                        </span>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="p-2 bg-white-light">
                        <span className="fs-11 fw-500">
                          <i className="ri-check-double-line text-success"></i> Earn
                          daily interest
                          </span>
                      </div>
                    </div>
                  </div> */}



                  {bkcall ? (
                    <div className="text-center mt-3">
                      <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  ) : (
                    userprofileData?.kyc_status === "pending" ? (
                      <div className="text-center ">
                        <h6>KYC Not Updated Please Update</h6>
                        <button
                          className="btn btn-primary text-capitalize apply-loan-buttton"
                          onClick={() => navigate("/updateprofile")}
                          style={{ height: "38px" }}>
                          Kyc Update
                        </button>
                      </div>
                    ) : (
                      <CreditScorePieChart creditScores={userprofileData?.cibil_score} />
                    )
                  )}



                </div>
              </div>

              <div className="card">
                <div className="card-header pb-0 border-bottom-0 justify-content-between">
                  <div className="card-title">Refer and Earn</div>
                  <Link to="/" className="text-primary">
                    <i className="ri-arrow-right-s-line fs-22"></i>
                  </Link>
                </div>
                <div className="card-body">
                  <span className="fs-12 fw-500">
                    Earn more than ₹30,000 by referring your friends to Micro
                    lending
                  </span>
                  <div className="p-3 bg-light mt-3 mb-2">
                    <div className="input-group">
                      <span className="input-group-text">
                        <Link to="/" className="text-success">
                          <i className="ri-whatsapp-fill" title="whatsapp"></i>
                        </Link>
                      </span>
                      <span className="input-group-text" title="copied">
                        <Link to="/">
                          <i className="ri-file-copy-line"></i>
                        </Link>
                      </span>
                      <p className="mb-0 border flex-fill d-inline-flex mx-auto justify-content-center text-center align-items-center">
                        568G1E
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/"
                    className="text-primary fs-11 fw-500 text-decoration-underline"
                  >
                    T&C apply
                  </Link>
                </div>
              </div>
              <div className="card">
                <div className="card-header pb-0 border-bottom-0 justify-content-between">
                  <div className="card-title">Wealth Assistant</div>
                </div>
                <div className="card-body">
                  <div className="p-2 bg-light">
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/users/4.png"
                        width="50"
                        className="me-3"
                        alt="user"
                      />
                      <div className="flex-grow-1 lh-1">
                        <p className="mb-1 mt-2">{userData?.username}</p>
                        <Link to="/" className="text-default-color fs-14">
                          {userData?.phone_number}
                          <i className="ri-twitter-fill text-primary"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>


          </div >

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-sm-12 col-md-12">
              <div className="card ">
                <div className="card-body">
                  <Recenttransections />
                </div>
              </div>
            </div>
          </div>
        </>
      )
      }
      {
        authService.IsAdmin() && (<><div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-header border-bottom-0 justify-content-between">
                <div className="card-title">
                  Your Micro lending Portfolio{" "}
                  <i className="ri-information-fill fs-13 text-muted"></i>{" "}
                  <span className="text-muted fs-12 fw-medium">
                    {/* As on Feb 2024 */}
                    As on {month} {year}
                  </span>
                </div>

                <div onClick={handlerefresh} disabled={isFetching} className="cursor-pointer">
                  {isFetching ? (
                    <div className="spinner-border text-primary" role="status" style={{ height: "20px", width: "20px" }}>

                    </div>
                  ) : (
                    <i className="ri-loop-right-line text-primary fs-22 cursor-pointer me-2"></i>
                  )}
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* <div className="col-xl-3 col-12 col-sm-12 col-lg-3 col-md-3">
                    <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 fs-12">
                          Total Users
                        </p>
                        <span className="dashboard-icons">
                          <i className="ri-luggage-deposit-line p-2 rounded-circle bg-white-light fs-24"></i>
                        </span>
                      </div>
                      <p className="mb-0 fw-semibold mt-3 fs-18">
                        <span> </span>{adminData?.users_count || "0.00"}
                      </p>


                    </div>

                  </div> */}
                  <div className="col-xl-3 col-sm-12 col-lg-3 col-md-3 d-flex">
                    <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                      <div className="d-flex justify-content-between mt-2 align-items-center">
                        <p className="mb-0 fs-12">Total Users</p>
                        <span className="dashboard-icons">
                          <i className="ri-luggage-deposit-line p-2 rounded-circle bg-white-light fs-24"></i>
                        </span>
                      </div>

                      <p className="mb-0 fw-semibold mt-3 fs-18">
                        <span onClick={navigateuser}> {adminData?.users_count || "0"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-12 col-lg-3 col-md-3 d-flex">
                    <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                      <div className="d-flex justify-content-between mt-2 align-items-center">
                        <p className="mb-0 fs-12">Processing Loans</p>
                        <span className="dashboard-icons">
                          <i className="ri-wallet-3-line p-2 rounded-circle bg-white-light fs-24"></i>
                        </span>
                      </div>
                      <p className="mb-0 fw-semibold mt-3 fs-18">
                        <span onClick={navigateloans}>  {adminData?.countProcessingLoans || "0"}</span>
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-12 col-lg-3 col-md-3 d-flex">
                    <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                      <div className="d-flex justify-content-between mt-2 align-items-center">
                        <p className="mb-0 fs-12"> Rejected Loans</p>
                        <span className="dashboard-icons">
                          <i className="ri-database-2-line p-2 rounded-circle bg-white-light fs-24"></i>
                        </span>
                      </div>
                      <p className="mb-0 fw-semibold mt-3 fs-18">
                        <span onClick={navigateloans}>{adminData?.countRejectedLoans || "0"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="col-xl-3 col-sm-12 col-lg-3 col-md-3 d-flex">
                    <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                      <div className="d-flex justify-content-between mt-2 align-items-center">
                        <p className="mb-0 fs-12"> Approved Loans</p>
                        <span className="dashboard-icons">
                          <i className="ri-database-2-line p-2 rounded-circle bg-white-light fs-24"></i>
                        </span>
                      </div>
                      <p className="mb-0 fw-semibold mt-3 fs-18">
                        <span onClick={navigateloans}> </span> {adminData?.countApprovedLoans || "0"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-xl-6">
                <div className="card micro-balance">
                  <div className="card-header border-bottom-0 justify-content-between">
                    <div className="card-title">
                      Micro Wallet Balance{" "}
                      <i className="ri-information-fill fs-13"></i>
                    </div>
                    <Link to="/" className="text-white">
                      <i className="ri-arrow-right-s-line fs-22"></i>
                    </Link>
                  </div>
                  <div className="card-body">
                    <h4 className="fw-semibold mb-4">
                      <span>₱ </span> {userprofileData?.amount || "0"}
                    </h4>
                    {/* <div className="availabel-balance">
                      <span className="fs-12">Available Balance</span>
                      <p className="mb-0 fw-semibold mt-2 fs-16">
                        <span>₱ </span>{userprofileData?.amount || "0"}
                      </p>
                    </div> */}
                    <div className="d-grid mt-4">
                      <button type="button" className="btn btn-primary">
                        Add Funds
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header pb-0 border-bottom-0 justify-content-between">
                    <p className=" fs-13 mb-0">
                      Extended Internal Rate of Return{" "}
                      <i className="ri-information-fill fs-13 text-muted"></i>
                    </p>
                    <Link to="/">
                      <i className="ri-loop-right-line text-primary fs-16"></i>
                    </Link>
                  </div>
                  <div className="card-body">
                    <span className="text-muted fs-11 fw-medium">
                      As on Feb 2024 - 10:00AM
                    </span>
                    <h2 className="mb-0 fw-semibold mt-3">&#8377; 0</h2>
                    <div className="d-flex justify-content-between mb-4">
                      <Link to="/" className="text-primary fs-11 mt-auto">
                        <i className="ri-mail-send-line"></i> Requet XIRR Report
                      </Link>
                      <div className="dashboard-icons">
                        <i className="ri-line-chart-line p-3 rounded-circle bg-primary-light fs-22"></i>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-header border-bottom-0 justify-content-between">
                    <div className="card-title">Total Investments</div>
                    <Link to="/" className="text-primary">
                      <i className="ri-arrow-right-s-line fs-22"></i>
                    </Link>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-unstled">
                      <li className="list-group-item mb-2 p-0">
                        <div className="p-3 card-item border rounded-2">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="fs-16">
                              <i className="ri-shield-check-line p-2 bg-success rounded-circle me-2"></i>
                              <span>6 months</span>
                            </div>
                            <div className="dropdown">
                              <span
                                data-bs-auto-close="outside"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ri-more-2-line"></i>
                              </span>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    View all
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Cancel
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="fs-14">
                              <i className="ri-bar-chart-2-line text-success"></i>{" "}
                              <span>15%</span>
                            </div>
                            <div className="fs-14">
                              <i className="ri-calendar-check-line text-info"></i>{" "}
                              <span>6 months</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item mb-2 p-0">
                        <div className="p-3 card-item border rounded-2">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="fs-16">
                              <i className="ri-shield-check-line p-2 bg-success rounded-circle me-2"></i>
                              <span>12 months</span>
                            </div>
                            <div className="dropdown">
                              <span
                                data-bs-auto-close="outside"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ri-more-2-line"></i>
                              </span>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    View all
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Cancel
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="fs-14">
                              <i className="ri-bar-chart-2-line text-success"></i>{" "}
                              <span>11%</span>
                            </div>
                            <div className="fs-14">
                              <i className="ri-calendar-check-line text-info"></i>{" "}
                              <span>12 months</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item p-0">
                        <div className="p-3 card-item border rounded-2">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="fs-16">
                              <i className="ri-shield-check-line p-2 bg-success rounded-circle me-2"></i>
                              <span>24 months</span>
                            </div>
                            <div className="dropdown">
                              <span
                                data-bs-auto-close="outside"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ri-more-2-line"></i>
                              </span>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Edit
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    View all
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" href="#">
                                    Cancel
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="fs-14">
                              <i className="ri-bar-chart-2-line text-success"></i>{" "}
                              <span>05%</span>
                            </div>
                            <div className="fs-14">
                              <i className="ri-calendar-check-line text-info"></i>{" "}
                              <span>24 months</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>

                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="col-xl-4 ">
            <div className="card bg-secondary">
              <div className="card-header pb-0 border-bottom-0 justify-content-between">
                <div className="fs-15">
                  <i className="ri-discount-percent-fill"></i> Introducing{" "}
                  <Link to="/" className="text-warning fw-bold">
                    Per Annum
                  </Link>{" "}
                  by Micro Lending
                </div>
                <Link to="/" className="text-white">
                  <i className="ri-arrow-right-s-line fs-22"></i>
                </Link>
              </div>
              <div className="card-body">
                <span className="mb-0">
                  Micro lending newly launched flagship investment platform. Now
                  with instant, no questions asked withdrawal options!
                </span>
                <div className="row mt-3">
                  <div className="col-4">
                    <div className="p-2 bg-white-light">
                      <span className="fs-11 fw-500">
                        <i className="ri-check-double-line text-success"></i> Earn
                        upto 23% p.a.
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 bg-white-light">
                      <span className="fs-11 fw-500">
                        <i className="ri-check-double-line text-success"></i> No
                        investment fee
                      </span>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 bg-white-light">
                      <span className="fs-11 fw-500">
                        <i className="ri-check-double-line text-success"></i> Earn
                        daily interest
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header pb-0 border-bottom-0 justify-content-between">
                <div className="card-title">Refer and Earn</div>
                <Link to="/" className="text-primary">
                  <i className="ri-arrow-right-s-line fs-22"></i>
                </Link>
              </div>
              <div className="card-body">
                <span className="fs-12 fw-500">
                  Earn more than ₹30,000 by referring your friends to Micro
                  lending
                </span>
                <div className="p-3 bg-light mt-3 mb-2">
                  <div className="input-group">
                    <span className="input-group-text">
                      <Link to="/" className="text-success">
                        <i className="ri-whatsapp-fill" title="whatsapp"></i>
                      </Link>
                    </span>
                    <span className="input-group-text" title="copied">
                      <Link to="/">
                        <i className="ri-file-copy-line"></i>
                      </Link>
                    </span>
                    <p className="mb-0 border flex-fill d-inline-flex mx-auto justify-content-center text-center align-items-center">
                      568G1E
                    </p>
                  </div>
                </div>
                <Link
                  to="/"
                  className="text-primary fs-11 fw-500 text-decoration-underline"
                >
                  T&C apply
                </Link>
              </div>
            </div>
            <div className="card">
              <div className="card-header pb-0 border-bottom-0 justify-content-between">
                <div className="card-title">Wealth Assistant</div>
              </div>
              <div className="card-body">
                <div className="p-2 bg-light">
                  <div className="d-flex align-items-center">
                    <img
                      src="assets/images/users/4.png"
                      width="50"
                      className="me-3"
                      alt="user"
                    />
                    <div className="flex-grow-1 lh-1">
                      <p className="mb-1 mt-2">{userData?.username}</p>
                      <Link to="/" className="text-default-color fs-14">
                        {userData?.phone_number}
                        <i className="ri-twitter-fill text-primary"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>


          <div className="row">
            <div className="col-xl-12 col-xl-12 col-lg-12 col-sm-12 col-md-12">
              <div className="card ">
                <div className="card-body">
                  <Recenttransections />
                </div>
              </div>
            </div>
          </div>
        </>
        )
      }
    </>
  );
};

export default Dashboard;
