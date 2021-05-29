import React, { useState, useEffect } from "react";
import { RetrieveABook } from "./DatabaseFns";
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ApproveReturns } from "./DatabaseFns";

function SFRBook({ id, checkoutID, uBRTid, n }) {
  const [book, setBook] = useState({});
  const [ready, setReady] = useState(true);
  const [approvedCopies, setApprovedCopies] = useState(n);
  const approveBookReturn = () => {
    ApproveReturns(id, checkoutID, uBRTid, approvedCopies);
  };

  useEffect(() => {
    if (ready) RetrieveABook(setBook, id);
    return () => {
      setReady(false);
    };
  }, []);
  const handleChange = (e) => {
    setApprovedCopies(e.target.value);
  };
  return (
    <div
      style={{
        border: "2px solid #000000",
        maxWidth: "98%",
        margin: "auto",
      }}
      className="row"
    >
      <div style={{ marginTop: "10px" }} className="col-lg-4 col-md-8">
        <img
          src={book.bookImage}
          alt="sorry no image found"
          style={{ height: "400px", width: "100%" }}
        />
      </div>
      <div
        className="col-lg-4 col-md-8"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div>
          <InputLabel id="demo-simple-select-label">Approved Copies</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={approvedCopies}
            onChange={handleChange}
          >
            {Array(n)
              .fill()
              .map((x, ind) => (
                <MenuItem value={ind + 1}>{ind + 1}</MenuItem>
              ))}
          </Select>
        </div>
        <Button variant="contained" color="primary" onClick={approveBookReturn}>
          Approve
        </Button>
      </div>
    </div>
  );
}

export default SFRBook;
