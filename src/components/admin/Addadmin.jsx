import authservice from '../../services/authService';
import React, { useState } from "react";
import Joi from "joi";
import { backEndCallObj } from "../../services/mainServiceFile";
import { Link, useNavigate } from "react-router-dom";
import { Input_text, Select_input, Number_Input, Input_email } from './../comman/All-Inputs';
import { useMovieContext } from "../comman/Context";
import { useFunctionContext } from "../comman/FunctionsContext";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
import { toPadding } from 'chart.js/helpers';


const AddAdmin = ({ show, onHide }) => {
  const navigate = useNavigate();
  const { AddAdminData, setAddadminData } = useMovieContext();
  // const { AddAdminlist } = useFunctionContext();
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",

    member_email: "",
    admin_type: "",
    phone_number: "",
  });


  const { errors, setLoading, setErrorOccur } = useMovieContext();
  const { checkErrors } = useFunctionContext();

  const [modalMessage, setModalMessage] = useState("");

  const schema = {
    first_name: Joi.string().required().label("First Name").min(2).max(50),

    admin_type: Joi.string().required().label("Admin Type"),
    member_email: Joi.string()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .options({
        messages: {
          "string.pattern.base": "Please enter a valid email address. (e.g., example@example.com)",
        },
      })
      .required()
      .label("Email Id"),

    phone_number: Joi.string()

      .trim()
      .min(10)
      .max(10)
      .length(10)
      // .invalid('null', 'undefined').regex(/^ [6 - 9][0 - 9] * $ /).required()
      .pattern(/^[6-9][0-9]*$/)
      .label("Phone Number")
      .messages({
        "string.pattern.base": "should not start with 1, 2, 3, 4 ,5 or 6 and should not contain special characters",
      })


  };
  const AddAdminlist = async () => {
    const response = await backEndCallObj("/admin/admins_list");
    setAddadminData(response);

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnDisabled(true)
    try {
      await checkErrors(schema, formData);
      setLoading(true);
      // console.log(formData, "formData")

      // const response = await backEndCallObj("/admin/create_admin", formData);
      // console.log(response, "res");
      // Add logic to prefix phone number with "63"
      const { phone_number } = formData;
      const prefixedPhoneNumber = `63${phone_number}`;

      const response = await backEndCallObj("/admin/create_admin", {
        ...formData,
        phone_number: prefixedPhoneNumber,
      });
      AddAdminlist()


      setModalMessage(response.message);
      toast.success(response.message, "Admin added successfully");
      onHide();
      setLoading(false);
      setErrorOccur(false);
      setFormData({
        first_name: "",

        member_email: "",
        admin_type: "",
        phone_number: "",

      });
    }

    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
    finally {
      setLoading(false);
      setBtnDisabled(false)
    }
  };
  const handleClose = () => {
    onHide();
    setFormData({
      first_name: "",

      member_email: "",
      admin_type: "",
      phone_number: "",
    });
  };

  if (authservice.getCurrentUser().admin_type !== "1") {
    window.history.back();
  }



  return (

    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label"> Name</label>
            <Input_text
              type={"text"}
              value={formData["first_name"]}
              name={"first_name"}
              placeholder={"Enter  name here"}
              id={"special_character"}
              SetForm={setFormData}
              schema={schema["first_name"]}
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <Input_text
              type={"text"}
              value={formData["last_name"]}
              name={"last_name"}
              placeholder={"Enter last name here"}
              id={"special_character"}
              SetForm={setFormData}
              schema={schema["last_name"]}
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="member_email" className="form-label">Email</label>
            <Input_email
              type={"email"}
              value={formData["member_email"]}
              name={"member_email"}
              placeholder={"Enter  member_email here"}
              id={"special_character"}
              SetForm={setFormData}
              schema={schema["member_email"]}


            />
          </div>

          {/* <div className="input-group">
              <span className="input-group-text font-bold">
                +63
              </span>
              <Number_Input
                className="form-control input-shado flex-grow-1"
                type={"number"}
                value={formData["phone_number"]}
                maxLength={"12"}
                name={"phone_number"}
                placeholder={"Enter phone_number here"}
                id={"special_character"}
                SetForm={setFormData}
                schema={schema["phone_number"]}

              />
            </div> */}
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">Phone Number</label>

            <div className="position-relative applyloan">
              <span className="apply_loan p-2 positon_absolute font-bold me-2">
                +63
              </span>
              <Number_Input

                type={"phone_number"}
                value={formData["phone_number"]}
                name={"phone_number"}
                placeholder={"Enter phone number here"}
                SetForm={setFormData}
                schema={schema["phone_number"]}

                maxLength={10}
                className="phone_number"
              />
            </div>




          </div>



          <div className="mb-3">
            <label htmlFor="admin_type" className="form-label">Admin Type</label>
            <Select_input
              name="admin_type"
              className="formform-control"
              SetForm={setFormData}
              id={"special_character"}
              value={formData["admin_type"]}
              schema={schema["admin_type"]}
              options={[
                { value: "2", label: "2" },
                { value: "3", label: "3" },
              ]}
            />
          </div>
          <Button variant="primary" type="submit"
            disabled={btnDisabled}
          >Submit</Button>


        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAdmin;
