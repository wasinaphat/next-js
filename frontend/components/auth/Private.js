import React, { useEffect } from "react";
import Router from "next/router";
import { isAuth } from "../../services/auth";

const Private = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    } else {
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};
export default Private;
