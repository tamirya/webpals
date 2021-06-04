import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getAllUsers } from "../services/Api";
import Table from "components/Table";

const Dashboard = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [users, setUsers] = useState();

  // fetch users from DB
  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  // check if user logged in
  useEffect(() => {
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.role_name === "student") {
        history.push("/");
      }
    }
  }, []);

  return (
    <div className="container mt-5">{users && <Table items={users} />}</div>
  );
};

export default Dashboard;
