import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Outlet, useLocation, Navigate } from "react-router-dom";

export default function Private() {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  // ici React Router v6 : Outler equivaut à la route enfant, ici PrivateHome
  return (
    <div className="container">
      <Outlet />
    </div>
  );
}
