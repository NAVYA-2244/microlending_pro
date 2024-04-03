import React, { useState } from "react";
import Joi from "joi";
import { backEndCallObj } from "../../services/mainServiceFile";
import { Link, useNavigate } from "react-router-dom";
import Userdetails from "./Userdetails";
import Compress from 'react-image-file-resizer';
import { logDOM } from "@testing-library/react";
import { Input_text, Select_input, Date_Input, File_Input } from './../comman/All-Inputs';
import { useMovieContext } from "../comman/Context";
import { useFunctionContext } from "../comman/FunctionsContext";
import { toast } from "react-hot-toast";

const Updateprofile = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(
    {
      first_name: "",
      first_name: "",
      dob: "",
      // age: "",
      gender: "",
      photo: "",
      tin_number: "",
      passport_number: "",
      // password: "",
      // purpose_of_loan: "",
      employment: "",
      permanentAddress: "",
      currentAddress: "",
      income_proof: "",
    }
  );

  const { errors, setLoading, setErrorOccur } = useMovieContext()
  const { checkErrors } = useFunctionContext()
  // const { handleChange } = useFunctionContext()

  const [updateddata, setUpdateddata] = useState(false);
  // const [errors, setErrors] = useState({});

  const schema = {
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    // dob: Joi.string().required().label("Date of Birth"),
    // dob: Joi.date().max('now').required().label('Date'),
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

    // age: Joi.number().min(20).required().label("Age"),
    gender: Joi.string().required().label("Gender"),
    tin_number: Joi.string().required().label("TIN Number").max(10).min(10),

    passport_number: Joi.string().required().label("Passport Number").max(10).min(10),
    // password: Joi.string().required().label("Password"),
    // purpose_of_loan: Joi.string().required().label("Purpose of Loan"),
    employment: Joi.string().required().label("Employment"),
    permanentAddress: Joi.string().required().label("Permanent Address").min(8).max(50),
    currentAddress: Joi.string().required().label("Current Address").min(8).max(50),
    income_proof: Joi.any().required().label("Income Proof Document"),
    photo: Joi.any().required().label("photo"),
  };

  // const handleChange = async (e) => {
  //   const { name, value, type, files } = e.target;

  //   const val = type === "file" ? files[0] : value;

  //   try {
  //     if (type === "file") {
  //       const file = e.target.files[0];
  //       if (file) {
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
  //       }
  //     } else {
  //       setFormData({ ...formData, [name]: val });
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };


  // const getBase64 = (file) => {
  //   return new Promise((resolve) => {

  //     let reader = new FileReader();

  //     reader.readAsDataURL(file);

  //     reader.onload = () => {

  //       let baseURL = reader.result.replace('data:', '').replace(/^.+,/, '');
  //       resolve(baseURL);
  //     };
  //   });
  // };
  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

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
        } else {
          // Clear the input field if no file is selected
          setFormData({ ...formData, [name]: "" });
        }
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const deleting = (property) => {
    return setFormData((prevForm) => {
      return { ...prevForm, [property]: "" }

    })
  }


  // const handleSubmit = async (e) => {

  //   e.preventDefault();
  //   const userSchema = Joi.object(schema)


  //   const { error } = userSchema.validate(formData, { abortEarly: false });
  //   if (error) {
  //     const newErrors = {};
  //     error.details.forEach((detail) => {
  //       newErrors[detail.path[0]] = detail.message;
  //     })
  //     setErrors(newErrors)
  //   }
  //   else {
  //     console.log(setFormData)
  //   }


  //   try {
  //     const formDataWithoutPhoto = { ...formData };
  //     delete formDataWithoutPhoto.photo;
  //     delete formDataWithoutPhoto.income_proof;

  //     const response = await backEndCallObj("/users/profile_update", formDataWithoutPhoto);
  //     const formDataWithOnlyPhotoAndIncomeProof = {
  //       photo: formData.photo,
  //       income_proof: formData.income_proof
  //     };
  //     console.log(formDataWithOnlyPhotoAndIncomeProof, "formdata");
  //     const filesUploadResponse = await backEndCallObj("/users/files_upload", formDataWithOnlyPhotoAndIncomeProof)
  //     console.log(filesUploadResponse, "files");

  //     setUpdateddata(true);
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       console.log(ex.response?.data);

  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkErrors(schema, formData);

      setLoading(true);
      const formDataWithoutPhoto = { ...formData };
      delete formDataWithoutPhoto.photo;
      delete formDataWithoutPhoto.income_proof;

      const response = await backEndCallObj("/users/profile_update", formDataWithoutPhoto);
      const formDataWithOnlyPhotoAndIncomeProof = {
        photo: formData.photo,
        income_proof: formData.income_proof
      };
      console.log(formDataWithOnlyPhotoAndIncomeProof, "formdata");
      const filesUploadResponse = await backEndCallObj("/users/files_upload", formDataWithOnlyPhotoAndIncomeProof)
      console.log(filesUploadResponse, "files");

      setUpdateddata(true);
      navigate("/userdetails");
      setLoading(false);
      setErrorOccur(false);
      // setTimeout(() => {
      //   window.location.reload("/movies");
      // }, 1000);
      setFormData(
        {
          first_name: "",
          first_name: "",
          dob: "",
          // age: "",
          gender: "",
          photo: "",
          tin_number: "",
          passport_number: "",
          // password: "",
          // purpose_of_loan: "",
          employment: "",
          permanentAddress: "",
          currentAddress: "",
          income_proof: "",
        }
      );
    }
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response?.data);
        toast.error(ex.response?.data)
      }
    }

    finally {
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
        <Userdetails />
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    {/* KYC Details */}
                    <h5 className="mb-4 fw-bold" >KYC Details</h5>
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

                          minDate={minDate.toISOString().split('T')[20]}
                          maxDate={new Date().toISOString().split('T')[100]}
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
                    <h5 className="mb-4">Loan Type</h5>
                    <div className="row mb-4">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="employment" className="form-label">Employment</label>
                        <Select_input
                          name="employment"
                          SetForm={setFormData}
                          schema={schema["employment"]}
                          options={["SalariedEmployee", "SelfEmployed", "Business"]}
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
                    {/* Upload Documents */}
                    <h5 className="mb-4">Upload documents</h5>
                    <div className="row mb-4">
                      <div className="col-md-6 mb-3 position-relative">
                        <label htmlFor="incomeProof" className="form-label">Income Proof Document:</label>
                        <input
                          type="file"
                          className="form-control"
                          id="incomeProofControlInput"
                          name="income_proof"
                          accept="image/*,.pdf"
                          onChange={handleChange}
                        />
                        <span className="delete_image" onClick={() => deleting("income_proof")}><i className="ri-delete-bin-5-line"></i></span>
                        <div className="position-relative">
                          <img src={formData?.income_proof} className="document_image mt-1 rounded-2" />
                        </div>
                        {errors.income_proof && (
                          <div className="error">{errors.income_proof}</div>
                        )}
                      </div>
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

export default Updateprofile;
