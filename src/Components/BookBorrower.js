import React, { useState, useEffect } from "react";
import { GetBookLenderInfo } from "./DatabaseFns";
import Homepage from "./Homepage";
import { useLocation } from "react-router-dom";
import DataInTable from "./DataInTable";
import { Button } from "react-bootstrap";

function BookBorrower() {
  let location = useLocation();
  const [bookLenderData, setBookLenderData] = useState([]);
  const [acis, setAcis] = useState(true);
  const [bArrayg, setBArrayg] = useState([]);
  const [suscribed, setSuscribed] = useState(true);
  const [debugString, setDebugString] = useState([]);
  // let bid = "Cq2wwkf3sDmsmpGsIrlF";
  const [bid, setBid] = useState(
    location.state ? location.state.id : "Cq2wwkf3sDmsmpGsIrlF"
  );
  const displaystuff = () => {
    PrepareArray();
    // console.log(JSON.stringify(bookLenderData));
  };
  const PrepareArray = () => {
    // setDebugString(JSON.stringify(bookLenderData));
    let emptyArray = [];
    bookLenderData.map((x) => {
      if (!x.returnedAll)
        x.books.map((bookx) => {
          if (bookx.id == bid && bookx.n_returned != bookx.n) {
            if (acis) setAcis(false);
            let remainingBooks = bookx.n - bookx.n_returned;
            emptyArray.push([x.user, remainingBooks, x.timestamp]);
          }
        });
    });
    setBArrayg(emptyArray);
  };
  useEffect(() => {
    if (suscribed) GetBookLenderInfo(setBookLenderData);
    return () => {
      setSuscribed(false);
    };
  }, []);
  useEffect(() => {
    if (suscribed) PrepareArray();
    return () => {
      setSuscribed(false);
    };
  }, [bookLenderData]);

  return (
    <div>
      <Homepage />
      {<DataInTable bodyContent={bArrayg} />}
      {acis ? <h1>No one has rented this book</h1> : null}
      {/* <Button varinat="contained" onClick={displaystuff}>
        Show Debug Info
      </Button> */}
    </div>
  );
}

export default BookBorrower;
