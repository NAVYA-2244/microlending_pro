
import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
import authService from '../../services/authService';
import moment from 'moment';
import Joi from 'joi-browser';
import { Date_Input, SearchInput } from '../comman/All-Inputs';
import { Link } from 'react-router-dom';
import EmiHistory from './EmiHistory';
import { useMovieContext } from '../comman/Context';

function TransactionHistory() {

    const { transactionHistory, setTransactionHistory } = useMovieContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterDisabled, setFilterDisabled] = useState(false);

    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        id: ""

    });

    const schema = Joi.object({
        start_date: Joi.date().required(),
        end_date: Joi.date().min(Joi.ref('start_date')).required(),

        id: Joi.string().min(12).max(12).required().allow('').optional()
    });

    const fetchTransactionHistory = async () => {

        console.log(transactionHistory.length)
        try {
            if (transactionHistory.length == 0) {
                console.log("yes")
                setLoading(true);
                const response = await backEndCall('/users/transaction_history');
                // if (Array.isArray(response)) {
                setLoading(false);
                setTransactionHistory(response || []);
            }
            // else {
            //     setTransactionHistory([]);
            // }

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
            setError(ex.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        // if (transactionHistory <= 0) {
        fetchTransactionHistory();
        // }
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (moment(formData.end_date).isBefore(formData.start_date)) {
            toast.error("End Date cannot be less than Start Date");
            return;
        }

        try {
            setFilterDisabled(true)
            setLoading(true);
            console.log(formData)

            const response = await backEndCallObj("/users/transaction_filtered", formData);
            console.log(response, "responsedate")
            setTransactionHistory(response)
            setFormData({
                start_date: "",
                end_date: "",
                id: ""
            })
            setFilterDisabled(false)
            setLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }

        }
        finally {
            setFilterDisabled(false)
            setLoading(false);
            setFormData({
                start_date: "",
                end_date: "",
                id: ""
            })
        }
    };
    const handleRefresh = async () => {
        console.log("hello")

        try {
            setLoading(true)

            const response = await backEndCall('/users/transaction_history');
            console.log(response, "response")
            if (Array.isArray(response)) {
                setTransactionHistory(response);
            } else {
                setTransactionHistory([]);
            }
            setLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
            setError(ex.message);
            setLoading(false);
        }

    };


    console.log(transactionHistory)

    return (
        <>
            <h5 className="mb-4">Transaction History</h5>
            <div className='card'>
                <div className="card-body">
                    <div className='d-flex'>

                        <div onClick={handleRefresh}>
                            <i className="ri-loop-right-line text-primary fs-22"

                            ></i></div>
                        {/* </Link> */}
                        <form onSubmit={handleSubmit} className='flex-fill'>
                            <div className="row mb-3 d-flex justify-content-end">
                                <div className="col-12 col-xl-2 col-md-2 col-sm-12">

                                    <label htmlFor="startDate" className="form-label">Start Date</label>
                                    <Date_Input
                                        type={"date"}
                                        value={formData["start_date"]}
                                        name={"start_date"}
                                        SetForm={setFormData}
                                        schema={schema["start_date"]}
                                        max={moment().format("YYYY-MM-DD")}

                                        required
                                    />
                                </div>
                                <div className="col-12 col-xl-2 col-md-2 col-sm-12">

                                    <label htmlFor="endtDate" className="form-label">End Date</label>
                                    <Date_Input
                                        type={"date"}
                                        value={formData["end_date"]}
                                        name={"end_date"}
                                        SetForm={setFormData}
                                        schema={schema["end_date"]}
                                        max={moment().format("YYYY-MM-DD")}


                                        required
                                    />
                                </div>
                                <div className="col-12 col-xl-2 col-md-2 col-sm-12 mt-auto">
                                    {/* <label htmlFor="serch" className="form-label">Serch<span className="text-danger">*</span></label> */}
                                    <SearchInput

                                        type="text"
                                        name="id"
                                        value={formData["id"]}
                                        placeholder="transaction id "
                                        SetForm={setFormData}
                                        schema={schema["id"]}
                                    />
                                </div>
                                <div className='col-12 col-xl-2 col-md-2 col-sm-12 my-auto'>

                                    {/* <button type="submit" className="btn btn-primary mt-2" disabled={filterDisabled}>
                                        Search
                                    </button> */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-2"
                                        disabled={filterDisabled || !(formData.start_date && formData.end_date || formData.id)}
                                    >
                                        Search
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="table-responsive">



                        <table className="table border table-bordered table-centered">
                            <thead>
                                <tr className="table-head">
                                    <th scope="col">Transaction Id</th>
                                    <th scope="col">Receiver Id</th>
                                    <th scope="col">Sender Id</th>
                                    <th scope="col">Transaction Type</th>
                                    <th scope="col">Transaction Status</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Comment</th>
                                    <th scope="col">Transaction Date</th>
                                </tr>
                            </thead>
                            <tbody className="table-body text-center">
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                                                <span className="sr-only"></span>
                                            </div>
                                        </td>
                                    </tr>

                                ) : transactionHistory.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">No transactions found.</td>
                                    </tr>
                                ) : (


                                    transactionHistory?.map(history => (
                                        <tr key={history.transaction_id}>
                                            <td>{history.transaction_id}</td>
                                            <td>{history.receiver_id}</td>
                                            <td>{history.sender_id}</td>
                                            <td>{history.transactionType}</td>
                                            <td>{history.transaction_status}</td>
                                            <td>{history.amount}</td>
                                            <td>{history.comment}</td>
                                            <td>{new Date(history.transactionDate).toLocaleString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                    </div >
                </div >
            </div>
        </>
    );
}


export default TransactionHistory;
