import { createContext } from "react";

export const AUTHENTICATION_CONTEXT = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
