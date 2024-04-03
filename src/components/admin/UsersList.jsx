// import React, { useState, useEffect } from "react";
// import moment from "moment";
// import { toast } from "react-toastify";
// import authService from "../../services/authService";
// import { backEndCallObj } from "../../services/mainServiceFile";
// import { useNavigate } from 'react-router-dom';
// const UsersList = () => {
//     const Navigate = useNavigate()
//     const [UsersList, setUsersList] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [textDisplay, setTextDisplay] = useState(false);
//     const [skip, setSkip] = useState(0);
//     const limit = 10;


//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const obj = { skip, limit };
//                 console.log(obj, "payload ")
//                 const response = await backEndCallObj("/admin/users_list", obj);
//                 console.log(response, "response userlist")
//                 if (response?.length === 0) {
//                     setTextDisplay(true);

//                 }
//                 else {
//                     setUsersList(prevUsers => [...prevUsers, ...response]);

//                     if (response?.length >= 0) {

//                         setSkip(prevSkip => prevSkip + limit);
//                     }


//                 }
//             } catch (ex) {
//                 if (ex.response && ex.response?.status === 400) {
//                     toast.error(ex.response?.data);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();


//     }, [skip, limit]);
//     const formatDateTime = (Date) => {


//         let x = moment(Number(Date)).toDate()
//         return moment(x).format("DD-MMM-YYYY hh:mm A");
//     };
//     console.log(UsersList, "userslist in render")

//     return (

//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-lg-12">
//                     <div className="card shadow-none mt-0">
//                         <div className="card-body">
//                             <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//                                 <h5 className="card-title m-0">ALL USERS LIST</h5>
//                             </div>
//                             <div className="table-responsive">
//                                 <table className="table table-bordered table-centered">
//                                     <thead>
//                                         <tr className="table-head">
//                                             <th scope="col">Date</th>
//                                             <th scope="col">User Id</th>
//                                             <th scope="col">Name</th>
//                                             <th scope="col">Phone Number</th>
//                                             <th scope="col">CibilScore</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="table-body">
//                                         {UsersList.map((user) => (
//                                             <tr key={user._id}>
//                                                 <td>{formatDateTime(user.date_of_register)}</td>
//                                                 <td className="text-uppercase font-weight-bold underline-style text-primary cursor"

//                                                     onClick={() => Navigate("/userDetails", { state: { userId: user.user_id } })}

//                                                 >

//                                                     {user.user_id}</td>
//                                                 <td>{user.first_name}{user.last_name}</td>
//                                                 <td>{user.phone_number}</td>
//                                                 <td>{user.cibil_score}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             {textDisplay && (
//                                 <div className="text-center mt-3 mb-3">There is no data to view</div>
//                             )}
//                             {loading && (
//                                 <div className="text-center mt-3">
//                                     <div className="spinner-border spiner-border-sm" style={{ color: "#efefef" }} role="status">
//                                         <span className="sr-only"></span>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UsersList;

import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { backEndCallObj } from "../../services/mainServiceFile";
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from "../comman/Context";

const UsersList = () => {
    const { usersList, setUsersList, setErrorOccur, setSkip, setTextDisplay, textDisplay } = useMovieContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const limit = 10;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const obj = { skip: usersList.length, limit };
                const response = await backEndCallObj("/admin/users_list", obj);
                if (response?.length === 0) {
                    setTextDisplay(true);

                    toast.info("No more users to fetch.");
                } else {
                    setUsersList(prevUsers => [...prevUsers, ...response]);
                    setSkip(prevSkip => prevSkip + limit);
                }
            } catch (ex) {
                setErrorOccur(true);
                if (ex.response && ex.response?.status === 400) {
                    toast.error(ex.response?.data);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setUsersList, setErrorOccur, setLoading, setSkip, usersList.length]);

    const formatDateTime = (Date) => {
        let x = moment(Number(Date)).toDate();
        return moment(x).format("DD-MMM-YYYY hh:mm A");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card shadow-none mt-0">
                        <div className="card-body">
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                                <h5 className="card-title m-0">ALL USERS LIST</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-centered">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">Date</th>
                                            <th scope="col">User Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">CibilScore</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {usersList.map((user) => (
                                            <tr key={user._id}>
                                                <td>{formatDateTime(user.date_of_register)}</td>
                                                <td className="text-uppercase font-weight-bold underline-style text-primary cursor"
                                                    onClick={() => navigate("/userDetails", { state: { userId: user.user_id } })}>
                                                    {user.user_id}
                                                </td>
                                                <td>{user.first_name}{user.last_name}</td>
                                                <td>{user.phone_number}</td>
                                                <td>{user.cibil_score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {textDisplay && (
                                    <div className="text-center mt-3 mb-3">There is no data to view</div>
                                )}
                            </div>
                            {loading && (
                                <div className="text-center mt-3">
                                    <div className="spinner-border spiner-border-sm" style={{ color: "#efefef" }} role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersList;
