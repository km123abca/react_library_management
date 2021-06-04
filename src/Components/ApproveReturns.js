import React, { useState, useEffect } from "react";
import { GetEntireBookReturnTable } from "./DatabaseFns";
import Homepage from "./Homepage";
import SFRBook from "./SFRBook";
import { Select, InputLabel } from "@material-ui/core";

function ApproveReturns() {
  const [bookReturns, setBookReturns] = useState([]);
  const [getAllBooks, setGetAllBooks] = useState(true);
  useEffect(() => {
    if (getAllBooks) {
      GetEntireBookReturnTable(setBookReturns);
    }
    return () => {
      setGetAllBooks(false);
    };
  }, []);

  return (
    <div>
      <Homepage />
      {bookReturns.length == 0 ? <h1>No pending approval requests</h1> : null}
      {bookReturns.map((x) => (
        <div style={{ marginTop: "10px" }}>
          <div className="offset-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 font-weight-bold">
            {x.user}
          </div>
          <div>
            {x.books.map((book) => (
              <div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <SFRBook
                    id={book.id}
                    checkoutID={book.checkoutID}
                    uBRTid={x.id}
                    n={book.n}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApproveReturns;
