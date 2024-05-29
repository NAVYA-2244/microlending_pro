
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

function EmiHistory() {
    const { EmiHistory, setEmiHistory, } = useMovieContext();
    const { checkErrors } = useFunctionContext()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [filterDisabled, setFilterDisabled] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

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

    const fetchEmiHistory = async () => {
        console.log("hi")
        try {
            setLoading(true);

            const response = await backEndCall('/emi/emi_history');
            setLoading(false)
            setEmiHistory(response || []);


        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        }
        finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        if (EmiHistory.length <= 0) {
            fetchEmiHistory();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (moment(formData.end_date).isBefore(formData.start_date)) {
            toast.error("End Date cannot be less than Start Date");
            return;
        }
        try {
            setLoading(true);
            setFilterDisabled(true);

            await checkErrors(schema, formData);

            const formDataToSend = {
                ...formData,
                id: formData.id.toUpperCase()
            };

            const response = await backEndCallObj("/emi/emi_filters", formDataToSend);
            setEmiHistory(response);
            console.log(response, "filteremi")
            setFormData({
                start_date: "",
                end_date: "",
                id: ""
            });


        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);

                setEmiHistory("")
            }
        }
        finally {
            setFilterDisabled(false);
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
            await fetchEmiHistory();
        } finally {
            setIsFetching(false);
        }
    };


    const formattedDate = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    };
    function capitalizeFirstLetter(string) {
        if (!string) return ""; // Handle cases where string is undefined or null
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <div className="user-details-container">
            <h5 className="mb-4">EMI History</h5>
            <div className='card transections-hisroty'>
                <div className='card-body'>
                    < div className='d-flex'>
                        <div onClick={handleRefresh} disabled={isFetching}>

                            {/* <i className="ri-loop-right-line text-primary fs-22 cursor-pointer me-2"></i> */}
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
                                        placeholder="Payment Id "
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
                                            <td>{capitalizeFirstLetter(history.transactionType)}</td>
                                            <td>{capitalizeFirstLetter(history.emi_status)}</td>
                                            <td>₱{history.paymentAmount}</td>
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

export default EmiHistory;

