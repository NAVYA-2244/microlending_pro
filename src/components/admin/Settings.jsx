import React, { useState, useEffect } from "react";
import authService, { tfa } from "../../services/authService";
import { toast } from "react-hot-toast";
// import { backEndCallObj } from "../../services/mainServiceFile";
import { useNavigate } from "react-router-dom";
// import ChangePassword from "../authentication/ChangePassword";
import Qrcode from "../authentication/Qrcode";

const Settings = () => {
  const [tfaStatus, setTfaStatus] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [qrData, setQrData] = useState(false);
  const [qr, setQr] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchUserData = async () => {
      setBtnDisabled(true)
      try {
        const response = await authService.getCurrentUser();
        // console.log(response, "enable disable");

        setTfaStatus(response.TWO_FA_Status);
        // console.log(response, "two ");
        setphone_number(response.phone_number);
      }
      // catch (error) {
      //   console.error("Error fetching user data:", error);
      // }
      catch (ex) {
        if (ex.response && ex.response.status === 400) {
          toast.error(ex.response.data);
        }
      }
      finally {
        setBtnDisabled(false);
      }
    };

    fetchUserData();
  }, []);



  const handleChangetwoFaStatus = async () => {
    setBtnDisabled(true);
    try {
      if (tfaStatus !== "Enable") {
        const response = await authService.tfa(phone_number);
        if (response) {
          setQrData(true);
          console.log(response, "qrcod");
          setQr(response.QR);

        }
      } else {
        setQrData(true);
        // toast.success("Two-factor authentication disabled successfully.");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response?.data);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    } finally {
      setBtnDisabled(false);
    }
  };

  const navigateTo = (path) => {
    navigate(path);
  };
  // console.log(qr, "qr code")
  return (
    <div className="row align-items-stretch text-center justify-content-center">
      {!qrData && (
        <div className="col-lg-6 col-12">
          <div className="card shadow-none mt-0">
            <div className="card-body">
              <div className="card-title">TWO FACTOR AUTHENTICATION</div>
              <h4 className="fs-16 text-capitalize">
                Click below button to
                {tfaStatus === "Enable" ? " Disable " : " Enable "}
                Two Factor Authentication
              </h4>
              <hr />
              <div className="twofa" />
              <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={handleChangetwoFaStatus}
                disabled={btnDisabled}
              >
                {tfaStatus === "Enable"
                  ? "Two-step Verification Disable"
                  : "Two-step Verification  Enable"}
              </button>
            </div>
          </div>
        </div>
      )}
      {qrData && <Qrcode qr={qr} />}


      {/* {!authService.IsAdmin() && (
        <div className="col-lg-6 border-start">
          <ChangePassword />
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={() => navigateTo("/some-path")}
          >
            Go to Some Path
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Settings;
