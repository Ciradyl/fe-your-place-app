import { createContext } from "react";

export const AUTHENTICATION_CONTEXT = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
