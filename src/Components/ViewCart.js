import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import Homepage from "./Homepage";
import Book from "./Book";
import { Button } from "@material-ui/core";
import ConfDialogue from "./ConfDialogue";
import { LogBorrowedBookData, updateBookCopiesInDBBulk } from "./DatabaseFns";
import ModalMessage from "./ModalMessage";
//modal related imports starts
// import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
//modal related imports ends

function ViewCart() {
  const [{ user, basket }, dispatch] = useStateValue();

  const [numBookCopies, setNumBookCopies] = useState(0);
  const [modalMsg, setModalMsg] = useState("Hulo");
  const [modalOpen, setModalOpen] = useState(false);

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

  // DIALOGUE OPERATION VARIABLES AND FUNCTIONS STARTS

  //MODAL CONTROL FUNCTIONS STARTS
  const openModalFn = () => {
    setModalOpen(true);
  };
  const closeModalFn = () => {
    setModalOpen(false);
  };
  //MODAL CONTROL FUNCTIONS ENDS

  const CheckOutBooks = () => {
    setDialogMsg("You are about to Check out your Cart? (Yes/No)");
    setOpenDialogue(true);
  };
  const StuffToDoOnceAccepted = () => {
    /*
    let recordToStore = {};
    let books = [];
    let taken = {},
      updatedBooks = [];
    basket.map((x) => {
      let numCopies = basket.filter((y) => y.id == x.id).length;
      if (!taken[x.id]) {
        books = [...books, { id: x.id, n: numCopies, n_returned: 0 }];
        updatedBooks = [
          ...updatedBooks,
          { bid: x.id, n: x.bookCopies - numCopies },
        ];
      }
      taken[x.id] = true;
    });
    recordToStore = { user: user.email, books: books };
    LogBorrowedBookData(recordToStore);
    updateBookCopiesInDBBulk(updatedBooks);
    dispatch({ type: "CLEAR_BASKET" });
    */
    setModalMsg("Data stored successfully");
    setModalOpen(true);
    // alert("Data Stored successfully");
  };
  let booksTemp = {};
  basket.map((x) => {
    if (booksTemp[x.id]) booksTemp[x.id] += 1;
    else booksTemp[x.id] = 1;
  });

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
      {/* <Modal
        open={modalOpen}
        onClose={closeModalFn}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal> */}
      {basket.length == 0 ? <h1>Your Cart is Empty</h1> : null}
      <div>
        {basket.map((x) => {
          if (booksTemp[x.id] == -1) return null;
          let numSelections = null;
          if (booksTemp[x.id] != 1) {
            numSelections = booksTemp[x.id];
            booksTemp[x.id] = -1;
          }

          return (
            <Book
              id={x.id}
              author={x.author}
              bookName={x.bookName}
              bookImage={x.bookImage}
              bookDesc={x.bookDesc}
              bookCopies={x.bookCopies}
              bookGenre={x.bookGenre}
              page={"viewcart"}
              numSels={numSelections}
            />
          );
        })}
      </div>
      {basket.length != 0 ? (
        <Button color="primary" variant="contained" onClick={CheckOutBooks}>
          Check Out
        </Button>
      ) : null}
    </div>
  );
}

export default ViewCart;
