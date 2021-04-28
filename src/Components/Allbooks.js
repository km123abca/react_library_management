import React, { useState, useEffect } from "react";
import Homepage from "./Homepage";
import Book from "./Book";
// import zIndex from "@material-ui/core/styles/zIndex";
import { RetrieveData } from "./DatabaseFns";

function Allbooks() {
  const [booksAll, setBooksAll] = useState([]);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    RetrieveData(setBooks, setBooksAll);
  }, []);
  return (
    <div>
      <Homepage />
      <div className="container-fluid">
        <div className="row" style={{ marginTop: "10px" }}>
          {books.map((x) => (
            <Book
              id={x.id}
              author={x.author}
              bookName={x.bookName}
              bookImage={x.bookImage}
              bookDesc={x.bookDesc}
              bookCopies={x.bookCopies}
              bookGenre={x.bookGenre}
              page={"allbooks"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Allbooks;
