import { createContext, useContext } from "react";

import { Auth } from "../types";

export const AuthContext = createContext<{
  auth: Auth;
  setAuth: (auth: Auth) => void;
}>({
  auth: {
    token: "",
    isAuthenticated: false,
  },
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);
