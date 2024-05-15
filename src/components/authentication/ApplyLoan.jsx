
// import React, { useEffect, useRef, useState } from "react";
// import Joi from "joi";
// import { backEndCall, backEndCallObj } from "../../services/mainServiceFile";
// import { Link, useNavigate } from "react-router-dom";
// import Userdetails from "./Userdetails";
// import Compress from 'react-image-file-resizer';
// import { logDOM } from "@testing-library/react";
// import { Input_text, Select_input, Date_Input, File_Input, Number_Input, Input_Name, Input_docnumbers, Input_address } from './../comman/All-Inputs';
// import { useMovieContext } from "../comman/Context";
// import { useFunctionContext } from "../comman/FunctionsContext";
// import { toast } from "react-hot-toast";
// import Dashboard from "../dashbord/Dashbord";
// import LoanStatus from "./LoanStatus";
// import numeric from "numeric";
// import authService from "../../services/authService";


// const ApplyLoan = () => {

//     const navigate = useNavigate()
//     const [formData, setFormData] = useState({
//         photo: "",

//         loan_type: "",
//         // tin_number: "",
//         // passport_number: "",
//         // permanent_address: "",
//         // current_address: "",
//         loan_amount: "",
//         months: "",
//         state: "",
//         city: "",
//         pin_code: "",
//         pay_slip: ""
//     });

//     const { errors, setLoading, setErrorOccur, setErrors, loanList, setLoanList, userData, setUserData } = useMovieContext()
//     const { checkErrors } = useFunctionContext()
//     const fileInputRef = useRef(null);
//     const [updateddata, setUpdateddata] = useState(false);
//     const [btnDisabled, setBtnDisabled] = useState(false);
//     const schema = {

//         // dob: Joi.date()
//         //     .max('now') // Ensure the date is not in the future
//         //     .required()
//         //     .label("Date of Birth")
//         //     .messages({
//         //         'any.required': 'Date of birth is required',
//         //         'date.base': 'Date of birth must be a valid date',
//         //         'date.max': 'You must be at least 20 years old',
//         //     })
//         //     .custom((value, helpers) => {
//         //         const minAgeDate = new Date();
//         //         minAgeDate.setFullYear(minAgeDate.getFullYear() - 20);

//         //         if (value <= minAgeDate) {
//         //             return value; // Validation passes
//         //         } else {
//         //             return helpers.error('date.max'); // Return error if age is less than 20
//         //         }
//         //     }),

//         loan_type: Joi.string().valid('Business', 'Personal', 'Home').required().label("loan Type"),
//         // tin_number: Joi.string()
//         //     .min(10)
//         //     .max(12)
//         //     .required()
//         //     .label("TIN Number")
//         //     .pattern(/^[A-Za-z0-9]+$/)
//         //     .messages({
//         //         'any.required': 'TIN Number is required',
//         //         'string.pattern.base':
//         //             'TIN Number must contain only letters and numbers',
//         //         'string.min': 'TIN Number must be at least 10 characters long',
//         //         'string.max': 'TIN Number cannot be longer than 12 characters',
//         //     }),
//         loan_amount: Joi.number().greater(-1).required().label("Loan Amount").min(1000).max(100000),
//         // passport_number: Joi.string()
//         //     .min(10)
//         //     .max(12)
//         //     .required()
//         //     .label("Passport Number")
//         //     .pattern(/^[A-Za-z0-9]+$/)
//         //     .messages({
//         //         'any.required': 'Passport number is required',
//         //         'string.pattern.base':
//         //             'Passport number must contain only letters and numbers',
//         //         'string.min': 'Passport number must be at least 6 characters long',
//         //         'string.max': 'Passport number cannot be longer than 20 characters',
//         //     }),
//         // permanent_address: Joi.string().min(10).max(100).required().label("Permanent Address"),
//         // permanent_address: Joi.string().min(10).max(50).required().pattern(new RegExp("^\\S + (?: \\S +) * $")),
//         // current_address: Joi.string().min(5).max(100).required().label("Current Address"),
//         state: Joi.string().min(5).max(50).required().label("State"),
//         months: Joi.number().min(3).max(12).required().label("Months"),
//         city: Joi.string().min(5).max(100).required().label("City"),
//         pin_code: Joi.string().min(5).max(6).required().label("Pin Code"),
//         photo: Joi.string().required().label("photo"),
//         pay_slip: Joi.string().required().label("Pay Slip"),

//         // phone_number: Joi.string()
//         //     .trim()
//         //     .length(10)
//         //     // .min(10)
//         //     // .max(12)
//         //     .pattern(/[6-9]\d{9}$/)
//         //     .label("Phone Number")
//         //     .messages({
//         //         'string.pattern.base':
//         //             'Invalid mobile number format. Please enter a valid mobile number.should not start with 0 ,1, 2, 3, 4 ,5 or 6 and should not contain special characters',
//         //     }),

//     }

//     const handleChange = async (e) => {
//         console.log(e)

//         const { name, value, type, files } = e.target;
//         try {
//             if (type === "file") {
//                 const file = e.target.files[0];
//                 if (file) {


//                     setErrors(prevErrors => ({
//                         ...prevErrors,
//                         [name]: " "
//                     }));

//                     if (file.type.slice(-3) === 'pdf') {
//                         const pdfs = { ...formData };
//                         const res = URL.createObjectURL(file);
//                         pdfs[name] = res;
//                         setFormData(pdfs);
//                     } else {
//                         Compress.imageFileResizer(
//                             file,
//                             480,
//                             480,
//                             'JPEG',
//                             40,
//                             0,
//                             (uri) => {
//                                 const images = { ...formData };
//                                 images[name] = uri;
//                                 setFormData(images);
//                             },
//                             'base64'
//                         );
//                     }
//                 } else {

//                     deleting(name);

//                     fileInputRef.current.value = "";
//                 }
//             } else {

//                 setFormData((prevFormData) => ({
//                     ...prevFormData,
//                     [name]: value
//                 }));
//             }
//         } catch (error) {

//             console.error("Error:", error);
//         }
//     };


//     const deleting = (property) => {
//         console.log(property, "-------->");
//         setFormData((prevForm) => {
//             console.log(prevForm, "--------->");
//             const updatedForm = { ...prevForm };
//             updatedForm[property] = "";
//             console.log(updatedForm, "--------- updated data");

//             setUserData(schema, updatedForm);
//             setErrorOccur(true);
//             return updatedForm;
//         });

//         const input = document.getElementById(property);
//         if (input) {
//             input.value = "";
//         }
//     };

//     // const deleting = (property) => {

//     //     return setFormData((prevForm) => {
//     //         return { ...prevForm, [property]: "" }

//     //     })
//     // }


//     const handleSubmit = async (e) => {

//         e.preventDefault();
//         setBtnDisabled(true);
//         try {
//             await checkErrors(schema, formData);
//             setLoading(true);


//             // const { phone_number } = formData;
//             // const prefixedPhoneNumber = `63${phone_number}`;

//             const response = await backEndCallObj("/user/apply_loan", {
//                 ...formData,
//                 // phone_number: prefixedPhoneNumber,
//             });
//             setLoanList(null)
//             console.log(response, "sformdata")
//             toast.success(response)
//             setUpdateddata(true);


//             setLoading(false);
//             setErrorOccur(false);
//             setFormData({
//                 // first_name: "",
//                 // last_name: "",
//                 // dob: "",
//                 // gender: "",
//                 photo: "",
//                 pay_slip: "",
//                 // tin_number: "",
//                 // passport_number: "",
//                 // permanent_address: "",
//                 // current_address: "",
//                 // phone_number: "",
//                 loan_amount: "",
//                 months: "",
//                 state: "",
//                 city: "",
//                 pin_code: ""
//             });
//         } catch (ex) {
//             setErrorOccur(true);
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response?.data)
//             }
//         } finally {
//             setLoading(false);
//             setBtnDisabled(false);
//         }
//     };

//     const validate = () => {
//         const { error } = schema.validate(formData, { abortEarly: false });
//         if (!error) return null;

//         const validationErrors = {};
//         for (let item of error.details) {
//             validationErrors[item.path[0]] = item.message;
//         }
//         return validationErrors;
//     };
//     const today = new Date();
//     const minDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
//     console.log(errors)

//     const fetchUserData = async () => {
//         try {
//             if (userData <= 0 || !userData) {
//                 const response = await backEndCall("/users/user_stats");
//                 console.log(response, "userdeta")
//                 setUserData(response);
//                 // console.log(response, "total amount")
//             }
//             // else {
//             //   setUserData(userData)
//             // }
//         } catch (ex) {
//             if (ex.response && ex.response.status === 400) {
//                 toast.error(ex.response.data);
//             }
//         }
//     };

//     useEffect(() => {

//         { !authService.IsAdmin() && fetchUserData() };

//     }, []);



//     return (
//         <>
//             {updateddata ? (
//                 <LoanStatus />
//             ) : (
//                 <div className="container">
//                     <div className="row justify-content-center">
//                         <div className="col-lg-10">
//                             <div className="card shadow-sm">
//                                 <div className="card-body ">
//                                     <form onSubmit={handleSubmit}>
//                                         {/* KYC Details */}
//                                         <h5 className="mb-4 fw-bold">Apply Loan</h5>
//                                         <hr />
//                                         <div className="d-flex gap-5">
//                                             <div className="col-xl-6 col-sm-6 col-lg-3 col-md-3 d-flex gap-5  justify-content- " >


//                                                 <div className="btn-primary p-3">
//                                                     <div className="d-flex justify-content-between mt-2 align-items-center">
//                                                         <p className="mb-0 fs-12"> User Limit :</p>
//                                                     </div>
//                                                     <p className="mb-0 fw-semibold mt-3 fs-18">
//                                                         <span>{userData?.userLimit}</span>
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>


//                                         <div className="row">
//                                         </div>
//                                         <div className="row" style={{ paddingTop: '20px' }}>


//                                         </div>
//                                         <div className="row">


//                                             <div className="col-md-6 mb-3">

//                                                 <label htmlFor="loan_type" className="form-label">Loan Type <span className="text-danger">*</span></label>
//                                                 <Select_input
//                                                     name="loan_type"
//                                                     SetForm={setFormData}
//                                                     schema={schema["loan_type"]}
//                                                     options={[
//                                                         { value: "Business", label: "Business" },
//                                                         { value: "Personal", label: "Personal" },
//                                                         { value: "Home", label: "Home" },

//                                                     ]}
//                                                     autoFocus={true}
//                                                 />
//                                             </div>
//                                             <div className="col-md-6 mb-3">

//                                                 <label htmlFor="months" className="form-label">Months <span className="text-danger">*</span></label>
//                                                 <Select_input
//                                                     name="months"
//                                                     SetForm={setFormData}
//                                                     schema={schema["months"]}
//                                                     options={[
//                                                         { value: "3", label: "3" },
//                                                         { value: "6", label: "6" },
//                                                         { value: "9", label: "9" },
//                                                         { value: "12", label: "12" }
//                                                     ]}
//                                                 />
//                                             </div> <div className="col-md-6 mb-3">
//                                                 <label htmlFor="loan_amount" className="form-label">Loan Amount <span className="text-danger">*</span></label>
//                                                 <Number_Input
//                                                     type={"loan_amount"}
//                                                     value={formData["loan_amount"]}
//                                                     name={"loan_amount"}
//                                                     placeholder={"₱ 10000"}

//                                                     SetForm={setFormData}
//                                                     schema={schema["loan_amount"]}
//                                                     inputMode={numeric}
//                                                     maxLength={10}


//                                                 />
//                                                 {errors.loan_amount ? (
//                                                     <div className="error"></div>
//                                                 ) : (<div style={{ color: "#ff5722" }}>
//                                                     <span>*</span> <strong>Note :</strong> <p> Minimum loan amount: ₱ 1,000<br />
//                                                         Maximum loan amount: ₱ 100,000</p>


//                                                 </div>
//                                                 )}

//                                             </div>
//                                             {/* <div className="col-md-6 mb-3">
//                                                 <label htmlFor="passportNumber" className="form-label">Passport Number <span className="text-danger">*</span></label>
//                                                 <Input_docnumbers
//                                                     type={"text"}
//                                                     value={formData["passport_number"]}
//                                                     name={"passport_number"}
//                                                     placeholder={"Enter Your Passport Number"}
//                                                     id={"special_character"}
//                                                     SetForm={setFormData}
//                                                     schema={schema["passport_number"]}
//                                                     minLength={12}
//                                                     maxLength={12}

//                                                 />
//                                             </div> */}

//                                             {/* Loan Type */}

//                                             {/* TIN Number and Passport Number */}
//                                             {/* <div className="col-md-6 mb-3">
//                                                 <label htmlFor="tinNumber" className="form-label">TIN Number <span className="text-danger">*</span></label>
//                                                 <Input_docnumbers
//                                                     type={"text"}
//                                                     value={formData["tin_number"]}
//                                                     name={"tin_number"}
//                                                     placeholder={"Enter TIN number "}
//                                                     id={"special_character"}
//                                                     SetForm={setFormData}
//                                                     schema={schema["tin_number"]}
//                                                     minLength={12}
//                                                     maxLength={12}

//                                                 />
//                                             </div> */}


//                                             <div className="col-md-6 mb-3">
//                                                 <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
//                                                 <Input_text
//                                                     type={"text"}
//                                                     value={formData["state"]}
//                                                     name={"state"}
//                                                     placeholder={"Enter  Your State"}
//                                                     id={"special_character"}
//                                                     SetForm={setFormData}
//                                                     schema={schema["state"]}
//                                                     maxLength={100}

//                                                 />
//                                             </div>
//                                             <div className="col-md-6 mb-3">
//                                                 <label htmlFor="city" className="form-label">City <span className="text-danger">*</span></label>
//                                                 <Input_text
//                                                     type={"text"}
//                                                     value={formData["city"]}
//                                                     name={"city"}
//                                                     placeholder={"Enter Your City"}
//                                                     id={"special_character"}
//                                                     SetForm={setFormData}
//                                                     schema={schema["city"]}
//                                                     maxLength={100}

//                                                 />
//                                             </div>
//                                             <div className="col-md-6">
//                                                 <label htmlFor="pincode" className="form-label">Pin Code <span className="text-danger">*</span></label>
//                                                 <Number_Input
//                                                     type={"text"}
//                                                     value={formData["pin_code"]}
//                                                     name={"pin_code"}
//                                                     placeholder={"Enter Your Pin Code"}
//                                                     maxLength={6}
//                                                     inputMode={numeric}
//                                                     SetForm={setFormData}
//                                                     schema={schema["pin_code"]}

//                                                 />

//                                             </div>
//                                         </div>


//                                         {/* <div className="row px-2">

//                                             <label htmlFor="permanent_address" className="form-label">Permanent Address <span className="text-danger">*</span></label>
//                                             <Input_address
//                                                 type={"text"}
//                                                 value={formData["permanent_address"]}
//                                                 name={"permanent_address"}
//                                                 placeholder={"Enter Permanent Address"}
//                                                 id={"special_character"}
//                                                 SetForm={setFormData}
//                                                 schema={schema["permanent_address"]}
//                                                 maxLength={100}

//                                             />




//                                             <label htmlFor="current_address" className="form-label">Current Address <span className="text-danger">*</span></label>
//                                             <Input_address
//                                                 type={"text"}
//                                                 value={formData["current_address"]}
//                                                 name={"current_address"}
//                                                 placeholder={"Enter Current Address"}
//                                                 id={"special_character"}
//                                                 SetForm={setFormData}
//                                                 schema={schema["current_address"]}
//                                                 maxLength={100}

//                                             />

//                                         </div> */}
//                                         {/* Upload Documents */}
//                                         <h5 className="mb-4">Upload documents <span className="text-danger">*</span></h5>
//                                         <div className="row mb-4">

//                                             <div className="col-md-6 mb-3 position-relative">
//                                                 <label htmlFor="pay_slip" className="form-label">Pay Slip <span className="text-danger">*</span></label>
//                                                 <input
//                                                     type="file"
//                                                     className="form-control"
//                                                     id="pay_slip"
//                                                     name="pay_slip"
//                                                     ref={fileInputRef}
//                                                     accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.doc,.docx,.pdf"

//                                                     onChange={handleChange}

//                                                 />
//                                                 {errors.pay_slip && (
//                                                     <div className="error mt-3">{errors.pay_slip}</div>
//                                                 )}
//                                                 <span className="delete_image" onClick={() => deleting("pay_slip")} ><i className="ri-delete-bin-5-line"></i></span>
//                                                 <div className="position-relative">

//                                                     {formData.pay_slip.includes("image") ? (
//                                                         <img src={formData?.pay_slip} className="document_image mt-1 rounded-2" />
//                                                     ) : (
//                                                         <embed src={formData.pay_slip} className="document_image1 mt-1 rounded-2" />
//                                                     )}

//                                                 </div>


//                                             </div>

//                                             <div className="col-md-6 mb-3 position-relative">
//                                                 <label htmlFor="photo" className="form-label">Photo<span className="text-danger">*</span></label>
//                                                 <input
//                                                     type="file"
//                                                     className="form-control"
//                                                     id="photo"
//                                                     name="photo"
//                                                     accept="image/*,.pdf"

//                                                     onChange={handleChange}
//                                                 />
//                                                 <span className="delete_image" onClick={() => deleting("photo")} ><i className="ri-delete-bin-5-line"></i></span>
//                                                 <div className="position-relative">
//                                                     <img src={formData?.photo} className="document_image mt-1 rounded-2" />
//                                                 </div>
//                                                 {errors.photo && (
//                                                     <div className="error">{errors.photo}</div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                         {/* Submit Button */}
//                                         <button type="submit" className="btn btn-primary" disabled={btnDisabled}>{btnDisabled ? "Applying..." : "Loan Apply"}</button>

//                                     </form>
//                                 </div>
//                             </div>
//                         </div >
//                     </div >
//                 </div >
//             )}
//         </>
//     );
// };

// export default ApplyLoan;

/* eslint-disable react/jsx-pascal-case */

import React, { useEffect, useRef, useState } from "react";
import Joi from "joi";
import { backEndCall, backEndCallObj } from "../../services/mainServiceFile";
import { Link, useNavigate } from "react-router-dom";
import Userdetails from "./Userdetails";
import Compress from 'react-image-file-resizer';
import { logDOM } from "@testing-library/react";
import { Input_text, Select_input, Date_Input, File_Input, Number_Input, Input_Name, Input_docnumbers, Input_address } from './../comman/All-Inputs';
import { useMovieContext } from "../comman/Context";
import { useFunctionContext } from "../comman/FunctionsContext";
import { toast } from "react-hot-toast";
import Dashboard from "../dashbord/Dashbord";
import LoanStatus from "./LoanStatus";
import numeric from "numeric";
import authService from "../../services/authService";


const ApplyLoan = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        photo: "",

        loan_type: "",
        // tin_number: "",
        // passport_number: "",
        // permanent_address: "",
        // current_address: "",
        loan_amount: "",
        months: "",
        // state: "",
        // city: "",
        // pin_code: "",
        pay_slip: ""
    });

    const { errors, setLoading, setErrorOccur, setErrors, loanList, setLoanList, userData, setUserData } = useMovieContext()
    const { checkErrors } = useFunctionContext()
    const fileInputRef = useRef(null);
    const [updateddata, setUpdateddata] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const schema = {
        loan_type: Joi.string().valid('Business', 'Personal', 'Home').required().label("loan Type"),
        loan_amount: Joi.number().greater(-1).required().label("Loan Amount").min(1000).max(100000),
        months: Joi.number().min(3).max(12).required().label("Months"),
        photo: Joi.string().required().label("photo"),
        pay_slip: Joi.string().required().label("Pay Slip"),

    }

    const handleChange = async (e) => {
        console.log(e)

        const { name, value, type, files } = e.target;
        try {
            if (type === "file") {
                const file = e.target.files[0];
                if (file) {


                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [name]: " "
                    }));

                    if (file.type.slice(-3) === 'pdf') {
                        const pdfs = { ...formData };
                        const res = URL.createObjectURL(file);
                        pdfs[name] = res;
                        setFormData(pdfs);
                    } else {
                        Compress.imageFileResizer(
                            file,
                            480,
                            480,
                            'JPEG',
                            40,
                            0,
                            (uri) => {
                                const images = { ...formData };
                                images[name] = uri;
                                setFormData(images);
                            },
                            'base64'
                        );
                    }
                } else {

                    deleting(name);

                    fileInputRef.current.value = "";
                }
            } else {

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value
                }));
            }
        } catch (error) {

            console.error("Error:", error);
        }
    };


    const deleting = (property) => {
        console.log(property, "-------->");
        setFormData((prevForm) => {
            console.log(prevForm, "--------->");
            const updatedForm = { ...prevForm };
            updatedForm[property] = "";
            console.log(updatedForm, "--------- updated data");

            setUserData(schema, updatedForm);
            setErrorOccur(true);
            return updatedForm;
        });

        const input = document.getElementById(property);
        if (input) {
            input.value = "";
        }
    };

    // const deleting = (property) => {

    //     return setFormData((prevForm) => {
    //         return { ...prevForm, [property]: "" }

    //     })
    // }


    const handleSubmit = async (e) => {

        e.preventDefault();
        setBtnDisabled(true);
        try {
            await checkErrors(schema, formData);
            setLoading(true);


            // const { phone_number } = formData;
            // const prefixedPhoneNumber = `63${phone_number}`;

            const response = await backEndCallObj("/user/apply_loan", {
                ...formData,
                // phone_number: prefixedPhoneNumber,
            });
            setLoanList(null)
            console.log(response, "sformdata")
            toast.success(response)
            setUpdateddata(true);


            setLoading(false);
            setErrorOccur(false);
            setFormData({
                photo: "",
                pay_slip: "",
                loan_amount: "",
                months: "",
            });
        } catch (ex) {
            setErrorOccur(true);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response?.data)
            }
        } finally {
            setLoading(false);
            setBtnDisabled(false);
        }
    };

    const validate = () => {
        const { error } = schema.validate(formData, { abortEarly: false });
        if (!error) return null;

        const validationErrors = {};
        for (let item of error.details) {
            validationErrors[item.path[0]] = item.message;
        }
        return validationErrors;
    };
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
    console.log(errors)

    const fetchUserData = async () => {
        try {
            if (userData <= 0 || !userData) {
                const response = await backEndCall("/users/user_stats");
                console.log(response, "userdeta")
                setUserData(response);
                // console.log(response, "total amount")
            }
            // else {
            //   setUserData(userData)
            // }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
            }
        }
    };

    useEffect(() => {

        { !authService.IsAdmin() && fetchUserData() };

    }, []);



    return (
        <>
            {updateddata ? (
                <LoanStatus />
            ) : (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-sm">
                                <div className="card-body ">
                                    <form onSubmit={handleSubmit}>
                                        {/* KYC Details */}
                                        <h5 className="mb-4 fw-bold">Apply Loan</h5>
                                        <hr />
                                        <div className="d-flex gap-5">
                                            <div className="col-xl-6 col-sm-6 col-lg-3 col-md-3 d-flex gap-5  justify-content- " >


                                                <div className="btn-primary p-3">
                                                    <div className="d-flex justify-content-between mt-2 align-items-center">
                                                        <p className="mb-0 fs-12"> User Limit :</p>
                                                    </div>
                                                    <p className="mb-0 fw-semibold mt-3 fs-18">
                                                        <span>{userData?.userLimit}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="row">
                                        </div>
                                        <div className="row" style={{ paddingTop: '20px' }}>


                                        </div>
                                        <div className="row">


                                            <div className="col-md-6 mb-3">

                                                <label htmlFor="loan_type" className="form-label">Loan Type <span className="text-danger">*</span></label>
                                                <Select_input
                                                    name="loan_type"
                                                    SetForm={setFormData}
                                                    schema={schema["loan_type"]}
                                                    options={[
                                                        { value: "Business", label: "Business" },
                                                        { value: "Personal", label: "Personal" },
                                                        { value: "Home", label: "Home" },

                                                    ]}
                                                    autoFocus={true}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">

                                                <label htmlFor="months" className="form-label">Months <span className="text-danger">*</span></label>
                                                <Select_input
                                                    name="months"
                                                    SetForm={setFormData}
                                                    schema={schema["months"]}
                                                    options={[
                                                        { value: "3", label: "3" },
                                                        { value: "6", label: "6" },
                                                        { value: "9", label: "9" },
                                                        { value: "12", label: "12" }
                                                    ]}
                                                />
                                            </div> <div className="col-md-6 mb-3">
                                                <label htmlFor="loan_amount" className="form-label">Loan Amount <span className="text-danger">*</span></label>
                                                <Number_Input
                                                    type={"loan_amount"}
                                                    value={formData["loan_amount"]}
                                                    name={"loan_amount"}
                                                    placeholder={"₱ 10000"}

                                                    SetForm={setFormData}
                                                    schema={schema["loan_amount"]}
                                                    inputMode={numeric}
                                                    maxLength={10}


                                                />
                                                {errors.loan_amount ? (
                                                    <div className="error"></div>
                                                ) : (<div style={{ color: "#ff5722" }}>
                                                    <span>*</span> <strong>Note :</strong> <p> Minimum loan amount: ₱ 1,000<br />
                                                        Maximum loan amount: ₱ 100,000</p>


                                                </div>
                                                )}

                                            </div>
                                            {/* <div className="col-md-6 mb-3">
                                                <label htmlFor="passportNumber" className="form-label">Passport Number <span className="text-danger">*</span></label>
                                                <Input_docnumbers
                                                    type={"text"}
                                                    value={formData["passport_number"]}
                                                    name={"passport_number"}
                                                    placeholder={"Enter Your Passport Number"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["passport_number"]}
                                                    minLength={12}
                                                    maxLength={12}

                                                />
                                            </div> */}

                                            {/* Loan Type */}

                                            {/* TIN Number and Passport Number */}
                                            {/* <div className="col-md-6 mb-3">
                                                <label htmlFor="tinNumber" className="form-label">TIN Number <span className="text-danger">*</span></label>
                                                <Input_docnumbers
                                                    type={"text"}
                                                    value={formData["tin_number"]}
                                                    name={"tin_number"}
                                                    placeholder={"Enter TIN number "}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["tin_number"]}
                                                    minLength={12}
                                                    maxLength={12}

                                                />
                                            </div> */}

                                            {/* 
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["state"]}
                                                    name={"state"}
                                                    placeholder={"Enter  Your State"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["state"]}
                                                    maxLength={100}

                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="city" className="form-label">City <span className="text-danger">*</span></label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["city"]}
                                                    name={"city"}
                                                    placeholder={"Enter Your City"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["city"]}
                                                    maxLength={100}

                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="pincode" className="form-label">Pin Code <span className="text-danger">*</span></label>
                                                <Number_Input
                                                    type={"text"}
                                                    value={formData["pin_code"]}
                                                    name={"pin_code"}
                                                    placeholder={"Enter Your Pin Code"}
                                                    maxLength={6}
                                                    inputMode={numeric}
                                                    SetForm={setFormData}
                                                    schema={schema["pin_code"]}

                                                />

                                            </div>
                                        // </div> */}
                                        </div>


                                        {/* <div className="row px-2">

                                            <label htmlFor="permanent_address" className="form-label">Permanent Address <span className="text-danger">*</span></label>
                                            <Input_address
                                                type={"text"}
                                                value={formData["permanent_address"]}
                                                name={"permanent_address"}
                                                placeholder={"Enter Permanent Address"}
                                                id={"special_character"}
                                                SetForm={setFormData}
                                                schema={schema["permanent_address"]}
                                                maxLength={100}

                                            />




                                            <label htmlFor="current_address" className="form-label">Current Address <span className="text-danger">*</span></label>
                                            <Input_address
                                                type={"text"}
                                                value={formData["current_address"]}
                                                name={"current_address"}
                                                placeholder={"Enter Current Address"}
                                                id={"special_character"}
                                                SetForm={setFormData}
                                                schema={schema["current_address"]}
                                                maxLength={100}

                                            />

                                        </div> */}
                                        {/* Upload Documents */}
                                        <h5 className="mb-4">Upload documents <span className="text-danger">*</span></h5>
                                        <div className="row mb-4">

                                            <div className="col-md-6 mb-3 position-relative">
                                                <label htmlFor="pay_slip" className="form-label">Pay Slip <span className="text-danger">*</span></label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="pay_slip"
                                                    name="pay_slip"
                                                    ref={fileInputRef}
                                                    accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.doc,.docx,.pdf"

                                                    onChange={handleChange}

                                                />
                                                {errors.pay_slip && (
                                                    <div className="error mt-3">{errors.pay_slip}</div>
                                                )}
                                                <span className="delete_image" onClick={() => deleting("pay_slip")} ><i className="ri-delete-bin-5-line"></i></span>

                                                <div className="position-relative">

                                                    {/* {formData.pay_slip.includes("image") ? (
                                                        <img src={formData?.pay_slip} className="document_image mt-1 rounded-2" />
                                                    ) : (
                                                        formData.pay_slip == null ? "" : <embed src={formData.pay_slip} className="document_image1 mt-1 rounded-2" />


                                                    )} */}

                                                    <div className="position-relative">

                                                        <>
                                                            {formData.pay_slip.includes("image") ? (
                                                                <img src={formData.pay_slip} className="document_image mt-1 rounded-2" />
                                                            ) : (
                                                                formData.pay_slip ? <embed src={formData.pay_slip} className="document_image1 mt-1 rounded-2" /> : ""
                                                            )}
                                                        </>

                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-md-6 mb-3 position-relative">
                                                <label htmlFor="photo" className="form-label">Photo<span className="text-danger">*</span></label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="photo"
                                                    name="photo"
                                                    accept="image/*,.pdf"

                                                    onChange={handleChange}
                                                />
                                                <span className="delete_image" onClick={() => deleting("photo")} ><i className="ri-delete-bin-5-line"></i></span>
                                                <div className="position-relative">
                                                    <img src={formData?.photo} className="document_image mt-1 rounded-2" />
                                                </div>
                                                {errors.photo && (
                                                    <div className="error">{errors.photo}</div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Submit Button */}
                                        <button type="submit" className="btn btn-primary" disabled={btnDisabled}>{btnDisabled ? "Applying..." : "Loan Apply"}</button>

                                    </form>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            )}
        </>
    );
};

export default ApplyLoan;

