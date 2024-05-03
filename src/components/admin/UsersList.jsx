
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import moment from "moment";
// import { toast } from "react-toastify";
// import { backEndCallObj } from "../../services/mainServiceFile";
// import { useNavigate } from 'react-router-dom'; 
// import { useMovieContext } from "../comman/Context";
// import { useFunctionContext } from "../comman/FunctionsContext";
// import { log } from "joi-browser";

// const UsersList = () => {
//     const { usersList, textDisplay, limit, setSkip, setUsersList } = useMovieContext();
//     const navigate = useNavigate(); 
//     console.log(usersList, "first line")

//     const observer = useRef();
//     const [loading, setLoading] = useState(false);
//     const [loadMore, setLoadMore] = useState(false);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const obj = { skip: usersList.length, limit };
//             const response = await backEndCallObj("/admin/users_list", obj);

//             if (response?.length === 0) {
//                 setLoadMore(true)
//                 toast.info("No more users to fetch.");
//             } else {
//                 setUsersList(prevUsers => [...prevUsers, ...response]);
//             }
//         } catch (ex) {
//             if (ex.response && ex.response?.status === 400) {
//                 toast.error(ex.response?.data);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (usersList.length <= 0) {
//             fetchData();
//         }
//     }, []);

//     const handleRef = useCallback(
//         (node) => {
//             if (loadMore) return;
//             if (loading) return;

//             if (observer.current) observer.current.disconnect();

//             observer.current = new IntersectionObserver((entries) => {
//                 if (entries[0].isIntersecting) {
//                     fetchData()
//                 }
//             });

//             if (node) observer.current.observe(node);
//         },
//     );

//     const formatDateTime = (Date) => {
//         let x = moment(Number(Date)).toDate();
//         return moment(x).format("DD-MMM-YYYY hh:mm A");
//     };

//     const userprofile = async (user_id) => {
//         try {
//             // Navigate to the UserInfo page with the user ID as state
//             navigate("/userinfo", { state: { user_id } });
//         } catch (error) {
//             console.error("Error navigating to user info page:", error);
//         }
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-lg-12">
//                     <div className="card shadow-none mt-0">
//                         <div className="card-body scrolleHidden " style={{ overflowY: "auto", height: "70vh" }}>
//                             <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
//                                 <h5 className="card-title m-0">ALL USERS LIST</h5>
//                             </div>
//                             <div className="table-responsive">
//                                 <table className="table table-bordered table-centered">
//                                     <thead className="text-center">
//                                         <tr className="table-head">
//                                             <th scope="col">Date</th>
//                                             <th scope="col">User Id</th>
//                                             <th scope="col">Name</th>
//                                             <th scope="col">Phone Number</th>
//                                             <th scope="col">CibilScore</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="table-body text-center">
//                                         {usersList?.map((user, index) => {
//                                             if (usersList.length === index + 1) {
//                                                 return (
//                                                     <tr key={user._id} ref={handleRef}>
//                                                         <td>{formatDateTime(user.date_of_register)}</td>
//                                                         <td className="text-uppercase font-weight-bold underline-style text-primary cursor" onClick={() => userprofile(user.user_id)}>
//                                                             {user.user_id}
//                                                         </td>
//                                                         <td>{user.first_name}{user.last_name}</td>
//                                                         <td>{user.phone_number}</td>
//                                                         <td>{user.cibil_score}</td>
//                                                     </tr>
//                                                 )
//                                             } else {
//                                                 return (
//                                                     <tr key={user._id}>
//                                                         <td>{formatDateTime(user.date_of_register)}</td>
//                                                         <td className="text-uppercase font-weight-bold underline-style text-primary cursor" onClick={() => userprofile(user.user_id)}>
//                                                             {user.user_id}
//                                                         </td>
//                                                         <td>{user.first_name}{user.last_name}</td>
//                                                         <td>{user.phone_number}</td>
//                                                         <td>{user.cibil_score}</td>
//                                                         {/* <td><button>enable </button></td> */}
//                                                     </tr>
//                                                 )
//                                             }
//                                         })}
//                                     </tbody>
//                                 </table>
//                                 {textDisplay && (
//                                     <div className="text-center mt-3 mb-3">There is no data to view</div>
//                                 )}
//                             </div>
//                             {loading && (
//                                 <div className="text-center mt-3">
//                                     <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
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



import React, { useEffect, useState, useRef, useCallback } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { backEndCallObj } from "../../services/mainServiceFile";
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from "../comman/Context";
import { useFunctionContext } from "../comman/FunctionsContext";
import { log } from "joi-browser";

const UsersList = () => {
    const { usersList, textDisplay, limit, setSkip, setUsersList } = useMovieContext();
    const navigate = useNavigate();
    console.log(usersList, "first line");

    const observer = useRef();
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // To store the selected user for status change
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const obj = { skip: usersList.length, limit };
            const response = await backEndCallObj("/admin/users_list", obj);

            if (response?.length === 0) {
                setLoadMore(true)
                toast.info("No more users to fetch.");
            } else {
                setUsersList(prevUsers => [...prevUsers, ...response]);
            }
        } catch (ex) {
            if (ex.response && ex.response?.status === 400) {
                toast.error(ex.response?.data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (usersList.length <= 0) {
            fetchData();
        }
    }, []);

    const handleRef = useCallback(
        (node) => {
            if (loadMore) return;
            if (loading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    fetchData()
                }
            });

            if (node) observer.current.observe(node);
        },
    );

    const formatDateTime = (Date) => {
        let x = moment(Number(Date)).toDate();
        return moment(x).format("DD-MMM-YYYY hh:mm A");
    };

    const userprofile = async (user_id) => {
        try {
            // Navigate to the UserInfo page with the user ID as state
            navigate("/userinfo", { state: { user_id } });
        } catch (error) {
            console.error("Error navigating to user info page:", error);
        }
    };

    const openConfirmModal = (user) => {
        setSelectedUser(user);
        setConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setSelectedUser(null);
        setConfirmModalOpen(false);
    };

    const confirmStatusChange = async () => {
        if (!selectedUser) return;

        try {
            const obj = { user_id: selectedUser.user_id, user_active: selectedUser.user_active === "Enable" ? "Disable" : "Enable" };
            const response = await backEndCallObj("/admin/user_disable", obj);
            console.log(response);

            // Update user status locally
            const updatedUsersList = usersList.map(user => {
                if (user.user_id === selectedUser.user_id) {
                    return { ...user, user_active: obj.user_active };
                } else {
                    return user;
                }
            });
            setUsersList(updatedUsersList);
            toast.success("User status toggled successfully.");
        } catch (error) {
            console.error("Error toggling user status:", error);
            toast.error("Failed to toggle user status. Please try again later.");
        } finally {
            closeConfirmModal();
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card shadow-none mt-0">
                        <div className="card-body scrolleHidden " style={{ overflowY: "auto", height: "70vh" }}>
                            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                                <h5 className="card-title m-0">ALL USERS LIST</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-centered">
                                    <thead className="text-center">
                                        <tr className="table-head">
                                            <th scope="col">Date</th>
                                            <th scope="col">User Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Cibil Score</th>
                                            <th scope="col">User Status</th>
                                            <th scope="col">actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body text-center">
                                        {usersList?.map((user, index) => (
                                            <tr key={user.id} ref={handleRef}>
                                                <td>{formatDateTime(user.date_of_register)}</td>
                                                <td className="text-uppercase font-weight-bold underline-style text-primary cursor" onClick={() => userprofile(user.user_id)}>
                                                    {user.user_id}
                                                </td>
                                                <td>{user.first_name} {user.last_name}</td>
                                                <td>{user.phone_number}</td>
                                                <td>{user.cibil_score}</td>
                                                <td>{user.user_active}</td>
                                                <td>
                                                    <button
                                                        className="btn primary"
                                                        onClick={() => openConfirmModal(user)}
                                                        style={{
                                                            width: "150px",
                                                            backgroundColor: user.user_active === "Enable" ? "#28a745a8" : "rgb(240 110 32 / 76%)",
                                                        }}
                                                    >
                                                        {user.user_active === "Enable" ? "Disable" : "Enable"}
                                                    </button>
                                                </td>
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
                                    <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Confirm Modal */}
            {confirmModalOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Status Change</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeConfirmModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to {selectedUser?.user_active === "Enable" ? "disable" : "enable"} this user?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeConfirmModal}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={confirmStatusChange}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal backdrop */}
            {/* <div className="modal-backdrop fade show"></div> */}
        </div>
    );
};

export default UsersList;

