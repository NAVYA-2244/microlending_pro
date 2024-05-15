// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { backEndCallObj } from "../../services/mainServiceFile";
// // import { useMovieContext } from "../comman/Context";

// // const Userdetails = () => {
// //   const { userprofileData, setUserprofileData } = useMovieContext();
// //   console.log(userprofileData, "nnnnnnnnnnnnnnnnnnn")
// //   // const [userData, setUserData] = useState(null);

// //   const [loading, setLoading] = useState(false);

// //   const fetchData = async () => {
// //     try {
// //       if (!userprofileData) {
// //         console.log("bkd called")
// //         setLoading(true)
// //         const response = await backEndCallObj("/users/user_profile", {});
// //         console.log(response, "bkd response profile")
// //         setUserprofileData(response);
// //         setLoading(false);
// //       }
// //       //  else {
// //       // setUserprofileData(userprofileData)
// //       // }

// //     }
// //     catch (error) {
// //       console.error("Error fetching user profile:", error);
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     console.log("calling")

// //     // if (userprofileData <= 0) {
// //     fetchData();
// //     // }
// //   }, []);

// //   if (loading) {
// //     return <div><div className="text-center mt-3">
// //       <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
// //         <span className="sr-only"></span>
// //       </div>
// //     </div></div>;
// //   }

// //   console.log(userprofileData)
// //   return (
// //     <div className="user-details-container ">
// //       <h5 className="mb-4">Profile</h5>
// //       <div className="row">
// //         <div className="col-xl-4">
// //           <div className="card">
// //             <div className="card-body">
// //               <div className="d-flex align-items-center">
// //                 <span className="bg-primary p-3 rounded-circle profile-image text-uppercase">
// //                   {userprofileData?.first_name?.charAt(0).toUpperCase()}
// //                 </span>
// //                 <p className="mb-0 ms-3 flex-fill">
// //                   {userprofileData?.first_name} {userprofileData?.last_name}
// //                   <span className="float-end text-success fs-12">{userprofileData?.user_status}</span>
// //                 </p>
// //               </div>
// //               <div className="my-3">
// //                 KYC Status  : <span className="fa-12 text-warning">{userprofileData?.kyc_status}</span>
// //               </div>
// //               <div className="mt-4">
// //                 <p className="f-12 mb-0">Phone: </p>
// //                 <div>
// //                   <span className="text-muted">{userprofileData?.phone_number}</span>
// //                   <span className="text-success float-end">{userprofileData?.kyc_status}</span>
// //                 </div>
// //               </div>
// //               <div className="mt-3">
// //                 <p>
// //                   <span className="">Amount  :</span>{" "}
// //                   <strong>{userprofileData?.amount}</strong>
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="card">
// //             <div className="card-body">
// //               <h5 className="mb-4">Refer and Earn</h5>
// //               <div className="input-group mb-2">
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   placeholder="Enter email ID"
// //                   aria-label="Recipient's username"
// //                   aria-describedby="button-addon2"
// //                 />
// //                 <button
// //                   className="btn btn-primary"
// //                   type="button"
// //                   id="button-addon2"
// //                 >
// //                   Invite
// //                 </button>
// //               </div>
// //               <span className="text-muted fs-12">
// //                 Earn more thane $15,000 by referring your friends to micro
// //                 lending.
// //               </span>
// //               <div className="mt-3">
// //                 <Link className="text-decoration-underline fs-12 text-primary">
// //                   Terms & conditions
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="col-xl-8">
// //           <div className="card">
// //             <div className="card-body">
// //               <h6 className="mb-4 text-muted">Personal Details</h6>
// //               <div className="row">
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>First Name  :</strong>  {userprofileData?.first_name}
// //                   </p>
// //                 </div>
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Last Name  :</strong>  {userprofileData?.last_name}
// //                   </p>
// //                 </div>
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>DOB  :</strong>  {userprofileData?.dob}
// //                   </p>
// //                 </div>
// //                 {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Age:</strong> {userData.age}
// //                   </p>
// //                 </div> */}
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Gender  :</strong>
// //                     {userprofileData?.gender}
// //                   </p>
// //                 </div>
// //                 {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Password:</strong> {userData.password}
// //                   </p>
// //                 </div> */}
// //               </div>
// //               <div className="row">
// //                 <h6 className="text-muted">Documents Details</h6>
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Tin Number  :</strong>


// //                     {userprofileData?.tin_number}
// //                   </p>
// //                 </div>
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Passport Number  :</strong>{userprofileData?.passport_number}
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="row">
// //                 <h6 className="text-muted">Loan Types</h6>
// //                 {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Purpose of loan:</strong> {userData.purpose_of_loan}
// //                   </p>
// //                 </div> */}
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Employement  :</strong>  {userprofileData?.employment}
// //                   </p>
// //                 </div>
// //               </div>
// //               <div className="row">
// //                 <h6 className="text-muted">Adrress Details</h6>
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Permanent Address  :</strong>{" "}
// //                     {userprofileData?.residence?.permanentAddress}
// //                   </p>
// //                 </div>
// //                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
// //                   <p>
// //                     <strong>Current Address  :</strong>
// //                     {userprofileData?.residence?.currentAddress}
// //                   </p>
// //                 </div>
// //               </div>
// //               <Link to="/updateprofile" className="btn btn-primary">Edit Profile</Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Userdetails;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { backEndCallObj } from "../../services/mainServiceFile";
// import { useMovieContext } from "../comman/Context";
// import { useNavigate } from "react-router-dom";
// import ApplyLoan from './ApplyLoan';

// const Userdetails = () => {
//   const navigate = useNavigate();
//   const { userprofileData, setUserprofileData } = useMovieContext();
//   console.log(userprofileData, "nnnnnnnnnnnnnnnnnnn");
//   // const [userData, setUserData] = useState(null);

//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     try {
//       if (!userprofileData) {
//         console.log("bkd called");
//         setLoading(true);
//         const response = await backEndCallObj("/users/user_profile", {});
//         console.log(response, "bkd response profile");
//         setUserprofileData(response);
//         setLoading(false);
//       }
//       //  else {
//       // setUserprofileData(userprofileData)
//       // }
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("calling");

//     // if (userprofileData <= 0) {
//     fetchData();
//     // }
//   }, []);

//   if (loading) {
//     return (
//       <div>
//         <div className="text-center mt-3">
//           <div
//             className="spinner-border spiner-border-sm"
//             style={{ color: "blue" }}
//             role="status"
//           >
//             <span className="sr-only"></span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   console.log(userprofileData);
//   return (
//     <div className="user-details-container ">
//       <h5 className="mb-4">My Profile</h5>
//       <div className="row">
//         <div className="col-xl-4">
//           <div className="card overflow-hidden">
//             <div className="px-3 profile_page d-flex align-items-center">
//               <div className="d-flex align-items-center">
//                 <div className="position-relative">
//                   {userprofileData?.photo && <img
//                     src={userprofileData?.photo}

//                     alt="img"
//                     width={60}
//                     height={60}
//                     className="rounded-circle object-fit-cover"
//                   />}
//                   {/* <span class="position-absolute bg-success border border-light rounded-circle user_active"> */}
//                   {/* <span class="visually-hidden">New alerts</span> */}
//                   {/* </span> */}
//                 </div>
//                 <h5 className="mb-0 ms-3 text-white text-capitalize">
//                   {userprofileData?.first_name === null ? "" : userprofileData?.first_name} {userprofileData?.last_name === null ? "" : userprofileData?.last_name}
//                 </h5>
//               </div>
//               <span className="badge bg-success fs-12 ms-auto">
//                 {userprofileData?.user_status == null ? "NA" : userprofileData?.user_status}
//               </span>
//             </div>
//             <div className="card-body">
//               {/* <div className="d-flex align-items-center">
//                 <span className="bg-primary p-3 rounded-circle profile-image text-uppercase">
//                   {userprofileData?.first_name?.charAt(0).toUpperCase()}
//                 </span>
//                 <p className="mb-0 ms-3 flex-fill">
//                   {userprofileData?.first_name} {userprofileData?.last_name}
//                   <span className="float-end text-success fs-12">
//                     {userprofileData?.user_status}
//                   </span>
//                 </p>
//               </div> */}
//               <div className="my-3">
//                 KYC Status :{" "}
//                 <span className="fa-12 text-warning">
//                   {userprofileData?.kyc_status === null ? "NA" : userprofileData?.kyc_status}
//                 </span>
//               </div>
//               <div className="mt-4">
//                 <p className="f-12 mb-0">Phone</p>
//                 <div>
//                   <span className="text-muted">
//                     {userprofileData?.phone_number === null ? "NA" : userprofileData?.phone_number}
//                   </span>
//                   <span className="text-success float-end">
//                     {userprofileData?.kyc_status === null ? "NA" : userprofileData?.kyc_status}
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-3">
//                 <>
//                   <label className="form-label me-1">Amount :</label>
//                   <span className="text-primary">
//                     {userprofileData?.amount === null ? "NA" : userprofileData?.amount}
//                   </span>
//                 </>
//               </div>
//             </div>
//           </div>
//           <div className="card">
//             <div className="card-body">
//               <h5 className="mb-4">Refer and Earn</h5>
//               <div className="input-group mb-2">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter email ID"
//                   aria-label="Recipient's username"
//                   aria-describedby="button-addon2"
//                 />
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   id="button-addon2"
//                 >
//                   Invite
//                 </button>
//               </div>
//               <span className="text-muted fs-12">
//                 Earn more thane $15,000 by referring your friends to micro
//                 lending.
//               </span>
//               <div className="mt-3">
//                 <Link className="text-decoration-underline fs-12 text-primary">
//                   Terms & conditions
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-xl-8">
//           <div className="card">
//             <div className="card-body">
//               <div className="d-sm-flex justify-content-between align-items-center mb-3">
//                 <h6 className="fs-18">Personal Information</h6>

//                 <button
//                   className="btn btn-primary"
//                   onClick={() => navigate("/updateprofile")}
//                 >
//                   <i class="ri-edit-line"></i> Update Profile
//                 </button>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => navigate("/loaneligibilitydetails")}
//                 >
//                   ApplyLoan
//                 </button>
//               </div>
//               <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
//                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       First Name :
//                     </label>
//                     <span className="text-capitalize">
//                       {userprofileData?.first_name == null ? "NA" : userprofileData?.first_name}

//                     </span>
//                   </div>
//                 </div>
//                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       Last Name :{" "}
//                     </label>
//                     <span className="text-capitalize">
//                       {" "}
//                       {userprofileData?.last_name == null ? "NA" : userprofileData?.last_name}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       DOB :{" "}
//                     </label>
//                     <span className="text-capitalize">
//                       {" "}
//                       {userprofileData?.dob == null ? "NA" : userprofileData?.dob}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       Gender :{" "}
//                     </label>
//                     <span className="text-capitalize">
//                       {" "}
//                       {userprofileData?.gender == null ? "NA" : userprofileData?.gender}
//                     </span>
//                   </div>
//                 </div>
//                 {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
//                   <p>
//                     <strong>Password:</strong> {userData.password}
//                   </p>
//                 </div> */}
//               </div>
//               <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
//                 <h6 className="mb-2 fs-17">Documents Details</h6>
//                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       Tin Number :
//                     </label>
//                     <span>{userprofileData?.tin_number == null ? "NA" : userprofileData?.tin_number}</span>
//                   </div>
//                 </div>
//                 <div className="col-12 col-xl-5 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       Passport Number :
//                     </label>
//                     <span>{userprofileData?.passport_number == null ? "NA" : userprofileData?.passport_number}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
//                 <h6 className="mb-2 fs-17">Loan Types</h6>
//                 {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
//                   <p>
//                     <strong>Purpose of loan:</strong> {userData.purpose_of_loan}
//                   </p>
//                 </div> */}
//                 <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       Employement :
//                     </label>
//                     <span> {userprofileData?.employment == null ? "NA" : userprofileData?.employment}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
//                 <h6 className="mb-2 fs-17">Adrress Details</h6>
//                 <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       Permanent Address :
//                     </label>
//                     <span>{userprofileData?.residence?.permanentAddress == null ? "NA" : userprofileData?.residence?.permanentAddress}</span>
//                   </div>
//                 </div>
//                 <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
//                   <div>
//                     <label className="text-muted fw-normal form-label me-2">
//                       Current Address :
//                     </label>
//                     <span>{userprofileData?.residence?.currentAddress == null ? "NA" : userprofileData?.residence?.currentAddress}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Userdetails;


import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { backEndCallObj } from "../../services/mainServiceFile";
import { useMovieContext } from "../comman/Context";
import { useNavigate } from "react-router-dom";
import ApplyLoan from './ApplyLoan';
import Updateprofile from "./Updateprofile";

const Userdetails = () => {
  const navigate = useNavigate();
  const { userprofileData, setUserprofileData } = useMovieContext();
  console.log(userprofileData, "nnnnnnnnnnnnnnnnnnn");
  // const [userData, setUserData] = useState("0");

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    console.log("entered useeffect")
    try {
      if (!userprofileData) {
        console.log(userprofileData, "bkd called");
        setLoading(true);
        const response = await backEndCallObj("/users/user_profile", {});
        console.log(response, "bkd response profile");
        setUserprofileData(response);
        setLoading(false);
      }
      //  else {
      // setUserprofileData(userprofileData)
      // }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("calling");

    // if (userprofileData <= 0) {
    fetchData();
    // }
  });

  if (loading) {
    return <div><div className="text-center mt-3">
      <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
        <span className="sr-only"></span>
      </div>
    </div></div>;
  }
  // return (
  //   <div>
  //     <div className="text-center mt-3">
  //       <div
  //         className="spinner-border spiner-border-sm"
  //         style={{ color: "blue" }}
  //         role="status"
  //       >
  //         <span className="sr-only"></span>
  //       </div>
  //     </div>
  //   </div>
  // );
  // }

  console.log(userprofileData, "hhhhhhhhhhhhh");

  // if (userprofileData?.kyc_status == "pending") {
  //   console.log(userprofileData?.kyc_status)
  //   Navigate("/updateprofile")
  // }
  return (
    <>
      {userprofileData?.kyc_status == "pending" ? <Updateprofile></Updateprofile> :
        <div className="user-details-container ">


          <h5 className="mb-4">My Profile</h5>
          <div className="row">
            <div className="col-xl-4">
              <div className="card overflow-hidden">
                <div className="px-3 profile_page d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      {userprofileData?.photo && <img
                        src={userprofileData?.photo}

                        alt="img"
                        width={60}
                        height={60}
                        className="rounded-circle object-fit-cover"
                      />}
                      {/* <span class="position-absolute bg-success border border-light rounded-circle user_active"> */}
                      {/* <span class="visually-hidden">New alerts</span> */}
                      {/* </span> */}
                    </div>
                    <h5 className="mb-0 ms-3 text-white text-capitalize">
                      {userprofileData?.first_name
                        && ""} {userprofileData?.last_name && ""}
                    </h5>
                  </div>
                  <span className="badge bg-success fs-12 ms-auto">
                    {userprofileData?.user_status == "0" ? "NA" : userprofileData?.user_status}
                  </span>
                </div>
                <div className="card-body">
                  {/* <div className="d-flex align-items-center">
                <span className="bg-primary p-3 rounded-circle profile-image text-uppercase">
                  {userprofileData?.first_name?.charAt(0).toUpperCase()}
                </span>
                <p className="mb-0 ms-3 flex-fill">
                  {userprofileData?.first_name} {userprofileData?.last_name}
                  <span className="float-end text-success fs-12">
                    {userprofileData?.user_status}
                  </span>
                </p>
              </div> */}
                  <div className="my-3">
                    KYC Status :{" "}
                    <span className="fa-12 text-warning">
                      {userprofileData?.kyc_status === "0" ? "NA" : userprofileData?.kyc_status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="f-12 mb-0">Phone</p>
                    <div>
                      <span className="text-muted">
                        {userprofileData?.phone_number === "0" ? "NA" : userprofileData?.phone_number}
                      </span>
                      <span className="text-success float-end">
                        {userprofileData?.kyc_status === "0" ? "NA" : userprofileData?.kyc_status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <>
                      <label className="form-label me-1">Amount :</label>
                      <span className="text-primary">
                        {userprofileData?.amount === "0" ? "NA" : userprofileData?.amount}
                      </span>
                    </>
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
                  <div className="d-sm-flex justify-content-between align-items-center mb-3">
                    <h6 className="fs-18">Personal Information</h6>

                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/updateprofile")}
                    >
                      <i class="ri-edit-line"></i> Update Profile
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/loaneligibilitydetails")}
                    >
                      ApplyLoan
                    </button>
                  </div>
                  <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                    <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          First Name :
                        </label>
                        <span className="text-capitalize">
                          {userprofileData?.first_name == "0" ? "NA" : userprofileData?.first_name}

                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          Last Name :{" "}
                        </label>
                        <span className="text-capitalize">
                          {" "}
                          {userprofileData?.last_name == "0" ? "NA" : userprofileData?.last_name}
                        </span>
                      </div>
                    </div>


                  </div>

                  <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                    <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          DOB :{" "}
                        </label>
                        <span className="text-capitalize">
                          {" "}
                          {userprofileData?.dob == "0" ? "NA" : userprofileData?.dob}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          Gender :{" "}
                        </label>
                        <span className="text-capitalize">
                          {" "}
                          {userprofileData?.gender == null ? "NA" : userprofileData?.gender}
                        </span>
                      </div>
                    </div>
                  </div>


                  <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                    <h6 className="mb-2 fs-17">Documents Details</h6>
                    <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          Tin Number :
                        </label>
                        <span>{userprofileData?.tin_number == "0" ? "NA" : userprofileData?.tin_number}</span>
                      </div>
                    </div>
                    <div className="col-12 col-xl-5 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          Passport Number :
                        </label>
                        <span>{userprofileData?.passport_number == "0" ? "NA" : userprofileData?.passport_number}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                    <h6 className="mb-2 fs-17">Loan Types</h6>
                    {/* <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <p>
                    <strong>Purpose of loan:</strong> {userData.purpose_of_loan}
                  </p>
                </div> */}
                    <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          Employement :
                        </label>
                        <span> {userprofileData?.employment == null ? "NA" : userprofileData.employment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row border rounded-3 p-2 py-3 row-sm mb-3">
                    <h6 className="mb-2 fs-17">Adrress Details</h6>
                    <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          Permanent Address :
                        </label>
                        <span>{userprofileData?.residence?.permanentAddress == "0" ? "NA" : userprofileData?.residence?.permanentAddress}</span>
                      </div>
                    </div>
                    <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <div>
                        <label className="text-muted fw-normal form-label me-2">
                          Current Address :
                        </label>
                        <span>{userprofileData?.residence?.currentAddress == "0" ? "NA" : userprofileData?.residence?.currentAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Userdetails;
