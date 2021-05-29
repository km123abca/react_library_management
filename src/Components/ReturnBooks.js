import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import {
  GetBookLenderInfoSingleUser,
  GetArrayOfBooksFromUserBookReturnTable,
  LogUserBookReturnData,
} from "./DatabaseFns";
import Homepage from "./Homepage";
import BookReturned from "./BookReturned";
import ConfDialogue from "./ConfDialogue";
import { Button } from "@material-ui/core";
import ModalMessage from "./ModalMessage";

function ReturnBooks() {
  const [{ user, returnBasket }, dispatch] = useStateValue();
  const [bookLenderData, setBookLenderData] = useState([]);
  const [suscribed, setSuscribed] = useState(true);
  const [suscribed2, setSuscribed2] = useState(true);
  const [booksArrayForReturn, setBooksArrayForReturn] = useState([]);
  const [idinBookReturnTable, setIdinBookReturnTable] = useState(-1);
  const clearReturnBasket = () => {
    dispatch({
      type: "CLEAR_RETURN_BASKET",
    });
  };
  //MODAL VARIABLES STARTS
  const [modalMsg, setModalMsg] = useState("Hulo");
  const [modalOpen, setModalOpen] = useState(false);
  //MODAL VARIABLES ENDS
  // DIALOGUE OPERATION VARIABLES AND FUNCTIONS STARTS
  const [openDialogue, setOpenDialogue] = useState(false);
  const [dialogMsg, setDialogMsg] = useState("Are you Sure?");
  const handleClose = () => {
    setOpenDialogue(false);
  };
  const handleDenial = () => {
    handleClose();
  };
  const handleClickOpen = () => {
    setOpenDialogue(true);
  };
  const handleAcceptance = () => {
    handleClose();
    StuffToDoOnceAccepted();
  };

  // DIALOGUE OPERATION VARIABLES AND FUNCTIONS ENDS
  //MODAL CONTROL FUNCTIONS STARTS
  const openModalFn = () => {
    setModalOpen(true);
  };
  const closeModalFn = () => {
    setModalOpen(false);
  };
  //MODAL CONTROL FUNCTIONS ENDS
  //const StuffToDoOnceAccepted = () => {}

  const StuffToDoOnceAccepted = () => {
    let recordToStore = {};
    let books = booksArrayForReturn;
    let editData = books.length != 0;
    let taken = {};
    let foundFlg;
    returnBasket.forEach((x) => {
      if (!taken[x.id + "" + x.checkoutID]) {
        let numCopies = returnBasket.filter(
          (y) => y.id == x.id && y.checkoutID == x.checkoutID
        ).length;
        foundFlg = false;
        books = books.map((y) => {
          if (y.id == x.id && y.checkoutID == x.checkoutID) {
            foundFlg = true;
            y.n += numCopies;
          }
          return y;
        });
        if (!foundFlg)
          books = [
            ...books,
            { id: x.id, checkoutID: x.checkoutID, n: numCopies },
          ];
        taken[x.id + "" + x.checkoutID] = true;
      }
    });

    recordToStore = { user: user.email, books: books };
    LogUserBookReturnData(recordToStore, editData, idinBookReturnTable);
    // updateBookCopiesInDBBulk(updatedBooks);
    dispatch({ type: "CLEAR_RETURN_BASKET" });

    setModalMsg("We will send someone to pick the book, Please keep it ready");
    setModalOpen(true);
    // alert("Data Stored successfully");
  };

  const SubmitReturnRequest = () => {
    setOpenDialogue(true);
  };
  useEffect(() => {
    if (suscribed) {
      if (user) GetBookLenderInfoSingleUser(setBookLenderData, user.email);
    }

    return () => {
      setSuscribed(false);
    };
  }, []);
  useEffect(() => {
    if (suscribed2) {
      if (user)
        GetArrayOfBooksFromUserBookReturnTable(
          user.email,
          setBooksArrayForReturn,
          setIdinBookReturnTable
        );
    }

    return () => {
      setSuscribed2(false);
    };
  }, []);
  return (
    <div>
      <Homepage />
      <ConfDialogue
        open={openDialogue}
        handleClose={handleClose}
        handleAcceptance={handleAcceptance}
        handleDenial={handleDenial}
        msg={dialogMsg}
      />
      <ModalMessage
        modalOpen={modalOpen}
        closeModalFn={closeModalFn}
        bodyContent={modalMsg}
      />
      {bookLenderData.map((x) =>
        x.books.map((y, ind) => (
          <BookReturned
            id={y.id}
            page={"none"}
            n={y.n - y.n_returned}
            checkoutID={x.checkoutID}
            key={ind}
          />
        ))
      )}
      {returnBasket.length != 0 ? (
        <Button
          color="primary"
          variant="contained"
          onClick={SubmitReturnRequest}
        >
          Submit For Return
        </Button>
      ) : null}
      {returnBasket.length != 0 ? (
        <span style={{ marginLeft: "10px" }}>
          {" "}
          <Button
            color="primary"
            variant="contained"
            onClick={clearReturnBasket}
          >
            Clear Basket
          </Button>
        </span>
      ) : null}
    </div>
  );
}

export default ReturnBooks;
