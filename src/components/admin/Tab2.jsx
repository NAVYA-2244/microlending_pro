
import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
import { useMovieContext } from '../comman/Context';
import moment from 'moment';
// import Joi from 'joi-browser';
import Joi from 'joi';

import { Date_Input, SearchInput } from '../comman/All-Inputs';
import { Link } from 'react-router-dom';
import { useFunctionContext } from '../comman/FunctionsContext';

function Tab2() {
    const { EmiHistory, setEmiHistory, } = useMovieContext();
    const { checkErrors } = useFunctionContext()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [filterDisabled, setFilterDisabled] = useState(false);
    const [isFetching, setIsFetching] = useState(false);






    // const fetchEmiHistory = async () => {
    //     console.log("hi")
    //     try {
    //         setLoading(true);

    //         const response = await backEndCall('/admin/emi_history');
    //         setLoading(false)
    //         setEmiHistory(response || []);


    //     } catch (ex) {
    //         if (ex.response && ex.response.status === 400) {
    //             toast.error(ex.response.data);
    //         }
    //     }
    //     finally {
    //         setLoading(false)
    //     }
    // };


    // useEffect(() => {
    //     if (EmiHistory.length <= 0) {
    //         fetchEmiHistory();
    //     }
    // }, []);


    const formattedDate = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };
    return (
        <div className="user-details-container">
            <h5 className="mb-4">EMI History</h5>
            <div className='card transections-hisroty'>
                <div className='card-body'>
                    < div className='d-flex'>


                    </div>
                    <div className="table-responsive">
                        <table className="table border table-bordered table-centered text-center">
                            <thead>
                                <tr className="table-head">
                                    <th scope="col">Payment Id</th>
                                    <th scope="col">Receiver Id</th>
                                    <th scope="col">Sender Id</th>
                                    <th scope="col">installment Number</th>
                                    <th scope="col">Transaction Type</th>
                                    <th scope="col">Emi Status</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Payment Date</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        </td>
                                    </tr>

                                ) : EmiHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center justify-content-center">No transactions found.</td>
                                    </tr>
                                ) : (
                                    EmiHistory.map(history => (
                                        <tr key={history.payment_id}>
                                            <td>{history.payment_id}</td>
                                            <td>{history.receved_id}</td>
                                            <td>{history.sender_id}</td>
                                            <td>{history.instalmentNumber}</td>
                                            <td>{history.transactionType}</td>
                                            <td>{history.emi_status}</td>
                                            <td>{history.paymentAmount}</td>
                                            <td>{formattedDate(history.paymentDate)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Tab2;

