import { gql } from "@apollo/client";

const getAllTransactions = gql`
  query {
    AllTransactions {
      date
      descriptions
      transaction_type
      amount
      running_balance
    }
  }
`;

const Running_Balance = gql`
  query {
    getRunningBalance {
      running_balance
    }
  }
`;
export { getAllTransactions, Running_Balance };
