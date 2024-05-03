import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { backEndCallObj } from "../../services/mainServiceFile";
import { useMovieContext } from "../comman/Context";

const Userinfo = () => {
    const { userprofileData, setUserprofileData } = useMovieContext();
    const location = useLocation(); // Use the useLocation hook to access location state

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {

            setLoading(true)
            // Access user_id from location state
            const user_id = location.state.user_id;
            console.log(user_id, "jjjjjjj")
            const response = await backEndCallObj("/admin/users_profile", { user_id });
            console.log(response, "gffg")
            setUserprofileData(response);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching user profile:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div><div className="text-center mt-3">
            <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                <span className="sr-only"></span>
            </div>
        </div></div>;
    }

    console.log(userprofileData)
    return (
        <div className="user-details-container ">
            <h5 className="mb-4">Profile</h5>
            <div className="row">
                <div className="col-xl-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <span className="bg-primary p-3 rounded-circle profile-image text-uppercase">
                                    {userprofileData?.first_name?.charAt(0).toUpperCase()}
                                </span>
                                <p className="mb-0 ms-3 flex-fill">
                                    {userprofileData?.first_name} {userprofileData?.last_name}
                                    <span className="float-end text-success fs-12">{userprofileData?.user_status}</span>
                                </p>
                            </div>
                            <div className="my-3">
                                KYC Status: <span className="fa-12 text-warning">{userprofileData?.kyc_status}</span>
                            </div>
                            <div className="mt-4">
                                <p className="f-12 mb-0">Phone</p>
                                <div>
                                    <span className="text-muted">{userprofileData?.phone_number}</span>
                                    <span className="text-success float-end">{userprofileData?.kyc_status}</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <p>
                                    <span className="">Amount:</span>{" "}
                                    <strong>{userprofileData?.amount}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="mb-4">Refer and Earn</h5>
                            <div className="input-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter email ID"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2"
                                />
                                <button
                                    className="btn btn-primary"
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
                                        <strong>FirstName:</strong> {userprofileData?.first_name}
                                    </p>
                                </div>
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <p>
                                        <strong>LastName:</strong> {userprofileData?.last_name}
                                    </p>
                                </div>
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <p>
                                        <strong>DOB:</strong> {userprofileData?.dob}
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
                                        {userprofileData?.gender}
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
                                        {userprofileData?.tin_number}
                                    </p>
                                </div>
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <p>
                                        <strong>Passport Number:</strong> {userprofileData?.passport_number}
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
                                        <strong>Employement:</strong> {userprofileData?.employment}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <h6 className="text-muted">Adrress Details</h6>
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <p>
                                        <strong>permanentAddress:</strong>{" "}
                                        {userprofileData?.residence?.permanentAddress}
                                    </p>
                                </div>
                                <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <p>
                                        <strong>currentAddress:</strong>
                                        {userprofileData?.residence?.currentAddress}
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

export default Userinfo;
