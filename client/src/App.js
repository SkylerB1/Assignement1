import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTransactions from "./Components/NewTransactions";
import DisplayTransactions from "./Components/DisplayTransactions";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:5001/graphql",
      // fetchOptions: {
      //   mode: "no-cors",
      // },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }),
    cache: new InMemoryCache(),
  });
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route exact={true} path="/" element={<DisplayTransactions />} />
            <Route path="/NewTransactions" element={<NewTransactions />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
