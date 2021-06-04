import React, { useRef } from "react";
import Modal from "react-bootstrap/Modal";

const ModalAddRow = ({ show, setShow, addRowCallBack }) => {
  const email = useRef();
  const password = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const roleId = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    addRowCallBack({
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      roleId: roleId.current.value,
      password: password.current.value,
      email: email.current.value,
    });
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="inputEmail">Email address</label>
              <input
                ref={email}
                required
                type="email"
                className="form-control"
                placeholder="Enter email"
                id="inputEmail"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input
                ref={password}
                required
                type="password"
                className="form-control"
                placeholder="Password"
                id="inputPassword"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputFirstName">First Name</label>
              <input
                ref={firstName}
                type="text"
                required
                className="form-control"
                placeholder="First Name"
                id="inputFirstName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputLastName">Last Name</label>
              <input
                ref={lastName}
                type="text"
                required
                className="form-control"
                placeholder="Last Name"
                id="inputLastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="roleSelect">Role</label>
              <select
                required
                ref={roleId}
                className="form-control"
                id="roleSelect"
              >
                <option value="1">Student</option>
                <option value="2">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Save Changes
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAddRow;
