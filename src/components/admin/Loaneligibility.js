

// import React, { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { Modal, Button } from 'react-bootstrap';
// import { useMovieContext } from '../comman/Context';
// import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
// import Joi from 'joi';

// function Loaneligibility() {
//     const { eligibility, setEligibility, setErrors } = useMovieContext();
//     const [showAddEligibilityModal, setShowAddEligibilityModal] = useState(false);
//     const [btnDisabled, setBtnDisabled] = useState(false);
//     const [newEligibility, setNewEligibility] = useState({
//         cibilScore: '',
//         minLoanAmount: '',
//         maxLoanAmount: '',
//         tenure: [{ months: '', interest: '' }]
//     });
//     const schema = {
//         cibilScore: Joi.string()
//             .optional()
//             .pattern(/^\d+-\d+$/)
//             .required()
//             .messages({
//                 "string.pattern.base":
//                     "Invalid CIBIL Score format. Please enter a valid format like '300-900'.",
//             }),
//         maxLoanAmount: Joi.number().min(500).required(),
//         minLoanAmount: Joi.number().min(0).required(),
//     };
//     const [loading, setLoading] = useState(false);
//     const [editIndex, setEditIndex] = useState(null);
//     const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
//     const [deletingCibilRangeId, setDeletingCibilRangeId] = useState(null);

//     useEffect(() => {
//         if (eligibility <= 0) {
//             fetchData();
//         }
//     }, []);

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const response = await backEndCall("/admin/get_admin_controls");
//             // console.log(response,"response")
//             setEligibility(response?.eligibility || []);
//             setLoading(false);
//         } catch (ex) {
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response.data);
//             }
//         }
//     };

//     const handleAddEligibility = async (e) => {
//         e.preventDefault();
//         setBtnDisabled(true);
//         try {
//             setLoading(true);
//             if (editIndex !== null) {
//                 const updatedEligibility = [...eligibility];
//                 updatedEligibility[editIndex] = newEligibility;
//                 const obj1String = JSON.stringify(eligibility)
//                 const obj2String = JSON.stringify(updatedEligibility)
//                 if (obj1String === obj2String) {
//                     window.location.href = '/loaneligibility';
//                     // console.log('same');
//                 }
//                 const response = await backEndCallObj("/admin/admin_controls_update", newEligibility);
//                 fetchData();
//                 setLoading(false);
//                 setEligibility(response.eligibility);
//                 setEditIndex(null);
//             } else {
//                 const response = await backEndCallObj("/admin/admin_controls_update", newEligibility);
//                 fetchData();
//                 setLoading(false);
//             }
//             setShowAddEligibilityModal(false);
//             setNewEligibility({
//                 cibilScore: '',
//                 minLoanAmount: '',
//                 maxLoanAmount: '',
//                 tenure: [{ months: '', interest: '' }]
//             });
//             toast.success("New eligibility added successfully");
//         } catch (ex) {
//             if (ex.response && ex.response.status === 400) {
//                 // console.log(ex.response?.data);
//                 toast.error(ex.response?.data);
//             }
//         } finally {
//             setBtnDisabled(false);
//         }
//     };

//     const handleShow = () => setShowAddEligibilityModal(true);

//     const handleEditClick = (index) => {
//         setEditIndex(index);
//         setShowAddEligibilityModal(true);
//         const selectedEligibility = eligibility[index];
//         setNewEligibility(selectedEligibility);
//     };

//     const handleClose = () => {
//         setShowAddEligibilityModal(false);
//         setEditIndex(null);
//         setNewEligibility({
//             cibilScore: '',
//             minLoanAmount: '',
//             maxLoanAmount: '',
//             tenure: [{ months: '', interest: '' }]
//         });
//     };

//     const handleAddTenure = (e) => {
//         setBtnDisabled(true);
//         e.preventDefault();
//         setNewEligibility(prevState => ({
//             ...prevState,
//             tenure: [...prevState.tenure, { months: '', interest: '' }]
//         }));
//         setBtnDisabled(false);
//     };

//     const handleDeleteTenure = (tenureIndex) => {
//         setBtnDisabled(true);
//         setNewEligibility(prevState => {
//             const updatedTenure = [...prevState.tenure];
//             updatedTenure.splice(tenureIndex, 1);
//             return {
//                 ...prevState,
//                 tenure: updatedTenure
//             };
//         });
//         setBtnDisabled(false);
//     };

//     const handleDeleteClick = (cibilRangeId) => {
//         setDeletingCibilRangeId(cibilRangeId);
//         // console.log("handle delete")
//         setShowDeleteConfirmation(true);
//     };

//     const handleConfirmDelete = async () => {
//         try {
//             await handleDelete(deletingCibilRangeId);
//             setShowDeleteConfirmation(false);
//             setDeletingCibilRangeId(null);
//         } catch (error) {
//             // Handle error if necessary
//         }
//     };

//     const handleCancelDelete = () => {
//         setShowDeleteConfirmation(false);
//         setDeletingCibilRangeId(null);
//     };

//     const handleDelete = async (cibilRangeId) => {
//         setBtnDisabled(true);
//         try {
//             const response = await backEndCallObj("/admin/remove_eligibility", { cibilRangeId });
//             toast.success("Eligibility deleted successfully");

//             setEligibility(response.eligibility);
//         } catch (ex) {
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response?.data);
//             }
//         } finally {
//             setBtnDisabled(false);
//         }
//     };
//     useEffect(() => {
//         // Clean up errors when component unmounts
//         return () => {
//             setErrors({});
//         };
//     }, []);
//     return (
//         <>
//             <div className="user-details-container">
//                 <h5 className="mb-4">Eligibility Loans</h5>
//                 <div className='card'>
//                     <div className='card-body scrolleHidden ' style={{ overflowY: "auto", height: "70vh" }}>
//                         <Button variant="primary mb-4" onClick={handleShow} disabled={btnDisabled}>
//                             Add New eligibility
//                         </Button>


//                         <div className="table-responsive">
//                             <table className="table table-bordered table-centered">
//                                 <thead className='text-center'>
//                                     <tr>
//                                         <th>Credit Score</th>
//                                         {/* <th>Present credit score</th> */}
//                                         <th>Min Loan Amount</th>
//                                         <th>Max Loan Amount</th>
//                                         <th>Tenure</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className='align-middle text-center'>
//                                     {eligibility.map((eligibilityItem, index) => (
//                                         <tr key={index}>
//                                             <td>{eligibilityItem.cibilScore}</td>
//                                             <td>{eligibilityItem.minLoanAmount}</td>
//                                             <td>{eligibilityItem.maxLoanAmount}</td>
//                                             <td>
//                                                 <ul>
//                                                     {eligibilityItem.tenure.map((tenureItem, tenureIndex) => (
//                                                         <li key={tenureIndex}>
//                                                             {tenureItem.months} months at {tenureItem.interest}% interest
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </td>
//                                             <td>
//                                                 <Button onClick={() => handleEditClick(index)} className="me-2 mb-2" disabled={btnDisabled} >Edit</Button>
//                                                 <Button onClick={() => handleDeleteClick(eligibilityItem.cibilRangeId)} disabled={btnDisabled} className='mb-2 me-2'>Delete</Button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>

//                         <>
//                             {loading && (
//                                 <div className="text-center mt-3">
//                                     <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
//                                         <span className="sr-only"></span>
//                                     </div>
//                                 </div>)}
//                         </>


//                         {showAddEligibilityModal ? (
//                             <Modal show={showAddEligibilityModal} onHide={handleClose}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>{editIndex !== null ? "Edit Eligibility" : "Add New Eligibility"}</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <form onSubmit={handleAddEligibility}>
//                                         <div className="mb-3">
//                                             <label htmlFor="nameControlInput" className="form-label">CIBIL Score</label>
//                                             <input
//                                                 className='form-control'
//                                                 type="text"
//                                                 placeholder="CIBIL Score"
//                                                 value={newEligibility.cibilScore}
//                                                 onChange={e => setNewEligibility(prevState => ({ ...prevState, cibilScore: e.target.value }))}
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="nameControlInput" className="form-label">Minimum Loan Amount</label>
//                                             <input
//                                                 className='form-control'
//                                                 type="number"
//                                                 placeholder="Minimum Loan Amount"
//                                                 value={newEligibility.minLoanAmount}
//                                                 onChange={e => setNewEligibility(prevState => ({ ...prevState, minLoanAmount: e.target.value }))}
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="nameControlInput" className="form-label">Maximum Loan Amount</label>
//                                             <input
//                                                 className='form-control'
//                                                 type="number"
//                                                 placeholder="Maximum Loan Amount"
//                                                 value={newEligibility.maxLoanAmount}
//                                                 onChange={e => setNewEligibility(prevState => ({ ...prevState, maxLoanAmount: e.target.value }))}
//                                                 required
//                                             />
//                                         </div>
//                                         <div className="mb-3">
//                                             <label>Tenure:</label>
//                                             {newEligibility.tenure.map((tenure, index) => (
//                                                 <div key={index}>
//                                                     <label htmlFor="nameControlInput" className="form-label">Months</label>
//                                                     <input
//                                                         className='form-control mb-3'
//                                                         type="number"
//                                                         placeholder="Months"
//                                                         value={tenure.months}
//                                                         onChange={e => {
//                                                             const updatedTenure = [...newEligibility.tenure];
//                                                             updatedTenure[index] = { ...updatedTenure[index], months: e.target.value };
//                                                             setNewEligibility(prevState => ({ ...prevState, tenure: updatedTenure }));
//                                                         }}
//                                                         name={`months_${index}`}
//                                                     />
//                                                     <label htmlFor="nameControlInput" className="form-label">Interest</label>
//                                                     <input
//                                                         className='form-control mb-3'
//                                                         type="number"
//                                                         placeholder="Interest"
//                                                         value={tenure.interest}
//                                                         onChange={e => {
//                                                             const updatedTenure = [...newEligibility.tenure];
//                                                             updatedTenure[index] = { ...updatedTenure[index], interest: e.target.value };
//                                                             setNewEligibility(prevState => ({ ...prevState, tenure: updatedTenure }));
//                                                         }}
//                                                         name={`interest_${index}`}
//                                                     />
//                                                     <button className="btn-primary btn" onClick={() => handleDeleteTenure(index)}>Delete</button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div>
//                                             <button className="btn-primary btn me-2" onClick={handleAddTenure}>Add Tenure</button>
//                                             <Button variant="primary" type="submit" disabled={btnDisabled}>{editIndex !== null ? "Update" : "Submit"}</Button>
//                                         </div>
//                                     </form>
//                                 </Modal.Body>
//                             </Modal>
//                         ) : null}
//                         {showDeleteConfirmation ? (
//                             <Modal show={showDeleteConfirmation} onHide={handleCancelDelete}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>Confirmation</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     Are you sure you want to delete this eligibility?
//                                 </Modal.Body>
//                                 <Modal.Footer>
//                                     <Button variant="secondary" onClick={handleCancelDelete}>
//                                         Cancel
//                                     </Button>
//                                     <Button variant="danger" onClick={handleConfirmDelete}>
//                                         Delete
//                                     </Button>
//                                 </Modal.Footer>
//                             </Modal>
//                         ) : null}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Loaneligibility;

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMovieContext } from '../comman/Context';
import { backEndCall, backEndCallObj } from '../../services/mainServiceFile';
import Joi from 'joi';

function Loaneligibility() {
    const { eligibility, setEligibility, setErrors } = useMovieContext();
    const [showAddEligibilityModal, setShowAddEligibilityModal] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [newEligibility, setNewEligibility] = useState({
        cibilScore: '',
        minLoanAmount: '',
        maxLoanAmount: '',
        tenure: [{ months: '', interest: '' }]
    });
    const [loading, setLoading] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deletingCibilRangeId, setDeletingCibilRangeId] = useState(null);
    const [errors, setFormErrors] = useState({});

    const schema = Joi.object({
        cibilScore: Joi.string()
            .pattern(/^\d+-\d+$/)
            .required()
            .messages({
                "string.pattern.base": "Invalid CIBIL Score format. Please enter a valid format like '300-900'.",
                "any.required": "CIBIL Score is required."
            }),
        minLoanAmount: Joi.number().min(0)
            .required()
            .messages({
                "number.min": "Minimum Loan Amount must be at least 0.",
                "any.required": "Minimum Loan Amount is required."
            }),
        maxLoanAmount: Joi.number().min(500)
            .required()
            .messages({
                "number.min": "Maximum Loan Amount must be at least 500.",
                "any.required": "Maximum Loan Amount is required."
            }),
        tenure: Joi.array().items(
            Joi.object({
                months: Joi.number().min(1).required().messages({
                    "number.min": "Months must be at least 1.",
                    "any.required": "Months are required."
                }),
                interest: Joi.number().min(0).required().messages({
                    "number.min": "Interest must be at least 0.",
                    "any.required": "Interest is required."
                })
            })
        )
    });

    useEffect(() => {
        if (eligibility.length <= 0) {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await backEndCall("/admin/get_admin_controls");
            setEligibility(response?.eligibility || []);
            setLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        }
    };

    const handleAddEligibility = async (e) => {
        e.preventDefault();
        setBtnDisabled(true);
        try {
            setLoading(true);

            const { error } = schema.validate(newEligibility, { abortEarly: false });
            if (error) {
                const validationErrors = {};
                error.details.forEach(detail => {
                    validationErrors[detail.path[0]] = detail.message;
                });
                setFormErrors(validationErrors);
                setLoading(false);
                setBtnDisabled(false);
                return;
            }

            if (editIndex !== null) {
                const updatedEligibility = [...eligibility];
                updatedEligibility[editIndex] = newEligibility;
                const response = await backEndCallObj("/admin/admin_controls_update", newEligibility);
                fetchData();
                setEligibility(response.eligibility);
                setEditIndex(null);
            } else {
                const response = await backEndCallObj("/admin/admin_controls_update", newEligibility);
                fetchData();
            }

            setShowAddEligibilityModal(false);
            setNewEligibility({
                cibilScore: '',
                minLoanAmount: '',
                maxLoanAmount: '',
                tenure: [{ months: '', interest: '' }]
            });
            toast.success("Eligibility updated successfully");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response?.data);
            }
        } finally {
            setBtnDisabled(false);
            setLoading(false);
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
        setFormErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEligibility(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTenureChange = (index, field, value) => {
        const updatedTenure = [...newEligibility.tenure];
        updatedTenure[index] = { ...updatedTenure[index], [field]: value };
        setNewEligibility(prevState => ({ ...prevState, tenure: updatedTenure }));
    };

    const handleAddTenure = (e) => {
        e.preventDefault();
        setNewEligibility(prevState => ({
            ...prevState,
            tenure: [...prevState.tenure, { months: '', interest: '' }]
        }));
    };

    const handleDeleteTenure = (index) => {
        setNewEligibility(prevState => {
            const updatedTenure = [...prevState.tenure];
            updatedTenure.splice(index, 1);
            return {
                ...prevState,
                tenure: updatedTenure
            };
        });
    };

    const handleDeleteClick = (cibilRangeId) => {
        setDeletingCibilRangeId(cibilRangeId);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await handleDelete(deletingCibilRangeId);
            setShowDeleteConfirmation(false);
            setDeletingCibilRangeId(null);
        } catch (error) {
            // Handle error if necessary
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmation(false);
        setDeletingCibilRangeId(null);
    };

    const handleDelete = async (cibilRangeId) => {
        try {
            const response = await backEndCallObj("/admin/remove_eligibility", { cibilRangeId });
            toast.success("Eligibility deleted successfully");
            setEligibility(response.eligibility);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response?.data);
            }
        }
    };

    return (
        <>
            <div className="user-details-container">
                <h5 className="mb-4">Eligibility Loans</h5>
                <div className='card'>
                    <div className='card-body scrolleHidden ' style={{ overflowY: "auto", height: "70vh" }}>
                        <Button variant="primary mb-4" onClick={handleShow} disabled={btnDisabled}>
                            Add New eligibility
                        </Button>

                        <div className="table-responsive">
                            <table className="table table-bordered table-centered">
                                <thead className='text-center'>
                                    <tr>
                                        <th>Credit Score</th>
                                        <th>Min Loan Amount</th>
                                        <th>Max Loan Amount</th>
                                        <th>Tenure</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='align-middle text-center'>
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
                                                <Button onClick={() => handleEditClick(index)} className="me-2 mb-2" disabled={btnDisabled} >Edit</Button>
                                                <Button onClick={() => handleDeleteClick(eligibilityItem.cibilRangeId)} disabled={btnDisabled} className='mb-2 me-2'>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {loading && (
                            <div className="text-center mt-3">
                                <div className="spinner-border spiner-border-sm" style={{ width: "3rem", height: "3rem" }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )}

                        {showAddEligibilityModal && (
                            <Modal show={showAddEligibilityModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add/Edit Eligibility</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form onSubmit={handleAddEligibility}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>CIBIL Score</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="CIBIL Score"
                                                name="cibilScore"
                                                value={newEligibility.cibilScore}
                                                onChange={handleChange}
                                                isInvalid={!!errors.cibilScore}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.cibilScore}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Minimum Loan Amount</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Minimum Loan Amount"
                                                name="minLoanAmount"
                                                value={newEligibility.minLoanAmount}
                                                onChange={handleChange}
                                                isInvalid={!!errors.minLoanAmount}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.minLoanAmount}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Maximum Loan Amount</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Maximum Loan Amount"
                                                name="maxLoanAmount"
                                                value={newEligibility.maxLoanAmount}
                                                onChange={handleChange}
                                                isInvalid={!!errors.maxLoanAmount}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.maxLoanAmount}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tenure:</Form.Label>
                                            {newEligibility.tenure.map((tenure, index) => (
                                                <div key={index}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Months</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Months"
                                                            value={tenure.months}
                                                            onChange={e => handleTenureChange(index, 'months', e.target.value)}
                                                            isInvalid={!!errors[`tenure.${index}.months`]}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors[`tenure.${index}.months`]}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Interest</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            placeholder="Interest"
                                                            value={tenure.interest}
                                                            onChange={e => handleTenureChange(index, 'interest', e.target.value)}
                                                            isInvalid={!!errors[`tenure.${index}.interest`]}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors[`tenure.${index}.interest`]}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Button variant="danger" onClick={() => handleDeleteTenure(index)}>Delete</Button>
                                                </div>
                                            ))}
                                            <Button variant="success" onClick={handleAddTenure} className="mt-2">Add Tenure</Button>
                                        </Form.Group>
                                        <Button variant="primary" type="submit" disabled={btnDisabled}>
                                            {editIndex !== null ? "Update" : "Submit"}
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        )}

                        {showDeleteConfirmation && (
                            <Modal show={showDeleteConfirmation} onHide={handleCancelDelete}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to delete this eligibility?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCancelDelete}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleConfirmDelete}>
                                        Delete
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Loaneligibility;



// // import toast from 'react-hot-toast';
// // // import { useHistory } from 'react-router-dom';
// // import { Button, Modal } from 'react-bootstrap';
// // import EligibilityForm from './EditEligibility'; // Import the EligibilityForm component
// // import { backEndCall } from '../../services/mainServiceFile';

// // function Loaneligibility() {
// //     // const history = useHistory();
// //     const [eligibilities, setEligibilities] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [showAddEligibilityModal, setShowAddEligibilityModal] = useState(false);

// //     useEffect(() => {
// //         fetchData();
// //     }, []);

// //     const fetchData = async () => {
// //         try {
// //             setLoading(true);
// //             const response = await backEndCall("/admin/get_admin_controls");
// //             setEligibilities(response?.eligibility || []);
// //             setLoading(false);
// //         } catch (ex) {
// //             if (ex.response && ex.response.status === 400) {
// //                 toast.error(ex.response.data);
// //             }
// //         }
// //     };

// //     const handleEditEligibility = (id) => {
// //         history.push(`/eligibility-form/${id}`);
// //     };

// //     const handleAddEligibility = () => {
// //         setShowAddEligibilityModal(true);
// //     };

// //     const handleCloseModal = () => {
// //         setShowAddEligibilityModal(false);
// //     };

// //     return (
// //         <div className="user-details-container">
// //             <h5 className="mb-4">Eligibility Loans</h5>
// //             <Button variant="primary mb-4" onClick={handleAddEligibility} disabled={loading}>
// //                 Add New eligibility
// //             </Button>

// //             {loading && <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status" />}

// //             <div className="table-responsive">
// //                 <table className="table table-bordered table-centered">
// //                     <thead className='text-center'>
// //                         <tr>
// //                             <th>Credit Score</th>
// //                             <th>Min Loan Amount</th>
// //                             <th>Max Loan Amount</th>
// //                             <th>Tenure</th>
// //                             <th>Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody className='align-middle text-center'>
// //                         {eligibilities.map((eligibility) => (
// //                             <tr key={eligibility.id}>
// //                                 <td>{eligibility.cibilScore}</td>
// //                                 <td>{eligibility.minLoanAmount}</td>
// //                                 <td>{eligibility.maxLoanAmount}</td>
// //                                 <td>
// //                                     <ul>
// //                                         {eligibility.tenure.map((tenure, index) => (
// //                                             <li key={index}>
// //                                                 {tenure.months} months at {tenure.interest}% interest
// //                                             </li>
// //                                         ))}
// //                                     </ul>
// //                                 </td>
// //                                 <td>
// //                                     <Button onClick={() => handleEditEligibility(eligibility.id)} className="me-2 mb-2" disabled={loading}>Edit</Button>
// //                                     <Button className='mb-2 me-2'>Delete</Button>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>

// //             <Modal show={showAddEligibilityModal} onHide={handleCloseModal}>
// //                 <Modal.Header closeButton>
// //                     <Modal.Title>Add New Eligibility</Modal.Title>
// //                 </Modal.Header>
// //                 <Modal.Body>
// //                     <EligibilityForm />
// //                 </Modal.Body>
// //             </Modal>
// //         </div>
// //     );
// // }

// // export default Loaneligibility;

