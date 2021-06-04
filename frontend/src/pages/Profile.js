import React from "react";

// Profile page to display the logged user
const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user:", user);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3">
          <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" />
        </div>
        <div className="col-9 mt-5">
          <ul className="list-group">
            <li className="list-group-item">First Name: {user.firstName}</li>
            <li className="list-group-item">Last Name: {user.lastName}</li>
            <li className="list-group-item">Email: {user.email}</li>
            <li className="list-group-item">Role: {user.role_name}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
