import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backEndCallObj } from "../../services/mainServiceFile";

const Userdetails = () => {
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await backEndCallObj("/users/user_profile", {});
        setUserData(response);
        setLoading(false);
        console.log(response, "profiledata");
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    // const delayFetch = setTimeout(fetchData, 1000);
    // return () => clearTimeout(delayFetch);
    fetchData();
  }, []);
  if (loading) {
    return <div><div className="text-center mt-3">
      <div className="spinner-border spiner-border-sm" style={{ color: "#efefef" }} role="status">
        <span className="sr-only"></span>
      </div>
    </div></div>;
  }

  return (
    <div className="user-details-container p-4">
      <h5 className="mb-4">Profile</h5>
      <div className="row">
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="bg-primary p-3 rounded-circle profile-image text-uppercase">
                  N
                </span>
                <p className="mb-0 ms-3 flex-fill">
                  {userData?.first_name} {userData?.last_name}
                  <span className="float-end text-success fs-12">Active</span>
                </p>
              </div>
              <div className="my-3">
                KYC Status: <span className="fa-12 text-warning">Pending</span>
              </div>
              <div className="mt-4">
                <p className="f-12 mb-0">Phone</p>
                <div>
                  <span className="text-muted">{userData?.phone_number}</span>
                  <span className="text-success float-end">verified</span>
                </div>
              </div>
              <div className="mt-3">
                <p>
                  <span className="">Amount:</span>{" "}
                  <strong>{userData?.amount}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="mb-4">Refer and Earn</h5>
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter email ID"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  id="button-addon2"
                >
                  Invite
                </button>
              </div>
              <span className="text-muted fs-12">
                Earn more thane $15,000 by referring your friends to micro
                lending.
              </span>
              <div className="mt-3">
                <Link className="text-decoration-underline fs-12 text-primary">
                  Terms & conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <h6 className="mb-4 text-muted">Personal Details</h6>
              <div className="row">
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>FirstName:</strong> {userData?.first_name}
                  </p>
                </div>
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>LastName:</strong> {userData?.last_name}
                  </p>
                </div>
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>DOB:</strong> {userData?.dob}
                  </p>
                </div>
                {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Age:</strong> {userData.age}
                  </p>
                </div> */}
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Gender:</strong>
                    {userData?.gender}
                  </p>
                </div>
                {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Password:</strong> {userData.password}
                  </p>
                </div> */}
              </div>
              <div className="row">
                <h6 className="text-muted">Documents Deatils</h6>
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Tin Number:</strong>
                    {userData?.tin_number}
                  </p>
                </div>
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Passport Number:</strong> {userData?.passport_number}
                  </p>
                </div>
              </div>
              <div className="row">
                <h6 className="text-muted">Loan Types</h6>
                {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Purpose of loan:</strong> {userData.purpose_of_loan}
                  </p>
                </div> */}
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Employement:</strong> {userData?.employment}
                  </p>
                </div>
              </div>
              <div className="row">
                <h6 className="text-muted">Adrress Details</h6>
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>permanentAddress:</strong>{" "}
                    {userData?.residence.permanentAddress}
                  </p>
                </div>
                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>currentAddress:</strong>
                    {userData?.residence.currentAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userdetails;
