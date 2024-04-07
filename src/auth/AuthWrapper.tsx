import { useState, ReactElement } from "react";

import { AuthContext } from "../context";
import { Auth } from "../types";

const AuthWrapper = ({ children }: { children: ReactElement[] }) => {
  const [auth, setAuth] = useState<Auth>({ token: "", isAuthenticated: false });

  const handleSetAuth = (auth: Auth) => {
    localStorage.setItem("Authentication", JSON.stringify(auth));

    setAuth(auth);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: handleSetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
