

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap';
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';

function Loaneligibility() {
    const [eligibility, setEligibility] = useState([]);
    const [showAddEligibilityModal, setShowAddEligibilityModal] = useState(false);
    const [newEligibility, setNewEligibility] = useState({
        cibilScore: '',
        minLoanAmount: '',
        maxLoanAmount: '',
        tenure: [{ months: '', interest: '' }]
    });
    const [loading, setLoading] = useState(false); 
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await backEndCall("/admin/get_admin_contrls");
            console.log(response, "get response");
            setEligibility(response?.eligibility || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching admin controls:", error);
            toast.error("Failed to fetch admin controls. Please try again later.");
            setLoading(false);
        }
    };

    const handleAddEligibility = async (e) => {
                e.preventDefault();
                try {
                    setLoading(true);
                    if (editIndex !== null) {
                        const updatedEligibility = [...eligibility];
                        console.log(newEligibility,"neweligibility")
                        updatedEligibility[editIndex] = newEligibility;
                        const response = await backEndCallObj("/admin/admin_controls_update", newEligibility);
                        console.log(response, "updated");
                       
                        fetchData();
                        // eligibility[editIndex] = newEligibility
                        // console.log(updatedEligibility[editIndex],"updated eligibity")
                        // const newdata=updatedEligibility.map((ele)=>{return ele})
                        // console.log(newdata,"newdata")
                        setLoading(false);
                       setEligibility(response.eligibility);
                        console.log(eligibility,"jhjhkjh")
                        setEditIndex(null);
                  
                    } else {
                        const response = await backEndCallObj("/admin/admin_controls_update", newEligibility);
                        console.log(response, "updated");
                        fetchData();
                        setLoading(false);
                    }
                    setShowAddEligibilityModal(false);
                    setNewEligibility({
                        cibilScore: '',
                        minLoanAmount: '',
                        maxLoanAmount: '',
                        tenure: [{ months: '', interest: '' }]
                    });
                    toast.success("New eligibility added successfully");
                } catch (error) {
                    console.error("Error adding/updating eligibility:", error);
                    toast.error("Failed to add/update eligibility. Please try again later.");
                }
            };
        
            const handleShow = () => setShowAddEligibilityModal(true);
        
            const handleEditClick = (index) => {
                setEditIndex(index);
                setShowAddEligibilityModal(true);
                const selectedEligibility = eligibility[index];
                setNewEligibility(selectedEligibility);
            };
        
    const handleClose = () => {
        setShowAddEligibilityModal(false);
        setEditIndex(null);
        setNewEligibility({
            cibilScore: '',
            minLoanAmount: '',
            maxLoanAmount: '',
            tenure: [{ months: '', interest: '' }]
        });
    };

    const handleDelete = async (cibilRangeId) => {
        try {
            const response = await backEndCallObj("/admin/remove_eligibility", { cibilRangeId });
            console.log(response, "deleted response");
            toast.success("Eligibility deleted successfully");
            setEligibility(response.eligibility)
                      // fetchData();
            
        } catch (error) {
            console.error("Error deleting eligibility:", error);
            toast.error("Failed to delete eligibility. Please try again later.");
        }
    };

    const handleAddTenure = (e) => {
        e.preventDefault();
        setNewEligibility(prevState => ({
            ...prevState,
            tenure: [...prevState.tenure, { months: '', interest: '' }]
        }));
    };

    const handleDeleteTenure = (tenureIndex) => {
        setNewEligibility(prevState => {
            const updatedTenure = [...prevState.tenure];
            updatedTenure.splice(tenureIndex, 1);
            return {
                ...prevState,
                tenure: updatedTenure
            };
        });
    };

    return (
        <>
       
            <Button variant="primary" onClick={handleShow}>
                Add New eligibility
            </Button>

            {eligibility && eligibility.length > 0 ? (
                <div className="table-responsive">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>CIBIL Score</th>
                            <th>Min Loan Amount</th>
                            <th>Max Loan Amount</th>
                            <th>Tenure</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eligibility.map((eligibilityItem, index) => (
                            <tr key={index}>
                                <td>{eligibilityItem.cibilScore}</td>
                                <td>{eligibilityItem.minLoanAmount}</td>
                                <td>{eligibilityItem.maxLoanAmount}</td>
                                <td>
                                    <ul>
                                        {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
                                            <li key={tenureIndex}>
                                                {tenureItem.months} months at {tenureItem.interest}% interest
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <Button onClick={() => handleEditClick(index)} className="me-2">Edit</Button>
                                    <Button onClick={() => handleDelete(eligibilityItem.cibilRangeId)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <>
                {loading && (
                    <div className="text-center mt-3">
                        <div className="spinner-border spiner-border-sm" style={{ color: "#efefef" }} role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>)}
                    </>
            )}

            {showAddEligibilityModal ? (
                <Modal show={true} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editIndex !== null ? "Edit Eligibility" : "Add New Eligibility"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleAddEligibility}>
                            <div className="mb-3">
                            <label
                            htmlFor="nameControlInput"
                            className="form-label"
                          >
                            CIBIL Score
                          </label>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder="CIBIL Score"
                                    value={newEligibility.cibilScore}
                                    onChange={e => setNewEligibility(prevState => ({ ...prevState, cibilScore: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                            <label
                            htmlFor="nameControlInput"
                            className="form-label"
                          >
                            Minimum Loan Amount
                          </label>
                                <input
                                    className='form-control'
                                    type="number"
                                    placeholder="Minimum Loan Amount"
                                    value={newEligibility.minLoanAmount}
                                    onChange={e => setNewEligibility(prevState => ({ ...prevState, minLoanAmount: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                            <label
                            htmlFor="nameControlInput"
                            className="form-label"
                          >
                           Maximum Loan Amount
                          </label>
                                <input
                                    className='form-control'
                                    type="number"
                                    placeholder="Maximum Loan Amount"
                                    value={newEligibility.maxLoanAmount}
                                    onChange={e => setNewEligibility(prevState => ({ ...prevState, maxLoanAmount: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label>Tenure:</label>
                                {newEligibility.tenure.map((tenure, index) => (
                                    <div key={index}>
                                         <label
                            htmlFor="nameControlInput"
                            className="form-label"
                          >
                            Months
                          </label>
                                        <input
                                            className='form-control mb-3'
                                            type="number"
                                            placeholder="Months"
                                            value={tenure.months}
                                            onChange={e => {
                                                const updatedTenure = [...newEligibility.tenure];
                                                updatedTenure[index] = { ...updatedTenure[index], months: e.target.value };
                                                setNewEligibility(prevState => ({ ...prevState, tenure: updatedTenure }));
                                            }}
                                            name={`months_${index}`}
                                        />
                                         <label
                            htmlFor="nameControlInput"
                            className="form-label"
                          >
                           Interest
                          </label>
                                        <input
                                            className='form-control mb-3'
                                            type="number"
                                            placeholder="Interest"
                                            value={tenure.interest}
                                            onChange={e => {
                                                const updatedTenure = [...newEligibility.tenure];
                                                updatedTenure[index] = { ...updatedTenure[index], interest: e.target.value };
                                                setNewEligibility(prevState => ({ ...prevState, tenure: updatedTenure }));
                                            }}
                                            name={`interest_${index}`}
                                            
                                        />
                                        <button  className="btn-primary btn"onClick={() => handleDeleteTenure(index)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                            
                            <div>
                                <button  className="btn-primary btn me-2"onClick={handleAddTenure}>Add Tenure</button>
                                <Button variant="primary" type="submit">{editIndex !== null ? "Update" : "Submit"}</Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            ) : null}
        </>
        
    );
}

export default Loaneligibility;


