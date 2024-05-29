
import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
import authService from '../../services/authService';
import moment from 'moment';
import Joi from 'joi';
import { Date_Input, SearchInput } from '../comman/All-Inputs';
import { Link } from 'react-router-dom';

import { useMovieContext } from '../comman/Context';
import { useFunctionContext } from '../comman/FunctionsContext';
import { log } from 'numeric';

function TransactionHistory() {

    const { transactionHistory, setTransactionHistory, errors, setErrors, setErrorOccur } = useMovieContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterDisabled, setFilterDisabled] = useState(false);
    const [isFetching, setIsFetching] = useState(false);


    const { checkErrors } = useFunctionContext()
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        id: ""

    });

    const schema = {
        start_date: Joi.date().allow('').optional(),
        end_date: Joi.date().allow('').optional(),
        id: Joi.string().min(4).max(12).required().allow('').optional()
    };

    const fetchTransactionHistory = async () => {

        console.log(transactionHistory.length)
        try {
            // if (transactionHistory.length == 0) {
            console.log("yes")
            setLoading(true);
            const response = await backEndCall('/users/transaction_history_all');
            console.log(response)
            // if (Array.isArray(response)) {
            setLoading(false);
            setTransactionHistory(response || []);
            // }
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
        if (transactionHistory.length == 0) {
            fetchTransactionHistory();
        }
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        //  const { error } = schema.validate(formData);
        //     if (error) {
        //         toast.error(error.details[0].message)
        //         throw new Error(error.details[0].message);
        //     }

        if (moment(formData.end_date).isBefore(formData.start_date)) {
            toast.error("End Date cannot be less than Start Date");
            return;
        }


        try {
            setFilterDisabled(true)
            setLoading(true);
            // const { errors } = schema.validate(...formData);
            // console.log(errors, "errors")
            // if (errors) {
            //     console.log(errors, "error")
            //     toast.error(error.details[0].message)
            //     throw new Error(error.details[0].message);
            // }
            await checkErrors(schema, formData);

            console.log(formData)
            const formDataToSend = {
                ...formData,
                id: formData.id.toUpperCase()
            };

            const response = await backEndCallObj("/users/transaction_filtered", formDataToSend);
            console.log(response, "responsedate")

            setTransactionHistory(response || []);

            // setTransactionHistory(response)
            setFormData({
                start_date: "",
                end_date: "",
                id: ""
            })
            setFilterDisabled(false)
            setLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                setTransactionHistory([])

                toast.error(ex.response.data);
                setLoading(false);
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
        if (isFetching) return;

        setIsFetching(true);
        try {
            await fetchTransactionHistory();
        } finally {
            setIsFetching(false);
        }
    };


    console.log(transactionHistory)

    const formattedDate = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };
    function capitalizeFirstLetter(string) {
        if (!string) return ""; // Handle cases where string is undefined or null
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <>
            <h5 className="mb-4">Transaction History</h5>
            <div className='card'>
                <div className="card-body">
                    <div className='d-flex '>

                        <div onClick={handleRefresh} disabled={isFetching}>
                            {isFetching ? (
                                <div className="spinner-border text-primary" role="status" style={{ height: "20px", width: "20px" }}>

                                </div>
                            ) : (
                                <i className="ri-loop-right-line text-primary fs-22 cursor-pointer me-2"></i>
                            )}
                        </div>

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
                                        value={formData["end_date"].toUpperCase()}
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
                                        placeholder="Transaction id "
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
                                <tr className="table-head text-center">
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

                                ) : transactionHistory?.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center justify-content-center">No transactions found.</td>
                                    </tr>
                                ) : (


                                    transactionHistory && transactionHistory.length > 0 && transactionHistory.map(history => (
                                        <tr key={history.transaction_id}>
                                            <td>{history.transaction_id}</td>
                                            <td>{history.receiver_id}</td>
                                            <td>{history.sender_id}</td>
                                            <td> {capitalizeFirstLetter(history.transactionType)}</td>
                                            <td>{capitalizeFirstLetter(history.transaction_status)}</td>
                                            <td> ₱ {history.amount}</td>
                                            <td>{history.comment}</td>
                                            <td>{formattedDate(history.transactionDate)}</td>
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
