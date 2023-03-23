import React from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";

const UserRoute = ({ children, ...rest }) => {
  
  const { currentUser } = useSelector((state) => state.user);

  const history = useHistory();

  return currentUser ? <Route {...rest} /> : history.push("/login");
};

export default UserRoute;
