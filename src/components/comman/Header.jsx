import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { backEndCall } from "../../services/mainServiceFile";
import { useEffect } from "react";
import { useMovieContext } from "./Context";

const Header = () => {
  const navigate = useNavigate();
  const { userprofileData, setUserprofileData } = useMovieContext();
  // const [userData, setUserData] = useState({});
  // const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-close');
  };
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await backEndCall("/users/user_profile");
        setUserprofileData(response);
        // setLoading(false);

      } catch (error) {
        console.error("Error fetching user profile:", error);
        // setLoading(false);
      }
    };

    // const delayFetch = setTimeout(fetchData, 1000);
    // return () => clearTimeout(delayFetch);
    fetchData();
  }, []);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  //   if (!userData) {
  //     return <div>Error fetching user profile. Please try again.</div>;
  //   }




  const handlelogout = () => {
    console.log("Button clicked! navya");
    authService.logout();
    navigate("/landing");
  };

  return (
    <div className="header">
      <nav className="navbar col-lg-12 col-12 p-0 d-block">
        <div className="navbar-menu-wrapper d-flex justify-content-between align-items-center">
          <div className="d-inline-flex align-items-center">
            <button className="navbar-toggler align-self-center" onClick={headerToggleMenu} type="button" data-toggle="minimize">
              <label className="hamburger">
                <input type="checkbox" onClick={headerToggleMenu} />
                <svg viewBox="0 0 32 32">
                  <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                  <path className="line" d="M7 16 27 16"></path>
                </svg>
              </label>
            </button>
            <div className="d-none d-sm-block">
              <div className="input-group border rounded-2 ms-4 flex-nowrap header-search">
                <span className="input-group-text bg-transparent border-0 cursor-pointer" id="header-search-btn"><i className="ri-search-line"></i></span>
                <form
                  className="col-12 col-lg-auto flex-fill"
                  role="search"
                >
                  <input
                    type="search"
                    className="form-control border-0 ps-0"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                </form>
              </div>
            </div>
          </div>

          <ul className="nav mb-md-0 header-right">
            <li className="dropdown header-dropdown d-none d-sm-block">
              <Link to="" className="nav-link px-2 link-body-emphasis" data-bs-auto-close="outside" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="lh-1 d-inline-flex"><path d="M80-560q0-100 44.5-183.5T244-882l47 64q-60 44-95.5 111T160-560H80Zm720 0q0-80-35.5-147T669-818l47-64q75 55 119.5 138.5T880-560h-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" /></svg>
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="">Action</Link></li>
                <li><Link className="dropdown-item" to="">Another action</Link></li>
                <li><Link className="dropdown-item" to="">Something else here</Link></li>
              </ul>
            </li>
            <li className="dropdown text-end header-dropdown">
              <Link
                to=""
                className="d-block link-body-emphasis text-decoration-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
                style={{ marginTop: "-25px" }}



              >
                <span className="fw-semibold me-2 text-capitalize"></span>
                <span className="user-details border rounded-circle d-flex justify-content-center align-items-center">

                  {userprofileData?.photo ? (
                    // If userData.photo contains a valid image URL, display the image
                    <img src={userprofileData?.photo} alt="User Photo" className="rounded-circle shadow" />
                  ) : (
                    // Otherwise, display the icon
                    <i className="ri-user-3-fill"></i>
                  )}
                </span>
              </Link>
              <ul className="dropdown-menu text-small">
                {/* <li>
                  <Link className="dropdown-item" to="" data-bs-toggle="modal" data-bs-target="#changePassword">
                    <i className="ri-edit-2-fill fs-15 me-1"></i> Change Password
                  </Link>
                </li> */}
                <li>
                  <Link className="dropdown-item" to="/Settings">
                    <i className="ri-settings-3-fill fs-15 me-1"></i> Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/userdetails">
                    <i className="ri-user-fill fs-15 me-1"></i> Profile
                  </Link>
                </li>
                <li onClick={handlelogout}>
                  <Link className="dropdown-item"  >
                    <i className="ri-logout-circle-r-fill fs-15 me-1"></i> Sign out
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav >
    </div >


  );
};

export default Header;
