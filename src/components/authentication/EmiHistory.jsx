
import React, { useEffect, useState } from 'react';
import { toast } from "react-hot-toast";
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
import { useMovieContext } from '../comman/Context';
import moment from 'moment';
import Joi from 'joi-browser';
import { Date_Input, SearchInput } from '../comman/All-Inputs';
import { Link } from 'react-router-dom';

function EmiHistory() {
    const { EmiHistory, setEmiHistory } = useMovieContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [filterDisabled, setFilterDisabled] = useState(false);
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        id: ""
    });

    const schema = Joi.object({
        start_date: Joi.date().required(),
        end_date: Joi.date().min(Joi.ref('start_date')).required(),
        id: Joi.string().min(12).max(12).allow('').optional()
    });

    const fetchEmiHistory = async () => {
        try {
            setLoading(true);
            const response = await backEndCall('/emi/emi_history');
            if (Array.isArray(response)) {
                setEmiHistory(response);
            } else {
                setEmiHistory([]);
            }
            setLoading(false);
        } catch (ex) {
            toast.error("An error occurred while fetching data.");
            setLoading(false);
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



            const response = await backEndCallObj("/emi/emi_filters", formData);
            setEmiHistory(response);

            setFormData({
                start_date: "",
                end_date: "",
                id: ""
            });

            // toast.success("Search successful.");
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
        try {
            setLoading(true);
            const response = await backEndCall('/emi/emi_history');
            if (Array.isArray(response)) {
                setEmiHistory(response);
            } else {
                setEmiHistory([]);
            }
            setLoading(false);

        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.massage);
            }
            setLoading(false)

        };
    }

    return (
        <div className="user-details-container">
            <h5 className="mb-4">EMI History</h5>
            <div className='card transections-hisroty'>
                <div className='card-body'>
                    < div className='d-flex'>
                        <div onClick={handleRefresh}>
                            {/* <Link to="/Emihistory">  */}
                            <i className="ri-loop-right-line text-primary fs-22" onClick={handleRefresh}></i>
                            {/* </Link> */}
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
                                        placeholder="Emi Id "
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
                                    <th scope="col">Instalment Number</th>
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
                                        <td colSpan="7" className="text-center">No transactions found.</td>
                                    </tr>
                                ) : (
                                    EmiHistory.map(history => (
                                        <tr key={history.emi_id}>
                                            <td>{history.payment_id}</td>
                                            <td>{history.receved_id}</td>
                                            <td>{history.sender_id}</td>
                                            <td>{history.instalmentNumber}</td>
                                            <td>{history.transactionType}</td>
                                            <td>{history.emi_status}</td>
                                            <td>{history.paymentAmount}</td>
                                            <td>{new Date(parseInt(history.paymentDate)).toLocaleString()}</td>
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

