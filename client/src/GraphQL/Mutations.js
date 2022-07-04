import { gql } from "@apollo/client";

export const NewTransaction = gql`
  mutation addNewTransaction(
    $transaction_type: String!
    $amount: Int!
    $descriptions: String!
    $running_balance: Int!
  ) {
    addNewTransaction(
      transaction_type: $transaction_type
      amount: $amount
      descriptions: $descriptions
      running_balance: $running_balance
    ) {
      running_balance
    }
  }
`;
