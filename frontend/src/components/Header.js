import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedAction, isAdminAction } from "../store/actions/user";
import { Nav, Navbar, Image } from "react-bootstrap";

const Header = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin);
  const dispatch = useDispatch();

  const handleLogoutBtn = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    dispatch(isLoggedAction());
    dispatch(isAdminAction());
    return history.push("/");
  };

  const NavLogged = () => {
    return (
      <nav className="my-2 my-md-0 mr-md-3">
        <Link
          className="btn btn-outline text-white"
          to={isAdmin ? "/dashboard" : "/profile"}
        >
          {isAdmin ? "Dashboard" : "Profile"}
        </Link>
        <button
          className="btn btn-outline text-white"
          onClick={handleLogoutBtn}
        >
          Logout
        </button>
      </nav>
    );
  };

  return (
    <Navbar expand="lg" id="header">
      <Navbar.Brand as={Link} to="/">
        <Image src="https://www.webpals.com/wp-content/uploads/2018/09/webpals-group.png" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          {isLoggedIn ? (
            NavLogged()
          ) : (
            <Link className="p-2 text-white" to="/login">
              Login
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
