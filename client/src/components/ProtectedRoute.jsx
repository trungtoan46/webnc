import React ,{ useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  } else {
    return React.createElement(Navigate, { to: "/login" });
  }
};

export default ProtectedRoute;
