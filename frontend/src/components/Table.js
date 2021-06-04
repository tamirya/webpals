import React, { useEffect, useState } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import Alert from "./Alert";
import { updateUser, deleteUser, createUser } from "../services/Api";
import ModalAddRow from "./ModalAddRow";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Table = ({ items }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showModalAddRow, setShowModalAddRow] = useState(false);

  const columns = [
    {
      dataField: "user_id",
      text: "User ID",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "firstName",
      text: "First Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "lastName",
      text: "Last Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "role_name",
      text: "Role Name",
      sort: true,
      filter: textFilter(),
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "admin",
            label: "Admin",
          },
          {
            value: "student",
            label: "Student",
          },
        ],
      },
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      {/* Showing {from} to {to} of {size} Results */}
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: users.length,
      },
    ],
  };

  useEffect(() => {
    setUsers(items);
  }, []);

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    hideSelectAll: true,
    clickToEdit: true,
    style: { backgroundColor: "#c8e6c9" },
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedRow(row);
    },
  };

  const isRowSelected = () => {
    if (!selectedRow) {
      setErrorMsg("Please Select A Row");
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
      return false;
    }
    return true;
  };

  const onUpdateRow = async () => {
    console.log("selectedRow:", selectedRow);
    if (!isRowSelected()) {
      return;
    }
    const res = await updateUser(selectedRow);
    if (typeof res === "object") {
      setSuccessMsg("Saved To DB");
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    }
    console.log("res:", res);
  };

  const onDeleteRow = async () => {
    if (!isRowSelected()) {
      return;
    }

    let errorMode = false;
    const res = await deleteUser(selectedRow);
    if (typeof res === "string") {
      setSuccessMsg(res);
      setTimeout(() => {
        setSuccessMsg(null);
      }, 3000);
    } else {
      errorMode = true;
    }

    if (!errorMode) {
      const usersDeletedArr = users.filter(
        (row) => selectedRow.user_id !== row.user_id
      );
      setUsers(usersDeletedArr);
    }
  };

  const onAddRow = async (row) => {
    if (typeof row !== "object") {
      return;
    }
    try {
      const res = await createUser(row);
      if (res) {
        row.user_id = res.user_id;
        row.role_name = row.roleId === "1" ? "student" : "admin";
        console.log("row:", row);
        setUsers([...users, row]);
        setSuccessMsg("Added to DB");
        setTimeout(() => {
          setSuccessMsg(null);
        }, 3000);
      }
    } catch (error) {
      const msg = Object.values(error?.data?.response?.original).join(" ");
      setErrorMsg(msg);
      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);

      console.log("error:", error?.data?.response?.original);
    } finally {
      setShowModalAddRow(false);
    }
  };

  return (
    <>
      {errorMsg && <Alert msg={errorMsg} isError={true} />}
      {successMsg && <Alert msg={successMsg} isError={false} />}
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Welcome To The Dashboard</Card.Title>
          <Card.Text>
            In here we can do all CRUD operations on the users.
            <br />
            The table supports sort & filtering.
          </Card.Text>
        </Card.Body>
      </Card>
      <h3>Actions:</h3>
      <div className="actions mb-3 mt-3">
        <Button
          className="btn btn-warning"
          onClick={() => setShowModalAddRow(true)}
        >
          Add Row
        </Button>
        <Button onClick={onUpdateRow} className="btn btn-success ml-3">
          Update Row
        </Button>
        <Button onClick={onDeleteRow} className="btn btn-danger ml-3">
          Delete Row
        </Button>
      </div>
      <BootstrapTable
        keyField="user_id"
        data={users}
        columns={columns}
        filter={filterFactory()}
        pagination={paginationFactory(options)}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
          afterSaveCell: (oldValue, newValue, row, column) => {
            if (row.role_name === "admin") {
              row.roleId = 2;
            } else {
              row.roleId = 1;
            }
            console.log("After Saving Cell!!", row);
          },
        })}
        selectRow={selectRow}
      />
      <ModalAddRow
        show={showModalAddRow}
        setShow={setShowModalAddRow}
        addRowCallBack={onAddRow}
      />
    </>
  );
};

export default Table;
