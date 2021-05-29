import React, { useState, useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { RetrieveABook } from "./DatabaseFns";
import { getReturnBasketCount } from "../reducer";
import { GetDataFromUserBookReturnTable } from "./DatabaseFns";

import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  page,
} from "@material-ui/core";

function BookReturned({ id, page, n, checkoutID }) {
  const [book, setBook] = useState({});
  const [suscribed, setSuscribed] = useState(true);
  const [suscribeda, setSuscribeda] = useState(true);
  const [{ user, returnBasket }, dispatch] = useStateValue();
  const [booksWith, setBooksWith] = useState(0);
  const [numBooksForReturn, setNumBooksForReturn] = useState(0);

  const addToReturnBasket = () => {
    dispatch({
      type: "ADD_TO_RETURN_BASKET",
      item: { checkoutID, id },
    });
  };
  //todo useeffect to check with userbookreturn table to check whether further books have to be reduced from n
  useEffect(() => {
    if (suscribeda)
      GetDataFromUserBookReturnTable(
        user.email,
        id,
        checkoutID,
        setNumBooksForReturn
      );
    return () => {
      setSuscribeda(false);
    };
  }, []);
  useEffect(() => {
    if (suscribed) RetrieveABook(setBook, id);
    return () => {
      setSuscribed(false);
    };
  }, []);
  useEffect(() => {
    if (suscribed) {
      dispatch({ type: "SET_RETURN_BASKET_ON_RELOAD" });
    }
    return () => {
      setSuscribed(false);
    };
  }, []);
  useEffect(() => {
    // if (suscribed) {
    // console.log(JSON.stringify(returnBasket));
    setBooksWith(
      n - getReturnBasketCount(returnBasket, id, checkoutID) - numBooksForReturn
    );
    // }
    return () => {
      setSuscribed(false);
    };
  }, [returnBasket, numBooksForReturn]);
  return (
    <div
      className="col-lg-4 col-md-6 col-sm-12 col-xs-12"
      style={{ marginTop: "10px" }}
    >
      <div
        style={{
          backgroundColor: "#88b04b",
          border: "1px solid black",
          padding: "4px",
        }}
      >
        <img
          src={book.bookImage}
          alt="sorry no image found"
          style={{ height: "400px", width: "100%" }}
        />
        <h4>
          {book.bookName} by {book.author}
        </h4>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Button
              color="primary"
              variant="contained"
              startIcon={
                page == "allbooks" ? <AddShoppingCartIcon /> : <DeleteIcon />
              }
              onClick={addToReturnBasket}
              disabled={booksWith == 0}
            >
              Return Books {booksWith != 0 ? "(" + booksWith + ")" : null}
            </Button>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Button
              color="secondary"
              variant="contained"
              startIcon={<MoreHorizIcon />}
            >
              More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookReturned;
