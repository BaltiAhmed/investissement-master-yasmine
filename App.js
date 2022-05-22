import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import PagesNav from "./navigation/AppNavigation";
import FianciereNav from "./navigation/appNavigationFinanciere";
import LoginNav from "./navigation/authNavigation";
import { Authcontext } from "./context/authContext";

export default function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback(async (uid, token) => {
    setToken(token);
    setUserId(uid);
    try {
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          token: token,
          userId: userId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    AsyncStorage.removeItem("userData");
  }, []);

  useEffect(async () => {
    const storedData = await JSON.parse(AsyncStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  const [tokenFinanciere, setTokenFinanciere] = useState(null);
  const [FinanciereId, setFinanciereId] = useState(null);

  const loginFinanciere = useCallback(async (uid, token) => {
    setTokenFinanciere(token);
    setFinanciereId(uid);
    try {
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          tokenFinanciere: token,
          FinanciereId: userId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const logoutFinanciere = useCallback(() => {
    setTokenFinanciere(null);
    setFinanciereId(null);
    AsyncStorage.removeItem("userData");
  }, []);

  useEffect(async () => {
    const storedData = await JSON.parse(AsyncStorage.getItem("userData"));
    if (storedData && storedData.tokenFinanciere) {
      loginFinanciere(storedData.FinanciereId, storedData.tokenFinanciere);
    }
  }, [login]);

  let routes;

  if (token) {
    routes = <PagesNav />;
  }else if(tokenFinanciere){
    routes = <FianciereNav />;
  } else {
    routes = <LoginNav />;
  }

  return (
    <Authcontext.Provider
      value={{
        userId: userId,
        token: token,
        login: login,
        logout: logout,
        financiereId: FinanciereId,
        tokenFinanciere: tokenFinanciere,
        financierelogin: loginFinanciere,
        financierelogout: logoutFinanciere,
      }}
    >
      {routes}
    </Authcontext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
