import React, { useState } from "react";
import Header from "./components/Header";
import Alert from "./components/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import Home from "pages/Home";
import { Route, Switch } from "react-router-dom";
import Login from "pages/Login";
import Dashboard from "pages/Dashboard";
import Profile from "pages/Profile";
import PrivateRoute from "components/PrivateRoute ";
import { useDispatch } from "react-redux";
import { isLoggedAction, isAdminAction } from "store/actions/user";
import axios from "axios";

export default function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  // setup axios
  axios.defaults.baseURL = "http://localhost:8000";

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (!error.response) {
        setErrorMsg(error.message);
        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);
        return;
      }

      if (error.response.status === 500) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.clear();
        dispatch(isLoggedAction());
        dispatch(isAdminAction());
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  // verify if user logged-in
  dispatch(isLoggedAction());
  dispatch(isAdminAction());

  return (
    <div className="wrapper">
      <Header />
      {errorMsg && <Alert msg={errorMsg} isError={true} />}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}
