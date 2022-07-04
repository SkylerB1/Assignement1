import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./NewTransactions.css";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Running_Balance } from "../GraphQL/Queries";
import { NewTransaction } from "../GraphQL/Mutations";
import { useMutation, useQuery } from "@apollo/client";

const initialState = {
  transaction_type: "",
  amount: 0,
  description: "",
};

const NewTransactions = () => {
  const [state, setState] = useState(initialState);
  const redirect = useNavigate();
  const [addNewTransaction, { error }] = useMutation(NewTransaction);
  const { data, refetch, networkStatus } = useQuery(Running_Balance);

  const handleSubmit = (e) => {
    refetch();
    let balance = data.getRunningBalance[0].running_balance;
    console.log(balance);
    e.preventDefault();
    if (state.transaction_type === "credit") {
      balance = parseInt(balance) + parseInt(state.amount);
    } else {
      balance = parseInt(balance) - parseInt(state.amount);
    }
    if (networkStatus.refetch) {
      alert("Please Wait..");
    } else {
      addNewTransaction({
        variables: {
          transaction_type: state.transaction_type,
          amount: parseInt(state.amount),
          descriptions: state.description,
          running_balance: balance,
        },
      });
    }

    if (error) {
      console.log(error);
    } else {
      setState({ transaction_type: "", amount: "", description: "" });
      toast.success("Transaction Recorded Successfully!!");
    }
    redirect("/");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  return (
    <>
      <ToastContainer />
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
    </>
  );
};

export default NewTransactions;
