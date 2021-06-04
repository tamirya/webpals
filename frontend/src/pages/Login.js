import Error from "components/Error";
import React, { useRef, useState } from "react";
import { useHistory, withRouter } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../services/Api";
import { isLoggedAction, isAdminAction } from "../store/actions/user";
import Button from "react-bootstrap/Button";

// This page handle login user
const Login = () => {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let redirect = false;
    let roleName = "";
    const emailInput = email.current.value;
    const passwordInput = password.current.value;
    try {
      const results = await login({
        email: emailInput,
        password: passwordInput,
      });
      console.log("results:", results);

      if (results && "user" in results && "access_token" in results) {
        localStorage.setItem("user", JSON.stringify(results.user));
        localStorage.setItem("access_token", results.access_token);
        dispatch(isLoggedAction());
        dispatch(isAdminAction());
        roleName = results.user.role_name;
        redirect = true;
      }
    } catch (error) {
      console.log("error:", error);
      const { message } = error;
      setError(message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      if (redirect) {
        if (roleName === "student") {
          history.push("/profile");
        } else if (roleName === "admin") {
          history.push("/dashboard");
        }
      }
    }
  };

  return (
    <div id="login-form">
      <form onSubmit={handleSubmit} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
        <label htmlFor="inputemail" className="sr-only">
          email address
        </label>
        <input
          ref={email}
          type="email"
          id="inputemail"
          className="form-control"
          placeholder="email address"
          defaultValue="naftali-bennett@gmail.com"
          required
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          ref={password}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          defaultValue="123123"
          required
        />
        <Button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </Button>
      </form>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">{error && <Error msg={error} />}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
