
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { backEndCall } from '../../services/mainServiceFile';
import { useMovieContext } from '../comman/Context';
import Updateprofile from './Updateprofile';
import authService from '../../services/authService';

function KycRoot() {

    const [loading, setLoading] = useState(false);
    const { userprofileData, kycRoot, setKycRoot } = useMovieContext();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await backEndCall("/users/get_kyc_url");
            console.log(response, "kyc")
            setKycRoot(response);

            setLoading(false);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data);
                // console.log(ex.response.data)
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (userprofileData?.kyc_status == "pending" && userprofileData?.topwallet_user_id !== "0") {
            fetchData();
        }
    }, []);


    const openKycIntegration = () => {
        window.open(kycRoot, '_blank');
        authService.logout()
    };
    // if (userprofileData?.kyc_status == "pending") {
    //   console.log(userprofileData?.kyc_status)
    //   Navigate("/updateprofile")
    // }
    return (
        <div>
            {userprofileData?.topwallet_user_id === "0" ? (
                <Updateprofile />
            ) : (
                <div className="user-details-container">
                    <h5 className="mb-4">KYC Integration</h5>
                    <div className="row justify-content-center"> {/* Centering the card */}
                        <div className="col-sm-10 col-md-8 col-lg-8 col-xl-8"> {/* Adjust width for different screen sizes */}
                            <div className="card">
                                <div className="card-body text-center">
                                    <p className="mb-3">Please complete your KYC to continue using our services. Click the button below to start the KYC process.</p>
                                    <p className="mb-3 text-muted">Your KYC information helps us verify your identity and keep your account secure. Make sure to have your identification documents ready.</p>

                                    <div className="kyc-url-container p-3 bg-light mt-3 mb-2">
                                        <button className='btn btn-primary' onClick={() => openKycIntegration(kycRoot)}>KYC Integration</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default KycRoot;
