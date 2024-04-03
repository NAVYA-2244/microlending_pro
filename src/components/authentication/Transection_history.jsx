import React, { useState, useEffect } from 'react';

function Transection_history() {
    const [transectionshistory, setTransactionHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactionHistory = async () => {
            try {
                const response = await fetch('/api/transaction/history');
                if (!response.ok) {
                    throw new Error('Failed to fetch transaction history');
                }
                const data = await response.json();
                setTransactionHistory(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchTransactionHistory();
    }, []);

    return (
        <div className="table-responsive">

            {loading ? (
                <div className="text-center mt-3">
                    <div className="spinner-border spiner-border-sm" style={{ color: "#efefef" }} role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            ) : (
                <table className="table border table-bordered table-centered">
                    <thead>
                        <tr className="table-head">
                            <th scope="col"> TransactionId</th>
                            <th scope="col">ReceiverId</th>
                            <th scope="col">SenderId</th>
                            <th scope="col">TransactionType</th>
                            <th scope="col">TransactionStatus</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Comment</th>
                            <th scope="col">TransactionDate</th>
                            <th scope="col">Time</th>

                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {transectionshistory?.map((history) => (
                            <tr key={history.transaction_id}>
                                <td>{history.receiver_id}</td>
                                <td>{history.sender_id}</td>
                                <td>{history.transactionType}</td>
                                <td>{history.transaction_status}</td>
                                <td>{history.amount}</td>
                                <td>{history.comment}</td>
                                <td>{history.transactionDate}</td>
                                <td>{history.timestamps}</td>



                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    )
}

export default Transection_history