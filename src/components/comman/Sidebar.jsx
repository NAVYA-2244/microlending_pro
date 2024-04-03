
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { Navigate } from "react-router-dom";
import UsersList from './../admin/UsersList';
import AddAdmin from './../admin/Addadmin';
import AdminList from './../admin/AdminList';
import ApplyLoan from './../authentication/ApplyLoan';
import Loaneligibility from './../admin/Loaneligibility';

const Sidebar = () => {
  const Navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const bodyRef = useRef(document.body);

  const sidemenuCloseClick = () => {
    bodyRef.current.classList.remove("menu-close");
  };

  const handleLogout = () => {
    console.log("Button clicked!");
    authService.logout();
    Navigate("/login");
  };

  return (
    <>
      <div
        className="sidebar-close"
        onClick={sidemenuCloseClick}
      >
        <aside id="sidebar" className="sidebar-menu">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <Link
              to="/dashboard"
              className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
            >
              <img
                src="assets/images/dark-logo.png"
                className="main-logo"
                alt="logo"
              />
              <img
                src="assets/images/sidenav-logo.png"
                className="sidenav-toggle-logo"
                alt="logo"
              />
              {/* <h4 className='mb-0 text-white'>Micro Lending</h4> */}
            </Link>
          </div>
          <ul className="sidebar-nav">
            <li
              className="nav-item"
            // onClick={() => {
            //     pushRoute('/dashboard');
            //     this.handleMenuClick();
            // }}
            >
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {/* <i className='ri-dashboard-line'></i> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M200-160v-366L88-440l-48-64 440-336 160 122v-82h120v174l160 122-48 64-112-86v366H520v-240h-80v240H200Zm80-80h80v-240h240v240h80v-347L480-739 280-587v347Zm120-319h160q0-32-24-52.5T480-632q-32 0-56 20.5T400-559Zm-40 319v-240h240v240-240H360v240Z" />
                </svg>
                <span>Dashboard</span>
              </NavLink>
            </li>


            <li
              className="nav-item"
            // onClick={() => {
            //     pushRoute('/register');
            //     this.handleMenuClick();
            // }}
            >
              <NavLink to="/updateprofile" className="nav-link">
                {/* <i className="ri-user-add-line"></i> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
                </svg>
                <span>Updateprofile</span>
              </NavLink>
            </li>
            {!authService.IsAdmin() && (
              <li
                className="nav-item"
              // onClick={() => {
              //     pushRoute('/register');
              //     this.handleMenuClick();
              // }}
              >

                <NavLink to="/applyloan" className="nav-link">
                  {/* <i className="ri-user-add-line"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
                  </svg>
                  <span>ApplyLoan</span>
                </NavLink>
              </li>
            )}
            {!authService.IsAdmin() && (
              <li
                className="nav-item"
              // onClick={() => {
              //     pushRoute('/register');
              //     this.handleMenuClick();
              // }}
              >

                <NavLink to="/loaneligibilitydetails" className="nav-link">
                  {/* <i className="ri-user-add-line"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
                  </svg>
                  <span>Loaneligibility</span>
                </NavLink>
              </li>
            )}
            {authService.IsAdmin() && (
              <li
                className="nav-item"
              // onClick={() => {
              //     pushRoute('/register');
              //     this.handleMenuClick();
              // }}
              >
                <NavLink to="/userlist" className="nav-link">
                  {/* <i className="ri-user-add-line"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
                  </svg>
                  <span>UsersList</span>
                </NavLink>
              </li>
            )}



            {authService.IsAdmin() && (
              <li
                className="nav-item"
              // onClick={() => {
              //     pushRoute('/register');
              //     this.handleMenuClick();
              // }}
              >
                <NavLink to="/adminlist" className="nav-link">
                  {/* <i className="ri-user-add-line"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
                  </svg>
                  <span>AdminList</span>
                </NavLink>
              </li>
            )}

            {authService.IsAdmin() && (
              <li
                className="nav-item"
              // onClick={() => {
              //     pushRoute('/register');
              //     this.handleMenuClick();
              // }}
              >
                <NavLink to="/admincontrols" className="nav-link">
                  {/* <i className="ri-user-add-line"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
                  </svg>
                  <span>AdminControls</span>
                </NavLink>
              </li>

            )}
            {authService.IsAdmin() && (
              <li
                className="nav-item"
              // onClick={() => {
              //     pushRoute('/register');
              //     this.handleMenuClick();
              // }}
              >
                <NavLink to="/loaneligibility" className="nav-link">
                  {/* <i className="ri-user-add-line"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
                  </svg>
                  <span>LoanEligibility</span>
                </NavLink>
              </li>

            )}
            <li
              className="nav-item"
            // onClick={() => {
            //     pushRoute('/register');
            //     this.handleMenuClick();
            // }}
            >
              <NavLink to="/Transection_history" className="nav-link">
                {/* <i className="ri-user-add-line"></i> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z" />
                </svg>
                <span> TransectionHhistory</span>
              </NavLink>
            </li>

            <li
              className="nav-item"
            // onClick={() => {
            //     pushRoute('/login');
            //     this.handleMenuClick();
            // }}
            >
              <NavLink
                to="/Settings"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {/* <i className="ri-user-3-line"></i> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
                <span> Settings</span>
              </NavLink>
            </li>



            <li
              className="nav-item"
            // onClick={() => {
            //     pushRoute('/login');
            //     this.handleMenuClick();
            // }}
            >
              {!authService.getCurrentUser() && (
                <NavLink to="/login" className="nav-link ">
                  {/* <i className="ri-login-circle-line"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                  </svg>
                  <span>Login</span>
                </NavLink>
              )}
            </li>
            <li
              className="nav-item"
            // onClick={() => {
            //     pushRoute('/login');
            //     this.handleMenuClick();
            // }}
            >
              {authService.getCurrentUser() && (
                <NavLink to="/landing" className="nav-link " onClick={handleLogout}>
                  {/* <i className="ri-login-circle-line"></i> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                  </svg>
                  <span>logout</span>
                </NavLink>
              )}
            </li>

          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
