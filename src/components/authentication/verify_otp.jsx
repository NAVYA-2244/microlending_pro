import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import authService from "../../services/authService";
import { toast } from "react-hot-toast";
import { publicIpv4 } from "public-ip";
import { fullBrowserVersion } from "react-device-detect";
import ReactCountdownClock from "react-countdown-clock";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const OTPForm = ({ phone_number, Tfa_Status, otpkey }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(120);
  const [data, setData] = useState({ otp: "", twofacode: "" });
  const [errors, setErrors] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [current_access_ip, setcurrent_access_ip] = useState("0.0.0.0");
  const [browserId, setBrowserId] = useState("");
  // const [resendBtnDisabled, setResendBtnDisabled] = useState(false);
  let timer;

  useEffect(() => {
    console.log(phone_number, Tfa_Status, otpkey);
    const fetchIPAddress = async () => {
      try {
        const ip = await publicIpv4();
        setcurrent_access_ip(ip);
      }
      catch (error) {
        console.error("Error fetching IP address:", error);
      }
      return () => clearInterval(timer);
    };
    startCountdown();
    fetchIPAddress();
  }, []);

  const schema = {
    otp: Joi.string()
      .length(6)
      .regex(/^\S(.*\S)?$/)
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
      .label("OTP"),

    twofacode:
      Tfa_Status === "Enable"
        ? Joi.string()
          .regex(/^[0-9]+$/)
          .required()
          .label("2FA")
          .length(6)
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
        : Joi.string()
          .regex(/^[0-9]+$/)
          .optional()
          .allow("")
          .label("2FA Code"),
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (!isNaN(value)) {
  //     setData({ ...data, [name]: value });
  //   }

  //   const validationErrors = validate();
  //   setErrors(validationErrors || {});
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      setData({ ...data, [name]: value });
    }
    const { error } = Joi.object({ [name]: schema[name] }).validate({
      [name]: value,
    });

    if (error) {
      // eslint-disable-next-line no-use-before-define
      // const errors = { ...errors };
      errors[name] = error.details[0].message;
      setErrors(errors);
    } else {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    console.log(phone_number);

    e.preventDefault();
    console.log("handle submit called", schema);
    console.log("props -->", phone_number, Tfa_Status, otpkey);
    const validationErrors = validate();
    console.log("Error ==>", validationErrors);
    setErrors(validationErrors || {});
    if (validationErrors) return;

    setBtnDisabled(true);
    const { otp } = data;
    try {
      const response = await authService.verifyOTP(
        phone_number,
        otp,
        current_access_ip,
        Tfa_Status === "Enable" ? data.twofacode : "0",
        otpkey
      );

      console.log(response);

      toast.success("Otp Verified Successfully");
      console.log(response.message);
      navigate("/dashboard");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {

        console.log(errors);
        toast.error(ex.response?.data);
      }
    } finally {
      setBtnDisabled(false);
    }
  };

  const handleResendOtp = async () => {

    setBtnDisabled(true);

    try {
      // console.log(phone_number, otpkey, "key");

      const response = await authService.resendOtp(phone_number, otpkey);

      toast.success("Otp successfull", response.message);
      console.log(response, "resend");
      setCountdown(120)
      // startCountdown();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response?.data);
      }
    } finally {

      setBtnDisabled(false);
    }
  };

  const startCountdown = () => {
    timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);
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

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const newErrors = {};
    for (let item of error.details) {
      newErrors[item.path[0]] = item.message;
    }
    return newErrors;
  };
  console.log(countdown)
  return (
    <>
      <div className="authentication-page login-form">
        <div className="p-4">
          <div className="container bg-white rounded-3">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="card mb-0 shadow-none verify-image">
                  <Link to="/" className="text-decoration-none mt-3">
                    <img
                      src="assets/images/light-logo.png"
                      className="login-logo"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="card mb-0 shadow-none">
                  <div className="card-body">
                    <div className="card-title  fs-16 mt-4">
                      <p className="">
                        A one time 6-digit code has been sent to your phone
                        number
                      </p>
                      <span className="text-lowercase text-primary">
                        +{phone_number}
                      </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4 mt-5 position-relative">
                        <label
                          htmlFor="otpControlInput"
                          className="form-label "
                        >
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          name="otp"
                          placeholder="Enter OTP"
                          value={data.otp}
                          onChange={handleChange}
                          inputMode="numeric"
                          className={`form-control input-shadow ${errors.otp ? "is-invalid" : ""
                            }`}
                          maxLength="6"
                          required
                          autoFocus
                        />
                        {/* <div className="view-password-icon">
                          <i className="ri-lock-password-line"></i>
                        </div> */}
                        {errors.otp && (
                          <div className="invalid-feedback">{errors.otp}</div>
                        )}
                      </div>

                      {Tfa_Status === "Enable" && (
                        // <div className="form-group">
                        <div className="mb-4 mt-5 position-relative">
                          <label className="OPT-label mt-0 mb-3 fw-semibold">
                            Enter 2FA
                          </label>
                          <div className="position-relative has-icon-right  mb-5">
                            <input
                              type="text"
                              className="form-control input-shadow"
                              id="twofacode"
                              name="twofacode"
                              placeholder="Enter 2FA"
                              value={data.twofacode}
                              onChange={handleChange}
                              maxLength="6"
                              required
                              autoFocus
                            />
                            <div className="form-control-position">
                              <i className="icon-lock"></i>
                            </div>
                            {errors.twofacode && (
                              <div className="text-danger mt-1 errorsClass">
                                {errors.twofacode}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {/* <div className="fs-14">
                        {countdown > 0 ? (
                          <div className="d-flex align-items-center">
                            <p className="mb-0 me-2 fs-16">OTP Expires in  </p>

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
                              disabled={btnDisabled}
                            >
                              Click here
                            </span>
                          </p>
                        )}


                      </div> */}
                      <div className="card-footer  mt-4">
                        {countdown > 0 ? (
                          <>
                            <p className="mt-3 fs-16">
                              OTP Expires Within {" "}
                              <span>{getFormattedCountdown(countdown)}</span> Seconds
                            </p>
                          </>
                        ) : (
                          <p className="para-otp fs-5 cursor-pointer">
                            Didn't receive the otp?
                            <a
                              className="link link-OTP mt-5"
                              onClick={btnDisabled ? null : handleResendOtp}
                              disabled={btnDisabled}
                            >
                              <span id="resend-opt cursor-pointer "> Click here</span>
                            </a>
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary py-2 mb-3 mt-4"
                        disabled={btnDisabled}
                      >
                        {btnDisabled ? "Please Wait" : "Verify"}

                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPForm;
