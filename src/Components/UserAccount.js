import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import Homepage from "./Homepage";
import { getAllUserDetails } from "./DatabaseFns";

function UserAccount() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [userDets, setUserDets] = useState({
    id: "fake",
    email: "fake",
    idnum: "fake",
  });
  const [effect1, setEffect1] = useState(true);
  useEffect(() => {
    if (user.email) getAllUserDetails(setUserDets, user.email);
    return () => {
      setEffect1(false);
    };
  }, []);
  return (
    <div>
      <Homepage />
      <h1>{user.email}</h1>
      <h1>{userDets.id}</h1>
      <h1>{userDets.email}</h1>
      <h1>{userDets.idnum}</h1>
      <h1>{userDets.name}</h1>
    </div>
  );
}

export default UserAccount;
