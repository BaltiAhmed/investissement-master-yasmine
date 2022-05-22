import { createContext } from "react";

export const Authcontext = createContext({
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  financiereId: null,
  financieretoken: null,
  financierelogin: () => {},
  financierelogout: () => {},
  
});