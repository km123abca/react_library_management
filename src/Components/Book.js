import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";

function Book({
  id,
  bookName,
  author,
  bookImage,
  bookDesc,
  bookCopies,
  bookGenre,
  page,
  numSels,
}) {
  const [{ basket }, dispatch] = useStateValue();
  let numSels_local = numSels ? "(" + numSels + ")" : "";
  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  const addToCart = () => {
    if (page == "viewcart") {
      removeFromCart();
      return "redirected";
    }
    if (basket.filter((x) => x.id == id).length >= bookCopies) {
      alert("Out of Copies");
      return 0;
    }

    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        bookName,
        author,
        bookImage,
        bookDesc,
        bookCopies,
        bookGenre,
      },
    });
  };
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
          src={bookImage}
          alt="sorry no image found"
          style={{ height: "400px", width: "100%" }}
        />
        <h4>
          {bookName} by {author}
        </h4>
        {/* {page != "bookdets" ? ( */}
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Button
              color="primary"
              variant="contained"
              startIcon={
                page == "allbooks" ? <AddShoppingCartIcon /> : <DeleteIcon />
              }
              onClick={addToCart}
            >
              {page == "allbooks" ? "Add to cart" : "Put Back " + numSels_local}
            </Button>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Button
              color="secondary"
              variant="contained"
              startIcon={<MoreHorizIcon />}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={{
                  pathname: "/fe/bookdescription/",
                  state: {
                    id: id,
                  },
                }}
              >
                More
              </Link>
            </Button>
          </div>
        </div>
        {/* ) : null} */}
      </div>
    </div>
  );
}

export default Book;
