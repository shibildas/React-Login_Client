import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "./axios/axios";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { login } from "../src/redux/user";
import adminReducer, { adminlogin } from "../src/redux/admin";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminLayout from "./Components/Admin/AdminLayout";
import ErrorPage from "./Components/Error/Error";
import "boxicons";

const AppLayout = () => {
  const [relogin, setRelogin] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [adminLoginStatus, setAdminLoginStatus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(response.data);
        if (!response.data.auth) {
          setLoginStatus(false);
          // navigate('/')
        } else {
          setLoginStatus(true);
          dispatch(login(response.data));
        }
      });
  }, [loginStatus]);

  useEffect(() => {
    axios
      .get("/admin/isAdminAuth", {
        headers: { "x-access-admintoken": localStorage.getItem("admintoken") },
      })
      .then((response) => {
        if (!response.data.auth) {
          setAdminLoginStatus(false);

          // navigate('/')
        } else {
          setAdminLoginStatus(true);
          dispatch(adminlogin(response.data));
        }
      });
  }, [adminLoginStatus]);

  return (
    <>
      <AppContext.Provider
        value={{
          relogin: relogin,
          setRelogin: setRelogin,
          loginStatus: loginStatus,
          setLoginStatus: setLoginStatus,
          adminLoginStatus: adminLoginStatus,
          setAdminLoginStatus: setAdminLoginStatus,
        }}
      >
        <Routes>
          {loginStatus && (
            <>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </>
          )}
          <Route
            exact
            path="/"
            element={!loginStatus ? <Login /> : <Home />}
          ></Route>
          {!loginStatus && <Route path="/login" element={<Login />}></Route>}
          <Route
            path="/admin"
            element={
              !adminLoginStatus ? <AdminLogin /> : <AdminLayout></AdminLayout>
            }
          ></Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
};

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </BrowserRouter>
);
