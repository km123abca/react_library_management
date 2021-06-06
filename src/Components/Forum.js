import React, { useState, useEffect } from "react";
import { addMsgToDB, getAllForumMessages } from "./DatabaseFns";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import FlipMove from "react-flip-move";
import { useStateValue } from "../StateProvider";
import Message from "./Message";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  fcontrol: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  ifield: {
    width: 200,
  },
}));

function Forum({ bookId }) {
  const classes = useStyles();
  const [ef1, setEf1] = useState(true);
  const [bookIdx, setBookId] = useState(bookId);
  const [{ user }] = useStateValue();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "Failed again", message: "Hello", id: 1 },
    { username: "Failed", message: "Hello", id: 2 },
  ]);
  const sendMessage = (e) => {
    e.preventDefault();
    addMsgToDB(input, user.email, bookId);
    setInput("");
  };

  useEffect(() => {
    if (ef1) getAllForumMessages(setMessages, bookId);
    return () => {
      setEf1(false);
    };
  }, []);
  return (
    <div
      style={{
        marginTop: "30px",
        textAlign: "center",
        backgroundColor: "#d5f3eb",
      }}
    >
      <h1 className="mx-auto" style={{ fontWeight: "bold" }}>
        Reviews and suggestions
      </h1>
      <div style={{ textAlign: "center" }} className="row">
        <form
          className="offset-lg-2 col-lg-6 col-md-8 col-sm-12"
          style={{
            padding: "20px",
            // position: "fixed",
            //bottom: "0",
            //zIndex: "1",
            backgroundColor: "#e9e9eb",
            width: "100%",
            margin: "20px",
            // border: "2px solid black",
          }}
        >
          <FormControl className={classes.fcontrol}>
            <InputLabel htmlFor="my-input">Message</InputLabel>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              id="my-input"
              fullWidth="true"
              // className={classes.ifield}
              // style={{ width: "90%" }}
            />
          </FormControl>
          <IconButton
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="secondary"
            disabled={!input}
            // style={{ width: "10%" }}
          >
            <SendIcon />
          </IconButton>
        </form>
        <FlipMove className="col-12 row">
          {messages.map((msg, index) => (
            <Message username={user.email} message={msg} key={msg.id} />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default Forum;
