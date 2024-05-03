// // import React, { useEffect, useState } from 'react';
// // import { backEndCallObj } from '../../services/mainServiceFile';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from "react-hot-toast";
// // import AddAdmin from './Addadmin';
// // import { useMovieContext } from "../comman/Context";
// // import authService from "./../../services/authService";
// // // import { getCurrentUser } from './../../services/authService';
// // function AdminList() {
// //     const navigate = useNavigate()
// //     const [loading, setLoading] = useState(false);
// //     const [deleting, setDeleting] = useState(false)
// //     const { adminData, setAdminData } = useMovieContext();
// //     // const [adminData, setAdminData] = useState([]);
// //     const [showAddAdminModal, setShowAddAdminModal] = useState(false);

// //     const fetchData = async () => {
// //         try {
// //             setLoading(true)
// //             const response = await backEndCallObj("/admin/admins_list");
// //             setAdminData(response);
// //             setLoading(false)
// //             console.log(response, "adminlist");
// //         } catch (error) {
// //             console.error("Error fetching user profile:", error);
// //             setLoading(false)
// //         }
// //     };

// //     useEffect(() => {

// //         fetchData();


// //     }, []);

// //     const handleDeleteAdmin = async (user_id, id) => {
// //         try {
// //             setLoading(true)


// //             setDeleting(user_id)

// //             const response = await backEndCallObj("/admin/admin_remove", { user_id });

// //             console.log(response, "admin delete");
// //             fetchData();
// //             setLoading(true)
// //         } catch (error) {
// //             console.error("Error deleting admin:", error);
// //             setLoading(false)
// //         }
// //     };

// //     // if (authService.getCurrentUser().admin_type !== "1") {
// //     //     window.history.back(/dashboord);

// //     //   }
// //     return (

// //         <div className="table-responsive">
// //             <button
// //                 type="button"
// //                 className="btn btn-primary btn-block mb-3"

// //                 onClick={() => setShowAddAdminModal(true)}

// //             >
// //                 Add Admin
// //             </button>
// //             <table className="table border table-bordered table-centered">
// //                 <thead>
// //                     <tr className="table-head">
// //                         <th scope="col">Date</th>
// //                         <th scope="col">Admin ID</th>
// //                         <th scope="col">Name</th>
// //                         <th scope="col">Phone Number</th>
// //                         <th scope="col">Admin Type </th>
// //                         <th scope="col">Action </th>
// //                     </tr>
// //                 </thead>
// //                 <tbody className="table-body">
// //                     {adminData?.map((admin) => (
// //                         <tr key={admin.user_id}>
// //                             <td>{admin.date_of_register}</td>
// //                             <td>{admin.user_id}</td>
// //                             <td>{admin.first_name}{admin.last_name}</td>
// //                             <td>{admin.phone_number}</td>
// //                             <td>{admin.admin_type}</td>
// //                             <td>
// //                                 <button
// //                                     type="button"
// //                                     className="btn btn-danger btn-block"
// //                                     onClick={() => handleDeleteAdmin(admin.user_id, admin.user_id)}
// //                                     disabled={loading}
// //                                 >
// //                                     {deleting === admin.user_id ? 'Deleting...' : 'Delete'}
// //                                 </button>
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //             {showAddAdminModal ? (
// //                 <AddAdmin show={showAddAdminModal} onHide={() => setShowAddAdminModal(false)} />) : null}

// //         </div>
// //     );
// // }

// // export default AdminList;

// import React, { useEffect, useState } from 'react';
// import { backEndCallObj } from '../../services/mainServiceFile';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-hot-toast";
// import AddAdmin from './Addadmin';
// import { useMovieContext } from "../comman/Context";
// import authService from "./../../services/authService";
// import moment from 'moment';

// function AdminList() {
//     const navigate = useNavigate()
//     const [loading, setLoading] = useState(false);
//     const [deleting, setDeleting] = useState(false)
//     const { AddadminData, setAddadminData } = useMovieContext();
//     const [showAddAdminModal, setShowAddAdminModal] = useState(false);
//     const [btnDisabled, setBtnDisabled] = useState(false)


//     const fetchData = async () => {
//         try {
//             setLoading(true)
//             const response = await backEndCallObj("/admin/admins_list");
//             setAddadminData(response);
//         } catch (error) {
//             console.error("Error fetching user profile:", error);
//             toast.error("Failed to fetch admin list. Please try again later.");
//         } finally {
//             setLoading(false)
//         }
//     };

//     useEffect(() => {
//         if (AddadminData <= 0) {
//             fetchData();
//         }
//     }, []);

//     const handleDeleteAdmin = async (user_id) => {
//         setBtnDisabled(true)
//         try {
//             // setLoading(true)
//             setDeleting(user_id)
//             const response = await backEndCallObj("/admin/admin_remove", { user_id });
//             console.log(response, "admin delete");
//             fetchData();
//         } catch (ex) {
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response.data);
//             }
//         } finally {
//             setLoading(false)
//             setBtnDisabled(false)
//         }
//     };
//     const formatDateTime = (Date) => {
//         let x = moment(Number(Date)).toDate();
//         return moment(x).format("DD-MMM-YYYY hh:mm A");
//     };

//     return (
//         <div className="user-details-container">
//             <h5 className="mb-4">Admin List</h5>
//             <div className='card'>
//                 <div className='card-body scrolleHidden ' style={{ overflowY: "auto", height: "70vh" }}>
//                     <div className="table-responsive">
//                         <button
//                             type="button"
//                             className="btn btn-primary btn-block mb-3"
//                             onClick={() => setShowAddAdminModal(true)}
//                         >
//                             Add Admin
//                         </button>
//                         {loading ? (
//                             <p><div className="text-center mt-3">
//                                 <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
//                                     <span className="sr-only"></span>
//                                 </div>
//                             </div></p>
//                         ) : (
//                             <table className="table border table-bordered table-centered">
//                                 <thead>
//                                     <tr className="table-head text-center">
//                                         <th scope="col">Date</th>
//                                         <th scope="col">Admin ID</th>
//                                         <th scope="col">Name</th>
//                                         <th scope="col">Phone Number</th>
//                                         <th scope="col">Admin Type </th>
//                                         <th scope="col">Action </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="table-body text-center">
//                                     {AddadminData?.map((admin) => (
//                                         <tr key={admin?.user_id}>

//                                             {/* <td>{admin.date_of_register}</td> */}
//                                             <td>{formatDateTime(admin?.date_of_register)}</td>
//                                             <td>{admin?.user_id}</td>
//                                             <td>{admin?.first_name}</td>
//                                             <td>{admin?.phone_number}</td>
//                                             <td>{admin?.admin_type}</td>
//                                             <td>
//                                                 <button
//                                                     type="button"
//                                                     className="btn btn-danger btn-block"
//                                                     onClick={() => handleDeleteAdmin(admin.user_id, admin.user_id)}
//                                                     disabled={btnDisabled}
//                                                 >
//                                                     {btnDisabled ? 'Deleting...' : 'Delete'}
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         )}
//                         {showAddAdminModal ? (
//                             <AddAdmin show={showAddAdminModal} onHide={() => setShowAddAdminModal(false)} />
//                         ) : null}
//                     </div>
//                 </div>
//             </div></div>
//     );
// }


// export default AdminList;
import React, { useEffect, useState } from 'react';
import { backEndCallObj } from '../../services/mainServiceFile';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import AddAdmin from './Addadmin';
import { useMovieContext } from "../comman/Context";
import authService from "./../../services/authService";
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';


function AdminList() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { AddadminData, setAddadminData } = useMovieContext();
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [deletingAdmin, setDeletingAdmin] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // New state for showing the confirmation modal
    const [btnDisabled, setBtnDisabled] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await backEndCallObj("/admin/admins_list");
            setAddadminData(response);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to fetch admin list. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (AddadminData.length === 0) {
            fetchData();
        }
    }, []);

    const handleDeleteAdmin = async (user_id) => {
        try {
            // Disable the button before showing the confirmation modal
            setBtnDisabled(true);
            setDeletingAdmin(user_id);
            setShowConfirmationModal(true); // Show the confirmation modal
        } catch (error) {
            console.error("Error deleting admin:", error);
            toast.error("Failed to delete admin. Please try again later.");
        }
    };

    const handleConfirmDelete = async () => {
        console.log("hello")
        setBtnDisabled(true)
        try {
            const response = await backEndCallObj("/admin/admin_remove", { user_id: deletingAdmin });
            console.log(response, "admin delete");
            fetchData();
            toast.success("Admin deleted successfully.");
        } catch (error) {
            console.error("Error deleting admin:", error);
            toast.error("Failed to delete admin. Please try again later.");
        } finally {
            // Enable the button after the deletion process is complete
            setBtnDisabled(false);
            setDeletingAdmin(null);
            setShowConfirmationModal(false); // Close the confirmation modal after deletion
        }
    };

    const handleCancelDelete = () => {
        // Enable the button when the deletion is canceled
        setBtnDisabled(true);
        setShowConfirmationModal(false); // Close the confirmation modal
    };

    const formatDateTime = (Date) => {
        let x = moment(Number(Date)).toDate();
        return moment(x).format("DD-MMM-YYYY hh:mm A");
    };

    return (
        <div className="user-details-container">
            <h5 className="mb-4">Admin List</h5>
            <div className='card'>
                <div className='card-body scrolleHidden ' style={{ overflowY: "auto", height: "70vh" }}>
                    <div className="table-responsive">
                        <button
                            type="button"
                            className="btn btn-primary btn-block mb-3"
                            onClick={() => setShowAddAdminModal(true)}
                        >
                            Add Admin
                        </button>
                        {loading ? (
                            <p><div className="text-center mt-3">
                                <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div></p>
                        ) : (
                            <table className="table border table-bordered table-centered">
                                <thead>
                                    <tr className="table-head text-center">
                                        <th scope="col">Date</th>
                                        <th scope="col">Admin ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Admin Type </th>
                                        <th scope="col">Action </th>
                                    </tr>
                                </thead>
                                <tbody className="table-body text-center">
                                    {AddadminData.map((admin) => (
                                        <tr key={admin.user_id}>
                                            <td>{formatDateTime(admin.date_of_register)}</td>
                                            <td>{admin.user_id}</td>
                                            <td>{admin.first_name}</td>
                                            <td>{admin.phone_number}</td>
                                            <td>{admin.admin_type}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-block"
                                                    onClick={() => handleDeleteAdmin(admin.user_id)}
                                                // disabled={btnDisabled}
                                                >
                                                    {/* data-bs-toggle="modal" data-bs-target="#exampleModal"                                               > */}
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {showAddAdminModal && (
                            <AddAdmin show={showAddAdminModal} onHide={() => setShowAddAdminModal(false)} />
                        )}

                        {showConfirmationModal ? (
                            <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Action</Modal.Title>
                                </Modal.Header>
                                <Modal.Body> <p>Are you sure you want to delete this admin?</p></Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowConfirmationModal
                                        (false)}>Cancel</Button>
                                    <Button variant="primary" onClick={handleConfirmDelete} >Confirm</Button>
                                </Modal.Footer>
                            </Modal>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminList;



