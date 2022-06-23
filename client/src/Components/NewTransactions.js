import React, { useState } from "react";
import "./NewTransactions.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  transaction_type: "",
  amount: "",
  description: "",
};

function NewTransactions() {
  const [state, setState] = useState(initialState);

  const redirect = useNavigate();

  const { transaction_type, amount, description } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/post", {
        transaction_type,
        amount,
        description,
      })
      .then(() => {
        setState({ transaction_type: "", amount: "", description: "" });
      })
      .catch((err) => {
        console.log(err);
      });
    redirect("/");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  return (
    <div className="container">
      <div>
        <h2 className="form">New Transactions</h2>
      </div>
      <form className="inputForm" onSubmit={handleSubmit}>
        <div className="margin">
          <label className="label">Transaction Type:</label>
          <div className="input">
            <select name="transaction_type" onChange={handleInput}>
              <option defaultChecked>Select Transaction Type</option>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>
        </div>
        <div className="margin">
          <label className="label">Amount</label>
          <div className="input">
            <input type="number" name="amount" onChange={handleInput} />
          </div>
        </div>
        <div className="margin">
          <div>
            <label className="label">Description</label>
          </div>
          <div className="input">
            <textarea type="text" name="description" onChange={handleInput} />
          </div>
        </div>
        <div className="margin">
          <button className="btn btn-primary" onClick={handleSubmit}>
            <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
          </button>
          <Link to="/">
            <button className="btn btn-light">
              <i className="fa fa-times" aria-hidden="true"></i> Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NewTransactions;
