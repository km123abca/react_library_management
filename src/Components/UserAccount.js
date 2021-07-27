import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import Homepage from "./Homepage";
import { Container, Button } from "react-bootstrap";
import {
  getAllUserDetails,
  GetAllBooksBorrowedSoFarWithEmail,
  RetrieveABook,
} from "./DatabaseFns";
import BookTaken from "./BookTaken";

function UserAccount() {
  const toggleunret = (e) => {
    setShowOnlyUnreturned(!showOnlyUnreturned);
  };
  const [showOnlyUnreturned, setShowOnlyUnreturned] = useState(false);
  const [{ user, basket }, dispatch] = useStateValue();
  const [userDets, setUserDets] = useState({
    id: "fake",
    email: "fake",
    idnum: "fake",
  });
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [effect1, setEffect1] = useState(true);
  const [effect2, setEffect2] = useState(true);
  useEffect(() => {
    if (effect1) if (user) getAllUserDetails(setUserDets, user.email);
    return () => {
      setEffect1(false);
    };
  }, []);

  useEffect(() => {
    if (effect2 && user)
      GetAllBooksBorrowedSoFarWithEmail(user.email, setBorrowedBooks);
    return () => {
      setEffect2(false);
    };
  }, []);

  return (
    <div>
      <Homepage />
      <h1>{user ? user.email : null}</h1>
      <h1>{userDets.id}</h1>
      <h1>{userDets.email}</h1>
      <h1>{userDets.idnum}</h1>
      <h1>{userDets.name}</h1>
      <Button onClick={toggleunret}>Toggle Unreturned</Button>
      {/* {<h1> {JSON.stringify(borrowedBooks)} </h1>} */}
      <div className="row">
        {borrowedBooks.map(
          (bookx) =>
            (!showOnlyUnreturned || bookx.nreturned != bookx.ntaken) && (
              <BookTaken
                bid={bookx.bid}
                ntaken={bookx.ntaken}
                nreturned={bookx.nreturned}
                datex={bookx.datex}
              />
            )
        )}
      </div>
    </div>
  );
}

export default UserAccount;
