import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from "react-router-dom";
import Banner from "./components/Banner";
import MedicineList from "./components/MedicineList";
import MlCalculator from "./components/MlCalculator";
import "./App.css";

const AppContent = ({ searchTerm, handleSearch }) => {
  const location = useLocation();

  return (
    <div className="App">
      <Banner />
      <nav>
        <ul className="pagesButton">
          <li className="listLi">
            <Link className="list" to="/"><button style={{ margin: "0", backgroundColor: "#ff5722", color:"black" }}>Doz Hesaplayıcı</button></Link>
          </li>
          <li className="listLi">
            <Link className="mlCalc" to="/ml-calculator"><button style={{ margin: "0", backgroundColor: "#ff5722", color:"black" }}>İlaç Ml Hesaplayıcı</button></Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<MedicineList searchTerm={searchTerm} />} />
        <Route path="/ml-calculator" element={<MlCalculator />} />
      </Routes>
    </div>
  );
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <AppContent searchTerm={searchTerm} handleSearch={handleSearch} />
    </Router>
  );
}

export default App;
