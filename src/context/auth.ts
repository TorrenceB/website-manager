import { createContext, useContext, SetStateAction, Dispatch } from "react";

import { Auth } from "../types";

export const AuthContext = createContext<{
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
}>({
  auth: {
    token: "",
    isAuthenticated: false,
  },
  setAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);