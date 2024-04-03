import React from "react";
import { Route, Navigate } from "react-router-dom";
import authService from "./services/authService";

const ProtectedRoute = ({ children }) => {
 
  return authService.getCurrentUser() ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/landing" />
    </>
  );
};
export default ProtectedRoute;

// import React from "react";
// import { Route, Navigate, Routes } from "react-router-dom";
// import authService from "./services/authService";

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   return authService.getCurrentUser() ? (
//     <Route {...rest} element={<Component />} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default ProtectedRoute;
