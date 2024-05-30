import React from 'react';


function KycStatus() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 custom-card-width">
                    <div className="card text-center">
                        <div className="card-body">
                            <h3 className="card-title text-success">KYC SUCCESS</h3>
                            <div className="kyc-url-container p-3 bg-light mt-3 mb-2">
                                <img
                                    className="img-fluid rounded"
                                    src="./assets/images/Verifier-passes-or-rejects-the-KYC-Application-after-verification.png"
                                    alt="KYC Verification Process"
                                />
                                {/* <img
                                    className="img-fluid rounded"
                                    src="./assets/images/Kycsuccess.png"
                                    alt="KYC Verification Process"
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KycStatus;
