import React, { useEffect, useRef, useState } from "react";
import Joi from "joi";
import { backEndCall, backEndCallObj } from "../../services/mainServiceFile";
import { Link, useNavigate } from "react-router-dom";
import Compress from 'react-image-file-resizer';
import { Input_text, Select_input, Date_Input, Number_Input, File_Input, Input_Name, Input_docnumbers, Input_address, Input_email } from './../comman/All-Inputs';
import { useMovieContext } from "../comman/Context";
import { useFunctionContext } from "../comman/FunctionsContext";
import { toast } from "react-hot-toast";



const Updateprofile = () => {
  const { userprofileData, setUserprofileData, usereligibility, setUserEligibility, userData, setUserData } = useMovieContext();

  const [loading, setLoading] = useState(false)
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
      // permanentAddress: "",
      // currentAddress: "",
      city: "",

      pin_code: "",
      income_proof: "",

      member_email: "",

      region: "",
      province: "",

      houseno: "",
      barangay: "",
      user_politician: "",
      user_familymember_politician: ""
    }
  );
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { errors, setErrors, setErrorOccur, } = useMovieContext()
  const { checkErrors } = useFunctionContext()

  const fileInputRef = useRef(null);
  const [updateddata, setUpdateddata] = useState(false);

  const currentYear = new Date().getFullYear();
  const schema = {
    first_name: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .label("First Name")
      .messages({
        'string.pattern.base': 'First name should not contain special characters ',
      }),
    last_name: Joi.string()
      .trim()
      .min(2)
      .max(50)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .label("Last Name")
      .messages({
        'string.pattern.base':
          'Last name should not contain special characters ',
      }),


    dob: Joi.date()
      .max("now")
      .less(`${currentYear - 20}-01-01`)
      .greater(`${currentYear - 80}-01-01`)
      .required()
      .iso()
      .messages({
        "any.required": "Date of birth is required",
        "date.base": "Date of birth must be a valid date",
        "date.max": "Date of birth cannot be in the future",
        "date.less": "Date of birth must be at most 20 years ago",
        "date.greater": "Date of birth must be less than or equal to 60 years",
        "date.iso": "Date of birth must be in the format “YYYY - MM - DD”"
      }),

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
      .min(10)
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
    // permanentAddress: Joi.string()
    //   .min(10)
    //   .max(50)
    //   .required()
    //   .label("Permanent Address")
    //   .pattern(new RegExp("^[a-zA-Z0-9/ _,-]+$"))
    //   .message("permanentAddress only allows alphanumeric characters, spaces, underscores, hyphens, and forward slashes."),
    // currentAddress: Joi.string()
    //   .min(10)
    //   .max(50)
    //   .required()
    //   .label("Current Address")
    //   .pattern(new RegExp("^[a-zA-Z0-9/ _,-]+$"))
    //   .message("currentAddress only allows alphanumeric characters, spaces, underscores, hyphens, and forward slashes."),

    city: Joi.string()
      .min(2)
      .max(50)
      .required()
      .label("City")
      .regex(/^[A-Za-z ]+$/)
      .message('City must contain only alphabets.'),

    pin_code: Joi.string()
      .length(6)
      .required()
      .label("Pin Code")
      .regex(/^[0-9]+$/)
      .message('Pin code must contain only numbers.'),


    income_proof: Joi.string().required().label("Income Proof"),
    photo: Joi.string().required().label("Photo"),



    member_email: Joi.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .options({
        messages: {
          "string.pattern.base": "Please enter a valid email address. (e.g., example@example.com)",
        },
      }).required().label("Email Id").min(5).max(50),


    region: Joi.string()
      .min(2)
      .max(50)
      .required()
      .pattern(/^[A-Za-z ]+$/)
      .message("Region must contain only alphabets.")
      .label("Region"),
    province: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label("Province")
      .pattern(/^[A-Za-z ]+$/)
      .message("Province must contain only alphabets."),
    // houseno: Joi.string().required().label("houseno").regex(/^[a-zA-Z0-9]/),
    houseno: Joi.string()
      .min(3)
      .max(50)
      .label("House No")
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9/ _,-]+$"))
      .message("House No must contain only alphabets."),
    barangay: Joi.string()
      .min(2)
      .max(50)
      .label("Barangay")
      .required()
      .pattern(/^[A-Za-z ]+$/)
      .message("Barangay must contain only alphabets."),

    user_politician: Joi.string()
      .min(2)
      .max(50)
      .optional()
      .label("User Politician")

      .pattern(/^[A-Za-z ]+$/).allow("0")
      .message("User Politician Must Contain Only Alphabets."),
    user_familymember_politician: Joi.string()
      .min(2)
      .max(50)
      .label("User Family Member Politician")
      .optional()
      .pattern(/^[A-Za-z ]+$/).allow("0")
      .message("User Familymember Politician Must Contain Only Alphabets."),

  };


  const handleChange = async (e) => {


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

      setTimeout(async () => {
        try {
          const response = await backEndCallObj("/users/user_profile_status");
          toast.success(response);

        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            // console.log(ex.response?.data);
            toast.error(ex.response?.data);
            setLoading(false)
          }
        }
      }, 10000);
      setTimeout(async () => {
        try {
          const filesUploadResponse = await backEndCallObj("/users/files_upload", obj);

          setUserprofileData(null)
          setUpdateddata(true);
          setUserData(null)
          setUserEligibility(null)
          setErrorOccur(false);
          navigate("/userdetails");




        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            toast.error(ex.response?.data);
            setLoading(false)
          }
        }

      }, 10500);


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
        // permanentAddress: "",
        // currentAddress: "",

        city: "",
        pin_code: "",
        income_proof: "",


        member_email: "",

        region: "",
        province: "",

        houseno: "",
        barangay: "",
        user_politician: "",
        user_familymember_politician: "",


      });


    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // console.log(ex.response?.data);
        toast.error(ex.response?.data);
        setLoading(false)
      }
    } finally {
      // setLoading(false);
      setBtnDisabled(false);


    }
  };



  const today = new Date();
  const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());

  const maxDate = new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());




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
  if (loading) {
    return <div><div className="text-center mt-3">
      <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
        <span className="sr-only"></span>
      </div>
    </div></div>;
  }
  return (
    <>


      <div className="container">

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  {/* KYC Details */}
                  <h5 className="mb-4 fw-bold" >Update Profile</h5>
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
                      <label htmlFor="last Name" className="form-label">Last Name <span className="text-danger">*</span></label>
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
                        value={formData["dob"] === "0" ? "" : formData["dob"]}
                        name={"dob"}
                        SetForm={setFormData}
                        schema={schema["dob"]}
                        min={new Date(new Date().getFullYear() - 60, new Date().getMonth(), new Date().getDate()).toISOString().split("T")[0]}
                        max={new Date(new Date().getFullYear() - 21, new Date().getMonth(), new Date().getDate()).toISOString().split("T")[0]}
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

                  <div className="row">

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
                    <div className="col-md-6 mb-3">

                      <label htmlFor="member_email" className="form-label">Email <span className="text-danger">*</span></label>
                      <Input_email
                        type="email"
                        value={(formData["member_email"] === "0" ? "" : formData["member_email"])}
                        name="member_email"
                        placeholder="Enter Email"
                        SetForm={setFormData}
                        schema={schema["member_email"]}
                        minLength={5}
                        maxLength={50}
                      />

                    </div>
                  </div>

                  <div className="row ">

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
                        maxLength={50}

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
                  </div>


                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="region" className="form-label">Region <span className="text-danger">*</span></label>
                      <Input_text
                        type={"text"}
                        value={(formData["region"] === "0" ? "" : formData["region"])}

                        name={"region"}
                        placeholder={"Enter Region"}
                        id={"special_character"}
                        SetForm={setFormData}
                        schema={schema["region"]}
                        maxLength={50}

                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="province" className="form-label">Province<span className="text-danger">*</span></label>
                      <Input_text
                        type={"text"}
                        value={(formData["province"] === "0" ? "" : formData["province"])}

                        name={"province"}
                        placeholder={"Enter Province"}
                        id={"special_character"}
                        SetForm={setFormData}
                        schema={schema["province"]}
                        maxLength={50}

                      />
                    </div>
                  </div>
                  <div className="row">


                    <div className="col-md-6 mb-3">
                      <label htmlFor="houseno" className="form-label">House No <span className="text-danger">*</span></label>

                      <Input_address
                        type={"text"}
                        value={(formData["houseno"] === "0" ? "" : formData["houseno"])}

                        name={"houseno"}
                        placeholder={"Enter Permanent House No  "}
                        id={"special_character"}
                        SetForm={setFormData}
                        schema={schema["houseno"]}
                        maxLength={10}

                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Barangay" className="form-label">Barangay<span className="text-danger">*</span></label>
                      <Input_text
                        type={"text"}
                        value={(formData["barangay"] === "0" ? "" : formData["barangay"])}

                        name={"barangay"}
                        placeholder={"Enter Barangay"}
                        id={"special_character"}
                        SetForm={setFormData}
                        schema={schema["barangay"]}
                        maxLength={50}

                      />
                    </div>
                  </div>

                  <div className="row">


                    <div className="col-md-6 mb-3">
                      <label htmlFor="user politician" className="form-label">User Politician<span className="text-danger">*</span></label>

                      <Select_input
                        name="user_politician"
                        value={(formData.user_politician === "0" ? "" : formData.user_politician)}

                        SetForm={setFormData}
                        schema={schema["user_politician"]}
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },

                        ]}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="user familymember politician" className="form-label">User Family Member Politician<span className="text-danger">*</span></label>



                      <Select_input
                        name="user_familymember_politician"
                        value={(formData.user_familymember_politician === "0" ? "" : formData.user_familymember_politician)}

                        SetForm={setFormData}
                        schema={schema["user_familymember_politician"]}
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },

                        ]}
                      />


                    </div>
                  </div>
                  {/* <div className="row mb-3">
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
                  <div className="row mb-4">


                  


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
                  </div> */}


                  {/* Upload Documents */}
                  <h5 className="mb-4">Upload documents <span className="text-danger">*</span></h5>
                  <div className="row mb-4">

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
                        {formData.income_proof && <a href={formData.income_proof} target="_blank" rel="noopener noreferrer">view income proof</a>

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

                        <div>
                          {formData && formData.photo && (
                            formData.income_proof.includes("image") ? (
                              <img src={formData.photo} className="document_image mt-1 rounded-2" />
                            ) : (
                              <embed src={formData.photo} className="document_image1 mt-1 rounded-2" />
                            )
                          )}
                        </div>
                        {formData.photo && <a href={formData.photo} target="_blank" rel="noopener noreferrer">view photo</a>

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












