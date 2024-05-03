import React, { Component } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./Layout";
import LoginForm from "./components/authentication/Login";
import VerifyOtp from "./components/authentication/verify_otp";

import Dashboard from "./components/dashbord/Dashbord";
import Settings from "./components/admin/Settings";

import { Toaster } from "react-hot-toast";
import Updateprofile from "./components/authentication/Updateprofile";
import ProtectedRoute from "./ProtectedRoute";
import Userdetails from "./components/authentication/Userdetails";
import UsersList from "./components/admin/UsersList";
import AddAdmin from "./components/admin/Addadmin";
import AdminList from "./components/admin/AdminList";
import AddminControlls from "./components/admin/AddminControlls";
import Loaneligibility from "./components/admin/Loaneligibility";
import Landing from "./components/landingpage/Landing";
import ApplyLoan from "./components/authentication/ApplyLoan";
import AplyloanLogin from "./components/authentication/AplyloanLogin";
import LoaneligibilityDetails from "./components/authentication/LoaneligibilityDetails";
import Transection_history from "./components/authentication/Transection_history";

import Recenttransections from "./components/authentication/Resenttransections";

import AplyloanOtp from "./components/authentication/AplyloanOtp";
import LoanStatus from "./components/authentication/LoanStatus";
import VerifyLoan from "./components/admin/VerifyLoan";
import EmiDetails from "./components/authentication/EmiDetails";
import Userinfo from "./components/admin/Userinfo";
import EmiHistory from "./components/authentication/EmiHistory";

const protect = (component) => <ProtectedRoute>{component}</ProtectedRoute>;
class App extends Component {
  render() {
    return (
      <div className="container-scroller">
        <BrowserRouter>
          <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" element={protect(<AppLayout />)}>
            <Route index element={<Dashboard />} />
              <Route path="/dashboard" exact element={<Dashboard />}></Route>
              <Route path="/Settings" element={<Settings/>}></Route>
              <Route path="/updateprofile" element={<Updateprofile />}></Route>
              <Route path="/userdetails" element={<Userdetails />}></Route>
              <Route path="/userlist" element={<UsersList />}></Route>
              
              <Route path="/adminlist" element={<AdminList />}></Route>
              <Route path="/admincontrols" element={<AddminControlls />}></Route>
              <Route path="/loaneligibility" element={<Loaneligibility />}></Route>
              <Route path="/loaneligibilitydetails" element={<LoaneligibilityDetails />}></Route>
              <Route path="/applyloan" element={<ApplyLoan/>}></Route>
              <Route path="/AplyloanOtp" element={<AplyloanOtp/>}></Route>
              <Route path="/aplyloanLogin" element={<AplyloanLogin/>}></Route>
              <Route path="/Transection_history" element={<Transection_history/>}></Route>
              <Route path="/Emihistory" element={<EmiHistory/>}></Route>
                            
              <Route path="/RecenttransactionHistory" element={<Recenttransections></Recenttransections>}></Route>
              <Route path="/loanstatus" element={<LoanStatus/>}></Route>

              <Route path="/Userprofile" element={<Userdetails/>}></Route>

              <Route path="/userinfo" element={<Userinfo/>}></Route>

              <Route path="/verifyloan" element={<VerifyLoan/>}></Route>
              <Route path="/emaidetails" element={<EmiDetails/>}></Route>

            </Route>
            

            <Route path="/landing" element={<Landing></Landing>}></Route>
            <Route path="/login" element={<LoginForm></LoginForm>}></Route>

            <Route path="/verifyotp" element={<VerifyOtp></VerifyOtp>}></Route>

            <Route
              path="*"
              element={
                <div className="text-center">
                  <h3 className="mt-5 text-default-color">
                    Page was not Found...😫
                  </h3>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>

        {/* */}
      </div>
    );
  }
}

export default App;
