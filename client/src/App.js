import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewTransactions from "./Components/NewTransactions";
import DisplayTransactions from "./Components/DisplayTransactions";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<DisplayTransactions />} />
          <Route path="/NewTransactions" element={<NewTransactions />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
