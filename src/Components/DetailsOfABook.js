import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RetrieveABook } from "./DatabaseFns";
import Book from "./Book";
import Homepage from "./Homepage";
function DetailsOfABook() {
  let location = useLocation();
  const [indivBook, setIndivBook] = useState({});
  const [bid, setBid] = useState(
    location.state ? location.state.id : "no id found"
  );
  useEffect(() => {
    RetrieveABook(setIndivBook, bid);
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
    </div>
  );
}

export default DetailsOfABook;
