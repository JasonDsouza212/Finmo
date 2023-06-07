import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Individualpayindetails() {
  const { payin_id } = useParams();
  const [payin, Setpayin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/payin/${payin_id}`);
        const data = await response.json();
        Setpayin(data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [payin_id]);

  return (
    <div>
      <h1 className="payin-hist-h1">Payin Details</h1>
      {isLoading ? (
        <h1 className="loading-message">Loading...</h1>
      ) : payin === [] ? (
        <h1 className="errormsg">Sorry no details available for the Payin</h1>
      ) : (
        <table className="customer-table">
          <tbody>
            <tr>
              <td className="key">Payin ID</td>
              <td>{payin.payin_id}</td>
            </tr>
            <tr>
              <td className="key">Email</td>
              <td>{payin.payin_method_name}</td>
            </tr>
            <tr>
              <td className="key">Pay in method category</td>
              <td>{payin.payin_method_category}</td>
            </tr>
            <tr>
              <td className="key">Description</td>
              <td>{payin.description}</td>
            </tr>
            <tr>
              <td className="key">ORG ID</td>
              <td>{payin.org_id}</td>
            </tr>
            <tr>
              <td className="key">Fees wallet ID</td>
              <td>{payin.fees_wallet_id}</td>
            </tr>
            <tr>
              <td className="key">Credit wallet ID</td>
              <td>{payin.credit_wallet_id}</td>
            </tr>
            <tr>
              <td className="key">Amount</td>
              <td>{payin.amount}</td>
            </tr>
            <tr>
              <td className="key">Currency</td>
              <td>{payin.currency}</td>
            </tr>
            <tr>
              <td className="key">STATUS</td>
              <td>{payin.status}</td>
            </tr>
            <tr>
              <td className="key">Payin Type</td>
              <td>{payin.payin_type}</td>
            </tr>
            <tr>
              <td className="key">Is Paid</td>
              <td>{payin.is_paid ? "Yes" : "NO"}</td>
            </tr>
            <tr>
              <td className="key">Is Partially Paid</td>
              <td>{payin.is_partially_paid ? "Yes" : "NO"}</td>
            </tr>
            <tr>
              <td className="key">Is Fees charged</td>
              <td>{payin.is_fees_charged ? "Yes" : "NO"}</td>
            </tr>
            <tr>
              <td className="key">Is Chargeable</td>
              <td>{payin.is_chargeable ? "Yes" : "NO"}</td>
            </tr>
            <tr>
              <td className="key">Created At</td>
              <td>{payin.created_at}</td>
            </tr>
            <tr>
              <td className="key">Updated At</td>
              <td>{payin.updated_at}</td>
            </tr>
            <tr>
              <td className="key">Expire At</td>
              <td>{payin.expire_at}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
