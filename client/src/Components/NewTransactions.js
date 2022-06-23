import React, { useState } from "react";
import axios from "axios";
import "./NewTransaction.css";
import { Link } from "react-router-dom";

const initialState = {
  transaction_type: "",
  amount: "",
  description: "",
};

function NewTransactions() {
  const [state, setState] = useState(initialState);

  const { transaction_type, amount, description } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
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
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <div>
        <h2 className="form">New Transactions</h2>
      </div>
      <form className="inputForm" onSubmit={handleSubmit}>
        <div>
          <label>Transaction Type:</label>
          <select name="transaction_type" onChange={handleInput}>
            <option defaultChecked>Select Transaction Type</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </div>
        <div>
          <label>Amount</label>
          <input type="number" name="amount" onChange={handleInput} />
        </div>
        <div>
          <label>Description</label>
          <textarea type="text" name="description" onChange={handleInput} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default NewTransactions;
