import { React, useState, useEffect } from "react";
import "./DisplayTransactions.css";
import { Link } from "react-router-dom";
import { getAllTransactions } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";

const DisplayTransactions = () => {
  const [getData, setData] = useState([]);
  const { data, refetch } = useQuery(getAllTransactions);

  useEffect(() => {
    refetch();
    if (data) {
      setData(data.AllTransactions);
      // eslint-disable-next-line
    }
  }, [data]);

  return (
    <div className="container">
      <h1>GraphQL</h1>
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
          {getData.map((item, index) => {
            return (
              <tr key={index}>
                <td key={item.id}>{item.date}</td>
                <td>{item.descriptions}</td>
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
                <td>{item.running_balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTransactions;
