import { React, useState, useEffect } from "react";
import "./DisplayTransactions.css";
import { Link } from "react-router-dom";
import axios from "axios";

function DisplayTransactions() {
  const [data, setData] = useState([]);
  const [balance, setBalance] = useState(0);

  const displayData = async () => {
    const resp = await axios.get("http://localhost:5000/api/get");
    setData(resp.data);
  };

  useEffect(() => {
    displayData();
  }, []);

  return (
    <div className="table">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Office Tranactions</th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Link to="/NewTransactions">
                <button>Add Tranactions</button>
              </Link>
            </th>
          </tr>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Running Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.description}</td>
                {item.transaction_type === "credit" ? (
                  <td>{item.amount}</td>
                ) : (
                  <td></td>
                )}
                {item.transaction_type === "debit" ? (
                  <td>{item.amount}</td>
                ) : (
                  <td></td>
                )}
                {item.transaction_type === "credit"
                  ? () => setBalance((balance) => balance + item.amount)
                  : () => setBalance((balance) => balance - item.amount)}
                <td>{balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTransactions;
