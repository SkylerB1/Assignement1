import { React, useState, useEffect, useRef } from "react";
import "./DisplayTransactions.css";
import { Link } from "react-router-dom";
import axios from "axios";

function DisplayTransactions() {
  const [data, setData] = useState([]);
  const balance = useRef(0);

  const displayData = async () => {
    const resp = await axios.get("http://localhost:5000/api/get");
    setData(resp.data);
  };

  const handleBalance = (amount, type) => {
    if (type === "credit") {
      balance.current += amount;
    } else {
      balance.current -= amount;
    }

    return <td>{balance.current}</td>;
  };

  useEffect(() => {
    displayData();
  }, []);
  const convertDate = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString();
  };
  return (
    <div className="container">
      <table className="table table-boadered">
        <thead>
          <tr>
            <th>Office Tranactions</th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <Link to="/NewTransactions">
                <button className="btn btn-light">Add Tranactions</button>
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
                <td>{convertDate(item.date)}</td>
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
                {handleBalance(item.amount, item.transaction_type)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTransactions;
