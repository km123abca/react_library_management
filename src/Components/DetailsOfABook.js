import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RetrieveABook } from "./DatabaseFns";
import Book from "./Book";
import Homepage from "./Homepage";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Forum from "./Forum";
function DetailsOfABook() {
  let location = useLocation();
  const [indivBook, setIndivBook] = useState({});
  const [bid, setBid] = useState(
    location.state ? location.state.id : "no id found"
  );
  const viewhist = () => {};
  const [suscribed, setSuscribed] = useState(true);
  useEffect(() => {
    if (suscribed) RetrieveABook(setIndivBook, bid);
    return () => {
      setSuscribed(false);
    };
  }, []);

  return (
    <div>
      <Homepage />
      <Book
        id={indivBook.id}
        author={indivBook.author}
        bookName={indivBook.bookName}
        bookImage={indivBook.bookImage}
        bookDesc={indivBook.bookDesc}
        bookCopies={indivBook.bookCopies}
        bookGenre={indivBook.bookGenre}
        page={"allbooks"}
      />
      <h1 style={{ marginTop: "20px" }}>{indivBook.bookDesc}</h1>
      <div>
        <Button color="primary" variant="contained" onClick={viewhist}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={{
              pathname: "/fe/bor/",
              state: {
                id: indivBook.id,
              },
            }}
          >
            Who has?
          </Link>
        </Button>
      </div>
      <Forum bookId={indivBook.id} />
    </div>
  );
}

export default DetailsOfABook;
