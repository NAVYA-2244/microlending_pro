

import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { backEndCall } from '../../services/mainServiceFile';
import { useNavigate } from 'react-router-dom';

function BankDetails() {
    const [bankDetails, setBankDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await backEndCall('/users/banks_list');
            console.log(response, "bankDetails");
            setBankDetails(response.net_banks || {});
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                console.error(ex.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleBankItemClick = (bankCode, fullName) => {
        const bank = bankDetails[bankCode];
        console.log('Clicked bank details:', bank);
        const name = bank?.settlement_rail?.INSTAPAY?.name;
        console.log('Name:', name);
        navigate(`/withdrawal`, { state: { bankCode, fullName, bank } });
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        margin: '15px',
        padding: '20px',
        textAlign: 'left',
        width: '300px',
        cursor: 'pointer'
    };

    if (loading) {
        return (
            <div className="text-center mt-3">
                <div className="spinner-border spiner-border-sm" style={{ color: "blue" }} role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="user-details-container">
            <h3>Bank List</h3>
            {/* <div className='card'>
                <div className='card-body justify-content-center d-flex flex-wrap'>


                    {Object.keys(bankDetails).map((bankCode, index) => (
                        <div key={index} style={cardStyle} onClick={() => handleBankItemClick(bankCode, bankDetails[bankCode].full_name)}>
                            <h5>{bankCode}</h5>
                            <p><strong>Full Name:</strong> {bankDetails[bankCode].full_name}</p> */}
            {/* <p><strong>swift_bic:</strong> {bankDetails[bankCode].swift_bic}</p> */}
            {/* {bankDetails[bankCode].settlement_rail && (
                                    <div>
                                        <p><strong>Settlement Rail:</strong></p>
                                        <ul>
                                            <li>
                                                <strong>Bank Code:</strong> {bankDetails[bankCode].settlement_rail?.PESONET?.bank_code || bankDetails[bankCode].settlement_rail?.INSTAPAY?.bank_code}
                                            </li>
                                            <li>
                                                <strong>Name:</strong> {bankDetails[bankCode].settlement_rail?.PESONET?.name || bankDetails[bankCode].settlement_rail?.INSTAPAY?.name}
                                            </li>
                                        </ul>
                                    </div>
                                )} */}
            {/* </div>
                    ))}

                </div>
            </div> */}
            <div className='card'>
                <div className='card-body d-flex flex-wrap'>

                    {Object.keys(bankDetails).map((bankCode, index) => (
                        <div key={index} className="card mb-3 mx-auto" style={cardStyle} onClick={() => handleBankItemClick(bankCode, bankDetails[bankCode].full_name, bankDetails[bankCode].settlement_rail?.INSTAPAY?.name)}>
                            {/* <div key={index} className="card mb-3 mx-auto " style={cardStyle} onClick={() => handleBankItemClick(bankCode, bankDetails[bankCode].full_name)}> */}
                            <div className="card-body text-center">
                                <h5 className="card-title">{bankCode}</h5>
                                <p className="card-text"><strong>Full Name:</strong> {bankDetails[bankCode].full_name}</p>
                                {/* <p className="card-text"><strong>swift_bic:</strong> {bankDetails[bankCode].swift_bic}</p> */}
                                {/* {bankDetails[bankCode].settlement_rail && (
                                    <div>
                                        <p><strong>Settlement Rail:</strong></p>
                                        <ul>
                                            <li>
                                                <strong>Bank Code:</strong> {bankDetails[bankCode].settlement_rail?.PESONET?.bank_code || bankDetails[bankCode].settlement_rail?.INSTAPAY?.bank_code}
                                            </li>
                                            <li>
                                                <strong>Name:</strong> {bankDetails[bankCode].settlement_rail?.PESONET?.name || bankDetails[bankCode].settlement_rail?.INSTAPAY?.name}
                                            </li>
                                        </ul>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
}

export default BankDetails;
