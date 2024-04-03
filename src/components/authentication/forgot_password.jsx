import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class ForgotPassowrd extends Component {
    state = {  } 
    render() { 
        return (
            <>
                <div className='authentication-page login-form'>
                    <div className='p-4'>
                        <div className='container bg-white rounded-3'>
                            <div className='row'>
                                <div className='col-xl-6 col-lg-6 col-md-6'>
                                    <div className='card mb-0 shadow-none forgotpassword-image'>
                                        <Link
                                                to="/"
                                            className="text-decoration-none mt-3"
                                            >
                                                <img src="assets/images/light-logo.png" className="login-logo" alt="logo"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className='col-xl-6 col-lg-6 col-md-6 my-auto'>
                                    <div className='card mb-0 shadow-none'>
                                        <div className='card-body'>
                                            <h5 className='fw-semibold mb-1 text-uppercase'>Forgot Password</h5>
                                            
                                            <form>
                                                <p className="pb-2 fw-normal text-capitalize mt-3">Please enter your registered Email Id </p>
                                                <div className="mb-3 mt-2 position-relative">
                                                    <label htmlFor="emailControlInput" className="form-label">Email</label>
                                                    <input type="email" className="form-control" id="emailControlInput" placeholder="Enter username here" />
                                                    <div className='view-password-icon'>
                                                        <i className="ri-user-line"></i>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className='d-flex flex-wrap gap-2 mt-4'>
                                                <Link className='btn btn-lg btn-primary'>Forgot Password</Link>
                                                <Link to="/login" className='btn btn-lg btn-outline-primary'>Login</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
 
export default ForgotPassowrd;