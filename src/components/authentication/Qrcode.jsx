
import React, { useState, useEffect } from "react";
import authService from "../../services/authService";
import { backEndCallObj } from "../../services/mainServiceFile";
import Joi from "joi-browser";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { publicIp } from "public-ip";
import { fullBrowserVersion } from "react-device-detect";
import ReactCountdownClock from "react-countdown-clock";
import { Modal, Button } from "react-bootstrap";

const QRCode = ({ qr, secret }) => {
  const [data, setData] = useState({ otp: "", two_fa_code: "" });
  const [errors, setErrors] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [phone_number, setphone_number] = useState("");
  const [tfaStatus, setTfaStatus] = useState("");
  const [sendOtp, setSendOtp] = useState("");
  const [inputVisible, setInputVisible] = useState(true);
  const [countdown, setCountdown] = useState(120);
  const [sendotpdisable, setSendOtpDisable] = useState(false);
  const [ipAddress, setIpAddress] = useState("0.0.0.0");
  const [browserId, setBrowserId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  let timer;
  useEffect(() => {
    const fetchUserData = async () => {
      var bid = fullBrowserVersion;
      setBrowserId(bid);

      const response = await authService.getCurrentUser();
      setphone_number(response.phone_number);
      setTfaStatus(response.TWO_FA_Status);
      if (response.TWO_FA_Status === "Enable") {
        setSendOtp(true);
        setInputVisible(false);
      }
    };

    fetchUserData();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        // const ip = await publicIp();
        // setIpAddress(ip);
        // console.log(ip, "ip");
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIpAddress();
  }, []);

  const handleSendOtp = async () => {
    setSendOtpDisable(true);

    const response = await authService.getCurrentUser();
    setphone_number(response.phone_number);
    setTfaStatus(response.TWO_FA_Status);

    try {
      const response = await backEndCallObj("/users/resend_otp", {
        phone_number: phone_number,
        key: "tfa",
      });
      setInputVisible(true);
      toast.success("OTP sent successfully. Please check your phone.");
      setSendOtp(true);
      setCountdown(120);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("Failed to send OTP. Please try again later.");
      }
    } finally {
      setSendOtpDisable(false);
    }
  };

  // const handleResendOtp = async () => {
  //   setBtnDisabled(true);
  //   try {
  //     const response = await authService.backEndCallObj("/users/resend_otp", {
  //       phone_number: phone_number,
  //       key: "tfa",
  //     });
  //     setCountdown(10);
  //     toast.success("OTP resent successfully. Please check your phone.");
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 400) {
  //       toast.error("Failed to resend OTP. Please try again later.");
  //     }
  //   } finally {
  //     setBtnDisabled(false);
  //   }
  // };
  const handleResendOtp = async () => {
    setBtnDisabled(true);
    try {


      const response = await authService.resendOtp(
        phone_number,
        "tfa",
      )

      setCountdown(120);
      toast.success("Otp successfull", response.message);
      console.log(response, "resend");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response?.data);
      }
    } finally {
      setBtnDisabled(false);
    }
  };
  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
    return timer;
  };

  const getFormattedCountdown = (countdown) => {
    if (countdown > 0) {
      const minutes = Math.floor(countdown / 60);
      const seconds = countdown % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }
  };

  const doSubmit = async () => {
    setBtnDisabled(true);

    try {
      startCountdown();
      const route =
        tfaStatus !== "Enable" ? "/users/verify_2fa" : "/users/disable_2fa";
      const obj =
        tfaStatus !== "Enable"
          ? { two_fa_code: data.two_fa_code }
          : { two_fa_code: data.two_fa_code, otp: data.otp, key: "tfa" };

      const response = await backEndCallObj(route, obj);
      setShowModal(true);
      toast.success("Two-factor authentication updated successfully.");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(
          "Failed to update two-factor authentication. Please try again later."
        );
      }
    } finally {
      setBtnDisabled(false);
    }
  };

  const handlelogout = () => {
    navigate("/login");
  };

  const schema = {
    otp:
      tfaStatus === "Enable"
        ? Joi.string()
          .length(6)
          .regex(/^\S(.*\S)?$/)
          .regex(/^[0-9]+$/)
          .options({
            language: {
              string: {
                regex: {
                  base: "Should Contain Only Numbers ",
                  test: "another description",
                },
              },
            },
          })
          .required()
          .label("OTP")
        : Joi.string().allow(""),
    two_fa_code: Joi.string()
      .regex(/^[0-9]+$/)
      .options({
        language: {
          string: {
            regex: {
              base: "should contain 6 digits",
              test: "another description",
            },
          },
        },
      })
      .required()
      .label("2FA Code"),
  };

  const validate = () => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);

    const errorMessage = validateProperty(input);
    setErrors({ ...errors, [input.name]: errorMessage });
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaProp = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaProp);
    return error ? error.details[0].message : null;
  };
  console.log(qr, "navaneetha")
  return (
    <div className="col-lg-6 col-12">
      <div className="card shadow-none mt-0">
        <div className="card-body">
          <div className="card-title">CHANGE TWO FACTOR AUTHENTICATION</div>
          <hr />
          <ul className="list-unstyled">
            {tfaStatus !== "Enable" && (
              <>
                <li className="mb-1">
                  Install or open a third-party authenticator app like Google
                  Authenticator, Authy, etc.
                </li>
                <li className="mb-1">
                  Scan QR code below with the authenticator
                </li>
                <li className="mb-1">
                  Enter the 6-digit code you see in the authenticator
                </li>
              </>
            )}
          </ul>
          {sendOtp && (
            <>
              <h4 className="fs-16 text-capitalize">
                Click below button to send OTP
              </h4>
              <button
                className="btn btn-primary "
                onClick={handleSendOtp}
                disabled={sendotpdisable}
              >
                Send OTP
              </button>
            </>
          )}

          <div className="mb-4">
            {tfaStatus !== "Enable" && (

              <img src={qr} alt="QR Code" className="qrClass" />
            )}
          </div>

          {inputVisible && (
            <>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <div className="position-relative has-icon-right">
                    <input
                      type="text"
                      name="two_fa_code"
                      id="two_fa_code"
                      value={data.two_fa_code}
                      onChange={handleChange}
                      placeholder="Enter 2FA code"
                      className="form-control input-shadow"
                      maxLength="6"
                    />
                    <div className="form-control-position">
                      <i className="icon-lock"></i>
                    </div>
                  </div>
                  {errors.two_fa_code && (
                    <div className="text-danger mt-1 errorsClass">
                      {errors.two_fa_code}
                    </div>
                  )}
                </div>

                {tfaStatus === "Enable" && (
                  <div className="form-group">
                    <div className="position-relative has-icon-right">
                      <input
                        type="text"
                        name="otp"
                        id="otp"
                        value={data.otp}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        className="form-control input-shadow"
                        maxLength="6"
                      />
                      <div className="form-control-position">
                        <i className="icon-lock"></i>
                      </div>
                    </div>
                    {errors.otp && (
                      <div className="text-danger mt-1 errorsClass">
                        {errors.otp}
                      </div>
                    )}

                  </div>
                )}


                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={btnDisabled}
                >
                  Submit
                </button>

              </form>
              {sendOtp && (
                <div className="fs-14">

                  {countdown > 0 ? (
                    <div className="d-flex align-items-center">
                      <p className="mb-0 fs-16">OTP Expires in</p>
                      <ReactCountdownClock
                        seconds={countdown}
                        color="#107FAB"
                        alpha={0.9}
                        size={35}
                        onComplete={handleResendOtp}
                        weight={4}
                        showMilliseconds={false}
                      />
                    </div>

                  ) : (
                    <p className=" fs-16">
                      Didn't receive the otp?{" "}
                      <span
                        className="link text-primary link-OTP mt-5"
                        onClick={handleResendOtp}
                      >
                        Click here
                      </span>
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Modal
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p className="text-capitalize">
            Two-factor authentication status changed successfully. Please logout
            and login again.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={handlelogout}
            disabled={btnDisabled}
          >
            Logout
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QRCode;
