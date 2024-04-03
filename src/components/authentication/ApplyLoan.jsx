import React, { useState } from "react";
import Joi from "joi";
import { backEndCallObj } from "../../services/mainServiceFile";
import { Link, useNavigate } from "react-router-dom";
import Userdetails from "./Userdetails";
import Compress from 'react-image-file-resizer';
import { logDOM } from "@testing-library/react";
import { Input_text, Select_input, Date_Input, File_Input, Number_Input } from './../comman/All-Inputs';
import { useMovieContext } from "../comman/Context";
import { useFunctionContext } from "../comman/FunctionsContext";
import { toast } from "react-hot-toast";
import Dashboard from "../dashbord/Dashbord";


const ApplyLoan = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
        photo: "",
        tin_number: "",
        passport_number: "",
        permanentAddress: "",
        currentAddress: "",
        phone_number: "",
        loan_amount: "",
        months: "",
        state: "",
        city: "",
        pin_code: ""
    });

    const { errors, setLoading, setErrorOccur } = useMovieContext()
    const { checkErrors } = useFunctionContext()

    const [updateddata, setUpdateddata] = useState(false);

    const schema = {
        first_name: Joi.string().required().label("First Name"),
        last_name: Joi.string().required().label("Last Name"),
        dob: Joi.date()
            .max('now')
            .required()
            .label('Date of Birth')
            .max(new Date(new Date().getFullYear() - 20, 11, 31))
            .messages({
                'date.max': 'You must be at least 20 years old to register.',
                'date.base': 'Date of Birth must be a valid date.',
                'date.maxDate': 'You must be at least 20 years old to register.',
                'any.required': 'Date of Birth is required.',
            }),
        gender: Joi.string().required().label("Gender"),
        months: Joi.string().required().label("months"),
        tin_number: Joi.string().required().label("TIN Number").max(10).min(10),
        passport_number: Joi.string().required().label("Passport Number").max(10).min(10),
        permanentAddress: Joi.string().required().label("Permanent Address").min(10).max(50),
        currentAddress: Joi.string().required().label("Current Address").min(10).max(50),
        photo: Joi.any().required().label("photo"),
        loan_amount: Joi.number().required(),
        phone_number: Joi.string()
            .trim()
            .min(12)
            .max(12)
            .length(12)
            .pattern(/^[6-9][0-9]*$/)
            .label("Phone Number")
            .messages({
                "string.pattern.base": "should not start with 1, 2, 3, 4 ,5 or 6 and should not contain special characters",
            }),
        state: Joi.string().required().label("state"),
        city: Joi.string().required().label("city"),
        pin_code: Joi.string().required().label("pincode"),
    };


    const handleChange = async (e) => {
        const { name, value, type, files } = e.target;

        const val = type === "file" ? files[0] : value;

        try {
            if (type === "file") {
                const file = e.target.files[0];
                if (file) {
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
                }
            } else {
                setFormData({ ...formData, [name]: val });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const getBase64 = (file) => {
        return new Promise((resolve) => {

            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {

                let baseURL = reader.result.replace('data:', '').replace(/^.+,/, '');
                resolve(baseURL);
            };
        });
    };


    const deleting = (property) => {
        return setFormData((prevForm) => {
            return { ...prevForm, [property]: "" }

        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await checkErrors(schema, formData);
            setLoading(true);
            const formDataWithoutPhoto = { ...formData };
            console.log(formDataWithoutPhoto)
            const response = await backEndCallObj("/user/apply_loan", formDataWithoutPhoto);
            console.log(response, "sformdata")
            toast.success(response.message)
            setUpdateddata(true);


            setLoading(false);
            setErrorOccur(false);
            setFormData({
                first_name: "",
                last_name: "",
                dob: "",
                gender: "",
                photo: "",
                tin_number: "",
                passport_number: "",
                permanentAddress: "",
                currentAddress: "",
                phone_number: "",
                loan_amount: "",
                months: "",
                state: "",
                city: "",
                pin_code: ""
            });
        } catch (ex) {
            setErrorOccur(true);
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response?.data)
            }
        } finally {
            setLoading(false);
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
    return (
        <>
            {updateddata ? (
                <Dashboard />
            ) : (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-sm">
                                <div className="card-body p-4">
                                    <form onSubmit={handleSubmit}>
                                        {/* KYC Details */}
                                        <h5 className="mb-4 fw-bold" >ApplyLoan</h5>
                                        <div className="row mb-4">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["first_name"]}
                                                    name={"first_name"}
                                                    placeholder={"Enter username here"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["first_name"]}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["last_name"]}
                                                    name={"last_name"}
                                                    placeholder={"Enter lastname here"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["last_name"]}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="dob" className="form-label">Date of Birth</label>
                                                <Date_Input
                                                    type={"date"}
                                                    value={formData["dob"]}
                                                    name={"dob"}
                                                    SetForm={setFormData}
                                                    schema={schema["dob"]}
                                                    minDate={minDate}
                                                    maxDate={today}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="gender" className="form-label">Gender</label>
                                                <Select_input
                                                    name="gender"
                                                    SetForm={setFormData}
                                                    schema={schema["gender"]}
                                                    options={["male", "female", "transgender"]}
                                                />
                                            </div>
                                            {/* TIN Number and Passport Number */}
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="tinNumber" className="form-label">TIN Number</label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["tin_number"]}
                                                    name={"tin_number"}
                                                    placeholder={"Enter TIN number here"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["tin_number"]}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="passportNumber" className="form-label">Passport Number</label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["passport_number"]}
                                                    name={"passport_number"}
                                                    placeholder={"Enter passport number here"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["passport_number"]}
                                                />
                                            </div>
                                        </div>
                                        {/* Loan Type */}

                                        <div className="row mb-4">
                                            <div className="mb-3">
                                                <label htmlFor="phone_number" className="form-label">Phone Number</label>

                                                <div className="input-group">
                                                    <span className="input-group-text font-bold">
                                                        +63
                                                    </span>
                                                    <Number_Input
                                                        type={"phone_number"}
                                                        value={formData["phone_number"]}
                                                        name={"phone_number"}


                                                        SetForm={setFormData}
                                                        schema={schema["phone_number"]}



                                                    />
                                                </div>




                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="loan_amount" className="form-label">LoanAmount</label>
                                                <Number_Input
                                                    type={"loan_amount"}
                                                    value={formData["loan_amount"]}
                                                    name={"loan_amount"}
                                                    SetForm={setFormData}
                                                    schema={schema["loan_amount"]}
                                                />
                                                {errors.age && (
                                                    <div className="error">{errors.loan_amount}</div>
                                                )}
                                            </div>
                                            <div className="col-md-6 mb-3">

                                                <label htmlFor="months" className="form-label">months</label>
                                                <Select_input
                                                    name="months"
                                                    SetForm={setFormData}
                                                    schema={schema["months"]}
                                                    options={["3", "6", "9", "12"]}
                                                />
                                            </div>
                                        </div>
                                        {/* Address Details */}
                                        <h5 className="mb-4">Address Details</h5>
                                        <div className="row mb-4">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="permanentAddress" className="form-label">Permanent Address</label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["permanentAddress"]}
                                                    name={"permanentAddress"}
                                                    placeholder={"Enter permanentAddress here"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["permanentAddress"]}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="currentAddress" className="form-label">Current Address</label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["currentAddress"]}
                                                    name={"currentAddress"}
                                                    placeholder={"Enter currentAddress here"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["currentAddress"]}
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="state" className="form-label">State</label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["state"]}
                                                    name={"state"}
                                                    placeholder={"Enter state here"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["state"]}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="city" className="form-label">City</label>
                                                <Input_text
                                                    type={"text"}
                                                    value={formData["city"]}
                                                    name={"city"}
                                                    placeholder={"Enter city here"}
                                                    id={"special_character"}
                                                    SetForm={setFormData}
                                                    schema={schema["city"]}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="pincode" className="form-label">pincode</label>
                                                <Number_Input
                                                    type={"text"}
                                                    value={formData["pin_code"]}
                                                    name={"pin_code"}
                                                    SetForm={setFormData}
                                                    schema={schema["pin_code"]}
                                                />

                                            </div>
                                        </div>
                                        {/* Upload Documents */}
                                        <h5 className="mb-4">Upload documents</h5>
                                        <div className="row mb-4">

                                            <div className="col-md-6 mb-3 position-relative">
                                                <label htmlFor="photo" className="form-label">Photo:</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="photoControlInput"
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
                                        <button type="submit" className="btn btn-primary">Update Profile</button>
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
