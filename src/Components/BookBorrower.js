import React, { useState, useEffect } from "react";
import { GetBookLenderInfo } from "./DatabaseFns";
import Homepage from "./Homepage";

function BookBorrower() {
  const [bookLenderData, setBookLenderData] = useState(null);
  useEffect(() => {
    GetBookLenderInfo(setBookLenderData);
  }, []);
  return (
    <div>
      <Homepage />
      <div>{JSON.stringify(bookLenderData)}</div>
    </div>
  );
}

export default BookBorrower;
