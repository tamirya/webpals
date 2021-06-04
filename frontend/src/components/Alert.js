import React, { useEffect, useState } from "react";

const Alert = ({ msg, isError = false }) => {
  const [closeBox, setCloseBox] = useState(false);

  const closeErrorBox = () => {
    console.log("closeErrorBox clicked");
    setCloseBox(true);
  };

  return (
    <>
      {!closeBox && (
        <div
          className={isError ? "alert alert-danger" : "alert alert-success"}
          role="alert"
        >
          {msg}
          <button type="button" className="close" onClick={closeErrorBox}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};
export default Alert;
