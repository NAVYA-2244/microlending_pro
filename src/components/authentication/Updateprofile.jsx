// import React, { useEffect, useState } from "react";
// import Joi from "joi";
// import { backEndCall, backEndCallObj } from "../../services/mainServiceFile";
// import { Link, useNavigate } from "react-router-dom";
// import Userdetails from "./Userdetails";
// import Compress from 'react-image-file-resizer';
// import { logDOM } from "@testing-library/react";
// import { Input_text, Select_input, Date_Input, File_Input, Input_Name, Input_docnumbers, Input_address } from './../comman/All-Inputs';
// import { useMovieContext } from "../comman/Context";
// import { useFunctionContext } from "../comman/FunctionsContext";
// import { toast } from "react-hot-toast";
// import moment, { max } from "moment";


// const Updateprofile = () => {
//   const { userprofileData, setUserprofileData, usereligibility, setUserEligibility, userData, setUserData } = useMovieContext();
//   // console.log(userprofileData, "userprooooooooooo")
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState(
//     {
//       first_name: "",
//       last_name: "",
//       dob: "",

//       gender: "",
//       photo: "",
//       tin_number: "",
//       passport_number: "",
//       employment: "",
//       permanentAddress: "",
//       currentAddress: "",
//       income_proof: "",
//     }
//   );
//   const [btnDisabled, setBtnDisabled] = useState(false);
//   const { errors, setErrors, setLoading, setErrorOccur, } = useMovieContext()
//   const { checkErrors } = useFunctionContext()
//   // const { handleChange } = useFunctionContext()

//   const [updateddata, setUpdateddata] = useState(false);
//   // const [errors, setErrors] = useState({});

//   const schema = {
//     first_name: Joi.string()
//       .trim()
//       .min(4)
//       .max(50)
//       .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
//       .required()
//       .label("First Name")
//       .messages({
//         'string.pattern.base': 'First name should not contain special characters or numbers',
//       }),
//     last_name: Joi.string()
//       .trim()
//       .min(4)
//       .max(50)
//       .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
//       .required()
//       .label("Last Name")
//       .messages({
//         'string.pattern.base':
//           'First name should not contain special characters or numbers',
//       }),

//     // dob: Joi.string().isoDate().required()
//     //   .label("Date of Birth")
//     //   .messages({
//     //     'any.required': 'Date of birth is required',
//     //     'string.isoDate': 'Date of birth must be in the format “YYYY-MM-DD',

//     //   }).min(20).required(),
//     dob: Joi.date()
//       .max('now') // Ensure the date is not in the future
//       .required()
//       .label("Date of Birth")
//       .messages({
//         'any.required': 'Date of birth is required',
//         'date.base': 'Date of birth must be a valid date',
//         'date.max': 'You must be at least 20 years old',
//       })
//       .custom((value, helpers) => {
//         const minAgeDate = new Date();
//         minAgeDate.setFullYear(minAgeDate.getFullYear() - 20);

//         if (value <= minAgeDate) {
//           return value; // Validation passes
//         } else {
//           return helpers.error('date.max'); // Return error if age is less than 20
//         }
//       }),


//     gender: Joi.string().valid('Male', 'Female', 'Transgender').required().label("Gender"),
//     tin_number: Joi.string()
//       .min(10)
//       .max(12)
//       .length(12)
//       .required()
//       .label("TIN Number")
//       .pattern(/^[A-Za-z0-9]+$/)
//       .messages({
//         'any.required': 'TIN Number is required',
//         'string.pattern.base':
//           'TIN Number must contain only letters and numbers',
//         'string.min': 'TIN Number must be at least 10 characters long',
//         'string.max': 'TIN Number cannot be longer than 12 characters',
//       }),
//     passport_number: Joi.string()
//       .min(4)
//       .max(12)
//       .length(12)
//       .required()
//       .label("Passport Number")
//       .pattern(/^[A-Za-z0-9]+$/)
//       .messages({
//         'any.required': 'Passport number is required',
//         'string.pattern.base':
//           'Passport number must contain only letters and numbers',
//         'string.min': 'Passport number must be at least 12 characters long',
//         'string.max': 'Passport number cannot be longer than 20 characters',
//       }),
//     employment: Joi.string()
//       .valid('SalariedEmployee', 'SelfEmployed', 'Business')
//       .required().label("Employment"),

//     permanentAddress: Joi.string().min(10).max(50).required().label("Permanent Address"),
//     currentAddress: Joi.string().min(10).max(50).required().label("Current Address"),

//     income_proof: Joi.string().required(),
//     photo: Joi.string().required(),
//   };





//   const handleChange = async (e) => {

//     const { name, value, type, files } = e.target;
//     try {
//       if (type === "file") {
//         const file = e.target.files[0];
//         if (file) {

//           // console.log(errors, name)

//           setErrors(prevErrors => ({
//             ...prevErrors,
//             [name]: "" // Here, [name] is the computed property name
//           }));
//           // console.log(file, "filess")
//           if (file.type.slice(-3) === 'pdf') {
//             const pdfs = { ...formData };
//             const res = URL.createObjectURL(file);
//             pdfs[name] = res;
//             setFormData(pdfs);
//           } else {
//             Compress.imageFileResizer(
//               file,
//               480,
//               480,
//               'JPEG',
//               40,
//               0,
//               (uri) => {
//                 const images = { ...formData };
//                 images[name] = uri;
//                 setFormData(images);
//               },
//               'base64'
//             );
//           }
//         } else {
//           // Clear the input field if no file is selected
//           setFormData({ ...formData, [name]: "" });
//         }
//       } else {
//         setFormData({ ...formData, [name]: value });
//         setErrorOccur({ ...formData, [name]: "" })
//       }
//     } catch (error) {

//       console.error("Error:", error);
//     }
//   };


//   // const deleting = (property) => {

//   //   return setFormData((prevForm) => {
//   //     return { ...prevForm, [property]: "" }

//   //   })
//   // }



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBtnDisabled(true);
//     try {
//       await checkErrors(schema, formData);

//       setLoading(true);

//       const formDataWithoutPhoto = { ...formData };
//       delete formDataWithoutPhoto.photo;
//       delete formDataWithoutPhoto.income_proof;
//       // console.log(formData.photo)

//       const obj = { income_proof: formData.income_proof, photo: formData.photo }
//       // console.log(obj)

//       const response = await backEndCallObj("/users/profile_update", formDataWithoutPhoto);
//       // console.log(response, "kkkkk")
//       const filesUploadResponse = await backEndCallObj("/users/files_upload", obj);
//       // console.log(filesUploadResponse, "kjkjkj")
//       setUserprofileData(null)
//       setUpdateddata(true);
//       setUserData(true)
//       setUserEligibility(null)
//       navigate("/userdetails");
//       setLoading(false);
//       setErrorOccur(false);

//       // Reset form data to empty values
//       setFormData({
//         first_name: "",
//         last_name: "",
//         dob: "",
//         gender: "",
//         photo: "",
//         tin_number: "",
//         passport_number: "",
//         employment: "",
//         permanentAddress: "",
//         currentAddress: "",
//         income_proof: "",
//       });
//     } catch (ex) {
//       if (ex.response && ex.response.status === 400) {
//         // console.log(ex.response?.data);
//         toast.error(ex.response?.data);
//       }
//     } finally {
//       setLoading(false);
//       setBtnDisabled(false);
//     }
//   };

//   const validate = () => {
//     const { error } = schema.validate(formData, { abortEarly: false });
//     if (!error) return null;

//     const validationErrors = {};
//     for (let item of error.details) {
//       validationErrors[item.path[0]] = item.message;
//     }
//     return validationErrors;
//   };

//   const today = new Date();
//   const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

//   const maxDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());



//   const fetchData = async () => {
//     if (!userprofileData) {

//       const response = await backEndCall("/users/user_profile");
//       console.log(response, "profilel;;;")
//       setUserprofileData(response);


//       setFormData({
//         first_name: response.first_name,
//         last_name: response.last_name,
//         dob: response.dob,
//         gender: capitalize(response.gender),
//         photo: response.photo,
//         tin_number: response.tin_number,
//         passport_number: response.passport_number,
//         employment: response.employment,
//         permanentAddress: response.residence.permanentAddress,
//         currentAddress: response.residence.currentAddress,
//         income_proof: response.income_proof,
//       });
//     }
//     else {
//       setFormData({
//         first_name: userprofileData?.first_name,
//         last_name: userprofileData?.last_name,
//         dob: userprofileData?.dob,
//         gender: capitalize(userprofileData?.gender),
//         photo: userprofileData?.photo,
//         tin_number: userprofileData?.tin_number,
//         passport_number: userprofileData?.passport_number,
//         employment: userprofileData?.employment,
//         permanentAddress: userprofileData?.residence.permanentAddress,
//         currentAddress: userprofileData?.residence.currentAddress,
//         income_proof: userprofileData?.income_proof,
//       });
//     }

//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const capitalize = (string) => {
//     // console.log(string)
//     // console.log(
//     //   string.charAt(0).toUpperCase() + string.slice(1)
//     // )
//     return string?.charAt(0).toUpperCase() + string?.slice(1);

//   }

//   const deleting = (property) => {
//     console.log(property, "-------->");
//     setFormData((prevForm) => {
//       console.log(prevForm, "--------->");
//       const updatedForm = { ...prevForm };
//       updatedForm[property] = ""; // Clearing the property in the form data
//       console.log(updatedForm, "--------- updated data");
//       // Assuming setUserData is a function that updates user data
//       setUserData(schema, updatedForm);
//       setErrorOccur(true); // Resetting error state
//       return updatedForm;
//     });
//     // Assuming ‘property’ corresponds to the id of the input element
//     const input = document.getElementById(property);
//     if (input) {
//       input.value = ""; // Resetting the value of the input field
//     }
//   };
//   // console.log(userprofileData)
//   return (
//     <>
//       {updateddata ? (
//         <Userdetails />
//       ) : (

//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-10">
//               <div className="card shadow-sm">
//                 <div className="card-body p-4">
//                   <form onSubmit={handleSubmit}>
//                     {/* KYC Details */}
//                     <h5 className="mb-4 fw-bold" >KYC Details</h5>
//                     <div className="row ">
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
//                         <Input_Name
//                           type={"text"}
//                           value={formData["first_name"]}
//                           name={"first_name"}
//                           placeholder={"Enter First Name "}
//                           id={"special_character"}
//                           SetForm={setFormData}
//                           schema={schema["first_name"]}
//                           min={4}
//                           max={20}
//                           maxLength={50}
//                           autoFocus={true}
//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
//                         <Input_Name
//                           type={"text"}
//                           value={formData["last_name"]}
//                           name={"last_name"}
//                           placeholder={"Enter Last Name"}
//                           id={"special_character"}
//                           SetForm={setFormData}
//                           schema={schema["last_name"]}
//                           min={4}
//                           max={20}
//                           maxLength={50}

//                         />
//                       </div>
//                     </div>

//                     <div className="row ">
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="dob" className="form-label">Date of Birth <span className="text-danger">*</span></label>
//                         <Date_Input
//                           type={"date"}
//                           value={formData["dob"]}
//                           name={"dob"}
//                           SetForm={setFormData}
//                           schema={schema["dob"]}
//                           max={new Date(new Date().getFullYear() - 21, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
//                           required
//                         />

//                         {/* {errors.dob && (
//                           <div className="error">{errors.dob || " Date of birth is required"}</div>
//                         )} */}
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="gender" className="form-label">Gender <span className="text-danger">*</span></label>
//                         <Select_input
//                           name="gender"
//                           SetForm={setFormData}
//                           schema={schema["gender"]}
//                           options={[
//                             { value: "Male", label: "Male" },
//                             { value: "Female", label: "Female" },
//                             { value: "Transgender", label: "Transgender" }
//                           ]}
//                           value={formData["gender"]} // Set the initial value based on formData.gender
//                         />
//                       </div>
//                     </div>

//                     <div className="row ">
//                       {/* TIN Number and Passport Number */}
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="tinNumber" className="form-label">TIN Number <span className="text-danger">*</span></label>
//                         < Input_docnumbers
//                           type={"text"}
//                           value={formData["tin_number"]}
//                           name={"tin_number"}
//                           placeholder={"Enter TIN Number "}
//                           id={"special_character"}
//                           SetForm={setFormData}
//                           schema={schema["tin_number"]}
//                           minLength={12}
//                           maxLength={12}

//                         />
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="passportNumber" className="form-label">Passport Number <span className="text-danger">*</span></label>
//                         < Input_docnumbers
//                           type={"text"}
//                           value={formData["passport_number"]}
//                           name={"passport_number"}
//                           placeholder={"Enter Passport Number "}
//                           id={"special_character"}
//                           SetForm={setFormData}
//                           schema={schema["passport_number"]}
//                           minLength={12}
//                           maxLength={12}

//                         />
//                       </div>
//                     </div>
//                     {/* Loan Type */}

//                     <div className="row mb-4">


//                       {/* Address Details */}



//                       <label htmlFor="permanentAddress" className="form-label">Permanent Address <span className="text-danger">*</span></label>
//                       <Input_address
//                         type={"text"}
//                         value={formData["permanentAddress"]}
//                         name={"permanentAddress"}
//                         placeholder={"Enter Permanent Address  "}
//                         id={"special_character"}
//                         SetForm={setFormData}
//                         schema={schema["permanentAddress"]}
//                         maxLength={100}

//                       />
//                     </div>
//                     <div className="row mb-3">
//                       <label htmlFor="currentAddress" className="form-label">Current Address <span className="text-danger">*</span></label>
//                       <Input_address
//                         type={"text"}
//                         value={formData["currentAddress"]}
//                         name={"currentAddress"}
//                         placeholder={"Enter Current Address"}
//                         id={"special_character"}
//                         SetForm={setFormData}
//                         schema={schema["currentAddress"]}
//                         maxLength={100}

//                       />
//                     </div>

//                     <div className="row ">

//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="employment" className="form-label">Employment <span className="text-danger">*</span></label>
//                         <Select_input
//                           name="employment"
//                           value={formData.employment}
//                           SetForm={setFormData}
//                           schema={schema["employment"]}
//                           options={[
//                             { value: "SalariedEmployee", label: "Salaried Employee" },
//                             { value: "SelfEmployed", label: "Self Employed" },
//                             { value: "Business", label: "Business" },
//                           ]}
//                         />
//                       </div>
//                     </div>
//                     {/* Upload Documents */}
//                     <h5 className="mb-4">Upload documents <span className="text-danger">*</span></h5>
//                     <div className="row mb-4">

//                       <div className="col-md-6 mb-3 position-relative">
//                         <label htmlFor="income_proof" className="form-label">Income Proof <span className="text-danger">*</span></label>
//                         <input
//                           type="file"
//                           className="form-control"
//                           id="income_proof"
//                           name="income_proof"
//                           accept="image/*,.pdf"

//                           onChange={handleChange}
//                         // required
//                         />
//                         <span className="delete_image" onClick={() => deleting("income_proof")} ><i className="ri-delete-bin-5-line"></i></span>
//                         <div className="position-relative">
//                           <img src={formData?.income_proof} className="document_image mt-1 rounded-2" />
//                           {console.log(formData.income_proof, "dddddddddd")}
//                         </div>
//                         {errors.income_proof && (
//                           <div className="error">{errors.income_proof}</div>
//                         )}
//                       </div>

//                       <div className="col-md-6 mb-3 position-relative">
//                         <label htmlFor="photo" className="form-label">Photo<span className="text-danger">*</span></label>
//                         <input
//                           type="file"
//                           className="form-control"
//                           id="photo"
//                           name="photo"
//                           accept="image/*,.pdf"

//                           onChange={handleChange}
//                         />
//                         <span className="delete_image" onClick={() => deleting("photo")} ><i className="ri-delete-bin-5-line"></i></span>
//                         <div className="position-relative">
//                           <img src={formData?.photo} className="document_image mt-1 rounded-2" />
//                         </div>
//                         {errors.photo && (
//                           <div className="error">{errors.photo}</div>
//                         )}
//                       </div>
//                     </div>



//                     {/* Submit Button */}
//                     <button type="submit" className="btn btn-primary" disabled={btnDisabled}>{btnDisabled ? "Updating..." : "Update"}</button>

//                   </form>
//                 </div>
//               </div>
//             </div >
//           </div >
//         </div >


//       )}

//     </>
//   )

// };

// export default Updateprofile;
/* eslint-disable react/jsx-pascal-case */

import React, { useEffect, useRef, useState } from "react";
import Joi from "joi";
import { backEndCall, backEndCallObj } from "../../services/mainServiceFile";
import { Link, useNavigate } from "react-router-dom";
import Userdetails from "./Userdetails";
import Compress from 'react-image-file-resizer';
import { logDOM } from "@testing-library/react";
import { Input_text, Select_input, Date_Input, Number_Input, File_Input, Input_Name, Input_docnumbers, Input_address } from './../comman/All-Inputs';
import { useMovieContext } from "../comman/Context";
import { useFunctionContext } from "../comman/FunctionsContext";
import { toast } from "react-hot-toast";
import moment, { max } from "moment";
import authService from "../../services/authService";


const Updateprofile = () => {
  const { userprofileData, setUserprofileData, usereligibility, setUserEligibility, userData, setUserData } = useMovieContext();
  // console.log(userprofileData, "userprooooooooooo")
  const navigate = useNavigate()
  const [formData, setFormData] = useState(
    {
      first_name: "",
      last_name: "",
      dob: "",

      gender: "",
      photo: "",
      tin_number: "",
      passport_number: "",
      employment: "",
      permanentAddress: "",
      currentAddress: "",
      city: "",
      state: "",
      pin_code: "",
      income_proof: "",
    }
  );
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { errors, setErrors, setLoading, setErrorOccur, } = useMovieContext()
  const { checkErrors } = useFunctionContext()
  // const { handleChange } = useFunctionContext()
  const fileInputRef = useRef(null);
  const [updateddata, setUpdateddata] = useState(false);
  // const [errors, setErrors] = useState({});

  const schema = {
    first_name: Joi.string()
      .trim()
      .min(4)
      .max(50)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .label("First Name")
      .messages({
        'string.pattern.base': 'First name should not contain special characters or numbers',
      }),
    last_name: Joi.string()
      .trim()
      .min(4)
      .max(50)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .label("Last Name")
      .messages({
        'string.pattern.base':
          'First name should not contain special characters or numbers',
      }),

    dob: Joi.string().isoDate().required()
      .label("Date of Birth")
      .messages({
        'any.required': 'Date of birth is required',
        'string.isoDate': 'Date of birth must be in the format “YYYY-MM-DD',

      }).min(20).required(),



    gender: Joi.string().valid('Male', 'Female', 'Transgender').required().label("Gender"),
    tin_number: Joi.string()
      .min(10)
      .max(12)
      .length(12)
      .required()
      .label("TIN Number")
      .regex(/^[A-Za-z0-9]+$/)
      .messages({
        'any.required': 'TIN Number is required',
        'string.pattern.base':
          'TIN Number must contain only letters and numbers',
        'string.min': 'TIN Number must be at least 10 characters long',
        'string.max': 'TIN Number cannot be longer than 12 characters',
      }),
    passport_number: Joi.string()
      .min(4)
      .max(12)
      .length(12)
      .required()
      .label("Passport Number")
      .regex(/^[A-Za-z0-9]+$/)
      .messages({
        'any.required': 'Passport number is required',
        'string.pattern.base':
          'Passport number must contain only letters and numbers',
        'string.min': 'Passport number must be at least 12 characters long',
        'string.max': 'Passport number cannot be longer than 20 characters',
      }),
    employment: Joi.string()
      .valid('SalariedEmployee', 'SelfEmployed', 'Business')
      .required().label("Employment"),
    permanentAddress: Joi.string()
      .min(10)
      .max(50)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9/ _,-]+$"))
      .message("permanentAddress only allows alphanumeric characters, spaces, underscores, hyphens, and forward slashes."),
    // permanentAddress: Joi.string().min(10).max(50).required().label("Permanent Address"),
    currentAddress: Joi.string()
      .min(10)
      .max(50)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9/ _,-]+$"))
      .message("currentAddress only allows alphanumeric characters, spaces, underscores, hyphens, and forward slashes."),
    // currentAddress: Joi.string().min(10).max(50).required().label("Current Address"),
    state: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("state")

      .regex(/^[A-Za-z ]+$/)
      .message('State must contain only alphabets.'),

    city: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("city")
      .regex(/^[A-Za-z ]+$/)
      .message('City must contain only alphabets.'),

    pin_code: Joi.string()
      .length(6)
      .required()
      .label("pin code")
      .regex(/^[0-9]+$/)
      .message('Pin code must contain only numbers.'),


    income_proof: Joi.string().required(),
    photo: Joi.string().required(),
  };


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



  // const handleChange = async (e) => {

  //   const { name, value, type, files } = e.target;
  //   try {
  //     if (type === "file") {
  //       const file = e.target.files[0];
  //       if (file) {

  //         // console.log(errors, name)

  //         setErrors(prevErrors => ({
  //           ...prevErrors,
  //           [name]: "" // Here, [name] is the computed property name
  //         }));
  //         // console.log(file, "filess")
  //         if (file.type.slice(-3) === 'pdf') {
  //           const pdfs = { ...formData };
  //           const res = URL.createObjectURL(file);
  //           pdfs[name] = res;
  //           setFormData(pdfs);
  //         } else {
  //           Compress.imageFileResizer(
  //             file,
  //             480,
  //             480,
  //             'JPEG',
  //             40,
  //             0,
  //             (uri) => {
  //               const images = { ...formData };
  //               images[name] = uri;
  //               setFormData(images);
  //             },
  //             'base64'
  //           );
  //         }
  //       } else {
  //         // Clear the input field if no file is selected
  //         setFormData({ ...formData, [name]: "" });
  //       }
  //     } else {
  //       setFormData({ ...formData, [name]: value });
  //       setErrorOccur({ ...formData, [name]: "" })
  //     }
  //   } catch (error) {

  //     console.error("Error:", error);
  //   }
  // };






  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    try {
      await checkErrors(schema, formData);

      setLoading(true);

      const formDataWithoutPhoto = { ...formData };
      delete formDataWithoutPhoto.photo;
      delete formDataWithoutPhoto.income_proof;
      // console.log(formData.photo)

      const obj = { income_proof: formData.income_proof, photo: formData.photo }
      // console.log(obj)

      const response = await backEndCallObj("/users/profile_update", formDataWithoutPhoto);
      // console.log(response, "kkkkk")
      const filesUploadResponse = await backEndCallObj("/users/files_upload", obj);
      // console.log(filesUploadResponse, "kjkjkj")
      setUserprofileData(null)
      setUpdateddata(true);
      setUserData(null)
      setUserEligibility(null)
      setLoading(false);
      setErrorOccur(false);
      navigate("/userdetails");

      // Reset form data to empty values
      setFormData({
        first_name: "",
        last_name: "",
        dob: "",
        gender: "",
        photo: "",
        tin_number: "",
        passport_number: "",
        employment: "",
        permanentAddress: "",
        currentAddress: "",
        state: "",
        city: "",
        pin_code: "",
        income_proof: ""
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // console.log(ex.response?.data);
        toast.error(ex.response?.data);
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
  const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

  const maxDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());



  const fetchData = async () => {
    console.log(userprofileData)
    if (!userprofileData) {

      const response = await backEndCall("/users/user_profile");
      console.log(response, "profilel;;;")
      setUserprofileData(response);


      setFormData({
        first_name: response.first_name,
        last_name: response.last_name,
        dob: response.dob,
        gender: capitalize(response.gender),
        photo: response.photo,
        tin_number: response.tin_number,
        passport_number: response.passport_number,
        employment: response.employment,
        permanentAddress: response.residence.permanentAddress,
        currentAddress: response.residence.currentAddress,
        state: response.residence.state,
        city: response.residence.city,
        pin_code: response.residence.pin_code,
        income_proof: response.income_proof,
      });
    }
    else {
      setFormData({
        first_name: userprofileData?.first_name,
        last_name: userprofileData?.last_name,
        dob: userprofileData?.dob,
        gender: capitalize(userprofileData?.gender),
        photo: userprofileData?.photo,
        tin_number: userprofileData?.tin_number,
        passport_number: userprofileData?.passport_number,
        employment: userprofileData?.employment,
        permanentAddress: userprofileData?.residence.permanentAddress,
        currentAddress: userprofileData?.residence.currentAddress,
        state: userprofileData?.residence.state,
        city: userprofileData?.residence.city,
        pin_code: userprofileData?.residence.pin_code,
        income_proof: userprofileData?.income_proof,
      });
    }

  };

  useEffect(() => {

    fetchData();
  }, []);

  const capitalize = (string) => {

    return string?.charAt(0).toUpperCase() + string?.slice(1);

  }

  const deleting = (property) => {

    setFormData((prevForm) => {

      const updatedForm = { ...prevForm };
      updatedForm[property] = "";

      setUserData(schema, updatedForm);
      setErrorOccur(true);
      return updatedForm;
    });

    const input = document.getElementById(property);
    if (input) {
      input.value = "";
    }
  };

  return (
    <>


      <div className="container">

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* KYC Details */}
                  <h5 className="mb-4 fw-bold" >KYC Details</h5>
                  <div className="row ">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
                      <Input_Name
                        type={"text"}
                        value={(formData["first_name"] === "0" ? "" : formData["first_name"])}
                        name={"first_name"}
                        placeholder={"Enter First Name "}
                        id={"special_character"}
                        SetForm={setFormData}
                        schema={schema["first_name"]}
                        min={4}
                        max={20}
                        maxLength={50}
                        autoFocus={true}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
                      <Input_Name
                        type={"text"}
                        value={(formData["last_name"] === "0" ? "" : formData["last_name"])}

                        name={"last_name"}
                        placeholder={"Enter Last Name"}
                        id={"special_character"}
                        SetForm={setFormData}
                        schema={schema["last_name"]}
                        min={4}
                        max={20}
                        maxLength={50}

                      />
                    </div>
                  </div>

                  <div className="row ">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="dob" className="form-label">Date of Birth <span className="text-danger">*</span></label>
                      <Date_Input
                        type={"date"}
                        value={(formData["dob"] === "0" ? "" : formData["dob"])}

                        name={"dob"}
                        SetForm={setFormData}
                        schema={schema["dob"]}
                        max={new Date(new Date().getFullYear() - 21, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
                        required
                      />

                      {/* {errors.dob && (
                          <div className="error">{errors.dob || " Date of birth is required"}</div>
                        )} */}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="gender" className="form-label">Gender <span className="text-danger">*</span></label>
                      <Select_input
                        name="gender"
                        SetForm={setFormData}

                        schema={schema["gender"]}
                        options={[
                          { value: "Male", label: "Male" },
                          { value: "Female", label: "Female" },
                          { value: "Transgender", label: "Transgender" }
                        ]}
                        value={(formData["gender"] === "0" ? "" : formData["gender"])}

                      />
                    </div>
                  </div>

                  <div className="row ">
                    {/* TIN Number and Passport Number */}
                    <div className="col-md-6 mb-3">
                      <label htmlFor="tinNumber" className="form-label">TIN Number <span className="text-danger">*</span></label>
                      < Input_docnumbers
                        type={"text"}
                        value={(formData["tin_number"] === "0" ? "" : formData["tin_number"])}

                        name={"tin_number"}
                        placeholder={"Enter TIN Number "}
                        id={"special_character"}
                        SetForm={setFormData}
                        schema={schema["tin_number"]}
                        minLength={12}
                        maxLength={12}

                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="passportNumber" className="form-label">Passport Number <span className="text-danger">*</span></label>
                      < Input_docnumbers
                        type={"text"}
                        value={(formData["passport_number"] === "0" ? "" : formData["passport_number"])}

                        name={"passport_number"}
                        placeholder={"Enter Passport Number "}
                        id={"special_character"}
                        SetForm={setFormData}
                        schema={schema["passport_number"]}
                        minLength={12}
                        maxLength={12}

                      />
                    </div>
                  </div>
                  {/* Loan Type */}

                  <div className="row mb-4">


                    {/* Address Details */}



                    <label htmlFor="permanentAddress" className="form-label">Permanent Address <span className="text-danger">*</span></label>
                    <Input_address
                      type={"text"}
                      value={(formData["permanentAddress"] === "0" ? "" : formData["permanentAddress"])}

                      name={"permanentAddress"}
                      placeholder={"Enter Permanent Address  "}
                      id={"special_character"}
                      SetForm={setFormData}
                      schema={schema["permanentAddress"]}
                      maxLength={100}

                    />
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="currentAddress" className="form-label">Current Address <span className="text-danger">*</span></label>
                    <Input_address
                      type={"text"}
                      value={(formData["currentAddress"] === "0" ? "" : formData["currentAddress"])}


                      name={"currentAddress"}
                      placeholder={"Enter Current Address"}
                      id={"special_character"}
                      SetForm={setFormData}
                      schema={schema["currentAddress"]}
                      maxLength={100}

                    />
                  </div>
                  <div className="row ">

                    <div className="col-md-6 mb-3">
                      <label htmlFor="state" className="form-label">State <span className="text-danger">*</span></label>
                      <Input_text
                        type={"text"}
                        value={(formData["state"] === "0" ? "" : formData["state"])}

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
                        value={(formData["city"] === "0" ? "" : formData["city"])}
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
                        value={(formData["pin_code"] === "0" ? "" : formData["pin_code"])}
                        name={"pin_code"}
                        placeholder={"Enter Your Pin Code"}
                        maxLength={6}
                        // inputMode={numeric}
                        SetForm={setFormData}
                        schema={schema["pin_code"]}

                      />

                    </div>


                    <div className="col-md-6 mb-3">
                      <label htmlFor="employment" className="form-label">Employment <span className="text-danger">*</span></label>
                      <Select_input
                        name="employment"
                        value={(formData.employment === "0" ? "" : formData.employment)}

                        SetForm={setFormData}
                        schema={schema["employment"]}
                        options={[
                          { value: "SalariedEmployee", label: "Salaried Employee" },
                          { value: "SelfEmployed", label: "Self Employed" },
                          { value: "Business", label: "Business" },
                        ]}
                      />
                    </div>
                  </div>
                  {/* Upload Documents */}
                  <h5 className="mb-4">Upload documents <span className="text-danger">*</span></h5>
                  <div className="row mb-4">

                    {/* <div className="col-md-6 mb-3 position-relative">
                      <label htmlFor="income_proof" className="form-label">Income Proof <span className="text-danger">*</span></label>
                      <input
                        type="file"
                        className="form-control"
                        id="income_proof"
                        name="income_proof"
                        accept="image/*,.pdf"

                        onChange={handleChange}
                      // required
                      />
                      <span className="delete_image" onClick={() => deleting("income_proof")} ><i className="ri-delete-bin-5-line"></i></span>
                      <div className="position-relative">
                        <img src={formData?.income_proof} className="document_image mt-1 rounded-2" />
                        {console.log(formData.income_proof, "dddddddddd")}
                      </div>
                      {errors.income_proof && (
                        <div className="error">{errors.income_proof}</div>
                      )}
                    </div> */}
                    <div className="col-md-6 mb-3 position-relative">
                      <label htmlFor="income_proof" className="form-label">Income Proof <span className="text-danger">*</span></label>
                      <input
                        type="file"
                        className="form-control"
                        id="income_proof"
                        name="income_proof"
                        ref={fileInputRef}
                        accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.doc,.docx,.pdf"

                        onChange={handleChange}

                      />
                      {errors.income_proof && (
                        <div className="error">{errors.income_proof}</div>
                      )}
                      <span className="delete_image" onClick={() => deleting("income_proof")} ><i className="ri-delete-bin-5-line"></i></span>

                      <div className="position-relative">



                        <div>
                          {formData && formData.income_proof && (
                            formData.income_proof.includes("image") ? (
                              <img src={formData.income_proof} className="document_image mt-1 rounded-2" />
                            ) : (
                              <embed src={formData.income_proof} className="document_image1 mt-1 rounded-2" />
                            )
                          )}
                        </div>
                        {formData.income_proof && <a href={formData.income_proof} target="_blank" rel="noopener noreferrer">view pay slip</a>

                        }
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
                        {/* <div>
                          {formData.photo ? (
                            <img src={formData?.photo} className="document_image mt-1 rounded-2" />
                          ) : formData.photo ? <embed src={formData.photo} className="document_image1 mt-1 rounded-2" /> : ""

                          }
                        </div>
                        {formData.photo && <a href={formData.photo} target="_blank" rel="noopener noreferrer">view photo</a>

                        }
                      </div> */}
                        <div>
                          {formData && formData.photo && (
                            formData.income_proof.includes("image") ? (
                              <img src={formData.photo} className="document_image mt-1 rounded-2" />
                            ) : (
                              <embed src={formData.photo} className="document_image1 mt-1 rounded-2" />
                            )
                          )}
                        </div>
                        {formData.photo && <a href={formData.photo} target="_blank" rel="noopener noreferrer">view pay slip</a>

                        }
                      </div>
                      {errors.photo && (
                        <div className="error">{errors.photo}</div>
                      )}
                    </div>
                  </div>



                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary" disabled={btnDisabled}>{btnDisabled ? "Updating..." : "Update"}</button>

                </form>
              </div>
            </div>
          </div >
        </div >
      </div >

      {/* )} */}

    </>
  )

};

export default Updateprofile;
