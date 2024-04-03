import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { backEndCall } from "../../services/mainServiceFile";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const Navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authService.getCurrentUser()) {
      Navigate("/landing");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await backEndCall("/users/user_profile");
        setUserData(response);
        // setLoading(false);
        console.log(response, "profiledata");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // setLoading(false);
      }
    };

    // const delayFetch = setTimeout(fetchData, 1000);
    // return () => clearTimeout(delayFetch);
    fetchData();
  }, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  //   if (!userData) {
  //     return <div>Error fetching user profile. Please try again.</div>;
  //   }
  return (
    <>
      <div className="d-sm-flex d-block align-items-center justify-content-between mb-4">
        <div>
          <h4 className="mb-2 mb-sm-0">Dashboard</h4>

        </div>

        <div>
          <button
            className="btn btn-primary text-capitalize"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="This top tooltip is themed via CSS variables."
          >
            <i className="ri-building-2-fill fs-20 align-middle"></i> Browse
            Investments
          </button>
        </div>
      </div>
      {!authService.IsAdmin() && (
        <div className="row">
          <div className="col-xl-8">
            <div className="card">
              <div className="card-header border-bottom-0 justify-content-between">
                <div className="card-title">
                  Your Micro lending Portfolio{" "}
                  <i className="ri-information-fill fs-13 text-muted"></i>{" "}
                  <span className="text-muted fs-12 fw-medium">
                    As on Feb 2024
                  </span>
                </div>
                <Link to="/dashboard">
                  <i className="ri-loop-right-line text-primary fs-22"></i>
                </Link>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-4 col-12 col-sm-12 col-lg-4 col-md-4">
                    <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-0 fs-12">
                          Total Founds <br /> Deposited
                        </p>
                        <span className="dashboard-icons">
                          <i className="ri-luggage-deposit-line p-2 rounded-circle bg-white-light fs-24"></i>
                        </span>
                      </div>
                      <p className="mb-0 fw-semibold mt-3 fs-18">
                        <span>₱ </span> 0
                      </p>
                      <p className="text-muted mb-0 mt-3 fw-normal fs-14">
                        Withdrawn{" "}
                        <span className="text-white fw-semibold">
                          <span>₱ </span> 0
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-12 col-lg-4 col-md-4 d-flex">
                    <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                      <div className="d-flex justify-content-between mt-2 align-items-center">
                        <p className="mb-0 fs-12">Intrest Earned</p>
                        <span className="dashboard-icons">
                          <i className="ri-wallet-3-line p-2 rounded-circle bg-white-light fs-24"></i>
                        </span>
                      </div>
                      <p className="mb-0 fw-semibold mt-3 fs-18">
                        <span>₱ </span> 0
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 col-sm-12 col-lg-4 col-md-4 d-flex">
                    <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                      <div className="d-flex justify-content-between mt-2 align-items-center">
                        <p className="mb-0 fs-12">Net Asset Value</p>
                        <span className="dashboard-icons">
                          <i className="ri-database-2-line p-2 rounded-circle bg-white-light fs-24"></i>
                        </span>
                      </div>
                      <p className="mb-0 fw-semibold mt-3 fs-18">
                        <span>₱ </span> 0
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
                      <span>₱ </span> 0
                    </h4>
                    <div className="availabel-balance">
                      <span className="fs-12">Availabl Balance</span>
                      <p className="mb-0 fw-semibold mt-2 fs-16">
                        <span>₱ </span> {userData?.amount}
                      </p>
                    </div>
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
          <div className="col-xl-4">
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
                    {/* <input type="text" className="form-control bg-white" placeholder='5874R2' aria-label="Dollar amount (with dot and two decimal places)" /> */}
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
      )}
      {authService.IsAdmin() && (<p><div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-header border-bottom-0 justify-content-between">
              <div className="card-title">
                Your Micro lending Portfolio{" "}
                <i className="ri-information-fill fs-13 text-muted"></i>{" "}
                <span className="text-muted fs-12 fw-medium">
                  As on Feb 2024
                </span>
              </div>
              <Link to="/">
                <i className="ri-loop-right-line text-primary fs-22"></i>
              </Link>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-4 col-12 col-sm-12 col-lg-4 col-md-4">
                  <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0 fs-12">
                        Total Founds <br /> Deposited
                      </p>
                      <span className="dashboard-icons">
                        <i className="ri-luggage-deposit-line p-2 rounded-circle bg-white-light fs-24"></i>
                      </span>
                    </div>
                    <p className="mb-0 fw-semibold mt-3 fs-18">
                      <span>₱ </span> 0
                    </p>
                    <p className="text-muted mb-0 mt-3 fw-normal fs-14">
                      Withdrawn{" "}
                      <span className="text-white fw-semibold">
                        <span>₱ </span> 0
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-12 col-lg-4 col-md-4 d-flex">
                  <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                    <div className="d-flex justify-content-between mt-2 align-items-center">
                      <p className="mb-0 fs-12">Intrest Earned</p>
                      <span className="dashboard-icons">
                        <i className="ri-wallet-3-line p-2 rounded-circle bg-white-light fs-24"></i>
                      </span>
                    </div>
                    <p className="mb-0 fw-semibold mt-3 fs-18">
                      <span>₱ </span> 0
                    </p>
                  </div>
                </div>
                <div className="col-xl-4 col-sm-12 col-lg-4 col-md-4 d-flex">
                  <div className="bg-primary text-white mb-3 mb-md-0 p-3 rounded-2 flex-fill">
                    <div className="d-flex justify-content-between mt-2 align-items-center">
                      <p className="mb-0 fs-12">Net Asset Value</p>
                      <span className="dashboard-icons">
                        <i className="ri-database-2-line p-2 rounded-circle bg-white-light fs-24"></i>
                      </span>
                    </div>
                    <p className="mb-0 fw-semibold mt-3 fs-18">
                      <span>₱ </span> 0
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
                    <span>₱ </span> 0
                  </h4>
                  <div className="availabel-balance">
                    <span className="fs-12">Availabl Balance</span>
                    <p className="mb-0 fw-semibold mt-2 fs-16">
                      <span>₱ </span> {userData?.amount}
                    </p>
                  </div>
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
        <div className="col-xl-4">
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
                  {/* <input type="text" className="form-control bg-white" placeholder='5874R2' aria-label="Dollar amount (with dot and two decimal places)" /> */}
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
      </div></p>)}
    </>
  );
};

export default Dashboard;
