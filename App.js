import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Input,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AdbIcon from "@material-ui/icons/Adb";
import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "Soya", message: "Hello" },
  ]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            username: doc.data().username,
            message: doc.data().message,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, []);
  useEffect(() => {
    // while (username == "")
    setUsername(prompt("Please enter your name"));
  }, []);
  const sendMessage = (event) => {
    event.preventDefault();
    let usernamex = !username ? "Kitchu" : username;
    db.collection("messages").add({
      username: usernamex,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages, { username, message: input }]);
    setInput("");
  };
  return (
    <div className="App">
      {Array(5)
        .fill(" ")
        .map((x) => (
          <AdbIcon />
        ))}
      <h2>Welcome {(!username && "Stranger") || username}</h2>
      <form className="app__form">
        <FormControl className="app__FormControl">
          <InputLabel htmlFor="my-input">Message</InputLabel>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            id="my-input"
            className="app__Input"
          />
          <IconButton
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="secondary"
            disabled={!input}
            className="app__IconButton"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map((msg, index) => (
          <Message username={username} message={msg} key={msg.id} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
