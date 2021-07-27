import React, { useState, useEffect } from "react";
import { RetrieveABook } from "./DatabaseFns";
import { Card } from "react-bootstrap";

function BookTaken({ bid, ntaken, nreturned, datex }) {
  const [book, setBook] = useState({ bookImage: "xxx.jpg" });
  const [effect1, setEffect1] = useState(true);
  useEffect(() => {
    RetrieveABook(setBook, bid);
    return () => {
      setEffect1(false);
    };
  }, []);
  return (
    <div
      style={{ marginTop: "10px" }}
      className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
    >
      <Card
        className="mb-3"
        style={{ backgroundColor: "#34568B", paddingTop: "10px" }}
      >
        <Card.Img
          src={book.bookImage}
          style={{ height: "400px", width: "300px", margin: "auto" }}
        />
        <Card.Body>
          <Card.Title style={{ color: "white" }}>
            Book(s) Taken on {datex}{" "}
          </Card.Title>
          <Card.Text style={{ color: "white" }}>
            {ntaken} book(s) taken and {nreturned} book(s) returned
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookTaken;

// bid, ntaken, nreturned, datex
