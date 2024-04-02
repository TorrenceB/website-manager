import { useState, ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context";
import { Auth } from "../types";

const Authentication = ({ children }: { children: ReactElement[] }) => {
  const [auth, setAuth] = useState<Auth>({ token: "", isAuthenticated: false });

  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {auth.isAuthenticated ? children : <Navigate to="signin" />}
      </AuthContext.Provider>
    </>
  );
};

export default Authentication;
