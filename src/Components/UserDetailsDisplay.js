import React from "react";

function UserDetailsDisplay({ email, idnum, name }) {
  return (
    <div className="row" style={{ marginTop: "10px", marginBottom: "10px" }}>
      <div className="col-lg-4 col-md-4 col-sm-12">
        <span style={{ fontWeight: "bold" }}>User</span>:{name}
      </div>
      <div className="col-lg-4 col-md-4 col-sm-12">
        <span style={{ fontWeight: "bold" }}>Email</span>:{email}
      </div>
      <div className="col-lg-4 col-md-4 col-sm-12">
        <span style={{ fontWeight: "bold" }}>Govt ID</span>:{idnum}
      </div>
    </div>
  );
}

export default UserDetailsDisplay;
