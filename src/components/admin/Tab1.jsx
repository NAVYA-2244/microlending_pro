
// import React, { useState, useEffect } from 'react';
// import { toast } from "react-hot-toast";
// import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
// import authService from '../../services/authService';
// import moment from 'moment';
// import Joi from 'joi';
// import { Date_Input, SearchInput } from '../comman/All-Inputs';
// import { Link } from 'react-router-dom';

// import { useMovieContext } from '../comman/Context';
// import { useFunctionContext } from '../comman/FunctionsContext';
// import { log } from 'numeric';

// function Tab1() {

//     const { transactionHistory, setTransactionHistory, errors, setErrors, setErrorOccur } = useMovieContext();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [filterDisabled, setFilterDisabled] = useState(false);
//     const [isFetching, setIsFetching] = useState(false);


//     const { checkErrors } = useFunctionContext()


//     // const fetchTransactionHistory = async () => {

//     //     console.log(transactionHistory.length)
//     //     try {

//     //         console.log("yes")
//     //         setLoading(true);
//     //         const response = await backEndCall('/admin/transaction_history');
//     //         console.log(response)

//     //         setLoading(false);
//     //         setTransactionHistory(response || []);


//     //     } catch (ex) {
//     //         if (ex.response && ex.response.status === 400) {
//     //             toast.error(ex.response.data);
//     //         }
//     //         setError(ex.message);
//     //         setLoading(false);
//     //     }
//     // };

//     // useEffect(() => {
//     //     if (transactionHistory.length == 0) {
//     //         fetchTransactionHistory();
//     //     }
//     // }, []);




//     // console.log(transactionHistory)

//     const formattedDate = (date) => {
//         return moment(date).format('YYYY-MM-DD HH:mm:ss');
//     };
//     function capitalizeFirstLetter(string) {
//         if (!string) return "";
//         return string.charAt(0).toUpperCase() + string.slice(1);
//     }
//     return (
//         <>
//             <h5 className="mb-4">Transaction History</h5>
//             <div className='card'>
//                 <div className="card-body">

//                     {/* <div className="table-responsive">



//                         <table className="table border table-bordered table-centered">
//                             <thead>
//                                 <tr className="table-head text-center">
//                                     <th scope="col">Transaction Id</th>
//                                     <th scope="col">Receiver Id</th>
//                                     <th scope="col">Sender Id</th>
//                                     <th scope="col">Transaction Type</th>
//                                     <th scope="col">Transaction Status</th>
//                                     <th scope="col">Amount</th>
//                                     <th scope="col">Comment</th>
//                                     <th scope="col">Transaction Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="table-body text-center">
//                                 {loading ? (
//                                     <tr>
//                                         <td colSpan="7" className="text-center">
//                                             <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
//                                                 <span className="sr-only"></span>
//                                             </div>
//                                         </td>
//                                     </tr>

//                                 ) : transactionHistory?.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="7" className="text-center justify-content-center">No transactions found.</td>
//                                     </tr>
//                                 ) : (


//                                     transactionHistory && transactionHistory.length > 0 && transactionHistory.map(history => (
//                                         <tr key={history.transaction_id}>
//                                             <td>{history.transaction_id}</td>
//                                             <td>{history.receiver_id}</td>
//                                             <td>{history.sender_id}</td>
//                                             <td>{history.transactionType}</td>
//                                             <td>{history.transaction_status}</td>
//                                             <td>{history.amount}</td>
//                                             <td>{history.comment}</td>
//                                             <td>{formattedDate(history.transactionDate)}</td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>

//                     </div > */}
//                     <div className="table-responsive">
//                         <table className="table border table-bordered table-centered">
//                             <thead>
//                                 <tr className="table-head text-center">
//                                     <th scope="col">Date</th>
//                                     <th scope="col">Transaction Id</th>
//                                     <th scope="col">Loan Id</th>
//                                     <th scope="col">Amount</th>
//                                     <th scope="col">Type</th>
//                                     <th scope="col">Comment</th>
//                                     <th scope="col">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="table-body text-center">
//                                 {transactionHistory && transactionHistory.length > 0 && transactionHistory.map(history => (
//                                     <tr key={history?.transaction_id} ref={handleRe}>
//                                         <td>{formattedDate(history?.transactionDate)}</td>
//                                         <td>{history?.transaction_id}</td>
//                                         <td>{history?.loan_id}</td>
//                                         <td>₱ {history?.amount}</td>
//                                         <td>{capitalizeFirstLetter(history?.transactionType)}</td>
//                                         <td>{history?.comment}</td>
//                                         <td>{capitalizeFirstLetter(history?.transaction_status)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>

//                         </table>
//                         {loading && (
//                             <div className="d-flex justify-content-center align-items-center">
//                                 <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
//                                     <span className="sr-only"></span>
//                                 </div>
//                             </div>
//                         )}
//                         {transactionHistory?.length === 0 && (
//                             <div className="d-flex justify-content-center align-items-center">
//                                 <div className="text-center">
//                                     No transactions found.
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div >
//             </div>
//         </>
//     );
// }


// export default Tab1;
import React, { useCallback, useRef } from 'react';
import moment from 'moment';

function Tab1({ transactionHistory, handleTabTransection, loading }) {
    const observer = useRef();

    const handleRef = useCallback(
        (node) => {
            if (loading) return; // Do not proceed if loading

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {

                    if (transactionHistory.length >= 10) {
                        console.log("Intersection observed, fetching more data...");

                        handleTabTransection()


                    }
                }
            }, {
                threshold: 1 // Ensure fetchData is called when last row completely visible
            });

            if (node) observer.current.observe(node);

            return () => {
                if (observer.current) observer.current.disconnect();
            };
        },
        [loading, handleTabTransection] // Dependencies for useCallback
    );
    console.log(transactionHistory, "------------->")

    const formattedDate = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className='card'>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table border table-bordered table-centered">
                        <thead>
                            <tr className="table-head text-center">
                                <th scope="col">Date</th>
                                <th scope="col">Transaction Id</th>
                                <th scope="col">Loan Id</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Type</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody className="table-body text-center">
                            {transactionHistory && transactionHistory.length > 0 && transactionHistory.map((history, index) => (
                                <tr key={history?.transaction_id} ref={handleRef}>
                                    <td>{formattedDate(history?.transactionDate)}</td>
                                    <td>{history?.transaction_id}</td>
                                    <td>{history?.loan_id}</td>
                                    <td>₱ {history?.amount}</td>
                                    <td>{capitalizeFirstLetter(history?.transactionType)}</td>
                                    <td>{history?.comment}</td>
                                    <td>{capitalizeFirstLetter(history?.transaction_status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {transactionHistory?.length === 0 && !loading && (
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="text-center">
                                No transactions found.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tab1;
