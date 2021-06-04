import React, { useState } from "react";

// Error component
const Error = ({ msg }) => {
  const [closeBox, setCloseBox] = useState(false);

  const closeErrorBox = () => {
    console.log("closeErrorBox clicked");
    setCloseBox(true);
  };

  return (
    <>
      {!closeBox && (
        <div className="alert alert-danger" role="alert">
          {msg}
          <button type="button" className="close" onClick={closeErrorBox}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Error;
