import React from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Header from './components/core/Header'
import Footer from './components/core/Footer'
import EditProfile from './components/user/EditProfile';
import EditPassword from './components/user/NewPassword';
import DeleteAccount from './components/user/DeleteAccount';


// TRANSACTIONS
import Transactions from './components/transactions/Transactions';
import AddNewIncome from './components/transactions/AddNewIncome'
import AddNewExpense from './components/transactions/AddNewExpense';
import EditTransaction from './components/transactions/EditTransaction';

//STATISTICS
import Statistics from './components/statistics/Statistics';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function MainRouter() {

  return (
    <>
    <Router>
      <Header /> 
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/editProfile/:userId" element={<EditProfile />}></Route>
          <Route path="/editPassword/:userId" element={<EditPassword />}></Route>
          <Route path="/deleteAccount/:userId" element={<DeleteAccount />}></Route>
          <Route path="/transactions" element={<Transactions />}></Route>
          <Route path="/transactions/addNewIncome" element={<AddNewIncome />}></Route>
          <Route path="/transactions/addNewExpense" element={<AddNewExpense />}></Route>
          <Route path="/transaction/:transactionId" element={<EditTransaction />}></Route>
          <Route path="/statistics" element={<Statistics />}></Route> 
        </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default MainRouter;
