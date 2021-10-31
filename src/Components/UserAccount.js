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
import UserDetailsDisplay from "./UserDetailsDisplay";

function UserAccount() {
  const toggleunret = (e) => {
    setShowOnlyUnreturned(!showOnlyUnreturned);
  };
  const [showOnlyUnreturned, setShowOnlyUnreturned] = useState(false);
  const [{ user, basket }, dispatch] = useStateValue();
  const [userDets, setUserDets] = useState({
    id: "waiting for data",
    email: "waiting for data",
    idnum: "waiting for data",
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
      {/* <h1>{user ? user.email : null}</h1>
      <h1>{userDets.id}</h1>
      <h1>{userDets.email}</h1>
      <h1>{userDets.idnum}</h1>
      <h1>{userDets.name}</h1> */}
      <UserDetailsDisplay
        email={userDets.email}
        idnum={userDets.idnum}
        name={userDets.name}
      />
      <Button onClick={toggleunret}>Toggle Unreturned</Button>
      {/* {<h1> {JSON.stringify(borrowedBooks)} </h1>} */}
      <div
        className="row"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
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
