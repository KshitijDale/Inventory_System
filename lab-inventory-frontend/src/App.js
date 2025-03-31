// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./Pages/Dashboard";
import AddToInventory from "./components/AddToInventory";
import StockTransaction from "./Pages/Transaction";
import PaymentsPage from "./components/payments";
import ProductDetail from "./components/productDetails";
import BillsList from "./components/Billslist";
import BillDetails from "./components/BillDetails";
import VendorManagement from "./components/VendorManagement";
import LedgerPage from "./components/LedgerPage";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
};

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/add-inventory" element={<PrivateRoute><AddToInventory /></PrivateRoute>} />
              <Route path="/stock-transaction" element={<PrivateRoute><StockTransaction /></PrivateRoute>} />
              <Route path="/payments" element={<PrivateRoute><PaymentsPage /></PrivateRoute>} />
              <Route path="/product/:prd_name/:pack/:mfg" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
              <Route path="/bills" element={<PrivateRoute><BillsList /></PrivateRoute>} />
              <Route path="/bill/:bill_id" element={<PrivateRoute><BillDetails /></PrivateRoute>} />
              <Route path = "/vendor" element={<PrivateRoute><VendorManagement /></PrivateRoute>} />
              <Route path="/ledger/:vendorId" element={<PrivateRoute><LedgerPage /></PrivateRoute>} />
          </Routes>
      </Router>
  );
}

export default App;
