// import React, { useEffect, useState } from 'react';
// import { backEndCallObj } from '../../services/mainServiceFile';
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-hot-toast";
// import AddAdmin from './Addadmin';
// import { useMovieContext } from "../comman/Context";
// import authService from "./../../services/authService";
// // import { getCurrentUser } from './../../services/authService';
// function AdminList() {
//     const navigate = useNavigate()
//     const [loading, setLoading] = useState(false);
//     const [deleting, setDeleting] = useState(false)
//     const { adminData, setAdminData } = useMovieContext();
//     // const [adminData, setAdminData] = useState([]);
//     const [showAddAdminModal, setShowAddAdminModal] = useState(false);

//     const fetchData = async () => {
//         try {
//             setLoading(true)
//             const response = await backEndCallObj("/admin/admins_list");
//             setAdminData(response);
//             setLoading(false)
//             console.log(response, "adminlist");
//         } catch (error) {
//             console.error("Error fetching user profile:", error);
//             setLoading(false)
//         }
//     };

//     useEffect(() => {

//         fetchData();


//     }, []);

//     const handleDeleteAdmin = async (user_id, id) => {
//         try {
//             setLoading(true)


//             setDeleting(user_id)

//             const response = await backEndCallObj("/admin/admin_remove", { user_id });

//             console.log(response, "admin delete");
//             fetchData();
//             setLoading(true)
//         } catch (error) {
//             console.error("Error deleting admin:", error);
//             setLoading(false)
//         }
//     };

//     // if (authService.getCurrentUser().admin_type !== "1") {
//     //     window.history.back(/dashboord);

//     //   }
//     return (

//         <div className="table-responsive">
//             <button
//                 type="button"
//                 className="btn btn-primary btn-block mb-3"

//                 onClick={() => setShowAddAdminModal(true)}

//             >
//                 Add Admin
//             </button>
//             <table className="table border table-bordered table-centered">
//                 <thead>
//                     <tr className="table-head">
//                         <th scope="col">Date</th>
//                         <th scope="col">Admin ID</th>
//                         <th scope="col">Name</th>
//                         <th scope="col">Phone Number</th>
//                         <th scope="col">Admin Type </th>
//                         <th scope="col">Action </th>
//                     </tr>
//                 </thead>
//                 <tbody className="table-body">
//                     {adminData?.map((admin) => (
//                         <tr key={admin.user_id}>
//                             <td>{admin.date_of_register}</td>
//                             <td>{admin.user_id}</td>
//                             <td>{admin.first_name}{admin.last_name}</td>
//                             <td>{admin.phone_number}</td>
//                             <td>{admin.admin_type}</td>
//                             <td>
//                                 <button
//                                     type="button"
//                                     className="btn btn-danger btn-block"
//                                     onClick={() => handleDeleteAdmin(admin.user_id, admin.user_id)}
//                                     disabled={loading}
//                                 >
//                                     {deleting === admin.user_id ? 'Deleting...' : 'Delete'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             {showAddAdminModal ? (
//                 <AddAdmin show={showAddAdminModal} onHide={() => setShowAddAdminModal(false)} />) : null}

//         </div>
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

function AdminList() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false)
    const { adminData, setAdminData } = useMovieContext();
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await backEndCallObj("/admin/admins_list");
            setAdminData(response);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to fetch admin list. Please try again later.");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteAdmin = async (user_id, id) => {
        try {
            setLoading(true)
            setDeleting(user_id)
            const response = await backEndCallObj("/admin/admin_remove", { user_id });
            console.log(response, "admin delete");
            fetchData();
        } catch (error) {
            console.error("Error deleting admin:", error);
            toast.error("Failed to delete admin. Please try again later.");
        } finally {
            setLoading(false)
        }
    };

    return (
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
                    <div className="spinner-border spiner-border-sm" style={{ color: "#efefef" }} role="status">
                        <span className="sr-only"></span>
                    </div>
                </div></p>
            ) : (
                <table className="table border table-bordered table-centered">
                    <thead>
                        <tr className="table-head">
                            <th scope="col">Date</th>
                            <th scope="col">Admin ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Admin Type </th>
                            <th scope="col">Action </th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {adminData?.map((admin) => (
                            <tr key={admin.user_id}>
                                <td>{admin.date_of_register}</td>
                                <td>{admin.user_id}</td>
                                <td>{admin.first_name}{admin.last_name}</td>
                                <td>{admin.phone_number}</td>
                                <td>{admin.admin_type}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-block"
                                        onClick={() => handleDeleteAdmin(admin.user_id, admin.user_id)}
                                        disabled={loading}
                                    >
                                        {deleting === admin.user_id ? 'Deleting...' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showAddAdminModal ? (
                <AddAdmin show={showAddAdminModal} onHide={() => setShowAddAdminModal(false)} />
            ) : null}
        </div>
    );
}

export default AdminList;
