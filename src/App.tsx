import React, {useEffect, useState} from "react";
import "./styles/main.css";
import {Routes, Route} from "react-router-dom";
import Auth from "./pages/Auth";
import AuthContext from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import Header from "./app/component/Header";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const {token, refreshToken, login, logout, userName} = useAuth();

  const isAuthenticated = !!token;
  const check = async () => {
    try {
      let statusRefresh = false;
      await fetch("http://localhost:4040/api/user/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": `${token}`,
        },
      }).then((response) => {
        if (response.status === 403) {
          statusRefresh = true;
          return;
        }
      });
      if (statusRefresh) {
        await fetch("http://localhost:4040/api/refreshToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        })
          .then((response) => {
            if (response.status === 400) {
              logout();
              return;
            }
            return response.json();
          })
          .then((json) => login(json.accessToken, refreshToken!, userName!));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token && refreshToken) {
      check();
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        token: token,
        login,
        logout,
        userName,
        isAuthenticated,
      }}
    >
      <div className="main-content">
        <Header back={true} />
        <Routes>
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <AdminPanel />
              ) : (
                <label className="not-auth-title">Go to Login Page!</label>
              )
            }
          />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
